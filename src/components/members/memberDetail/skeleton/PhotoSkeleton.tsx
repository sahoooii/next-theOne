import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PhotoSkeleton = () => {
	return (
		<Card
			className='
				h-full
				bg-white/70 backdrop-blur-md
				border border-black/10
				rounded-2xl
				p-8
			'
		>
			{/* Header */}
			<div className='mb-6 space-y-2'>
				<Skeleton className='h-6 w-24' />
				<div className='h-[2px] w-10 bg-purple-300 rounded-full' />
			</div>

			{/* Divider */}
			<div className='h-px bg-black/10 mb-6' />

			<CardContent className='space-y-6'>
				{/* Main Image */}
				<div className='relative w-full h-[380px] lg:h-[420px] rounded-xl overflow-hidden'>
					<Skeleton className='absolute inset-0' />
				</div>

				{/* Thumbnails */}
				<div className='grid grid-cols-5 gap-3'>
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className='relative w-full aspect-[3/4] rounded-md overflow-hidden'
						>
							<Skeleton className='absolute inset-0' />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export default PhotoSkeleton
