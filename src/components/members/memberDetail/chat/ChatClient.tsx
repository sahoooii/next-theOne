'use client';

import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { ChatMessage } from '@/types';
import ChatRoom from './ChatRoom';

type Props = {
	initialMessages: ChatMessage[];
	currentUserId: string;
	chatId: string;
};

const ChatClient = ({ initialMessages, currentUserId, chatId }: Props) => {
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
			/>
		</Card>
	);
};

export default ChatClient;
