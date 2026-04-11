import { getMemberByUserId } from '@/app/actions/memberActions';
import NotFound from '@/app/members/not-found';

const MembersDetailPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;
	const member = await getMemberByUserId(userId);

	if (!member) return NotFound();

	return <div>{member.name}</div>;
};

export default MembersDetailPage;
