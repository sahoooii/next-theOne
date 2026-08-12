import { Suspense } from 'react';

import {
	fetchLikedMembers,
} from '@/app/actions/likeActions';

import LikesSkeleton from '@/components/likes/LikesSkeleton';
import LikesMenuTab from '@/components/likes/LikesMenuTab';

const LikesPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ type: string }>;
}) => {
	const { type } = await searchParams;
	const members = await fetchLikedMembers(type);

	return (
		<Suspense fallback={<LikesSkeleton />}>
			<LikesMenuTab members={members} />
		</Suspense>
	);
};

export default LikesPage;
