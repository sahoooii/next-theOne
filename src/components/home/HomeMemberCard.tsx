'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { Member } from '@prisma/client';

import { Heart } from 'lucide-react';
import { FaLongArrowAltRight } from 'react-icons/fa';

import { Card } from '@/components/ui/card';
import { calculateAge } from '@/lib/utils';
import { transformImageUrl } from '@/lib/transFormImageUrl';

type Props = {
	member: Member;
};

const HomeMemberCard = ({ member }: Props) => {
	const router = useRouter();

	const age = calculateAge(member.dateOfBirth);

	const handleViewProfile = () => {
		router.push(`/members/${member.userId}`);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.6 }}
		>
			<Card
				className='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-0 backdrop-blur-sm transition-all duration-500 hover:border-purple-300/30 hover:shadow-xl hover:shadow-purple-950/30'
				onClick={handleViewProfile}
			>
				{/* ─→光が写真を横切る */}
				<div
					className='absolute inset-y-0 -left-full w-1/2
    skew-x-[-20deg]
    bg-gradient-to-r from-transparent via-white/15 to-transparent
    transition-all duration-700
    group-hover:left-[130%]'
				/>
				{/* Image */}
				<div className='relative aspect-[3/4] w-full overflow-hidden'>
					<Image
						src={transformImageUrl(member.image, 'card') || '/images/user.png'}
						alt={member.name}
						fill
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
						className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]'
					/>

					{/* Hover glow */}
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,180,254,0.18),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100' />

					{/* Text readability overlay */}
					<div className='absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/65 to-transparent' />

					{/* Subtle glow */}
					<div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.22),transparent_55%)]' />

					{/* Like / signup hint */}
					<motion.button
						type='button'
						aria-label={`Like ${member.name}`}
						onClick={(e) => {
							e.stopPropagation();
							router.push('/register');
						}}
						className='absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-black/40 hover:text-white'
						whileTap={{ scale: 0.9 }}
					>
						<Heart className='h-4 w-4' strokeWidth={1.5} />
					</motion.button>

					{/* Member info */}
					<div className='absolute inset-x-0 bottom-0 p-5'>
						<p className='font-display text-2xl font-normal tracking-wide text-white'>
							{member.name}, {age}
						</p>

						<p className='mt-1 text-xs tracking-wide text-white/65'>
							{member.city}, {member.country}
						</p>

						{member.description && (
							<p className='mt-2 line-clamp-2 text-xs leading-relaxed text-white/60'>
								{member.description}
							</p>
						)}

						{/* Divider */}
						<div className='mt-4 h-px w-8 bg-white/30 transition-all duration-500 group-hover:w-14 group-hover:bg-purple-300/60' />

						{/* View profile */}
						<div className='mt-3 flex items-center gap-2 text-xs tracking-[0.15em] text-white/70 transition-colors group-hover:text-white'>
							<span>VIEW PROFILE</span>
							<span className='transition-transform duration-300 group-hover:translate-x-1'>
								<FaLongArrowAltRight />
							</span>
						</div>
					</div>
				</div>
			</Card>
		</motion.div>
	);
};

export default HomeMemberCard;
