import { auth } from '@/auth';
import NavClient from './NavClient';

const TopNav = async () => {
	const session = await auth();

	return <NavClient session={session} />;
};

export default TopNav;
