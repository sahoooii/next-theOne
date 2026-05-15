'use client';

import { useRouter } from 'next/navigation';
import ImageUploadButton from './ImageUploadButton';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { addImage } from '@/app/actions/userActions';
import { showToast } from '@/lib/toast';

// For business logic
const MemberPhotoUpload = () => {
	const router = useRouter();

	const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
		if (result.info && typeof result.info === 'object') {
			await addImage(result.info.secure_url, result.info.public_id);
			showToast('User photo updated successfully');
			router.refresh();
		} else {
			showToast('Failed to upload the user photo', 'error');
		}
	};
	return <ImageUploadButton folder='userImages' onUploadImage={onAddImage} />;
};

export default MemberPhotoUpload;
