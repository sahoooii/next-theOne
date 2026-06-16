import MemberProfileForm from '@/components/profile/MemberProfileForm';
import { getMemberByUserId } from '../actions/memberActions';
import { getAuthUserId } from '../actions/authActions';
import { redirect } from 'next/navigation';

const CompleteProfilePage = async () => {
	const userId = await getAuthUserId();
	const member = await getMemberByUserId(userId);

	if (member) {
		redirect('/members');
	}
	return <MemberProfileForm mode='create' />;
};

export default CompleteProfilePage;
