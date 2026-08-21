import { pusherServer } from '../server';
import { createChatChannel } from '../channels';

import { TypingEvent, TypingPayload } from '@/types/messages';

export async function notifyTyping(
	chatId: string,
	event: TypingEvent,
	payload: TypingPayload,
) {
	const channel = createChatChannel(chatId);

	await pusherServer.trigger(channel, event, payload);
}
