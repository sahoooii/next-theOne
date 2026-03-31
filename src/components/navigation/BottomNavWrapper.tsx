import { auth } from '@/auth';
import BottomNavClient from './BottomNavClient';

const BottomNavWrapper = async () => {
	const session = await auth();

	if (!session) return null
	return <BottomNavClient session={session} />
};

export default BottomNavWrapper;
