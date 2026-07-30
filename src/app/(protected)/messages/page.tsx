export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { getAuthUserId } from '@/app/actions/authActions';
import { getConversationsList } from '@/app/actions/messageActions';

import ConversationList from '@/components/messages/ConversationList';
import ConversationListSkeleton from '@/components/messages/skeleton/ConversationListSkeleton';
import { ConversationProvider } from '@/providers/ConversationProvider';

const MessagesPage = async () => {
	const conversations = await getConversationsList();
	const currentUserId = await getAuthUserId();

	return (
		<ConversationProvider
			initialConversations={conversations}
			currentUserId={currentUserId}
		>
			<Suspense fallback={<ConversationListSkeleton />}>
				<ConversationList />
			</Suspense>
		</ConversationProvider>
	);
};

export default MessagesPage;
