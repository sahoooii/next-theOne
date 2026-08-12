'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
	fetchCurrentUserLikeIds,
	toggleLikeMember,
} from '@/app/actions/likeActions';

type LikeContextType = {
	likeIds: string[];
	toggleLike: (targetId: string) => Promise<void>;
};

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export function LikeProvider({ children }: { children: React.ReactNode }) {
	const [likeIds, setLikeIds] = useState<string[]>([]);

	useEffect(() => {
		async function loadLikeIds() {
			const ids = await fetchCurrentUserLikeIds();
			setLikeIds(ids);
		}

		loadLikeIds();
	}, []);

	const toggleLike = async (targetId: string) => {
		// Check this user already liked or not
		const hasLiked = likeIds.includes(targetId);

		await toggleLikeMember(targetId, hasLiked);

		setLikeIds((current) => {
			if (hasLiked) {
				return current.filter((id) => id !== targetId)
			}

			return [...current, targetId]
		})
	};

	return (
		<LikeContext.Provider value={{ likeIds, toggleLike }}>
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
