import { pusherServer } from '../server';

import { createUserChannel } from '../channels';

import { LikeDeletePayload } from '@/types/likes';

export async function notifyLikeDelete(
	userId: string,
	payload: LikeDeletePayload,
) {
	await pusherServer.trigger(createUserChannel(userId), 'like:delete', payload);
}
