import { getConversationsList } from '../actions/messageActions';

const MessagesPage = async () => {
	const messages = await getConversationsList();
	console.log(messages);

	return <div>MessagesPage</div>;
};

export default MessagesPage;
