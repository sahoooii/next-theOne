'use client';

import {
	CldUploadButton,
	CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { HiOutlinePhotograph } from 'react-icons/hi';

// Change folder name later
type Props = {
	folder: 'userImages' | 'messages';
	onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
};

const ImageUploadButton = ({ folder, onUploadImage }: Props) => {
	return (
		<CldUploadButton
			signatureEndpoint='/api/sign-image'
			options={{
				folder: `the-one/${folder}`,
				maxFiles: 1,
			}}
			onSuccess={onUploadImage}
			uploadPreset='ml_default'
			className='group w-full'
		>
			<div
				className='
			relative
			aspect-[3/4]
			overflow-hidden
			rounded-2xl
			border border-dashed border-black/15
			bg-white/30
			backdrop-blur-sm
			transition-all duration-300
			hover:border-purple-300/40
			hover:bg-white/50
		'
			>
				<div
					className='
				flex h-full flex-col items-center justify-center
				gap-3
				text-gray-500
			'
				>
					<HiOutlinePhotograph
						size={38}
						className='transition-transform duration-300 group-hover:scale-105'
					/>
					<div className='text-sm font-medium'>Add Photo</div>
				</div>
			</div>
		</CldUploadButton>
	);
};

export default ImageUploadButton;
