import { Suspense } from 'react';
import MembersPageContent from '@/components/members/MembersPageContent';
import MembersPageSkeleton from '@/components/members/MembersPageSkeleton';
import { getAuthUserId } from '../actions/authActions';
import { getMemberByUserId } from '../actions/memberActions';
import { redirect } from 'next/navigation';

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
