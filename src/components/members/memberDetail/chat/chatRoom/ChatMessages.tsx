import { Ref } from 'react';

import { AnimatePresence } from 'framer-motion';
import { isSameDay } from 'date-fns';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { transformImageUrl } from '@/lib/transFormImageUrl';
import { formatChatTime, formatMessageDate } from '@/lib/utils';
import ChatOptions from '../ChatOptions';
import { ChatMessage } from '@/types/messages';
import { ChatPartner } from '@/types/prisma';
import TypingIndicator from '../TypingIndicator';

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
		<div
			className='
					flex-1
					space-y-2
					overflow-y-auto
					p-6
				'
		>
			{chatMessages.map((message, index) => {
				const isCurrentUser = message.senderId === currentUserId;

				// Double texting from sender
				const previousMessage = chatMessages[index - 1];
				// If not login user & not double texting and then show avatar
				const showAvatar =
					!isCurrentUser && previousMessage?.senderId !== message.senderId;

				// Prevent show read time every text, when sender double texting
				const nextMessage = chatMessages[index + 1];

				const showReadReceipt =
					isCurrentUser &&
					message.dateRead &&
					(!nextMessage || nextMessage.senderId !== currentUserId);

				// Display separator when change a date
				const showDateSeparator =
					!previousMessage ||
					!isSameDay(
						new Date(previousMessage.created),
						new Date(message.created),
					);

				return (
					<div key={message.id}>
						{/* Date Separator */}
						{showDateSeparator && (
							<div className='my-6 flex items-center gap-4'>
								<div className='h-px flex-1 bg-black/10' />
								<p
									className='
						text-[11px]
						tracking-wide
						text-gray-400
					'
								>
									{formatMessageDate(new Date(message.created))}
								</p>
								<div className='h-px flex-1 bg-black/10' />
							</div>
						)}

						{/* Message Row */}
						<div
							className={`flex gap-2 ${
								isCurrentUser ? 'justify-end' : 'justify-start'
							}`}
						>
							{/* Avatar */}
							{showAvatar && (
								<Avatar
									className='
											mt-1
						h-10
						w-10
						overflow-hidden
						border
						border-black/10
					'
								>
									<AvatarImage
										className='object-cover object-[center_10%]'
										src={transformImageUrl(message.senderImage, 'avatar') ?? ''}
									/>

									<AvatarFallback>
										{message.senderName?.charAt(0)}
									</AvatarFallback>
								</Avatar>
							)}

							{/* Empty spacing */}
							{!isCurrentUser && !showAvatar && <div className='w-10' />}

							<div className='group flex gap-2'>
								{/* Chat Options ex: delete */}
								{isCurrentUser && (
									<ChatOptions
										onDeleteClick={() => onDeleteClick(message.id)}
									/>
								)}

								{/* Bubble + Time */}
								<div className='first-letter:mt-1 flex flex-col'>
									<div
										className={`
						relative
						max-w-[80%] md:max-w-[90%]
						min-w-[80px]
						px-4
						py-2.5
						text-sm
						leading-relaxed
						shadow-sm
						transition-all
						duration-300
						${
							isCurrentUser
								? `
									rounded-3xl
									rounded-br-sm
									bg-purple-500/90
									text-white
								`
								: `
									rounded-3xl
									rounded-bl-sm
									border
									border-black/5
									bg-black/5
									text-gray-800
								`
						}
					`}
									>
										{message.text}
									</div>
									{/* Message send time */}
									<p
										className='mt-1
						text-[11px] text-right
						text-gray-400'
									>
										{formatChatTime(new Date(message.created))}
									</p>

									{/* Message receipt time */}
									{isCurrentUser && message.dateRead && showReadReceipt && (
										<p className='text-[11px] font-medium text-right text-gray-500'>
											Read {formatChatTime(new Date(message.dateRead))}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				);
			})}

			{/* Typing indicator */}
			<AnimatePresence>
				{isPartnerTyping && <TypingIndicator partner={partner} />}
			</AnimatePresence>

			{/* For auto scroll to the latest chat */}
			<div ref={bottomRef} />
		</div>
	);
};

export default ChatMessages;
