'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetHeader,
} from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { GiMatchTip } from 'react-icons/gi';
import { IoMdPeople, IoIosLogIn } from 'react-icons/io';
import { IoListSharp, IoPersonAddOutline } from 'react-icons/io5';
import { TiMessages } from 'react-icons/ti';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const linkStyleLg =
	'text-xl uppercase transition hover:text-gray-300 font-semibold tracking-wide';
const linkStyleMobile = 'hover:text-gray-300 flex items-center gap-3';

const links = [
	{ href: '/members', label: 'Members' },
	{ href: '/lists', label: 'Lists' },
	{ href: '/messages', label: 'Messages' },
];

const TopNav = () => {
	// For hamburger menu button
	const [open, setOpen] = useState(false);

	const pathname = usePathname();

	return (
		<nav className='w-full bg-gradient-to-r from-purple-400 to-purple-700 text-white'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-6'>
				{/* Left：Logo */}
				<Link
					href='/'
					className='flex items-center gap-3 hover:opacity-40 transition duration-300'
				>
					<GiMatchTip size={40} className='text-gray-200' />
					<h1 className='font-display text-4xl font-semibold tracking-[0.15em]'>
						<span className='text-white'>Next</span>
						<span className='bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent ml-1'>
							Match
						</span>
					</h1>
				</Link>
				{/* Center Nav（Only desktop） */}
				<div className='hidden lg:flex items-center gap-8 relative'>
					{links.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href}
								className='relative px-3 py-2 text-white'
							>
								{isActive && (
									<motion.div
										layoutId='active-nav'
										className='absolute inset-0 bg-white/20 rounded-md'
										transition={{ type: 'spring', stiffness: 300, damping: 30 }}
										whileTap={{ scale: 0.95 }}
									/>
								)}
								<span className={`${linkStyleLg} relative z-10`}>
									{link.label}
								</span>
							</Link>
						);
					})}
				</div>
				{/* Right side（Only desktop） */}
				<div className='hidden lg:flex items-center gap-4'>
					<Button
						asChild
						variant='ghost'
						className='ttext-white text-lg hover:bg-white/10 rounded-md px-4'
					>
						<Link href='/login'>Login</Link>
					</Button>
					<Button
						asChild
						variant='ghost'
						className='text-white text-lg hover:bg-white/10 rounded-md px-4'
					>
						<Link href='/register'>Register</Link>
					</Button>
				</div>
				{/* Mobile hamburger menuー */}
				<div className='lg:hidden'>
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								className='text-white p-4'
								aria-label='Open menu'
							>
								<Menu className='w-8 h-8' />
							</Button>
						</SheetTrigger>

						<SheetContent side='right' className='bg-purple-700 text-white'>
							<SheetHeader>
								<VisuallyHidden>
									<SheetTitle>Mobile navigation menu</SheetTitle>
								</VisuallyHidden>
							</SheetHeader>

							<div className='mt-10 flex flex-col gap-6 text-lg'>
								<Link
									href='/members'
									className={`${linkStyleMobile}`}
									onClick={() => setOpen(false)}
								>
									<IoMdPeople size={28} />
									Members
								</Link>
								<Link
									href='/lists'
									className={`${linkStyleMobile}`}
									onClick={() => setOpen(false)}
								>
									<IoListSharp size={28} />
									Lists
								</Link>
								<Link
									href='/messages'
									className={`${linkStyleMobile}`}
									onClick={() => setOpen(false)}
								>
									<TiMessages size={28} />
									Messages
								</Link>

								<div className='border-t border-white/30 pt-6 flex flex-col gap-4'>
									<Link
										href='/login'
										className={`${linkStyleMobile}`}
										onClick={() => setOpen(false)}
									>
										<IoIosLogIn size={28} />
										Login
									</Link>
									<Link
										href='/register'
										className={`${linkStyleMobile}`}
										onClick={() => setOpen(false)}
									>
										<IoPersonAddOutline size={28} />
										Register
									</Link>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
};

export default TopNav;
