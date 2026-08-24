import { pusherServer } from '../server';

import { createUserChannel } from '../channels';

export async function notifyMatchDelete(userId: string, partnerUserId: string) {
	// userId receives partnerUserId
	await pusherServer.trigger(createUserChannel(userId), 'match:delete', {
		partnerUserId,
	});

	// partnerUserId receives userId
	await pusherServer.trigger(createUserChannel(partnerUserId), 'match:delete', {
		partnerUserId: userId,
	});
}
