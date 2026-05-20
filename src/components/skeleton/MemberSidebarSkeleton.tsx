import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const MemberSidebarSkeleton = () => {
	return (
		<Card className='h-full rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur-md'>
			<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-purple-950/40 to-black/80 backdrop-blur-xl rounded-2xl' />

			<div className='flex flex-col items-center space-y-4'>
				<Skeleton className='h-24 w-24 rounded-full lg:h-32 lg:w-32 bg-white/10' />

				<div className='space-y-2 w-full'>
					<Skeleton className='h-5 w-2/3 mx-auto bg-white/20' />
					<Skeleton className='h-4 w-1/2 mx-auto bg-white/20' />
				</div>

				<div className='w-full space-y-3 pt-6'>
					<Skeleton className='h-8 w-full rounded-xl bg-white/20' />
					<Skeleton className='h-8 w-full rounded-xl bg-white/20' />
					<Skeleton className='h-8 w-full rounded-xl bg-white/20' />
				</div>
			</div>
		</Card>
	);
};

export default MemberSidebarSkeleton;
