import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const EditPhotosSkeleton = () => {
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
				<Skeleton className='h-6 w-32' />
				<Skeleton className='h-[2px] w-10 bg-purple-300' />
			</div>

			<div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className='group relative'>
						<div
							className='
							relative
							aspect-[3/4]
							overflow-hidden
							rounded-2xl
							border border-black/10
							bg-black/5
						'
						>
							{/* Image skeleton */}
							<Skeleton
								className='
								absolute inset-0
								h-full w-full
								bg-white/10
							'
							/>

							{/* Top overlay buttons */}
							<div className='absolute top-3 left-3 z-20'>
								<Skeleton className='h-9 w-9 rounded-full bg-white/20' />
							</div>

							<div className='absolute top-3 right-3 z-20'>
								<Skeleton className='h-9 w-9 rounded-full bg-white/20' />
							</div>

							{/* Bottom subtle gradient */}
							<div
								className='
								absolute inset-x-0 bottom-0
								h-24
								bg-gradient-to-t
								from-black/10
								to-transparent
							'
							/>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};

export default EditPhotosSkeleton;
