import { pusherServer } from './server';
import { TypingEvent, TypingPayload } from '@/types/messages';
import { createChatChannel } from './channels';

export async function notifyTyping(
	chatId: string,
	event: TypingEvent,
	payload: TypingPayload,
) {
	const channel = createChatChannel(chatId);

	await pusherServer.trigger(channel, event, payload);
}
