import { getAuthUserId } from '@/app/actions/authActions';
import { getNewMatches } from '@/app/actions/matchActions';

import NewMatchesClient from './NewMatchesClient';

const NewMatches = async () => {
	const currentUserId = await getAuthUserId();
	const newMatches = await getNewMatches(currentUserId);

	return (
		<NewMatchesClient
			initialMatches={newMatches}
			currentUserId={currentUserId}
		/>
	);
};

export default NewMatches;
