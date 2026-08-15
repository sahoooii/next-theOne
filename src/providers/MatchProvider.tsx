'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getPusherClient } from '@/lib/pusher/client';
import { createUserChannel } from '@/lib/pusher/channels';

import { MatchNewPayload } from '@/types/matches';

type MatchContextType = {
	latestMatch: MatchNewPayload | null;
};

type Props = {
	children: React.ReactNode;
	currentUserId: string;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

// MatchProvider: match:newというRealtimeイベントを各UIへ渡すだけ
export function MatchProvider({ children, currentUserId }: Props) {
	// Providerが Realtimeイベントを受け取って、必要なコンポーネントに知らせる、 最後にRealtimeで届いた match:new を一時的に保存しておくstate
	const [latestMatch, setLatestMatch] = useState<MatchNewPayload | null>(null);

	useEffect(() => {
		// Manage channel
		const pusher = getPusherClient();

		// Manage event
		const channel = pusher.subscribe(createUserChannel(currentUserId));

		const handleMatchNew = (payload: MatchNewPayload) => {
			console.log('match:new', payload);
			setLatestMatch(payload);
		};

		channel.bind('match:new', handleMatchNew);

		return () => {
			channel.unbind('match:new', handleMatchNew);

			pusher.unsubscribe(createUserChannel(currentUserId));
		};
	}, [currentUserId]);

	return (
		<MatchContext.Provider value={{ latestMatch }}>
			{children}
		</MatchContext.Provider>
	);
}

export function useMatch() {
	const context = useContext(MatchContext);

	if (!context) {
		throw new Error('useMatch must be used within MatchProvider');
	}

	return context;
}
