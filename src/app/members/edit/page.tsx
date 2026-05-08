import { notFound } from 'next/navigation';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import EditForm from '@/components/edit/EditForm';
import { Suspense } from 'react';
import ProfileSkeleton from '@/components/members/memberDetail/skeleton/ProfileSkeleton';

const MemberEditPage = async () => {
	const userId = await getAuthUserId();

	const member = await getMemberByUserId(userId);
	if (!member) notFound();

	return (
		<Suspense fallback={<ProfileSkeleton />}>
			<EditForm member={member} />
		</Suspense>
	);
};

export default MemberEditPage;
