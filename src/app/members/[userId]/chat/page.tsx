import { getAuthUserId } from '@/app/actions/authActions';
import { getMessageThread } from '@/app/actions/messageActions';
import ChatForm from '@/components/members/memberDetail/chat/ChatForm';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { Card } from '@/components/ui/card';

const ChatPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;
	const messages = await getMessageThread(userId);

	const currentUserId = await getAuthUserId();

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
			<ChatForm messages={messages} currentUserId={currentUserId} />
		</Card>
	);
};

export default ChatPage;
