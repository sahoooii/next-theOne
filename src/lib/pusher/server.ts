import PusherServer from 'pusher';

const globalForPusherServer = globalThis as typeof globalThis & {
	pusherServer?: PusherServer;
};

export const pusherServer =
	globalForPusherServer.pusherServer ??
	new PusherServer({
		appId: process.env.PUSHER_APP_ID!,
		key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
		secret: process.env.PUSHER_SECRET!,
		cluster: 'ap3',
		useTLS: true,
	});

if (process.env.NODE_ENV !== 'production') {
	globalForPusherServer.pusherServer = pusherServer;
}
