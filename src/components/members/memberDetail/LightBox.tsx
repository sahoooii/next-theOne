'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Photo } from '@prisma/client';
import { RxCross1 } from 'react-icons/rx';

type LightboxProps = {
	isOpen: boolean;
	onClose: () => void;
	photo: Photo | null;
};

const LightBox = ({ isOpen, onClose, photo }: LightboxProps) => {
	const [isImageLoading, setIsImageLoading] = useState(true); //Handle loading each image

	// Reset loading when open or photo changes
	useEffect(() => {
		if (isOpen) {
			setIsImageLoading(true);
		}
	}, [isOpen, photo]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25 }}
					className='fixed inset-0 z-50 flex items-center justify-center p-4'
				>
					{/* Background */}
					<motion.div
						className='absolute inset-0 bg-black/90 backdrop-blur-sm'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						onClick={onClose}
					/>

					{/* Image */}
					<motion.div
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.98 }}
						transition={{ duration: 0.25 }}
						className='relative max-h-[80vh] w-fit h-fit flex items-center justify-center group'
					>
						<Image
							src={photo?.url || '/images/user.png'}
							width={1200}
							height={1200}
							alt='Enlarged photo'
							className='max-h-[80vh] w-auto object-contain rounded-lg'
							onLoad={() => setIsImageLoading(false)}
						/>
						{/* Loading effect UI*/}
						{isImageLoading && (
							<div className='absolute inset-0 flex items-center justify-center'>
								<div className='w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin' />
							</div>
						)}
						{/* After loading image, show cross mark */}
						{!isImageLoading && (
							<button
								onClick={onClose}
								className='absolute top-2 right-1 z-10
        bg-black/60 backdrop-blur-md
        text-white
        p-2 rounded-full
        hover:bg-black/80
        transition-all
        hover:scale-110
        border border-white/20 shadow-lg'
							>
								<RxCross1 className='w-4 h-4' />
							</button>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LightBox;
