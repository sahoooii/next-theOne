'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { transformImageUrl } from '@/lib/transFormImageUrl';
import { ChatPartner } from '@/types/prisma';

type Props = {
	partner: ChatPartner;
};

const TypingIndicator = ({ partner }: Props) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: 2,
				scale: 0.98,
			}}
			animate={{
				opacity: 1,
				y: 0,
				scale: 1,
			}}
			exit={{ opacity: 0, y: 4 }}
			transition={{
				duration: 0.2,
				ease: 'easeOut',
			}}
			className='flex items-end gap-2'
		>
			<Avatar
				className='
			h-10
			w-10
			shrink-0
			border
			border-black/10
		'
			>
				<AvatarImage
					src={transformImageUrl(partner.image, 'avatar') ?? ''}
					className='object-cover object-[center_10%]'
				/>

				<AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
			</Avatar>

			{/* Bubble */}
			<div
				className='
					flex
					h-10
					w-16
					items-center
					justify-center
					rounded-3xl
					rounded-bl-sm
					border
					border-black/5
					bg-black/5
					backdrop-blur-lg
					shadow-sm
				shadow-black/5
				'
			>
				{/* Dot */}
				<div className='flex items-center gap-1.5'>
					{/* delay={0, 0.2, 0.4} */}
					{[0, 0.2, 0.4].map((delay) => (
						<motion.span
							key={delay}
							className='
								h-2
								w-2
								rounded-full
								bg-purple-500/70
							'
							animate={{
								opacity: [0.35, 1, 0.35],
								scale: [1, 1.08, 1],
							}}
							transition={{
								duration: 1.2,
								repeat: Infinity,
								ease: 'easeInOut',
								delay,
							}}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default TypingIndicator;
