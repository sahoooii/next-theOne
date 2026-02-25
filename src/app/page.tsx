'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import { FaRegSmile } from 'react-icons/fa';

export default function Home() {
	return (
		<div className='p-10 space-y-4'>
			<h1 className='text-3xl font-bold'>HeroUI Test</h1>
			<Button
				as={Link}
				href='/members'
				color='primary'
				variant='bordered'
				startContent={<FaRegSmile size={20} />}
			>
				Click Me
			</Button>
		</div>
	);
}
