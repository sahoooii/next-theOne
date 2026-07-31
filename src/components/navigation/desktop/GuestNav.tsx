'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { guestNavLinks } from '../navLinks';
import BrandLogo from './BrandLogo';
import GuestMobileMenu from '../mobile/GuestMobileMenu';

const GuestNav = () => {
	const pathname = usePathname();
	return (
		<nav className='sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-950/80 via-purple-900/70 to-purple-950/80 border-b border-white/10 shadow-lg shadow-black/20'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-6 h-20'>
				{/* Left：Brand Logo */}
				<BrandLogo />

				{/* Right side（Only desktop） */}
				<div className='hidden lg:flex items-center gap-6'>
					{guestNavLinks.map((link) => {
						const isActive = pathname === link.href;

						return (
							<Link
								key={link.href}
								href={link.href}
								className='relative px-3 py-2 group text-lg font-semibold text-white/90 hover:text-white'
							>
								{link.label}

								{!isActive && (
									<span className='absolute left-0 -bottom-1 h-[2px] w-full bg-purple-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300' />
								)}

								{isActive && (
									<motion.span
										layoutId='active-nav'
										className='absolute left-0 -bottom-1 h-[2px] w-full bg-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
									/>
								)}
							</Link>
						);
					})}

					{/* Register Button */}
					<Link
						href='/register'
						className='rounded-md bg-primary px-4 py-2 text-white font-semibold hover:bg-primary/90 transition'
					>
						Register
					</Link>
				</div>

				<GuestMobileMenu />
			</div>
		</nav>
	);
};

export default GuestNav;
