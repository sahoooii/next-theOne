import { Suspense } from 'react';

import {
	fetchCurrentUserLikeIds,
	fetchLikedMembers,
} from '@/app/actions/likeActions';

import LikesSkeleton from '@/components/likes/LikesSkeleton';
import LikesMenuTab from '@/components/likes/LikesMenuTab';

const ListsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ type: string }>;
}) => {
	const { type } = await searchParams;

	const likeIds = await fetchCurrentUserLikeIds();
	const members = await fetchLikedMembers(type);
	
	return (
		<Suspense fallback={<LikesSkeleton />}>
			<LikesMenuTab members={members} likeIds={likeIds} />
		</Suspense>
	);
};

export default ListsPage;
