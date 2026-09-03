import { getGuestNewMembers } from '@/app/actions/memberActions';

import NewMembersCarousel from './NewMembersCarousel';
import DecorativeLine from '../utils/DecorativeLine';

const NewMembers = async () => {
	const members = await getGuestNewMembers();

	if (members.length === 0) {
		return null;
	}

	return (
		<section className='mt-28 border-y border-purple-200/60 bg-gradient-to-b from-purple-100/80 to-purple-200/60 py-20'>
			<div className='mx-auto max-w-6xl px-4'>
				{/* Section heading */}
				<div className='mb-10 text-center'>
					<p className='text-sm font-medium tracking-[0.35em] text-purple-700'>
						NEW MEMBERS
					</p>

					<h2 className='mt-3 font-display text-4xl font-normal tracking-wide text-purple-950 md:text-5xl'>
						Recently joined.
					</h2>

					<DecorativeLine />
				</div>

				<NewMembersCarousel members={members} />
			</div>
		</section>
	);
};

export default NewMembers;
