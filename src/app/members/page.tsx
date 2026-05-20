import { Suspense } from 'react';
import MembersPageContent from '@/components/members/MembersPageContent';
import MembersPageSkeleton from '@/components/members/MembersPageSkeleton';

const MembersPage = () => {
	return (
		<Suspense fallback={<MembersPageSkeleton />}>
			<MembersPageContent />
		</Suspense>
	);
};

export default MembersPage;
