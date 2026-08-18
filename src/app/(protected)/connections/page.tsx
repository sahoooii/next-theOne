import { Suspense } from 'react';

import {
	fetchLikedMembers,
} from '@/app/actions/likeActions';

import ConnectionsSkeleton from '@/components/connections/ConnectionsSkeleton';
import ConnectionsMenuTab from '@/components/connections/ConnectionsMenuTab';

const ConnectionsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ type: string }>;
}) => {
	const { type } = await searchParams;
	const members = await fetchLikedMembers(type);

	return (
		<Suspense fallback={<ConnectionsSkeleton />}>
			<ConnectionsMenuTab members={members} />
		</Suspense>
	);
};

export default ConnectionsPage;
