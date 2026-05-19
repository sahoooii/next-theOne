'use client';

import Image from 'next/image';
import { Photo } from '@prisma/client';
import { CldImage } from 'next-cloudinary';

type Props = {
	photo: Photo | null;
};

const MemberImage = ({ photo }: Props) => {
	return (
		<div
			className='
				group
				relative
				aspect-[3/4]
				overflow-hidden
				rounded-2xl
				bg-black/10
				border border-black/10
				transition-all duration-300
	hover:border-purple-300/40
			'
		>
			{photo?.publicId ? (
				<>
					<CldImage
						alt='Image of user'
						src={photo.publicId}
						fill
						crop='fill'
						gravity='auto:face'
						className='
						object-cover
						transition-transform duration-500
						group-hover:scale-[1.02]
					'
					/>
					<div
						className='
		absolute inset-0
		bg-black/0
		group-hover:bg-black/10
		transition-colors duration-300
	'
					/>
				</>
			) : (
				<>
					<Image
						src={photo?.url || '/images/user.png'}
						fill
						alt='Image of user'
						className='
						object-cover
						transition-transform duration-500
						group-hover:scale-[1.02]
					'
					/>
					<div
						className='
		absolute inset-0
		bg-black/0
		group-hover:bg-black/10
		transition-colors duration-300
	'
					/>
				</>
			)}
		</div>
	);
};

export default MemberImage;
