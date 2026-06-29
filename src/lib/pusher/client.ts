import PusherClient from 'pusher-js';

const globalForPusherClient = globalThis as typeof globalThis & {
	pusherClient?: PusherClient;
};

export const pusherClient =
	globalForPusherClient.pusherClient ??
	new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
		cluster: 'ap3',
	});

if (process.env.NODE_ENV !== 'production') {
	globalForPusherClient.pusherClient = pusherClient;
}
