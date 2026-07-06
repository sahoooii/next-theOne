import { Conversation } from '@/types';
import ConversationCard from './ConversationCard';
import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';

type Props = {
	conversations: Conversation[];
};

const ConversationList = ({ conversations }: Props) => {
	return (
		<div className='flex justify-center px-4'>
			<Card
				className='
	w-full
	max-w-2xl
	bg-white/70 backdrop-blur-md
	border border-black/10
	rounded-2xl
	p-8
'
			>
				{/* Header */}
				<MemberDetailPageHeader title='Messages' />

				{conversations.length === 0 ? (
					<div className='py-16 text-center'>
						<h3 className='text-lg font-medium text-gray-900'>
							No conversations yet
						</h3>

						<p className='mt-2 text-sm text-gray-500'>
							When a meaningful connection begins, your messages will appear
							here.
						</p>
					</div>
				) : (
					<div className='space-y-3'>
						{conversations.map((conversation) => (
							<ConversationCard
								key={conversation.userId}
								conversation={conversation}
							/>
						))}
					</div>
				)}
			</Card>
		</div>
	);
};

export default ConversationList;
