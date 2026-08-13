import { pusherServer } from './server';

import { createUserChannel } from './channels';

import { LikeNewPayload } from '@/types/likes';

export async function notifyLikeNew(
	targetUserId: string,
	payload: LikeNewPayload,
) {
	await pusherServer.trigger(
		createUserChannel(targetUserId),
		'like:new',
		payload,
	);
}
