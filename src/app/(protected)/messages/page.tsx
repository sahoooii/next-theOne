export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { getAuthUserId } from '@/app/actions/authActions';
import { getConversationsList } from '@/app/actions/messageActions';

import ConversationList from '@/components/messages/ConversationList';
import ConversationListSkeleton from '@/components/messages/skeleton/ConversationListSkeleton';

const MessagesPage = async () => {
	const conversations = await getConversationsList();
	const currentUserId = await getAuthUserId();

	return (
		<Suspense fallback={<ConversationListSkeleton />}>
			<ConversationList
				conversations={conversations}
				currentUserId={currentUserId}
			/>
		</Suspense>
	);
};

export default MessagesPage;
