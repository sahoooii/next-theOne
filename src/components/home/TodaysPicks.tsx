import { Member } from '@prisma/client';

import { getMemberByUserId } from '@/app/actions/memberActions';

import HomeMemberCard from './HomeMemberCard';
import DecorativeLine from './DecorativeLine';

const TodaysPicks = async () => {
	// Temporary data
	const members = await Promise.all([
		getMemberByUserId('cmq961gko000xz7i2j17vdwe9'),
		getMemberByUserId('cmq961fow0006z7i2xo20obgp'),
		getMemberByUserId('cmq961fow0007z7i2n2n3lawz'),
	]);

	const validMembers = members.filter(
		(member): member is Member => member !== null,
	);

	return (
		<section className='mx-auto mt-24 max-w-5xl px-4'>
			<div className='mb-10 text-center'>
				<p className='text-sm font-medium tracking-[0.35em] text-purple-600'>
					TODAY&apos;S PICKS
				</p>

				<h2 className='mt-3 font-display text-4xl font-normal tracking-wide text-purple-950 md:text-5xl'>
					A few people worth getting to know.
				</h2>

				<DecorativeLine />
			</div>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
				{validMembers.map((member) => (
					<HomeMemberCard key={member.userId} member={member} />
				))}
			</div>
		</section>
	);
};

export default TodaysPicks;
