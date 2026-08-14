import { pusherServer } from './server';

import { createUserChannel } from './channels';

export async function notifyMatchNew(userId: string, partnerUserId: string) {
	// それぞれの受信者から見たpartnerを作る
	
	// userId receives partnerUserId
	await pusherServer.trigger(createUserChannel(userId), 'match:new', {
		partnerUserId,
	});

	// partnerUserId receives userId
	await pusherServer.trigger(createUserChannel(partnerUserId), 'match:new', {
		partnerUserId: userId,
	});
}
