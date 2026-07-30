import { auth } from '@/auth';
import BottomNavClient from './BottomNavClient';
import { getUserInfoForNav } from '@/app/actions/userActions';

// Mobile bottom nav
const BottomNavWrapper = async () => {
	const session = await auth();

	const userInfo = session?.user ? await getUserInfoForNav() : null;

	if (!session) return null;
	return <BottomNavClient userInfo={userInfo} />;
};

export default BottomNavWrapper;
