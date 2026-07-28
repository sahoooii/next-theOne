'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';

import {
	ChatMessage,
	MessageDeletePayload,
	MessagePayload,
	ReadReceiptPayload,
	TypingPayload,
} from '@/types/messages';

import { messageSchema, MessageSchema } from '@/lib/schema/messageSchema';
import {
	createMessage,
	deleteMessage,
	sendTypingEvent,
} from '@/app/actions/messageActions';

import { handleFormServerErrors } from '@/lib/utils';
import { showToast } from '@/lib/toast';
import { getPusherClient } from '@/lib/pusher/client';
import { mapMessagePayloadToChatMessage } from '@/utils/conversations/mappers/messageMapper';
import { createChatChannel } from '@/lib/pusher/channels';
import { ChatPartner } from '@/types/prisma';
import ChatMessages from './chatRoom/ChatMessages';
import ChatInput from './chatRoom/ChatInput';
import DeleteMessageDialog from './chatRoom/DeleteMessageDialog';

type Props = {
	initialMessages: ChatMessage[];
	currentUserId: string;
	chatId: string;
	partner: ChatPartner;
};

const ChatRoom = ({
	initialMessages,
	currentUserId,
	chatId,
	partner,
}: Props) => {
	const params = useParams<{ userId: string }>();

	// State
	// 現在画面に表示している最新データ
	const [chatMessages, setChatMessages] = useState(initialMessages);

	// DropdownMenuの状態,Radix内部管理,AlertDialogの状態,React state管理の競合を防ぐ
	// 今、削除しようとしているメッセージはどれか管理する
	const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
		null,
	);

	// Typing indicator: Manage typing
	// Partner typing state (UI)
	const [isPartnerTyping, setIsPartnerTyping] = useState(false);

	// Ref

	// Auto scroll to see the latest message
	const bottomRef = useRef<HTMLDivElement>(null);

	// タイマーの保持: 現在動いているタイマー
	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// 自分が入力中かの内部管理 / Current user's typing status (internal)
	const isTypingRef = useRef(false);

	// Message追加処理を共通化
	const appendMessage = useCallback((message: ChatMessage) => {
		setChatMessages((prev) => [...prev, message]);
	}, []);

	// 今受信した１件
	const handleNewMessage = useCallback(
		(payload: MessagePayload) => {
			// Convert to UI string-> Date
			const message = mapMessagePayloadToChatMessage(payload);

			appendMessage(message);
		},
		[appendMessage],
	);

	// Delete
	const removeMessage = useCallback((messageId: string) => {
		setChatMessages((prev) =>
			prev.filter((message) => message.id !== messageId),
		);
	}, []);

	const handleDeleteMessage = useCallback(
		(payload: MessageDeletePayload) => {
			removeMessage(payload.messageId);
		},
		[removeMessage],
	);

	// Delete message action
	const handleDelete = async () => {
		if (!selectedMessageId) return;

		await deleteMessage(selectedMessageId);
		setSelectedMessageId(null);
	};

	// Read receipt
	const updateReadReceipt = useCallback(
		(payload: ReadReceiptPayload) => {
			setChatMessages((current) => {
				const updated = current.map((message) => {
					if (message.senderId === currentUserId && message.dateRead === null) {
						return {
							...message,
							dateRead: new Date(payload.readAt),
						};
					}
					return message;
				});
				return updated;
			});
		},
		[currentUserId],
	);

	const handleReadReceipt = useCallback(
		(payload: ReadReceiptPayload) => {
			updateReadReceipt(payload);
		},
		[updateReadReceipt],
	);

	// 受信側の処理 UI
	// 「相手が入力しています」というイベントを受け取ってUIを更新する
	const handleTypingStart = useCallback(
		(payload: TypingPayload) => {
			if (payload.typingUserId === currentUserId) return;

			setIsPartnerTyping(true);
		},
		[currentUserId],
	);

	// ==========================
	// Typing (Receive)
	// ==========================
	const handleTypingStop = useCallback(
		(payload: TypingPayload) => {
			if (payload.typingUserId === currentUserId) return;

			setIsPartnerTyping(false);
		},
		[currentUserId],
	);

	// ==========================
	// Typing (Send): 送信側の処理: 実際に何を送るか"を担当する
	// ==========================
	const startTyping = useCallback(async () => {
		if (isTypingRef.current) {
			return;
		}
		await sendTypingEvent(chatId, 'typing:start');

		isTypingRef.current = true;
	}, [chatId]);

	// 1. Empty input, 2. Stop after 2 seconds of inactivity, 3. Success send a message
	const stopTyping = useCallback(async () => {
		if (!isTypingRef.current) {
			return;
		}
		await sendTypingEvent(chatId, 'typing:stop');

		isTypingRef.current = false;
	}, [chatId]);

	// タイマー処理
	const resetTypingTimeout = useCallback(() => {
		// 前回のタイマーが残っていればキャンセル
		// Cancel the previous timeout before starting a new one.
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}
		// Send typing:stop after 2 seconds of inactivity.
		typingTimeoutRef.current = setTimeout(async () => {
			await stopTyping();
			typingTimeoutRef.current = null;
		}, 2000);
	}, [stopTyping]);

	// Judge to when is typing start or stop
	// 入力内容に応じて、Typing の開始・停止タイミングを判断する
	const handleTypingChange = async (text: string) => {
		if (text === '') {
			await stopTyping();
			return;
		}
		await startTyping();
		// Manage time
		resetTypingTimeout();
	};

	useEffect(() => {
		// Manage channel
		const pusher = getPusherClient();
		// Manage event
		const channelName = createChatChannel(chatId);

		const channel = pusher.subscribe(channelName);

		// Create message
		channel.bind('message:new', handleNewMessage);

		// Delete message
		channel.bind('message:delete', handleDeleteMessage);

		// Read receipt
		channel.bind('message:read', handleReadReceipt);

		// Typing indicator
		channel.bind('typing:start', handleTypingStart);
		channel.bind('typing:stop', handleTypingStop);

		return () => {
			// Notify partner that typing has stopped.
			void stopTyping();

			// Clear the pending typing timeout.
			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}

			// Unbind realtime events.
			channel.unbind('message:new', handleNewMessage);
			channel.unbind('message:delete', handleDeleteMessage);
			channel.unbind('message:read', handleReadReceipt);
			channel.unbind('typing:start', handleTypingStart);
			channel.unbind('typing:stop', handleTypingStop);

			// Leave the chat channel.
			pusher.unsubscribe(channelName);
		};
	}, [
		chatId,
		handleNewMessage,
		handleDeleteMessage,
		handleReadReceipt,
		handleTypingStart,
		handleTypingStop,
		stopTyping,
	]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: 'smooth',
		});
	}, [chatMessages]);

	// For typing indicator: Typing が始まったらスクロール
	useEffect(() => {
		if (!isPartnerTyping) return;

		bottomRef.current?.scrollIntoView({
			behavior: 'smooth',
		});
	}, [isPartnerTyping]);

	const form = useForm<MessageSchema>({
		resolver: zodResolver(messageSchema),
		mode: 'onChange',
		defaultValues: {
			text: '',
		},
	});

	const onSubmit = async (data: MessageSchema) => {
		const result = await createMessage(params.userId, data);

		if (result.status === 'error') {
			const globalError = handleFormServerErrors(result.error, form.setError);

			if (globalError) {
				showToast(globalError, 'error');
			}
		} else {
			// Typing indicator: Stop
			await stopTyping();

			form.reset();
		}
	};

	return (
		<>
			<div
				className='
				flex
				h-[calc(100vh-120px)]
				flex-col
				overflow-hidden
				rounded-3xl
				border
				border-black/10
				bg-white/70
				backdrop-blur-md
			'
			>
				{/* Messages一覧 */}
				<ChatMessages
					chatMessages={chatMessages}
					currentUserId={currentUserId}
					partner={partner}
					isPartnerTyping={isPartnerTyping}
					bottomRef={bottomRef}
					onDeleteClick={(messageId) => setSelectedMessageId(messageId)}
				/>

				{/* Form: Chat message send */}
				<ChatInput
					form={form}
					onSubmit={onSubmit}
					handleTypingChange={handleTypingChange}
				/>
			</div>

			{/* Show alert dialog to delete message */}
			<DeleteMessageDialog
				open={!!selectedMessageId}
				onClose={() => setSelectedMessageId(null)}
				onDelete={handleDelete}
			/>
		</>
	);
};

export default ChatRoom;
