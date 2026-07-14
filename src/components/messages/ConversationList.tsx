'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPusherClient } from '@/lib/pusher/client';

import {
	Conversation,
	ConversationDeletePayload,
	ConversationPayload,
} from '@/types/conversations';

import ConversationCard from './ConversationCard';
import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { mapConversationPayloadToConversation } from '@/lib/mappers/messageMapper';
import { createUserChannel } from '@/lib/pusher/channels';

type Props = {
	conversations: Conversation[];
	currentUserId: string;
};

const ConversationList = ({ conversations, currentUserId }: Props) => {
	const [conversationList, setConversationList] = useState(conversations);

	// UI更新担当: Conversationを1件受け取り、Stateを更新する
	const updateConversation = useCallback((conversation: Conversation) => {
		// prev=今画面に表示されているConversation一覧
		setConversationList((prev) => {
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
		setConversationList((prev) =>
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
		<div className='flex justify-center px-4'>
			<Card
				className='
	w-full
	max-w-2xl
	bg-white/70 backdrop-blur-md
	border border-black/10
	rounded-2xl
	p-8
'
			>
				{/* Header */}
				<MemberDetailPageHeader title='Messages' />

				{conversationList.length === 0 ? (
					<div className='py-16 text-center'>
						<h3 className='text-lg font-medium text-gray-900'>
							No conversations yet
						</h3>

						<p className='mt-2 text-sm text-gray-500'>
							When a meaningful connection begins, your messages will appear
							here.
						</p>
					</div>
				) : (
					<div className='space-y-3'>
						{conversationList.map((conversation) => (
							<ConversationCard
								key={conversation.userId}
								conversation={conversation}
							/>
						))}
					</div>
				)}
			</Card>
		</div>
	);
};

export default ConversationList;
