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
};

const ConnectionsContext = createContext<ConnectionsContextType | undefined>(
	undefined,
);

export function ConnectionsProvider({ children }: Props) {
	const [unseenLikeIds, setUnseenLikeIds] = useState<string[]>([]);
	const [unseenMatchIds, setUnseenMatchIds] = useState<string[]>([]);

	const { latestLike } = useLike();
	const { latestMatch } = useMatch();

	// Handle like:new
	useEffect(() => {
		if (!latestLike) return;

		const sourceUserId = latestLike.sourceUserId;

		setUnseenLikeIds((prevIds) => {
			// 重複防止: すでにこのユーザーを未確認Likeとして登録しているなら、何もしない
			if (prevIds.includes(sourceUserId)) {
				return prevIds;
			}
			// unseenLikeIds に追加
			return [...prevIds, sourceUserId];
		});
	}, [latestLike]);

	// Handle match:new
	// Likes You → Matchesへの移動
	useEffect(() => {
		if (!latestMatch) return;

		const partnerUserId = latestMatch.partnerUserId;

		// Remove from Likes You / 現在の unseenLikeIds から partnerUserId を取り除いた新しい配列を作る
		setUnseenLikeIds((prevIds) => prevIds.filter((id) => id !== partnerUserId));

		// Add to Matches
		setUnseenMatchIds((prevIds) => {
			if (prevIds.includes(partnerUserId)) {
				return prevIds;
			}

			// unseenMatchIds に追加
			return [...prevIds, partnerUserId];
		});
	}, [latestMatch]);

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
