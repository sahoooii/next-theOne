import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { GiBigDiamondRing } from 'react-icons/gi';

const MembersPageSkeleton = () => {
	return (
		<div className='max-w-5xl mx-auto px-4'>
			{/* Header */}
			<div className='relative overflow-hidden rounded-2xl mb-10'>
				{/* bg */}
				<div className='absolute inset-0 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950' />
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_70%)]' />
				<div className='absolute inset-0 border border-white/10 rounded-2xl' />

				{/* Content */}
				<div className='relative flex flex-col items-center text-center py-10 sm:py-12 px-4 space-y-4'>
					{/* Icon（そのまま見せる） */}
					<div className='bg-white/10 p-3 rounded-full backdrop-blur'>
						<GiBigDiamondRing className='text-white text-xl animate-pulse' />
					</div>

					{/* Title */}
					<Skeleton className='h-5 w-32 bg-white/20' />

					{/* Divider */}
					<div className='w-10 h-px bg-white/20' />

					{/* Tagline */}
					<Skeleton className='h-3 w-40 bg-white/20' />
				</div>
			</div>

			{/* Members Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{Array.from({ length: 6 }).map((_, i) => (
					<Card
						key={i}
						className='bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden pb-2'
					>
						<CardContent className='p-3 space-y-3 flex flex-col h-full'>
							{/* Image */}
							<div className='relative aspect-[3/4] w-full overflow-hidden rounded-xl'>
								<Skeleton className='absolute inset-0' />
							</div>

							{/* Info Section */}
							<div className='-mt-16 pt-10 px-4 pb-4 bg-gradient-to-t from-black/70 via-purple-900/40 to-transparent rounded-b-2xl flex-1 space-y-2'>
								<Skeleton className='h-4 w-24 bg-white/20' />
								<Skeleton className='h-3 w-32 bg-white/20' />
								<Skeleton className='h-3 w-20 bg-white/20' />
							</div>

							{/* CTA */}
							<div className='flex gap-2 mt-[18px]'>
								<Skeleton className='h-9 flex-1 rounded-md bg-white/20' />
								<Skeleton className='h-9 w-9 rounded-md bg-white/20' />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default MembersPageSkeleton;
