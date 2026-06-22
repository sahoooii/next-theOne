export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import ConversationList from '@/components/messages/ConversationList';
import ConversationListSkeleton from '@/components/messages/skeleton/ConversationListSkeleton';
import { getConversationsList } from '@/app/actions/messageActions';

// loading
const MessagesPage = async () => {
	const conversations = await getConversationsList();

	return (
		<Suspense fallback={<ConversationListSkeleton />}>
			<ConversationList conversations={conversations} />
		</Suspense>
	);
};

export default MessagesPage;
