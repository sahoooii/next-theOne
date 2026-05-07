import { Skeleton } from '@/components/ui/skeleton';
import MemberCardSkeleton from './utils/MemberCardSkeleton';
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

			{/* Members Card */}
			<MemberCardSkeleton />
		</div>
	);
};

export default MembersPageSkeleton;
