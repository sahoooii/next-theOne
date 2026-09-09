'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import DecorativeLine from '../utils/DecorativeLine';

type HomeCTAProps = {
	ctaLabel: string;
	ctaHref: string;
};

const HomeCTA = ({ ctaLabel, ctaHref }: HomeCTAProps) => {
	return (
		<section className='relative overflow-hidden bg-purple-950 py-28 md:py-36'>
			{/* Left glow */}
			<motion.div
				className='pointer-events-none absolute left-[10%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-3xl'
				animate={{
					x: [0, 40, -20, 0],
					y: [0, -30, 30, 0],
					scale: [1, 1.15, 0.95, 1],
					opacity: [0.2, 0.35, 0.25, 0.2],
				}}
				transition={{
					duration: 12,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
			/>

			{/* Right glow */}
			<motion.div
				className='pointer-events-none absolute right-[10%] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-purple-400/25 blur-3xl'
				animate={{
					x: [0, -40, 20, 0],
					y: [0, 30, -30, 0],
					scale: [1, 0.9, 1.1, 1],
					opacity: [0.2, 0.35, 0.25, 0.2],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 1,
				}}
			/>

			{/* Expanding waves */}
			<motion.div
				className='pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/30'
				animate={{
					scale: [1, 2.5],
					opacity: [0.5, 0],
				}}
				transition={{
					duration: 5,
					repeat: Infinity,
					ease: 'easeOut',
				}}
			/>

			<motion.div
				className='pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/20'
				animate={{
					scale: [1, 2.5],
					opacity: [0.4, 0],
				}}
				transition={{
					duration: 5,
					repeat: Infinity,
					ease: 'easeOut',
					delay: 2.5,
				}}
			/>

			{/* Content */}
			<div className='relative mx-auto max-w-3xl px-6 text-center'>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{
						duration: 0.7,
						ease: 'easeOut',
					}}
				>
					<p className='text-sm font-medium tracking-[0.35em] text-purple-300'>
						THE ONE
					</p>

					<motion.h2
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{
							duration: 0.7,
							delay: 0.1,
							ease: 'easeOut',
						}}
						className='mt-5 font-display text-4xl font-normal leading-tight tracking-wide text-white md:text-6xl'
					>
						Maybe your one is
						<br />
						closer than you think.
					</motion.h2>

					<DecorativeLine />

					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{
							duration: 0.6,
							delay: 0.2,
							ease: 'easeOut',
						}}
						className='mt-6 font-sans text-sm tracking-wide text-white/60 md:text-base'
					>
						Meaningful connections start with one.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{
							duration: 0.6,
							delay: 0.3,
							ease: 'easeOut',
						}}
						whileHover={{ scale: 1.04 }}
						whileTap={{ scale: 0.98 }}
						className='mt-9 inline-block'
					>
						<Button
							asChild
							className='rounded-full bg-white px-8 py-6 font-sans text-sm font-medium text-purple-950 transition-colors hover:bg-purple-50'
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
				</motion.div>
			</div>
		</section>
	);
};

export default HomeCTA;
