import { Ref } from 'react';

import { AnimatePresence } from 'framer-motion';
import { ChatMessage } from '@/types/messages';
import { ChatPartner } from '@/types/prisma';
import TypingIndicator from '../TypingIndicator';
import ChatMessageItem from './ChatMessageItem';

type ChatMessagesProps = {
	chatMessages: ChatMessage[];
	currentUserId: string;
	partner: ChatPartner;
	isPartnerTyping: boolean;
	bottomRef: Ref<HTMLDivElement>;
	onDeleteClick: (messageId: string) => void;
};

const ChatMessages = ({
	chatMessages,
	currentUserId,
	partner,
	isPartnerTyping,
	bottomRef,
	onDeleteClick,
}: ChatMessagesProps) => {
	return (
		<>
		{/* Empty state */}
			{chatMessages.length === 0 ? (
				<div
					className='
					border-b
					border-black/10
					px-6
					py-4
				'
				>
					<p className='text-lg font-medium'>Your conversation starts here.</p>
					<p className='mt-1 text-sm'>Say hello when you are ready.</p>
				</div>
			) : (
				<div
					className='
					flex-1
					space-y-2
					overflow-y-auto
					p-6
				'
				>
					{chatMessages.map((message, index) => {
						// Double texting from sender
						const previousMessage = chatMessages[index - 1];

						// Prevent show read time every text, when sender double texting
						const nextMessage = chatMessages[index + 1];
						return (
							<ChatMessageItem
								key={message.id}
								message={message}
								previousMessage={previousMessage}
								nextMessage={nextMessage}
								currentUserId={currentUserId}
								onDeleteClick={onDeleteClick}
							/>
						);
					})}

					{/* Typing indicator */}
					<AnimatePresence>
						{isPartnerTyping && <TypingIndicator partner={partner} />}
					</AnimatePresence>

					{/* For auto scroll to the latest chat */}
					<div ref={bottomRef} />
				</div>
			)}
		</>
	);
};

export default ChatMessages;
