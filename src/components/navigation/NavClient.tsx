'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { motion } from 'framer-motion';
import { navLinks } from './navLinks';
import MobileMenu from './MobileMenu';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { IoSparkles } from 'react-icons/io5';
import { Users } from 'lucide-react';


const linkStyleLg =
	'text-xl uppercase font-semibold text-white/90 hover:text-white transition';

const NavClient = ({ session }: { session: Session | null }) => {
	const pathname = usePathname();

	// Filter by auth
	const filteredLinks = navLinks.filter((link) => {
		if (!link.auth) return true;

		if (link.auth === 'guest') return !session;
		if (link.auth === 'user') return session;

		return false;
	});

	// For main nav menu
	const leftLinks = filteredLinks.filter((link) => link.label !== 'Login');
	// For a login menu
	const rightLinks = filteredLinks.filter((link) => link.label === 'Login');

	return (
		<nav className='sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-950/80 via-purple-900/70 to-purple-950/80 border-b border-white/10 shadow-lg shadow-black/20'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
				{/* Left：Logo */}
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

							<Link
								href='/register'
								className='rounded-md bg-primary px-4 py-2 text-white font-semibold hover:bg-primary/90 transition'
							>
								Register
							</Link>
						</>
					) : (
						// Separate file
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className='focus:outline-none'>
									<Avatar
										className='
          cursor-pointer
          transition-all duration-300
          hover:scale-105
          hover:ring-2 hover:ring-purple-400/60
          hover:shadow-[0_0_12px_rgba(168,85,247,0.6)]
        '
									>
										<AvatarImage src={session.user?.image || ''} />

										<AvatarFallback className='bg-purple-500/20 text-white'>
											{session.user?.name?.charAt(0) || <Users size={18} />}
										</AvatarFallback>
									</Avatar>
								</button>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								align='end'
								className='
    w-52
    bg-purple-950/95
    backdrop-blur-xl
    border border-white/10
    shadow-[0_10px_40px_rgba(0,0,0,0.6)]
    animate-in fade-in zoom-in-95
  '
							>
								{/* User info */}
								<div className='px-3 py-2 border-b border-white/10'>
									<p className='text-sm text-white font-medium'>
										{session.user?.name || 'User'}
									</p>
									<p className='text-xs text-white/60'>{session.user?.email}</p>
								</div>
								{/* Menu */}
								<DropdownMenuItem
									asChild
									className='cursor-pointer hover:bg-white/10 transition text-white'
								>
									<Link href='/profile'>Edit Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => signOut({ callbackUrl: '/login' })}
									className='cursor-pointer text-red-400 hover:bg-red-500/10 transition'
								>
									Sign out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
				{/* Mobile hamburger menuー */}
				<MobileMenu session={session} />
			</div>
		</nav>
	);
};

export default NavClient;
