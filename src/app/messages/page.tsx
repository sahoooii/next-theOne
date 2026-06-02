import ConversationList from '@/components/messages/ConversationList';
import { getConversationsList } from '../actions/messageActions';

const MessagesPage = async () => {
	const conversations = await getConversationsList();
	return (
		<div className='flex justify-center px-4'>
			<ConversationList conversations={conversations} />
		</div>
	);
};

export default MessagesPage;
