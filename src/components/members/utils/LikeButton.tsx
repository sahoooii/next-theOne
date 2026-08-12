'use client';

import { Button } from '@/components/ui/button';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useLike } from '@/providers/LikeProvider';

type Props = {
	targetId: string;
};

const LikeButton = ({ targetId }: Props) => {
	const { likeIds, toggleLike } = useLike();

	const hasLiked = likeIds.includes(targetId);

	return (
		<Button
			variant='ghost'
			size='icon'
			className='
    group
    h-10 w-10 p-0
		[&_svg]:size-5
    text-white/70
    hover:text-white
    hover:bg-white/10
    active:bg-white/20
    rounded-full
    transition-all duration-200
  '
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				toggleLike(targetId);
			}}
		>
			{hasLiked ? (
				<FaHeart className='transition-transform duration-200 text-red-400 group-hover:scale-110 active:scale-90 drop-shadow-md' />
			) : (
				<FaRegHeart className='transition-all duration-200 text-red-400 opacity-70 group-hover:text-red-400 group-hover:scale-110 active:scale-90 drop-shadow-md' />
			)}
		</Button>
	);
};

export default LikeButton;
