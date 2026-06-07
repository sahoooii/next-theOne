import { Suspense } from 'react';
import ConversationList from '@/components/messages/ConversationList';
import { getConversationsList } from '../actions/messageActions';
import ConversationListSkeleton from '@/components/messages/skeleton/ConversationListSkeleton';

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
