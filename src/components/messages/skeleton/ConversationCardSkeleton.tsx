import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const ConversationCardSkeleton = () => {
	return (
		<div
			className='
				flex items-center gap-4
				p-4
				rounded-xl
			'
		>
			<Skeleton className='h-12 w-12 rounded-full' />

			<div className='flex-1 min-w-0'>
				<div className='flex items-center justify-between gap-4'>
					<Skeleton className='h-4 w-24' />

					<Skeleton className='h-3 w-16' />
				</div>

				<Skeleton className='mt-2 h-4 w-3/4' />
			</div>
		</div>
	);
}

export default ConversationCardSkeleton
