import Link from 'next/link';

import { GiBigDiamondRing } from 'react-icons/gi';

const Footer = () => {
	return (
		<footer className='border-t border-purple-950/10 bg-white'>
			<div className='mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20'>
				<div className='flex flex-col gap-12 md:flex-row md:items-start md:justify-between'>
					{/* Brand */}
					<div>
						<Link href='/home' className='inline-flex items-center gap-4'>
							{/* Diamond Ring */}
							<GiBigDiamondRing
								className='ml-1 h-7 w-7 text-purple-700'
								aria-hidden='true'
							/>

							<span className='font-display text-3xl font-normal tracking-wide text-purple-950'>
								THE ONE
							</span>
						</Link>

						<p className='mt-5 text-sm tracking-wide text-purple-950/50'>
							Meaningful connections start with one.
						</p>

						<div className='flex flex-col gap-2 tracking-wide text-purple-950/40'>
							<span className='mt-5 text-sm font-bold'>Contact Us</span>
							<div className='text-xs'>
								<p>364 Seaside Ave, Honolulu, HI 96815 USA</p>
								<p>TEL: (808)-808-808</p>
								<p>Mail: the-one@example</p>
							</div>
						</div>
					</div>

					{/* Links */}
					<nav className='flex flex-wrap items-center gap-x-8 gap-y-4 md:pt-2'>
						<Link
							href='/privacy'
							className='text-sm tracking-wide text-purple-950/50 transition-colors hover:text-purple-950'
						>
							Privacy
						</Link>

						<Link
							href='/terms'
							className='text-sm tracking-wide text-purple-950/40 transition-colors hover:text-purple-950'
						>
							Terms
						</Link>
					</nav>
				</div>

				{/* Copyright */}
				<div className='mt-16 border-t border-purple-950/5 pt-6'>
					<p className='text-xs tracking-wide text-purple-950/30'>
						&copy; 2026 The One. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
