import { Skeleton } from '@/components/ui/skeleton';
import MemberCardSkeleton from '@/components/members/utils/MemberCardSkeleton';

const LikesSkeleton = () => {
	return (
		<div className='max-w-5xl mx-auto px-4'>
			<div className='overflow-x-auto'>
				<div
					className='flex gap-6 border-b border-black/10 pb-2
				justify-center sm:justify-start min-w-max'
				>
					{/* Active tab */}
					<div className='relative'>
						<Skeleton className='h-10 w-24 rounded-lg bg-black/10' />

						{/* Active underline */}
						<div className='absolute left-3 right-3 -bottom-[2px] h-[2px] bg-purple-300/60 rounded-full' />
					</div>

					{/* Other tabs */}
					<Skeleton className='h-10 w-28 rounded-lg bg-black/5' />
					<Skeleton className='h-10 w-24 rounded-lg bg-black/5' />
				</div>
			</div>

			{/* Member Card */}
			<MemberCardSkeleton />
		</div>
	);
};

export default LikesSkeleton;
