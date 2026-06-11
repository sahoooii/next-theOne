export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMessageThread } from '@/app/actions/messageActions';
import ChatSkeleton from '@/components/members/memberDetail/skeleton/ChatSkeleton';
import ChatClient from '@/components/members/memberDetail/chat/ChatClient';

const ChatPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;
	const messages = await getMessageThread(userId);

	const currentUserId = await getAuthUserId();

	return (
		<Suspense fallback={<ChatSkeleton />}>
			<ChatClient messages={messages} currentUserId={currentUserId} />
		</Suspense>
	);
};

export default ChatPage;
