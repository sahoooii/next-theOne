'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getPusherClient } from '@/lib/pusher/client';
import { createUserChannel } from '@/lib/pusher/channels';

import {
	MatchDeletePayload,
	MatchEvent,
	MatchNewPayload,
} from '@/types/matches';

type MatchContextType = {
	latestMatchEvent: MatchEvent | null;
};

type Props = {
	children: React.ReactNode;
	currentUserId: string;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

// MatchProvider: match関連のRealtimeイベントを各UIへ渡す
export function MatchProvider({ children, currentUserId }: Props) {
	// 最後に発生したMatch関連Realtimeイベント
	const [latestMatchEvent, setLatestMatchEvent] = useState<MatchEvent | null>(
		null,
	);

	useEffect(() => {
		// Manage channel
		const pusher = getPusherClient();

		// Manage event
		const channel = pusher.subscribe(createUserChannel(currentUserId));

		// match:new
		const handleMatchNew = (payload: MatchNewPayload) => {
			console.log('match:new', payload);

			setLatestMatchEvent({ type: 'new', payload });
		};

		// match:delete
		const handleMatchDelete = (payload: MatchDeletePayload) => {
			console.log('match:delete', payload);

			setLatestMatchEvent({ type: 'delete', payload });
		};

		channel.bind('match:new', handleMatchNew);
		channel.bind('match:delete', handleMatchDelete);

		return () => {
			channel.unbind('match:new', handleMatchNew);
			channel.unbind('match:delete', handleMatchDelete);

			pusher.unsubscribe(createUserChannel(currentUserId));
		};
	}, [currentUserId]);

	return (
		<MatchContext.Provider value={{ latestMatchEvent }}>
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
