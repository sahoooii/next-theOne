import { auth } from '@/auth';
import NavClient from './NavClient';
import { getUserInfoForNav } from '@/app/actions/userActions';

const TopNav = async () => {
	const session = await auth();

	const userInfo = session?.user ? await getUserInfoForNav() : null;

	return <NavClient session={session} userInfo={userInfo} />;
};

export default TopNav;
