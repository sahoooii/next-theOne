export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { getAuthUserId } from '@/app/actions/authActions';
import { getMessageThread } from '@/app/actions/messageActions';
import { getChatPartner } from '@/app/actions/memberActions';

import ChatSkeleton from '@/components/members/memberDetail/skeleton/ChatSkeleton';
import ChatClient from '@/components/members/memberDetail/chat/ChatClient';
import NotFound from '../not-found';

import { createChatId } from '@/lib/pusher/channels';
import { isMatched } from '@/lib/matching/isMatched';

const ChatPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;
	const messages = await getMessageThread(userId);
	const currentUserId = await getAuthUserId();

	const matched = await isMatched(currentUserId, userId);

	if (!matched) {
		redirect(`/members/${userId}`);
	}

	const chatId = createChatId(userId, currentUserId);

	const partner = await getChatPartner(userId);

	if (!partner) {
		return <NotFound />;
	}

	return (
		<Suspense fallback={<ChatSkeleton />}>
			<ChatClient
				initialMessages={messages}
				currentUserId={currentUserId}
				chatId={chatId}
				partner={partner}
			/>
		</Suspense>
	);
};

export default ChatPage;
