import { transformImageUrl } from '@/lib/transFormImageUrl';
import { ChatPartner } from '@/types/prisma';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
	partner: ChatPartner;
};

const TypingIndicator = ({ partner }: Props) => {
	return (
		<div className='mb-8'>
			<Avatar>
				<AvatarImage
					className='object-cover object-[center_10%]'
					src={transformImageUrl(partner.image, 'avatar') ?? ''}
				/>

				<AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
			</Avatar>
		</div>
	);
};

export default TypingIndicator;
