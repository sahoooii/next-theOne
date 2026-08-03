import { auth } from '@/auth';

import { getUserInfoForNav } from '@/app/actions/userActions';
import AuthBottomNav from './AuthBottomNav';


const BottomNav = async () => {
	const session = await auth();

	// For not logged in users
	if (!session) return null;

	const userInfo = session?.user ? await getUserInfoForNav() : null;

	return <AuthBottomNav userInfo={userInfo} />;
};

export default BottomNav;
