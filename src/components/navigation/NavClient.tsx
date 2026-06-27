'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import { motion} from 'framer-motion';
import { usePathname } from 'next/navigation';

import { useSignOut } from '@/hooks/useSignOut';
import { navLinks } from './navLinks';
import MobileMenu from './MobileMenu';
import DropdownMenuDeskTop from './DropdownMenuDeskTop';

import { IoSparkles } from 'react-icons/io5';

const linkStyleLg =
	'text-xl uppercase font-semibold text-white/90 hover:text-white transition';

const NavClient = ({
	session,
	userInfo,
}: {
	session: Session | null;
	userInfo: {
		name: string | null;
		image: string | null;
	} | null;
}) => {
	const { isSigningOut, handleSignOut } = useSignOut();

	const pathname = usePathname();

	// Filter by auth
	const filteredLinks = navLinks.filter((link) => {
		if (!link.auth) return true;

		if (link.auth === 'guest') return !session;
		if (link.auth === 'user') return session;

		return false;
	});

	// For main nav menu ex: Members, Lists, Messages
	const leftLinks = filteredLinks.filter((link) => link.label !== 'Login');
	// For a login menu
	const rightLinks = filteredLinks.filter((link) => link.label === 'Login');

	return (
		<nav className='sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-950/80 via-purple-900/70 to-purple-950/80 border-b border-white/10 shadow-lg shadow-black/20'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-6 h-20'>
				{/* Left：Brand Logo */}
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
				{/* Center Nav（Only desktop） */}
				<div className='hidden lg:flex items-center gap-8 relative'>
					{leftLinks.map((link) => {
						// For ex:/messages/123
						const isActive = pathname.startsWith(link.href);

						return (
							<Link
								key={link.href}
								href={link.href}
								className='relative px-3 py-2 text-white group'
							>
								<span className={`${linkStyleLg} relative z-10`}>
									{link.label}
								</span>

								{/* hover underline */}
								{!isActive && (
									<span className='absolute left-0 -bottom-1 h-[2px] w-full bg-purple-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center' />
								)}

								{/* active underline */}
								{isActive && (
									<motion.span
										layoutId='active-nav'
										className='absolute left-0 -bottom-1 h-[2px] w-full bg-purple-300'
										transition={{ type: 'spring', stiffness: 300, damping: 30 }}
									/>
								)}
							</Link>
						);
					})}
				</div>
				{/* Right side（Only desktop） */}
				<div className='hidden lg:flex items-center gap-6'>
					{!session ? (
						<>
							{rightLinks.map((link) => {
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
						</>
					) : (
						<DropdownMenuDeskTop
							session={session}
							userInfo={userInfo}
							isSigningOut={isSigningOut}
							onSignOut={handleSignOut}
						/>
					)}
				</div>
				{/* Mobile hamburger menuー */}
				<MobileMenu
					session={session}
					userInfo={userInfo}
					isSigningOut={isSigningOut}
					onSignOut={handleSignOut}
				/>
			</div>
		</nav>
	);
};

export default NavClient;
