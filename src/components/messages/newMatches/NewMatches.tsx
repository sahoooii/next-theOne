import { getAuthUserId } from '@/app/actions/authActions';
import { getNewMatches } from '@/app/actions/matchActions';

import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import NewMatchesCard from './NewMatchesCard';

const NewMatches = async () => {
	const currentUserId = await getAuthUserId();
	const newMatches = await getNewMatches(currentUserId);

	if (newMatches.length === 0) {
		return null;
	}

	return (
		<div className='flex justify-center px-4'>
			<Card
				className='
	w-full
	max-w-2xl
	bg-white/70 backdrop-blur-md
	border border-black/10
	rounded-2xl
	px-6 pt-6 pb-2 mb-4 overflow-visible
'
			>
				{/* Header */}
				<MemberDetailPageHeader title='New Matches' />
				{/* Contents */}
				<div className='flex gap-3 overflow-x-auto py-4 px-2 scrollbar-hide'>
					{newMatches.map((newMatch) => (
						<NewMatchesCard key={newMatch.userId} newMatch={newMatch} />
					))}
				</div>
			</Card>
		</div>
	);
};

export default NewMatches;
