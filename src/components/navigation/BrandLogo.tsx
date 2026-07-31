import Link from 'next/link';

import { IoSparkles } from 'react-icons/io5';

const BrandLogo = () => {
	return (
		<Link
			href='/'
			className='flex items-center gap-3 hover:scale-[1.02] transition duration-300'
		>
			<div className='flex items-center gap-3'>
				<IoSparkles className='text-purple-200 w-7 h-7 drop-shadow-[0_0_6px_rgba(216,180,254,0.7)]' />
				<h1 className='font-display text-4xl tracking-[0.18em] font-semibold'>
					<span className='text-white'>The</span>
					<span className='bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent ml-1'>
						One
					</span>
				</h1>
			</div>
		</Link>
	);
};

export default BrandLogo;
