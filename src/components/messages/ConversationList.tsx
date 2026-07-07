'use client';

import { useEffect, useState } from 'react';
import { Conversation, ConversationPayload } from '@/types';
import { getPusherClient } from '@/lib/pusher/client';

import ConversationCard from './ConversationCard';
import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { createUserChannel } from '@/lib/utils';
import { mapConversationPayloadToConversation, mapConversationToPayload } from '@/lib/mappers/messageMapper';

type Props = {
	conversations: Conversation[];
	currentUserId: string;
};

const ConversationList = ({ conversations, currentUserId }: Props) => {
	const [conversationList, setConversationList] = useState(conversations);

	// Conversationを1件受け取り、Stateを更新する
	const updateConversation = (conversation: Conversation) => {
		setConversationList((prev) => {
			// 古いConversationを取り除く
			const filtered = prev.filter(
				(item) => item.userId !== conversation.userId,
			);
			console.log(filtered);
			return prev;
		});
	};

	useEffect(() => {
		// Manage channel
		const pusher = getPusherClient();

		// Manage event
		const channel = pusher.subscribe(createUserChannel(currentUserId));

		channel.bind('conversation:update', (payload: ConversationPayload) => {
			const conversation = mapConversationPayloadToConversation(payload);

			console.log(conversation);

			updateConversation(conversation);
		});

		return () => {
			channel.unbind('conversation:update');
			pusher.unsubscribe(createUserChannel(currentUserId));
		};
	}, []);

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
