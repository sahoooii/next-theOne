import { Suspense } from 'react';

import { fetchLikedMembers } from '@/app/actions/likeActions';

import ConnectionsSkeleton from '@/components/connections/ConnectionsSkeleton';
import ConnectionsMenuTab from '@/components/connections/ConnectionsMenuTab';
import { getAuthUserId } from '@/app/actions/authActions';

const ConnectionsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ type: string }>;
}) => {
	const userId = await getAuthUserId();

	const { type } = await searchParams;
	const members = await fetchLikedMembers(type);

	return (
		<Suspense fallback={<ConnectionsSkeleton />}>
			<ConnectionsMenuTab members={members} currentUserId={userId} />
		</Suspense>
	);
};

export default ConnectionsPage;
