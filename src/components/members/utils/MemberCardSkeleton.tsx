import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const MemberCardSkeleton = () => {
	return (
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
	);
};

export default MemberCardSkeleton;
