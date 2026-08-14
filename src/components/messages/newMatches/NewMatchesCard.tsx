'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { NewMatch } from '@/types/matches';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { transformImageUrl } from '@/lib/transFormImageUrl';

type Props = {
	newMatch: NewMatch;
};

const NewMatchesCard = ({ newMatch }: Props) => {
	return (
		<Link
			href={`/members/${newMatch.userId}/chat`}
			className='group
				flex
				flex-col
				items-center
				gap-2
				transition-all
				duration-300
				hover:-translate-y-1'
		>
			<div className='flex flex-col items-center gap-1 mx-1 my-1'>
				{/* 直す */}
				<motion.div
					whileHover={{
						scale: 1.08,
						y: -4,
					}}
					whileTap={{
						scale: 0.95,
					}}
					transition={{
						type: 'spring',
						stiffness: 320,
						damping: 12,
						mass: 0.8,
					}}
				>
					<Avatar
						className='h-16
					w-16
					overflow-hidden
					ring-2
					ring-purple-500/70
					ring-offset-2
					ring-offset-white
					transition-all
					duration-300
					group-hover:scale-105
					group-hover:ring-4
					group-hover:ring-purple-500
					group-hover:shadow-lg
					group-hover:shadow-purple-400/40'
					>
						<AvatarImage
							className='h-full w-full object-cover object-[center_20%]'
							src={transformImageUrl(newMatch.image, 'avatar') ?? ''}
						/>
						<AvatarFallback>{newMatch.name.charAt(0)}</AvatarFallback>
					</Avatar>
				</motion.div>

				<p
					className='w-16
					py-1
					text-center
					text-xs
					font-medium
					text-gray-700
					truncate
					transition-colors
					duration-300
					group-hover:text-purple-600'
				>
					{newMatch.name}
				</p>
			</div>
		</Link>
	);
};

export default NewMatchesCard;
