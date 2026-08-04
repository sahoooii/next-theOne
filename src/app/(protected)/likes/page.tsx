import { Suspense } from 'react';
import ListsTab from '@/components/likes/ListsTab';
import {
	fetchCurrentUserLikeIds,
	fetchLikedMembers,
} from '@/app/actions/likeActions';
import ListsSkeleton from '@/components/likes/ListsSkeleton';

const ListsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ type: string }>;
}) => {
	const { type } = await searchParams;

	const likeIds = await fetchCurrentUserLikeIds();
	const members = await fetchLikedMembers(type);
	return (
		<Suspense fallback={<ListsSkeleton />}>
			<ListsTab members={members} likeIds={likeIds} />
		</Suspense>
	);
};

export default ListsPage;
