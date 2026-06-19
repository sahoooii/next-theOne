import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const ProfileSkeleton = () => {
	return (
		<Card
			className='
		h-full max-w-3xl mx-auto
		bg-white/70 backdrop-blur-md
		border border-black/10
		rounded-2xl
		p-8
	'
		>
			{/* Header */}
			<div className='mb-6 space-y-2'>
				<Skeleton className='h-6 w-32' />
				<Skeleton className='h-[2px] w-10 bg-purple-300' />
			</div>

			{/* Divider */}
			<div className='h-px bg-black/10 mb-6' />

			{/* Info Grid */}
			<div className='grid grid-cols-2 gap-4 mb-8'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className='space-y-2'>
						<Skeleton className='h-3 w-16' />
						<Skeleton className='h-4 w-24' />
					</div>
				))}
			</div>

			{/* Description */}
			<div className='space-y-2'>
				<Skeleton className='h-3 w-20' />
				<Skeleton className='h-4 w-full' />
				<Skeleton className='h-4 w-full' />
				<Skeleton className='h-4 w-2/3' />
			</div>
		</Card>
	);
}

export default ProfileSkeleton
