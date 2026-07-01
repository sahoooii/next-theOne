import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import ChatForm from './ChatForm';
import { ChatMessage } from '@/types';

type Props = {
	messages: ChatMessage[];
	currentUserId: string;
}


const ChatClient = ({messages, currentUserId}: Props) => {
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
			<ChatForm messages={messages} currentUserId={currentUserId} />
		</Card>
	);
}

export default ChatClient
