import { Member } from '@prisma/client';

import HomeMemberCard from '../utils/HomeMemberCard';
import DecorativeLine from '../utils/DecorativeLine';
import EmptyState from '../utils/EmptyState';

type TodaysPicksProps = {
	members: Member[];
};

const TodaysPicks = async ({ members }: TodaysPicksProps) => {
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

			{members.length === 0 ? (
				<EmptyState
					title='No picks for you right now.'
					description='Check back soon. There may be someone new worth getting to know.'
				/>
			) : (
				<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
					{members.map((member) => (
						<HomeMemberCard key={member.userId} member={member} />
					))}
				</div>
			)}
		</section>
	);
};

export default TodaysPicks;
