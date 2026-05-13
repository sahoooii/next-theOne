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
			className='flex items-center gap-2 bg-primary text-white rounded-lg py-2 px-2 hover:bg-secondary/70'
		>
			<HiOutlinePhotograph size={28} />
			Upload new Image
		</CldUploadButton>
	);
};

export default ImageUploadButton;
