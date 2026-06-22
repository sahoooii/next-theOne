import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import MembersPageContent from '@/components/members/MembersPageContent';
import MembersPageSkeleton from '@/components/members/MembersPageSkeleton';

const MembersPage = async () => {
	const userId = await getAuthUserId();
	const member = await getMemberByUserId(userId);

	if (!member) {
		redirect('/complete-profile');
	}

	return (
		<Suspense fallback={<MembersPageSkeleton />}>
			<MembersPageContent />
		</Suspense>
	);
};

export default MembersPage;
