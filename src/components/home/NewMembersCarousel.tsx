'use client';

import { motion } from 'framer-motion';
import { Member } from '@prisma/client';

import HomeMemberCard from './HomeMemberCard';

type Props = {
	members: Member[];
};

const NewMembersCarousel = ({ members }: Props) => {
	// Duplicate the members so the carousel can loop continuously.
	const carouselMembers = [...members, ...members, ...members];

	return (
		<div className='overflow-hidden'>
			<motion.div
				className='flex w-max gap-5 md:gap-6'
				animate={{
					x: ['0%', '-33.3333%'],
				}}
				transition={{
					duration: 30,
					repeat: Infinity,
					repeatType: 'loop',
					ease: 'linear',
				}}
				whileHover={{
					animationPlayState: 'paused',
				}}
			>
				{carouselMembers.map((member, index) => (
					<div
						key={`${member.userId}-${index}`}
						className='w-[72vw] shrink-0 sm:w-[42vw] md:w-[30vw] lg:w-[24vw]'
					>
						<HomeMemberCard member={member} />
					</div>
				))}
			</motion.div>
		</div>
	);
};

export default NewMembersCarousel;
