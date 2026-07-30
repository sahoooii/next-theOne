'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

import { getPusherClient } from '@/lib/pusher/client';
import { createUserChannel } from '@/lib/pusher/channels';

import { Conversation, ConversationDeletePayload, ConversationPayload } from '@/types/conversations';
import { mapConversationPayloadToConversation } from '@/utils/conversations/mappers/messageMapper';

type ConversationContextType = {
	conversations: Conversation[];
};

type Props = {
	children: React.ReactNode;
	initialConversations: Conversation[];
	currentUserId: string;
};

const ConversationContext = createContext<ConversationContextType | undefined>(
	undefined,
);

export function ConversationProvider({
	children,
	initialConversations,
	currentUserId,
}: Props) {
	const [conversations, setConversations] = useState(initialConversations);

	// UI更新担当: Conversationを1件受け取り、Stateを更新する
	const updateConversation = useCallback((conversation: Conversation) => {
		// prev=今画面に表示されているConversation一覧
		setConversations((prev) => {
			// 古いConversationを取り除くex: Bob, Amanda, Chris, Bob -> Amanda, Chris
			const filtered = prev.filter(
				(item) => item.userId !== conversation.userId,
			);
			//  New Bob + Amanda, Chris
			return [conversation, ...filtered];
		});
	}, []);

	// For event: Pusher Payload → Conversationへ変換 → updateConversation()
	const handleConversationUpdate = useCallback(
		(payload: ConversationPayload) => {
			const conversation = mapConversationPayloadToConversation(payload);

			updateConversation(conversation);
		},
		[updateConversation],
	);

	// UI更新担当: partnerUserId → Conversationを削除 → State更新
	const removeConversation = useCallback((partnerUserId: string) => {
		setConversations((prev) =>
			prev.filter((item) => item.userId !== partnerUserId),
		);
	}, []);

	// For event: Payload → removeConversation()
	const handleConversationDelete = useCallback(
		(payload: ConversationDeletePayload) => {
			removeConversation(payload.userId);
		},
		[removeConversation],
	);

	// Pusherへイベントを登録・解除
	useEffect(() => {
		// Manage channel
		const pusher = getPusherClient();

		// Manage event
		const channel = pusher.subscribe(createUserChannel(currentUserId));

		channel.bind('conversation:update', handleConversationUpdate);

		channel.bind('conversation:delete', handleConversationDelete);

		return () => {
			channel.unbind('conversation:update', handleConversationUpdate);

			channel.unbind('conversation:delete', handleConversationDelete);

			pusher.unsubscribe(createUserChannel(currentUserId));
		};
	}, [currentUserId, handleConversationUpdate, handleConversationDelete]);

	return (
		<ConversationContext.Provider value={{ conversations }}>
			{children}
		</ConversationContext.Provider>
	);
}

export function useConversation() {
	const context = useContext(ConversationContext);

	if (!context) {
		throw new Error('useConversation must be used within ConversationProvider');
	}

	return context;
}
