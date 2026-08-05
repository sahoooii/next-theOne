import { auth } from '@/auth';

import { ConversationProvider } from '@/providers/ConversationProvider';

import { getMemberByUserId } from '../actions/memberActions';
import { getConversationsList } from '../actions/messageActions';

import TopNav from '@/components/navigation/topNav/TopNav';
import { PageLayout } from '@/components/layout/PageLayout';

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();

	if (session?.user?.id) {
		const member = await getMemberByUserId(session.user.id);

		if (member) {
			const conversations = await getConversationsList();

			return (
				<ConversationProvider
					initialConversations={conversations}
					currentUserId={session.user.id}
				>
					<TopNav />
					<PageLayout>{children}</PageLayout>
				</ConversationProvider>
			);
		}
	}
	return (
		<>
			<TopNav />
			<PageLayout>{children}</PageLayout>
		</>
	);
};

export default MarketingLayout;
