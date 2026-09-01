import { redirect } from 'next/navigation';

import HomeMemberCard from './HomeMemberCard';
import { getMemberByUserId } from '@/app/actions/memberActions';

const TodaysPicks = async () => {
	// Temporary data
	const member = await getMemberByUserId('cmq961gko000xz7i2j17vdwe9');

	if (!member) {
		redirect('/complete-profile');
	}

	return (
		<section className='mt-6 mx-auto max-w-5xl px-4'>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
				<HomeMemberCard member={member} />
				<HomeMemberCard member={member} />
				<HomeMemberCard member={member} />
			</div>
		</section>
	);
};

export default TodaysPicks;
