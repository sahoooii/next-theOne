'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { GiBigDiamondRing } from 'react-icons/gi';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

type HomeHeroProps = {
	ctaLabel: string;
	ctaHref: string;
};

const HomeHero = ({ ctaLabel, ctaHref }: HomeHeroProps) => {
	return (
		<section className='px-6 pt-6'>
			<div className='relative min-h-[560px] overflow-hidden rounded-3xl bg-purple-950'>
				{/* Background glow */}
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_60%)]' />
				{/* Animated background 3 rings */}
				<div className='absolute inset-0 flex items-center justify-center'>
					{[0, 1, 2].map((index) => (
						<motion.div
							key={index}
							className='absolute h-48 w-48 rounded-full border border-purple-300/35'
							initial={{ scale: 0.7, opacity: 0 }}
							animate={{ scale: 2.8, opacity: [0, 0.4, 0] }}
							transition={{
								duration: 6,
								delay: index * 2,
								repeat: Infinity,
								ease: 'easeOut',
							}}
						/>
					))}
				</div>
				{/* Content */}
				<div className='relative z-10 flex min-h-[560px] flex-col items-center justify-center px-6 text-center'>
					{/* Ring */}
					<motion.div
						className='relative mb-8 flex items-center justify-center'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
					>
						<motion.div
							className='absolute h-24 w-24 rounded-full border border-purple-300/35'
							animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
							transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
						/>
						<div className='relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur'>
							<GiBigDiamondRing className='text-3xl text-white' />
						</div>
					</motion.div>
					{/* Brand */}
					<motion.p
						className='mb-5 text-xs font-light tracking-[0.45em] text-white/50'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.6 }}
					>
						THE ONE
					</motion.p>
					{/* Headline */}
					<motion.h1
						className='max-w-2xl font-display text-4xl font-normal leading-tight tracking-tight text-white sm:text-6xl'
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.45, duration: 0.7 }}
					>
						Find someone worth <br /> getting to know.
					</motion.h1>

					{/* Tagline */}
					<motion.p
						className='mt-6 max-w-md text-sm leading-relaxed text-white/55 sm:text-base'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.65, duration: 0.6 }}
					>
						Meaningful connections start with one.
					</motion.p>
					{/* CTA */}
					<motion.div
						className='mt-9'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.85, duration: 0.6 }}
					>
						<Button
							size='lg'
							className='rounded-full bg-white px-8 text-purple-950 shadow-lg shadow-purple-950/30 transition-transform hover:scale-[1.03] hover:bg-white'
						>
							<Link href={ctaHref} className='flex items-center'>
								{ctaLabel}
								<motion.span
									className='ml-2 inline-flex'
									whileHover={{ x: 4 }}
									transition={{
										type: 'spring',
										stiffness: 400,
										damping: 20,
									}}
								>
									<ArrowRight className='h-4 w-4' />
								</motion.span>
							</Link>
						</Button>
					</motion.div>
				</div>
				{/* Bottom fade */}
				<div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-purple-950/40 to-transparent' />
			</div>
		</section>
	);
};

export default HomeHero;
