import { redirect } from 'next/navigation';

import { ConversationProvider } from '@/providers/ConversationProvider';

import { getAuthUserId } from '../actions/authActions';
import { getMemberByUserId } from '../actions/memberActions';
import { getConversationsList } from '../actions/messageActions';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
	const userId = await getAuthUserId();

	// Guard user not logged in
	if (!userId) {
		redirect('/login');
	}

	const member = await getMemberByUserId(userId);

	// Guard user not create complete-profile
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
			{children}
		</ConversationProvider>
	);
};

export default ProtectedLayout;
