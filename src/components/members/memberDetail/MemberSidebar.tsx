'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { Member } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { calculateAge } from '@/lib/utils';
import { transformImageUrl } from '@/lib/transFormImageUrl';
import LikeButton from '../utils/LikeButton';

type LikeInfo = {
	targetId: string;
};

type Props = {
	member: Member;
	navLinks: { name: string; href: string }[];
	likeInfo?: LikeInfo;
};

const MemberSidebar = ({ member, navLinks, likeInfo }: Props) => {
	const pathname = usePathname();
	return (
		<Card
			className='
			h-full
			backdrop-blur-xl
			border border-white/5
			rounded-2xl
			p-4 lg:p-6
			flex flex-col bg-transparent overflow-hidden
			'
		>
			{/* Background Layer */}
			<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-purple-950/40 to-black/80 backdrop-blur-xl rounded-2xl' />
			{/* Content */}
			<div className='relative p-6 flex flex-col h-full'>
				{/* Profile */}
				<div className='flex flex-col items-center text-center space-y-3'>
					<div className='relative w-24 h-24 lg:w-32 lg:h-32'>
						<div className='relative w-full h-full rounded-full overflow-hidden border border-white/20'>
							<Image
								src={
									transformImageUrl(member.image, 'avatar') ||
									'/images/user.png'
								}
								fill
								priority
								sizes='128px'
								alt='User Profile'
								className='object-cover object-[center_20%] transition-transform duration-500 hover:scale-105'
							/>
						</div>

						{/* Display when see user profile */}
						{likeInfo && (
							<div className='absolute -right-1 -top-2'>
								<LikeButton
									targetId={likeInfo.targetId}
								/>
							</div>
						)}
					</div>

					<div className='text-white font-semibold tracking-wide text-base'>
						{member.name}, {calculateAge(member.dateOfBirth)}
					</div>

					<div className='text-white/60 text-sm'>
						{member.city}, {member.country}
					</div>
				</div>

				{/* Divider */}
				<div className='my-6 h-px bg-white/10' />

				{/* Navigation */}
				<nav className='flex flex-col gap-2 bg-white/10 lg:bg-transparent rounded-xl p-2'>
					{navLinks.map((link) => {
						const isActive = pathname === link.href;

						return (
							<Link
								key={link.name}
								href={link.href}
								className={`
		relative px-4 py-2 rounded-lg text-sm transition-all duration-300
		${
			isActive
				? 'bg-white/10 text-white'
				: 'text-white/60 hover:text-white hover:bg-white/5 hover:translate-x-[2px]'
		}
	`}
							>
								{/* active line */}
								{isActive && (
									<motion.span
										layoutId='active-sidebar'
										className='absolute left-0 top-0 h-full w-[5px] bg-purple-500'
										transition={{ type: 'spring', stiffness: 300, damping: 30 }}
									/>
								)}

								{link.name}
							</Link>
						);
					})}
				</nav>

				{/* Spacer */}
				<div className='flex-1' />
			</div>
		</Card>
	);
};

export default MemberSidebar;
