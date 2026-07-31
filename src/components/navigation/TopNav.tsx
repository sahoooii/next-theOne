import { auth } from '@/auth';
import { getUserInfoForNav } from '@/app/actions/userActions';
import GuestNav from './GuestNav';
import AuthNav from './AuthNav';
import { getMemberByUserId } from '@/app/actions/memberActions';
import ProfileCompletionNav from './ProfileCompletionNav';

const TopNav = async () => {
	const session = await auth();

	if (!session) {
		return <GuestNav />;
	}

	if (!session?.user?.id) {
		return <GuestNav />;
	}

	const member = await getMemberByUserId(session?.user?.id);

	if (!member) {
		return <ProfileCompletionNav />;
	}

	const userInfo = session?.user ? await getUserInfoForNav() : null;

	return <AuthNav session={session} userInfo={userInfo} />;
};

export default TopNav;
