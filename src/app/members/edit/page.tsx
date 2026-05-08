import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import EditForm from '@/components/edit/EditForm';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';

const MemberEditPage = async () => {
	const userId = await getAuthUserId();

	const member = await getMemberByUserId(userId);
	if (!member) notFound();

	return (
		<Card
			className='
	h-full
	bg-white/70 backdrop-blur-md
	border border-black/10
	rounded-2xl
	p-8
'
		>
			{/* Header */}
			<MemberDetailPageHeader title='Edit Profile' />

			{/* User Info */}
			<EditForm member={member} />
		</Card>
	);
};

export default MemberEditPage;
