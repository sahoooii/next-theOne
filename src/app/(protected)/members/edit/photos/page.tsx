import { Suspense } from 'react';
import UserEditPhotosContent from '@/components/members/userEdit/UserEditPhotosContent';
import EditPhotosSkeleton from '@/components/members/userEdit/skeleton/EditPhotosSkeleton';

const PhotosPage = () => {
	return (
		<Suspense fallback={<EditPhotosSkeleton />}>
			<UserEditPhotosContent />
		</Suspense>
	);
};

export default PhotosPage;
