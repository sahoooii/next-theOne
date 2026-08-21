'use client';

import { ConversationProvider } from './ConversationProvider';
import { LikeProvider } from './LikeProvider';
import { MatchProvider } from './MatchProvider';
import { ConnectionsProvider } from './ConnectionsProvider';

import { Conversation } from '@/types/conversations';

type Props = {
	children: React.ReactNode;
	currentUserId: string;
	initialConversations: Conversation[];
};

export function AuthenticatedProviders({
	children,
	currentUserId,
	initialConversations,
}: Props) {
	return (
		<ConversationProvider
			initialConversations={initialConversations}
			currentUserId={currentUserId}
		>
			<LikeProvider currentUserId={currentUserId}>
				<MatchProvider currentUserId={currentUserId}>
					<ConnectionsProvider>{children}</ConnectionsProvider>
				</MatchProvider>
			</LikeProvider>
		</ConversationProvider>
	);
}
