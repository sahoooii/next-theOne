'use client';

import Link from 'next/link';
import { FaRegSmile } from 'react-icons/fa';

export default function Home() {
	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-bold'>Next Match</h1>
			<Link
				href='/members'
				className='inline-flex items-center gap-2 rounded-md border border-purple-500 px-4 py-2 text-sm font-medium text-purple-500 transition hover:bg-purple-500/20'
			>
				<FaRegSmile size={20} />
				<span>Members へ移動</span>
			</Link>
		</div>
	);
}
