import Pusher from 'pusher-js';

// Lazy Initialization（遅延初期化）
let client: Pusher | null = null;

export function getPusherClient() {
	if (!client) {
		client = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
			cluster: 'ap3',
		});

		client.connection.bind('connected', () => {
			console.log('Connected');
		});
	}

	return client;
}
