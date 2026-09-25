import Image from 'next/image';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

type Props = {
	text: string;
};

const GoogleIconButton = ({ text }: Props) => {
	return (
		<Button
			variant='outline'
			className='relative w-full h-11'
			onClick={() => signIn('google')}
		>
			<Image
				src='/icons/google.svg'
				alt='Google logo'
				width={24}
				height={24}
				className='absolute left-4'
			/>
			<span>{text}</span>
		</Button>
	);
};

export default GoogleIconButton;
