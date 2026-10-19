'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { Session } from 'next-auth';
import { useSignOut } from '@/hooks/useSignOut';

import { useConversation } from '@/providers/ConversationProvider';
import { useConnections } from '@/providers/ConnectionsProvider';

import { getAuthNavLinks } from '../shared/navLinks';
import BrandLogo from '../shared/BrandLogo';
import UnreadBadge from '../shared/UnreadBadge';
import DropdownMenuDeskTop from './desktop/DropdownMenuDeskTop';
import AuthMobileMenu from './mobile/AuthMobileMenu';
import { SlidersHorizontal } from 'lucide-react';

type Props = {
	session: Session | null;
	userInfo: {
		name: string | null;
		image: string | null;
	} | null;
};

const AuthNav = ({ session, userInfo }: Props) => {
	const pathname = usePathname();
	// Preferences button only display at Members page
	const isMembersPage = pathname === '/members';

	const { isSigningOut, handleSignOut } = useSignOut();

	// Count unread messages
	const { conversations } = useConversation();

	const unreadConversationCount = conversations.filter(
		(conversation) => conversation.unreadCount > 0,
	).length;

	// Count unseen Connections
	const { unseenLikeIds, unseenMatchIds } = useConnections();

	const connectionsBadgeCount = unseenLikeIds.length + unseenMatchIds.length;

	const navLinks = getAuthNavLinks(
		unreadConversationCount,
		connectionsBadgeCount,
	);

	return (
		<nav className='sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-purple-950/85 via-purple-950/80 to-purple-950/85 shadow-lg shadow-black/20 backdrop-blur-xl'>
			<div className='relative mx-auto flex h-[88px] max-w-6xl items-center justify-between px-6'>
				{/* Left: Brand Logo */}
				<BrandLogo />

				{/* Center Nav: Desktop only */}
				<div className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex'>
					{navLinks.map((link) => {
						// For example: /messages/123
						const isActive = pathname.startsWith(link.href);
						const Icon = link.icon;

						return (
							<Link
								key={link.href}
								href={link.href}
								aria-current={isActive ? 'page' : undefined}
								className={`group relative flex min-w-[84px] flex-col items-center gap-1 rounded-md px-3 py-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70 ${
									isActive
										? 'text-purple-300'
										: 'text-white/55 hover:text-white/90'
								}`}
							>
								{/* Icon and notification badge */}
								<span className='relative inline-flex items-center justify-center'>
									{Icon && (
										<Icon size={21} strokeWidth={1.8} aria-hidden='true' />
									)}

									<UnreadBadge
										count={link.badge ?? 0}
										className='absolute -right-3 -top-2'
									/>
								</span>
								{/* Label */}
								<span className='relative z-10 text-[11px] font-medium uppercase tracking-[0.12em]'>
									{link.label}
								</span>
								{/* Hover underline */}
								{!isActive && (
									<span className='absolute bottom-0 left-3 right-3 h-[2px] origin-center scale-x-0 bg-purple-300/70 transition-transform duration-300 group-hover:scale-x-100' />
								)}
								{/* Active underline */}
								{isActive && (
									<motion.span
										layoutId='active-nav'
										className='absolute bottom-0 left-3 right-3 h-[2px] bg-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.6)]'
										transition={{
											type: 'spring',
											stiffness: 300,
											damping: 30,
										}}
									/>
								)}{' '}
							</Link>
						);
					})}
				</div>

				{/* Right side: Desktop only */}
				<div className='ml-auto hidden items-center gap-5 lg:flex'>
					{/* Preferences button */}
					{/* {isMembersPage && (
						<button
							type='button'
							aria-label='Preferences'
							title='Preferences'
							className='relative flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-purple-300'
						>
							<SlidersHorizontal size={21} strokeWidth={1.8} />
						</button>
					)}
 */}
					{session && (
						<DropdownMenuDeskTop
							session={session}
							userInfo={userInfo}
							isSigningOut={isSigningOut}
							onSignOut={handleSignOut}
						/>
					)}
				</div>

				{/* Mobile menu: Keep existing design */}
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
