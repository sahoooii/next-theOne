import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProfileSkeleton from '@/components/members/memberDetail/skeleton/ProfileSkeleton';
import MemberProfileContent from '@/components/members/memberDetail/MemberProfileContent';
import { getMemberByUserId } from '@/app/actions/memberActions';

const MembersDetailPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;

	const member = await getMemberByUserId(userId);
	if (!member) notFound();

	return (
		<Suspense fallback={<ProfileSkeleton />}>
			<MemberProfileContent member={member} />
		</Suspense>
	);
};

export default MembersDetailPage;
