'use client';

import { motion } from 'framer-motion';

import { steps } from './HowItWorksSteps';

const HowItWorksContents = () => {
	return (
		<div className='grid gap-16 lg:grid-cols-3 lg:gap-8'>
			{steps.map((step, index) => {
				const Icon = step.icon;

				return (
					<motion.div
						key={step.number}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{
							duration: 0.6,
							delay: index * 0.12,
							ease: 'easeOut',
						}}
						className='relative text-center'
					>
						{/* Number + icon */}
						<motion.div
							className='relative mx-auto flex h-32 w-32 items-center justify-center'
							whileHover={{ y: -6 }}
						>
							{/* Outer ring */}
							<motion.div
								className='absolute inset-0 rounded-full border border-purple-300'
								animate={{
									scale: [1, 1.08, 1],
									opacity: [0.4, 0.9, 0.4],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: 'easeInOut',
									delay: index * 0.5,
								}}
							/>

							{/* Inner circle */}
							<motion.div
								whileHover={{ scale: 1.08 }}
								transition={{
									type: 'spring',
									stiffness: 300,
									damping: 18,
								}}
								className='relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm'
							>
								<Icon strokeWidth={1.25} className='h-7 w-7 text-purple-800' />
							</motion.div>

							{/* Number */}
							<span className='absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-950 font-sans text-[10px] font-medium tracking-wider text-white'>
								{step.number}
							</span>
						</motion.div>

						{/* Step content */}
						<div className='mx-auto mt-8 max-w-xs'>
							<p className='text-xs font-medium tracking-[0.3em] text-purple-600'>
								{step.label}
							</p>

							<h3 className='mt-4 font-display text-2xl font-normal leading-snug tracking-wide text-purple-950'>
								{step.title}
							</h3>
						</div>

						{/* Mobile connector */}
						{index < steps.length - 1 && (
							<div className='mx-auto mt-12 h-12 w-px bg-purple-200 lg:hidden' />
						)}
					</motion.div>
				);
			})}
		</div>
	);
};

export default HowItWorksContents;
