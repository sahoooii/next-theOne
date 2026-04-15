import { getMemberPhotoByUserId } from '@/app/actions/memberActions';
import { CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

const PhotosPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;

	const photos = await getMemberPhotoByUserId(userId);

	return (
		<>
			<CardHeader className='text-2xl font-semibold text-primary'>
				Photos
			</CardHeader>
			<div className='my-6 h-px bg-gray-400' />
			<CardContent>
				<div className='grid grid-cols-5 gap-3'>
					{photos &&
						photos.map((photo) => (
							<div key={photo.id}>
								<Image
									src={photo.url}
									width={300}
									height={300}
									alt='Image of member'
									className='object-cover object-top transition-transform duration-500 hover:scale-105 rounded-sm'
								/>
							</div>
						))}
				</div>
			</CardContent>
		</>
	);
};

export default PhotosPage;
