import { Card, CardContent } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberPhotoByUserId } from '@/app/actions/memberActions';
import Image from 'next/image';
import StarButton from '@/components/edit/photos/StarButton';
import DeleteButton from '@/components/edit/photos/DeleteButton';
import MemberPhotoUpload from '@/components/edit/photos/MemberPhotoUpload';

const PhotosPage = async () => {
	const userId = await getAuthUserId();

	const photos = await getMemberPhotoByUserId(userId);
	return (
		<Card
			className='
				h-full
				bg-white/70 backdrop-blur-md
				border border-black/10
				rounded-2xl
				p-8
			'
		>
			{/* Header */}
			<MemberDetailPageHeader title='Edit Photos' />

			<CardContent>
				{/* Image upload button */}
				<MemberPhotoUpload />

				<div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{photos &&
						photos.map((photo) => (
							<div key={photo.id} className='relative'>
								<Image
									src={photo.url}
									width={220}
									height={220}
									alt='Image of user'
									className='object-cover rounded-sm'
								/>
								<div className='absolute top-3 left-3 z-50'>
									<StarButton selected={true} loading={false} />
								</div>
								<div className='absolute top-3 left-10 z-50'>
									<DeleteButton loading={false} />
								</div>
							</div>
						))}
				</div>
			</CardContent>
		</Card>
	);
};

export default PhotosPage;
