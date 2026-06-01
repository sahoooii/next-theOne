import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ChatSkeleton = () => {
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

			{/* Chat  contents */}
			<div
				className='
				flex
				h-[calc(100vh-120px)]
				flex-col
				overflow-hidden
				rounded-3xl
				border
				border-black/10
				bg-white/70
				backdrop-blur-md
			'
			>
				{/* Messages */}
				<div
					className='
					flex-1
					space-y-4
					overflow-hidden
					p-6
				'
				>
					{/* Date Separator */}
					<div className='my-2 flex items-center gap-4'>
						<div className='h-px flex-1 bg-black/10' />
						<Skeleton className='h-3 w-16 rounded-full' />
						<div className='h-px flex-1 bg-black/10' />
					</div>

					{/* Left Message */}
					<div className='flex gap-2'>
						<Skeleton className='mt-1 h-10 w-10 rounded-full' />

						<div className='flex flex-col'>
							<Skeleton className='h-12 w-52 rounded-3xl rounded-bl-sm' />
							<Skeleton className='mt-1 h-3 w-10' />
						</div>
					</div>

					{/* Same sender */}
					<div className='flex gap-2'>
						<div className='w-10' />

						<div className='flex flex-col'>
							<Skeleton className='h-10 w-40 rounded-3xl rounded-bl-sm' />
							<Skeleton className='mt-1 h-3 w-10' />
						</div>
					</div>

					{/* Right Message */}
					<div className='flex justify-end gap-2'>
						<div className='flex flex-col items-end'>
							<Skeleton className='h-12 w-64 rounded-3xl rounded-br-sm' />
							<Skeleton className='mt-1 h-3 w-10' />
						</div>
					</div>

					{/* Right Message */}
					<div className='flex justify-end gap-2'>
						<div className='flex flex-col items-end'>
							<Skeleton className='h-10 w-32 rounded-3xl rounded-br-sm' />
							<Skeleton className='mt-1 h-3 w-10' />
						</div>
					</div>

					{/* Date Separator */}
					<div className='my-2 flex items-center gap-4'>
						<div className='h-px flex-1 bg-black/10' />
						<Skeleton className='h-3 w-20 rounded-full' />
						<div className='h-px flex-1 bg-black/10' />
					</div>

					{/* Left Message */}
					<div className='flex gap-2'>
						<Skeleton className='mt-1 h-10 w-10 rounded-full' />

						<div className='flex flex-col'>
							<Skeleton className='h-14 w-72 rounded-3xl rounded-bl-sm' />
							<Skeleton className='mt-1 h-3 w-10' />
						</div>
					</div>
				</div>

				{/* Form */}
				<div
					className='
					border-t
					border-black/10
					bg-white/40
					p-4
					backdrop-blur-xl
				'
				>
					<div className='flex items-end gap-3'>
						<Skeleton className='min-h-[56px] flex-1 rounded-2xl' />

						<Skeleton className='h-12 w-12 rounded-full' />
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ChatSkeleton;
