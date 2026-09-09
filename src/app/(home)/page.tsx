import { auth } from '@/auth';

import AuthHome from './AuthHome';
import GuestHome from './GuestHome';

const HomePage = async () => {
	const session = await auth();

	if (session?.user?.id) {
		return <AuthHome />;
	}

	return <GuestHome />;
};

export default HomePage;
