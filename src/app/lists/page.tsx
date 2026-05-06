import ListsTab from '@/components/lists/ListsTab';
import {
	fetchCurrentUserLikeIds,
	fetchLikedMembers,
} from '@/app/actions/likeAction';

const ListsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ type: string }>;
}) => {
	const { type } = await searchParams;

	const likeIds = await fetchCurrentUserLikeIds();
	const members = await fetchLikedMembers(type);
	return (
		<div>
			<ListsTab members={members} likeIds={likeIds} />
		</div>
	);
};

export default ListsPage;
