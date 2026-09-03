import { auth } from '@/auth';

import { AuthenticatedProviders } from '@/providers/AuthenticatedProviders';

import { getMemberByUserId } from '../actions/memberActions';
import { getConversationsList } from '../actions/messageActions';

import HomePageLayout from '@/components/layout/HomePageLayout';

import TopNav from '@/components/navigation/topNav/TopNav';
import BottomNav from '@/components/navigation/bottomNav/BottomNav';

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();

	if (session?.user?.id) {
		const member = await getMemberByUserId(session.user.id);

		if (member) {
			const conversations = await getConversationsList();

			return (
				<AuthenticatedProviders
					currentUserId={session.user.id}
					initialConversations={conversations}
				>
					<TopNav />
					<HomePageLayout>{children}</HomePageLayout>
					<BottomNav />
				</AuthenticatedProviders>
			);
		}
	}
	return (
		<>
			<TopNav />
			<HomePageLayout>{children}</HomePageLayout>
		</>
	);
};

export default MarketingLayout;
