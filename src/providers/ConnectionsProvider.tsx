'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useLike } from './LikeProvider';
import { useMatch } from './MatchProvider';

type ConnectionsContextType = {
	unseenLikeIds: string[]; //現在の未確認LikeのID一覧
	unseenMatchIds: string[]; //現在の未確認MatchのID一覧

	clearUnseenLikes: () => void;
	clearUnseenMatches: () => void;
};

type Props = {
	children: React.ReactNode;
	currentUserId: string;
};

const ConnectionsContext = createContext<ConnectionsContextType | undefined>(
	undefined,
);

export function ConnectionsProvider({ children, currentUserId }: Props) {
	const [unseenLikeIds, setUnseenLikeIds] = useState<string[]>([]);
	const [unseenMatchIds, setUnseenMatchIds] = useState<string[]>([]);

	const { latestLikeEvent } = useLike();
	const { latestMatchEvent } = useMatch();

	// Handle Like event
	useEffect(() => {
		if (!latestLikeEvent) return;

		// like:new 自分に新しいLikeが来たか
		if (latestLikeEvent.type === 'new') {
			const { sourceUserId } = latestLikeEvent.payload;

			// 自分がLikeした側なら、unseen Likeには追加しない
			if (sourceUserId === currentUserId) return;

			setUnseenLikeIds((prevIds) => {
				// 重複防止: すでにこのユーザーを未確認Likeとして登録しているなら、何もしない
				if (prevIds.includes(sourceUserId)) {
					return prevIds;
				}
				// unseenLikeIds に追加
				return [...prevIds, sourceUserId];
			});

			return;
		}

		// like:delete
		if (latestLikeEvent.type === 'delete') {
			const { sourceUserId } = latestLikeEvent.payload;

			setUnseenLikeIds((prevIds) =>
				prevIds.filter((id) => id !== sourceUserId),
			);
		}
	}, [latestLikeEvent, currentUserId]);

	// Handle Match event
	useEffect(() => {
		if (!latestMatchEvent) return;

		// match:new
		if (latestMatchEvent.type === 'new') {
			const { partnerUserId } = latestMatchEvent.payload;
			// Remove from Likes You / 現在の unseenLikeIds から partnerUserId を取り除いた新しい配列を作る
			setUnseenLikeIds((prevIds) =>
				prevIds.filter((id) => id !== partnerUserId),
			);

			// Add to Matches
			setUnseenMatchIds((prevIds) => {
				// 重複防止
				if (prevIds.includes(partnerUserId)) {
					return prevIds;
				}
				// unseenMatchIds に追加
				return [...prevIds, partnerUserId];
			});

			return;
		}

		// match:delete
		if (latestMatchEvent.type === 'delete') {
			const { partnerUserId } = latestMatchEvent.payload;

			setUnseenMatchIds((prevIds) =>
				prevIds.filter((id) => id !== partnerUserId),
			);
		}
	}, [latestMatchEvent]);

	// 未確認として記録しているIDを全部リセットする関数
	const clearUnseenLikes = useCallback(() => {
		setUnseenLikeIds([]);
	}, []);

	const clearUnseenMatches = useCallback(() => {
		setUnseenMatchIds([]);
	}, []);

	return (
		<ConnectionsContext.Provider
			value={{
				unseenLikeIds,
				unseenMatchIds,
				clearUnseenLikes,
				clearUnseenMatches,
			}}
		>
			{children}
		</ConnectionsContext.Provider>
	);
}

export function useConnections() {
	const context = useContext(ConnectionsContext);

	if (!context) {
		throw new Error('useConnections must be used within ConnectionsProvider');
	}

	return context;
}
