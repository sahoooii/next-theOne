'use client';

import { useState } from 'react';
import { Photo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { deleteImage, setMainImage } from '@/app/actions/userActions';
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberPhotoCard from './MemberPhotoCard';
import { Card } from '@/components/ui/card';

type Props = {
	photos: Photo[] | null;
	editing?: boolean;
	mainImageUrl?: string | null;
};

const MemberPhotos = ({ photos, editing, mainImageUrl }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState({
		type: '',
		isLoading: false,
		id: '', //imageId
	});

	// To set a main image function
	const onSetMain = async (photo: Photo) => {
		if (photo.url === mainImageUrl) return null;
		setLoading({ isLoading: true, id: photo.id, type: 'main' });
		await setMainImage(photo);
		router.refresh();
		setLoading({ isLoading: false, id: '', type: '' });
	};

	// Delete photos
	const onDelete = async (photo: Photo) => {
		// Can't delete main image
		if (photo.url === mainImageUrl) return null;
		setLoading({ isLoading: true, id: photo.id, type: 'delete' });
		await deleteImage(photo);
		router.refresh();
		setLoading({ isLoading: false, id: '', type: '' });
	};

	return (
		<>
			{photos?.length === 0 && (
				<Card className='bg-white/50 backdrop-blur-md border border-black/10 rounded-2xl p-8 mb-6'>
					<h2 className='text-lg font-semibold text-gray-900'>
						Add Your First Photo
					</h2>
					<div className='h-[2px] w-10 bg-purple-500 rounded-full mb-4' />
					<p className='text-gray-700'>
						Photos help others get a better sense of who you are.
						<br />
						Upload at least one photo to complete your profile.
					</p>
				</Card>
			)}
			<div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{photos &&
					photos.map((photo) => (
						<MemberPhotoCard
							key={photo.id}
							photo={photo}
							editing={editing}
							isMain={photo.url === mainImageUrl}
							onSetMain={onSetMain}
							onDelete={onDelete}
							loading={loading}
						/>
					))}
				{/* Image upload button */}
				{editing && <MemberPhotoUpload />}
			</div>
		</>
	);
};

export default MemberPhotos;
