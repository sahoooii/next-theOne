import { redirect } from 'next/navigation';

import { ConversationProvider } from '@/providers/ConversationProvider';

import { getAuthUserId } from '../actions/authActions';
import { getMemberByUserId } from '../actions/memberActions';
import { getConversationsList } from '../actions/messageActions';

import { PageLayout } from '@/components/layout/PageLayout';
import TopNav from '@/components/navigation/TopNav';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
	const userId = await getAuthUserId();

	// Guard user not logged in
	if (!userId) {
		redirect('/login');
	}

	const member = await getMemberByUserId(userId);

	// Guard user not create complete-profile(Not have Member)
	if (!member) {
		redirect('/complete-profile');
	}

	// Messages page: 全メッセージ取得
	const conversations = await getConversationsList();

	return (
		<ConversationProvider
			initialConversations={conversations}
			currentUserId={userId}
		>
			<TopNav />
			<PageLayout>{children}</PageLayout>
			{/* BottomNav */}
		</ConversationProvider>
	);
};

export default ProtectedLayout;
