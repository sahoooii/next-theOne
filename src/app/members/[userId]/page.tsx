import { Suspense } from 'react';
import MemberProfileContent from '@/components/members/memberDetail/MemberProfileContent';
import ProfileSkeleton from '@/components/members/memberDetail/skeleton/ProfileSkeleton';

const MembersDetailPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;

	return (
		<Suspense fallback={<ProfileSkeleton />}>
			<MemberProfileContent userId={userId} />
		</Suspense>
	);
};

export default MembersDetailPage;
