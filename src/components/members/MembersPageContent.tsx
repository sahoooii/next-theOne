import { getMembers } from '@/app/actions/memberActions';

import MembersHeader from './utils/MembersHeader';
import MembersList from './MembersList';

const MembersPageContent = async () => {
	const { members, nextCursor } = await getMembers();
	return (
		<div className='max-w-5xl mx-auto px-4'>
			{/* Header */}
			<MembersHeader title='MEMBERS' tagline='Find your one.' />

			{/* Members Section */}
			<MembersList initialMembers={members} initialCursor={nextCursor} />
		</div>
	);
};

export default MembersPageContent;
