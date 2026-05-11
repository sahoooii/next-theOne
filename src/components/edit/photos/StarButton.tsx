import { LoadingDisplay } from '@/components/LoadingDisplay';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

type Props = {
	selected: boolean;
	loading: boolean;
};

const StarButton = ({ selected, loading }: Props) => {
	return (
		<div className='relative hover:opacity-80 transition cursor-pointer'>
			{!loading ? (
				<>
					<AiOutlineStar
						size={32}
						className='fill-white absolute -top-[2px] -right-[2px]'
					/>
					<AiFillStar
						size={32}
						className={selected ? 'fill-yellow-200' : 'fill-neutral-500/70'}
					/>
				</>
			) : (
				<LoadingDisplay message='Loading your photos...' />
			)}
		</div>
	);
};

export default StarButton;
