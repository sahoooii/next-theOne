'use client';

import { motion } from 'framer-motion';

const DecorativeLine = () => {
	return (
		<div className='relative mx-auto mt-5 h-px w-16 overflow-hidden bg-purple-200'>
			<motion.div
				className='absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent'
				animate={{ x: ['-100%', '250%'] }}
				transition={{
					duration: 2.5,
					repeat: Infinity,
					repeatDelay: 4,
					ease: 'easeInOut',
				}}
			/>
		</div>
	);
};

export default DecorativeLine;
