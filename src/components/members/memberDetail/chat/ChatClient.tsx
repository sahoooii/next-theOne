'use client';

import { ChatMessage } from '@/types/messages';
import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import ChatRoom from './ChatRoom';
import { ChatPartner } from '@/types/prisma';

type Props = {
	initialMessages: ChatMessage[];
	currentUserId: string;
	chatId: string;
	partner: ChatPartner;
};

const ChatClient = ({
	initialMessages,
	currentUserId,
	chatId,
	partner,
}: Props) => {
	return (
		<Card
			className='
	h-full
	bg-white/70 backdrop-blur-md
	border border-black/10
	rounded-2xl
	p-8
'
		>
			{/* Header */}
			<MemberDetailPageHeader title='Chat' />
			{/* Chat contents */}
			<ChatRoom
				initialMessages={initialMessages}
				currentUserId={currentUserId}
				chatId={chatId}
				partner={partner}
			/>
		</Card>
	);
};

export default ChatClient;
