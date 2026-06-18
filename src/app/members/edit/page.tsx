import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import ProfileSkeleton from '@/components/members/memberDetail/skeleton/ProfileSkeleton';
import MemberProfileForm from '@/components/profile/MemberProfileForm';

const MemberEditPage = async () => {
	const userId = await getAuthUserId();

	const member = await getMemberByUserId(userId);
	if (!member) notFound();

	return (
		<Suspense fallback={<ProfileSkeleton />}>
			<MemberProfileForm mode='edit' member={member} />
		</Suspense>
	);
};

export default MemberEditPage;
