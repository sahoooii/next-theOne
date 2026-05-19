'use client';

import { useState } from 'react';
import { Photo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { deleteImage, setMainImage } from '@/app/actions/userActions';
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberPhotoCard from './MemberPhotoCard';

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
	);
};

export default MemberPhotos;
