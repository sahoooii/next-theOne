import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ConversationCardSkeleton from './ConversationCardSkeleton';

const ConversationListSkeleton = () => {
	return (
		<Card
			className='
				w-full
				max-w-2xl
				bg-white/70
				backdrop-blur-md
				border border-black/10
				rounded-2xl
				p-8
			'
		>
			{/* header */}
			<div className='mb-6 space-y-2'>
				<Skeleton className='h-6 w-24' />
				<div className='h-[2px] w-10 rounded-full bg-purple-300' />
			</div>

			{/* Divider */}
			<div className='h-px bg-black/10 mb-6' />

			<div className='space-y-3'>
				<ConversationCardSkeleton />
				<ConversationCardSkeleton />
				<ConversationCardSkeleton />
				<ConversationCardSkeleton />
				<ConversationCardSkeleton />
			</div>
		</Card>
	);
}

export default ConversationListSkeleton
