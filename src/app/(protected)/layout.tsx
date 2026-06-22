import { redirect } from 'next/navigation';
import { getMemberByUserId } from '../actions/memberActions';
import { getAuthUserId } from '../actions/authActions';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
	const userId = await getAuthUserId();

	const member = await getMemberByUserId(userId);

	// Guard user not logged in
	if (!userId) {
		redirect('/login');
	}

	// Guard user not create complete-profile
	if (!member) {
		redirect('/complete-profile');
	}

	return <>{children}</>;
};

export default ProtectedLayout;
