import ChatForm from '@/components/members/memberDetail/chat/ChatForm';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { Card } from '@/components/ui/card';

const ChatPage = () => {
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
			<ChatForm />
		</Card>
	);
};

export default ChatPage;
