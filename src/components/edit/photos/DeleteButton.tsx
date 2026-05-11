import { LoadingDisplay } from '@/components/LoadingDisplay';
import { AiOutlineDelete, AiFillDelete } from 'react-icons/ai';

type Props = {
	loading: boolean;
};

const DeleteButton = ({ loading }: Props) => {
	return (
		<div className='relative hover:opacity-80 transition cursor-pointer'>
			{!loading ? (
				<>
					<AiOutlineDelete
						size={32}
						className='fill-white absolute -top-[2px] -right-[2px]'
					/>
					<AiFillDelete size={32} className='fill-red-600' />
				</>
			) : (
				<LoadingDisplay message='Loading your photos...' />
			)}
		</div>
	);
};

export default DeleteButton;
