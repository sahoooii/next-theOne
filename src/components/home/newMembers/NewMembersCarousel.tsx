'use client';

import { motion } from 'framer-motion';
import { Member } from '@prisma/client';

import HomeMemberCard from '../utils/HomeMemberCard';

type Props = {
	members: Member[];
};

const NewMembersCarousel = ({ members }: Props) => {
	// Duplicate the members so the carousel can loop continuously.
	const carouselMembers = [...members, ...members, ...members];

	return (
		<>
			{/* Desktop / Tablet */}
			<div className='hidden overflow-hidden sm:block'>
				<motion.div
					className='flex w-max gap-5 md:gap-6'
					animate={{
						x: ['0%', '-33.3333%'],
					}}
					transition={{
						duration: 30,
						repeat: Infinity,
						ease: 'linear',
					}}
				>
					{carouselMembers.map((member, index) => (
						<div
							key={`${member.userId}-${index}`}
							className='w-[42vw] shrink-0 md:w-[30vw] lg:w-[24vw]'
						>
							<HomeMemberCard member={member} />
						</div>
					))}
				</motion.div>
			</div>
			{/* Mobile */}
			<div className='grid grid-cols-2 gap-x-4 gap-y-2 sm:hidden'>
				{members.map((member, index) => (
					<motion.div
						key={member.userId}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{
							duration: 0.5,
							delay: index * 0.05,
							ease: 'easeOut',
						}}
						className={index % 2 === 0 ? 'mt-0' : 'mt-6'}
					>
						<HomeMemberCard member={member} />
					</motion.div>
				))}
			</div>
		</>
	);
};

export default NewMembersCarousel;
