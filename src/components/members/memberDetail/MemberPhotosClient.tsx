'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import MemberDetailPageHeader from './MemberDetailPageHeader';
import { Photo } from '@prisma/client';
import { motion } from 'framer-motion';
import LightBox from './LightBox';

const MemberPhotosClient = ({ photos }: { photos: Photo[] }) => {
	const [selectedPhoto, setSelectedPhoto] = useState(photos?.[0] || null);
	const [isOpen, setIsOpen] = useState(false); //Handle image to open/close

	// Close by ESC button
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});

	// Stop Scrolling
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [isOpen]);


	return (
		<>
			<Card
				className='
			h-full
			bg-white/70 backdrop-blur-md
			border border-black/10
			rounded-2xl
			p-8
		'
			>
				<MemberDetailPageHeader title='Photos' />

				<CardContent className='space-y-6'>
					<div
						className='relative w-full h-[380px] lg:h-[420px] rounded-xl overflow-hidden bg-black/5 cursor-zoom-in'
						onClick={() => setIsOpen(true)}
					>
						{/* 1. BG：画像を大きく引き伸ばして強くぼかす */}
						<Image
							src={selectedPhoto?.url || '/images/user.png'}
							fill
							alt='Background blur'
							className='object-cover blur-2xl opacity-40 scale-110'
						/>
						{/* 2. 前面：メインの写真をcontainで表示 */}
						<motion.div
							key={selectedPhoto?.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
							className='absolute inset-0'
						>
							<Image
								src={selectedPhoto?.url || '/images/user.png'}
								fill
								alt='Main photo'
								className='object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]'
							/>
						</motion.div>

						{/* 3. Overlay：情報の視認性を高めるグラデーション */}
						<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
					</div>
					{/* Thumbnails */}
					<div className='grid grid-cols-5 gap-3'>
						{/* If thumbnails more than one show thumbnails debug -> add = */}
						{photos?.length > 1 &&
							photos?.map((photo) => (
								<button
									key={photo.id}
									onClick={() => setSelectedPhoto(photo)}
									className={`
								relative w-full rounded-md overflow-hidden aspect-[3/4]
								${selectedPhoto?.id === photo.id ? 'ring-2 ring-purple-400 scale-[1.02]' : ''}
							`}
								>
									<Image
										src={photo.url}
										fill
										alt='Thumbnail'
										className='object-cover object-[center_30%] transition-transform duration-300 hover:scale-105 hover:opacity-90'
									/>
								</button>
							))}
					</div>
				</CardContent>
			</Card>
			{/* Lightbox */}
			<LightBox
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				photo={selectedPhoto}
			/>
		</>
	);
};

export default MemberPhotosClient;
