export const dynamic = 'force-dynamic';

import { Suspense } from 'react';

import ConversationList from '@/components/messages/ConversationList';
import ConversationListSkeleton from '@/components/messages/skeleton/ConversationListSkeleton';
import NewMatches from '@/components/messages/newMatches/NewMatches';

const MessagesPage = async () => {
	return (
		<>
			{/* NewMatches is optional. Keep it independent from ConversationList
    so the list can render without waiting for match data. */}
			<Suspense fallback={null}>
				<NewMatches />
			</Suspense>

			<Suspense fallback={<ConversationListSkeleton />}>
				<ConversationList />
			</Suspense>
		</>
	);
};

export default MessagesPage;
