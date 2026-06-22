import { Suspense } from 'react';
import { getMemberPhotoByUserId } from '@/app/actions/memberActions';
import MemberPhotosClient from '@/components/members/memberDetail/MemberPhotosClient';
import PhotoSkeleton from '@/components/members/memberDetail/skeleton/PhotoSkeleton';

const PhotosPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;

	const photos = await getMemberPhotoByUserId(userId);

	if (!photos || photos.length === 0) {
		return <div className='text-gray-500'>No photos available</div>;
	}

	return (
		<Suspense fallback={<PhotoSkeleton />}>
			<MemberPhotosClient photos={photos} />
		</Suspense>
	);
};

export default PhotosPage;
