import { auth } from '@/auth';

import { getMemberByUserId } from '@/app/actions/memberActions';
import { getUserInfoForNav } from '@/app/actions/userActions';

import GuestNav from './GuestNav';
import AuthNav from './AuthNav';
import ProfileCompletionNav from './ProfileCompletionNav';

const TopNav = async () => {
	const session = await auth();

	// For not logged in users
	if (!session) {
		return <GuestNav />;
	}

	// For not logged in users
	if (!session?.user?.id) {
		return <GuestNav />;
	}

	const member = await getMemberByUserId(session?.user?.id);

	// For logged in users but not registered complete profile(Not have Member table)
	if (!member) {
		return <ProfileCompletionNav />;
	}

	const userInfo = session?.user ? await getUserInfoForNav() : null;

	// For logged in users and registered complete profile(Have Member table)
	return <AuthNav session={session} userInfo={userInfo} />;
};

export default TopNav;
