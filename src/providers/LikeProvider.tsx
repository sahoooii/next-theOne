'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getPusherClient } from '@/lib/pusher/client';
import { createUserChannel } from '@/lib/pusher/channels';

import {
	fetchCurrentUserLikeIds,
	toggleLikeMember,
} from '@/app/actions/likeActions';

import { LikeNewPayload } from '@/types/likes';

type LikeContextType = {
	likeIds: string[];
	latestLike: LikeNewPayload | null;
	toggleLike: (targetId: string) => Promise<void>;
};

type Props = {
	children: React.ReactNode;
	currentUserId: string;
};

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export function LikeProvider({ children, currentUserId }: Props) {
	const [likeIds, setLikeIds] = useState<string[]>([]);

	// Providerが Realtimeイベントを受け取って、必要なコンポーネントに知らせる、 最後にRealtimeで届いた like:new を一時的に保存しておくstate
	const [latestLike, setLatestLike] = useState<LikeNewPayload | null>(null);

	useEffect(() => {
		async function loadLikeIds() {
			const ids = await fetchCurrentUserLikeIds();
			setLikeIds(ids);
		}

		loadLikeIds();
	}, []);

	// Pusherへイベントを登録・解除
	useEffect(() => {
		// Manage channel
		const pusher = getPusherClient();

		// Manage event
		const channel = pusher.subscribe(createUserChannel(currentUserId));

		const handleLikeNew = (payload: LikeNewPayload) => {
			console.log('like:new', payload);
			setLatestLike(payload);
		};

		channel.bind('like:new', handleLikeNew);

		return () => {
			channel.unbind('like:new', handleLikeNew);

			pusher.unsubscribe(createUserChannel(currentUserId));
		};
	}, [currentUserId]);

	const toggleLike = async (targetId: string) => {
		// Check this user already liked or not
		const hasLiked = likeIds.includes(targetId);

		await toggleLikeMember(targetId, hasLiked);

		setLikeIds((current) => {
			if (hasLiked) {
				return current.filter((id) => id !== targetId);
			}

			return [...current, targetId];
		});
	};

	return (
		<LikeContext.Provider value={{ likeIds, latestLike, toggleLike }}>
			{children}
		</LikeContext.Provider>
	);
}

export function useLike() {
	const context = useContext(LikeContext);

	if (!context) {
		throw new Error('useLike must be used within LikeProvider');
	}

	return context;
}
