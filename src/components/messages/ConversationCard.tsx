import Link from 'next/link';
import { Conversation } from '@/types/conversations';
import { transformImageUrl } from '@/lib/transFormImageUrl';
import { formatConversationDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
	conversation: Conversation;
};

const ConversationCard = ({ conversation }: Props) => {
	return (
		<Link href={`/members/${conversation.userId}/chat`}>
			<div
				className='flex gap-4
			p-4
			items-center
			rounded-xl
			border border-transparent
			hover:bg-black/[0.02]
			hover:border-purple-200
			hover:border-black/5
			transition-all duration-300'
			>
				<Avatar
					className='
						h-12
						w-12
						overflow-hidden
						border
						border-black/10
					'
				>
					<AvatarImage
						className='h-full w-full object-cover object-[center_20%]'
						src={transformImageUrl(conversation.image, 'avatar') ?? ''}
					/>

					<AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
				</Avatar>

				<div className='flex-1 min-w-0'>
					<div className='flex items-center justify-between gap-4'>
						<div className='flex items-center gap-2'>
							{/* Add purple dot with unread count number, when user have unread message */}
							{conversation.unreadCount > 0 && (
								<span
									className='
min-w-5
h-5
px-1.5
rounded-full
bg-purple-500
text-white
text-xs
font-medium
flex
items-center
justify-center
'
								>
									{conversation.unreadCount}
								</span>
							)}

							<h3 className='truncate text-gray-900'>{conversation.name}</h3>
						</div>
						{/* Date time */}
						<span
							className='
		text-xs
		text-gray-400
		whitespace-nowrap
	'
						>
							{formatConversationDate(new Date(conversation.created))}
						</span>
					</div>
					{/* Last Message */}
					<p
						className='mt-1
		truncate
		text-sm
		text-gray-500'
					>
						{conversation.lastMessage}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ConversationCard;
