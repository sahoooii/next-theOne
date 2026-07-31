'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { Session } from 'next-auth';
import { useSignOut } from '@/hooks/useSignOut';

import { authNavLinks } from '../navLinks';
import BrandLogo from './BrandLogo';
import DropdownMenuDeskTop from './DropdownMenuDeskTop';
import AuthMobileMenu from '../mobile/AuthMobileMenu';

const navMenuStyleLg =
	'text-xl uppercase font-semibold text-white/90 hover:text-white transition';

	type Props =  {
		session: Session | null;
		userInfo: {
			name: string | null;
			image: string | null;
		} | null;
	};

/* Center Nav（Only desktop） */
const AuthNav = ({
	session,
	userInfo,
}: Props) => {
	const pathname = usePathname();

	const { isSigningOut, handleSignOut } = useSignOut();

	return (
		<nav className='sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-950/80 via-purple-900/70 to-purple-950/80 border-b border-white/10 shadow-lg shadow-black/20'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-6 h-20'>
				{/* Left：Brand Logo */}
				<BrandLogo />

				<div className='hidden lg:flex items-center gap-8 relative'>
					{authNavLinks.map((link) => {
						// For ex:/messages/123
						const isActive = pathname.startsWith(link.href);
						return (
							<Link
								key={link.href}
								href={link.href}
								className='relative px-3 py-2 text-white group'
							>
								<span className={`${navMenuStyleLg} relative z-10`}>
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
					{session && (
						<DropdownMenuDeskTop
							session={session}
							userInfo={userInfo}
							isSigningOut={isSigningOut}
							onSignOut={handleSignOut}
						/>
					)}
				</div>

				<AuthMobileMenu
					session={session}
					userInfo={userInfo}
					isSigningOut={isSigningOut}
					onSignOut={handleSignOut}
				/>
			</div>
		</nav>
	);
};

export default AuthNav;
