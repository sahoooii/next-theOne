// For chat room channel
export function createChatId(a: string, b: string) {
	return a > b ? `${b}-${a}` : `${a}-${b}`;
}

// For conversation list channel
export function createUserChannel(userId: string) {
	return `user-${userId}`;
}

// For Chat room channel: read receipt
export function createChatChannel(chatId: string) {
	return `chat-${chatId}`;
}
