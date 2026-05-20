import { Card, CardContent } from '@/components/ui/card';
import { getAuthUserId } from '@/app/actions/authActions';
import {
	getMemberByUserId,
	getMemberPhotoByUserId,
} from '@/app/actions/memberActions';
import MemberDetailPageHeader from '../memberDetail/MemberDetailPageHeader';
import MemberPhotos from '@/components/edit/photos/MemberPhotos';

const UserEditPhotosContent = async () => {
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
				{/* Manage lists, state, action */}
				<MemberPhotos
					photos={photos}
					editing={true}
					mainImageUrl={member?.image}
				/>
			</CardContent>
		</Card>
	);
};

export default UserEditPhotosContent;
