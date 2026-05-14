import { Card, CardContent } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { getAuthUserId } from '@/app/actions/authActions';
import {
	getMemberByUserId,
	getMemberPhotoByUserId,
} from '@/app/actions/memberActions';
import MemberPhotoUpload from '@/components/edit/photos/MemberPhotoUpload';
import MemberPhotos from '@/components/edit/photos/MemberPhotos';

const PhotosPage = async () => {
	const userId = await getAuthUserId();
	const member = await getMemberByUserId(userId);
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
				{/* Display Star and trash button */}
				<MemberPhotos
					photos={photos}
					editing={true}
					mainImageUrl={member?.image}
				/>
			</CardContent>
		</Card>
	);
};

export default PhotosPage;
