export const dynamic = 'force-dynamic';

import { Suspense } from 'react';

import ConversationList from '@/components/messages/ConversationList';
import ConversationListSkeleton from '@/components/messages/skeleton/ConversationListSkeleton';
import NewMatches from '@/components/messages/newMatches/NewMatches';

const MessagesPage = async () => {
	return (
		<>
			{/* Suspense for NewMatches */}
			<NewMatches />
			<Suspense fallback={<ConversationListSkeleton />}>
				<ConversationList />
			</Suspense>
		</>
	);
};

export default MessagesPage;
