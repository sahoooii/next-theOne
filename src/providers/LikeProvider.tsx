'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getPusherClient } from '@/lib/pusher/client';
import { createUserChannel } from '@/lib/pusher/channels';

import {
	fetchCurrentUserLikeIds,
	toggleLikeMember,
} from '@/app/actions/likeActions';

import { LikeDeletePayload, LikeEvent, LikeNewPayload } from '@/types/likes';

type LikeContextType = {
	likeIds: string[];
	latestLikeEvent: LikeEvent | null;
	toggleLike: (targetId: string) => Promise<void>;
};

type Props = {
	children: React.ReactNode;
	currentUserId: string;
};

const LikeContext = createContext<LikeContextType | undefined>(undefined);

// LikeProvider: Like状態そのものを管理する
export function LikeProvider({ children, currentUserId }: Props) {
	const [likeIds, setLikeIds] = useState<string[]>([]);

	// 最後に発生したLike関連Realtimeイベント
	const [latestLikeEvent, setLatestLikeEvent] = useState<LikeEvent | null>(
		null,
	);

	// 自分のlike一覧を初期取得
	useEffect(() => {
		async function loadLikeIds() {
			const ids = await fetchCurrentUserLikeIds();

			setLikeIds(ids);
		}
		loadLikeIds();
	}, []);
	// ここまで

	// Pusherへイベントを登録・解除
	useEffect(() => {
		// Manage channel
		const pusher = getPusherClient();

		// Manage event
		const channel = pusher.subscribe(createUserChannel(currentUserId));

		// like:new
		const handleLikeNew = (payload: LikeNewPayload) => {
			console.log('like:new', payload);

			setLatestLikeEvent({ type: 'new', payload });
		};

		// like:delete
		const handleLikeDelete = (payload: LikeDeletePayload) => {
			console.log('like:delete', payload);
			setLatestLikeEvent({ type: 'delete', payload });
		};

		channel.bind('like:new', handleLikeNew);
		channel.bind('like:delete', handleLikeDelete);

		return () => {
			channel.unbind('like:new', handleLikeNew);
			channel.unbind('like:delete', handleLikeDelete);

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
		<LikeContext.Provider value={{ likeIds, latestLikeEvent, toggleLike }}>
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
