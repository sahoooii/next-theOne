export const dynamic = 'force-dynamic';

import { Suspense } from 'react';

import ConversationList from '@/components/messages/ConversationList';
import ConversationListSkeleton from '@/components/messages/skeleton/ConversationListSkeleton';

const MessagesPage = async () => {
	return (
		<Suspense fallback={<ConversationListSkeleton />}>
			<ConversationList />
		</Suspense>
	);
};

export default MessagesPage;
