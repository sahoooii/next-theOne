import { pusherServer } from './server';
import { Conversation } from '@/types/conversations';
import {
	mapConversationToDeletePayload,
	mapConversationToPayload,
} from '../mappers/messageMapper';
import { createUserChannel } from './channels';

// ConversationをConversationListへ通知する
// update / delete の判定と通知
export async function notifyConversationUpdate(
	channelOwnerId: string,
	partnerUserId: string,
	conversation: Conversation | undefined,
) {
	if (conversation) {
		// Update: Conversationが存在する:
		const payload = mapConversationToPayload(conversation);

		await pusherServer.trigger(
			createUserChannel(channelOwnerId),
			'conversation:update',
			payload,
		);
	} else {
		// Delete: Conversationが存在しない(最後のメッセージが消された時)
		const payload = mapConversationToDeletePayload(partnerUserId);

		await pusherServer.trigger(
			createUserChannel(channelOwnerId),
			'conversation:delete',
			payload,
		);
	}
}
