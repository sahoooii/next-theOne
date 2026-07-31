import MemberProfileForm from '@/components/profile/MemberProfileForm';
import { getMemberByUserId } from '../../actions/memberActions';
import { getAuthUserId } from '../../actions/authActions';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import ProfileSkeleton from '@/components/members/memberDetail/skeleton/ProfileSkeleton';

const CompleteProfilePage = async () => {
	const userId = await getAuthUserId();
	const member = await getMemberByUserId(userId);

	if (member) {
		redirect('/members');
	}

	return (
		<Suspense fallback={<ProfileSkeleton />}>
			<MemberProfileForm mode='create' />
		</Suspense>
	);
};

export default CompleteProfilePage;
