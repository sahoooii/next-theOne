import { auth } from '@/auth';
import { getUserInfoForNav } from '@/app/actions/userActions';
import GuestNav from './GuestNav';
import AuthNav from './AuthNav';

const TopNav = async () => {
	const session = await auth();

	if (!session) {
		return <GuestNav />;
	}

	const userInfo = session?.user ? await getUserInfoForNav() : null;

	return <AuthNav session={session} userInfo={userInfo} />;
};

export default TopNav;
