'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { isSameDay } from 'date-fns';
import { SendHorizonal } from 'lucide-react';

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

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
	formatChatTime,
	formatMessageDate,
	handleFormServerErrors,
} from '@/lib/utils';
import { transformImageUrl } from '@/lib/transFormImageUrl';
import ChatOptions from './ChatOptions';
import { showToast } from '@/lib/toast';
import { getPusherClient } from '@/lib/pusher/client';
import { mapMessagePayloadToChatMessage } from '@/utils/conversations/mappers/messageMapper';
import { createChatChannel } from '@/lib/pusher/channels';
import TypingIndicator from './TypingIndicator';
import { ChatPartner } from '@/types/prisma';

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

	// 現在画面に表示している最新データ
	const [chatMessages, setChatMessages] = useState(initialMessages);

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

	// DropdownMenuの状態,Radix内部管理,AlertDialogの状態,React state管理の競合を防ぐ
	// 今、削除しようとしているメッセージはどれか管理する
	const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
		null,
	);

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

	// Typing indicator: Manage typing
	// Partner typing state (UI)
	const [isPartnerTyping, setIsPartnerTyping] = useState(false);
	// 自分が入力中かの内部管理 / Current user's typing status (internal)
	const isTypingRef = useRef(false);
	// タイマーの保持: 現在動いているタイマー
	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// 受信側の処理 UI
	// 「相手が入力しています」というイベントを受け取ってUIを更新する
	const handleTypingStart = useCallback(
		(payload: TypingPayload) => {
			if (payload.typingUserId === currentUserId) return;

			setIsPartnerTyping(true);
		},
		[currentUserId],
	);

	// 受信側の処理
	const handleTypingStop = useCallback(
		(payload: TypingPayload) => {
			if (payload.typingUserId === currentUserId) return;

			setIsPartnerTyping(false);
		},
		[currentUserId],
	);

	// 送信側の処理: 実際に何を送るか"を担当する
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

	// Decide when to start or stop typing.
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

	// Auto scroll to see the latest message
	const bottomRef = useRef<HTMLDivElement>(null);

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

	// Press enter to submit message
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (
			e.key === 'Enter' &&
			!e.shiftKey &&
			form.formState.isValid &&
			!form.formState.isSubmitting
		) {
			e.preventDefault();

			form.handleSubmit(onSubmit)();
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
				{/* Messages */}
				{chatMessages.length === 0 ? (
					<div
						className='
					border-b
					border-black/10
					px-6
					py-4
				'
					>
						<p className='text-lg font-medium'>
							Your conversation starts here.
						</p>
						<p className='mt-1 text-sm'>Say hello when you are ready.</p>
					</div>
				) : (
					<div
						className='
					flex-1
					space-y-2
					overflow-y-auto
					p-6
				'
					>
						{chatMessages.map((message, index) => {
							const isCurrentUser = message.senderId === currentUserId;

							// Double texting from sender
							const previousMessage = chatMessages[index - 1];
							// If not login user & not double texting and then show avatar
							const showAvatar =
								!isCurrentUser &&
								previousMessage?.senderId !== message.senderId;

							// Prevent show read time every text, when sender double texting
							const nextMessage = chatMessages[index + 1];

							const showReadReceipt =
								isCurrentUser &&
								message.dateRead &&
								(!nextMessage || nextMessage.senderId !== currentUserId);

							// Display separator when change a date
							const showDateSeparator =
								!previousMessage ||
								!isSameDay(
									new Date(previousMessage.created),
									new Date(message.created),
								);

							return (
								<div key={message.id}>
									{/* Date Separator */}
									{showDateSeparator && (
										<div className='my-6 flex items-center gap-4'>
											<div className='h-px flex-1 bg-black/10' />
											<p
												className='
						text-[11px]
						tracking-wide
						text-gray-400
					'
											>
												{formatMessageDate(new Date(message.created))}
											</p>
											<div className='h-px flex-1 bg-black/10' />
										</div>
									)}

									{/* Message Row */}
									<div
										className={`flex gap-2 ${
											isCurrentUser ? 'justify-end' : 'justify-start'
										}`}
									>
										{/* Avatar */}
										{showAvatar && (
											<Avatar
												className='
											mt-1
						h-10
						w-10
						overflow-hidden
						border
						border-black/10
					'
											>
												<AvatarImage
													className='object-cover object-[center_10%]'
													src={
														transformImageUrl(message.senderImage, 'avatar') ??
														''
													}
												/>

												<AvatarFallback>
													{message.senderName?.charAt(0)}
												</AvatarFallback>
											</Avatar>
										)}

										{/* Empty spacing */}
										{!isCurrentUser && !showAvatar && <div className='w-10' />}

										<div className='group flex gap-2'>
											{/* Chat Options ex: delete */}
											{isCurrentUser && (
												<ChatOptions
													onDeleteClick={() => setSelectedMessageId(message.id)}
												/>
											)}

											{/* Bubble + Time */}
											<div className='first-letter:mt-1 flex flex-col'>
												<div
													className={`
						relative
						max-w-[80%] md:max-w-[90%]
						min-w-[80px]
						px-4
						py-2.5
						text-sm
						leading-relaxed
						shadow-sm
						transition-all
						duration-300
						${
							isCurrentUser
								? `
									rounded-3xl
									rounded-br-sm
									bg-purple-500/90
									text-white
								`
								: `
									rounded-3xl
									rounded-bl-sm
									border
									border-black/5
									bg-black/5
									text-gray-800
								`
						}
					`}
												>
													{message.text}
												</div>
												{/* Message send time */}
												<p
													className='mt-1
						text-[11px] text-right
						text-gray-400'
												>
													{formatChatTime(new Date(message.created))}
												</p>

												{/* Message receipt time */}
												{isCurrentUser &&
													message.dateRead &&
													showReadReceipt && (
														<p className='text-[11px] font-medium text-right text-gray-500'>
															Read {formatChatTime(new Date(message.dateRead))}
														</p>
													)}
											</div>
										</div>
									</div>
								</div>
							);
						})}

						{/* Typing indicator */}
						<AnimatePresence>
							{isPartnerTyping && <TypingIndicator partner={partner} />}
						</AnimatePresence>

						{/* For auto scroll to the latest chat */}
						<div ref={bottomRef} />
					</div>
				)}

				{/* Form: Chat send */}
				<div
					className='
					border-t
					border-black/10
					bg-white/40
					p-4
					backdrop-blur-xl
				'
				>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='flex items-end gap-3'
						>
							<FormField
								control={form.control}
								name='text'
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormMessage className='text-sm text-red-700' />

										<FormControl>
											<Textarea
												{...field}
												placeholder='Write a message...'
												onKeyDown={handleKeyDown}
												onChange={(e) => {
													field.onChange(e);
													handleTypingChange(e.target.value);
												}}
												className='
												min-h-[56px]
												resize-none
												rounded-2xl
												border-black/10
												bg-white/80
												text-sm
												placeholder:text-gray-400
												focus-visible:ring-1
												focus-visible:ring-purple-400
											'
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button
								type='submit'
								size='icon'
								disabled={
									!form.formState.isDirty ||
									!form.formState.isValid ||
									form.formState.isSubmitting
								}
								className='
								h-12
								w-12
								rounded-full
								bg-purple-500
								transition-all
								duration-300
								hover:bg-purple-400
							'
							>
								<SendHorizonal className='h-5 w-5' />
							</Button>
						</form>
					</Form>
				</div>
			</div>

			{/* Show alert dialog to delete message */}
			<AlertDialog
				open={!!selectedMessageId}
				onOpenChange={(open) => {
					if (!open) {
						setSelectedMessageId(null);
					}
				}}
			>
				<AlertDialogContent
					className='
	w-[90%]
	max-w-sm
	rounded-3xl
	border-black/10
	bg-white/90
	p-6
	md:p-8
	backdrop-blur-xl
'
				>
					<AlertDialogHeader>
						<AlertDialogTitle
							className='
						pt-4
						text-xl
						font-semibold
						text-gray-900
					'
						>
							Delete message?
						</AlertDialogTitle>
						<div className='h-[2px] w-10 rounded-full bg-purple-500' />

						<AlertDialogDescription
							className='
						pt-1
						text-sm
						text-gray-500
					'
						>
							This message will be permanently removed.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel
							className='
						rounded-2xl
						border-black/10
					'
						>
							Cancel
						</AlertDialogCancel>

						<AlertDialogAction
							onClick={handleDelete}
							className='
						rounded-2xl
						bg-purple-500
						text-white
						hover:bg-purple-400
					'
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default ChatRoom;
