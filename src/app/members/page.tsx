import { Suspense } from 'react';
import MembersPageSkeleton from '@/components/members/MembersPageSkeleton';
import MembersPageContent from '@/components/members/MembersPageContent';

const MembersPage = () => {
	return (
		<Suspense fallback={<MembersPageSkeleton />}>
			<MembersPageContent />
		</Suspense>
	);
};

export default MembersPage;
