'use client';

import { Button } from '@/components/ui/button';
import { GiMatchTip } from 'react-icons/gi';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { IoMdPeople } from 'react-icons/io';

const linkStyle = 'text-xl uppercase transition hover:text-gray-300';

const TopNav = () => {
	return (
		<nav className='w-full bg-gradient-to-r from-purple-400 to-purple-700 text-white'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-6'>
				{/* 🔥 左：ロゴ */}
				<Link
					href='/'
					className='flex items-center gap-3 hover:opacity-40 transition duration-300'
				>
					<GiMatchTip size={40} className='text-gray-200' />
					<div className='flex text-3xl font-bold'>
						<span className='text-gray-900'>Next</span>
						<span className='text-gray-200'>Match</span>
					</div>
				</Link>
				{/* 🔥 中央ナビ（デスクトップのみ） */}
				{/* Add icon @mobile ver. */}
				<div className='hidden md:flex items-center gap-8'>
					<Link
						href='/members'
						className={`${linkStyle} flex items-center gap-2`}
					>
						<IoMdPeople size={28} className='lg:hidden' />
						Members
					</Link>
					<Link href='/lists' className={`${linkStyle}`}>
						Lists
					</Link>
					<Link href='/messages' className={`${linkStyle}`}>
						Messages
					</Link>
				</div>
				{/* 🔥 右側（デスクトップのみ） */}{' '}
				<div className='hidden md:flex items-center gap-4'>
					<Button
						asChild
						variant='link'
						className='text-white text-lg hover:bg-white/20'
					>
						<Link href='/login'>Login</Link>
					</Button>

					<Button
						asChild
						variant='link'
						className='text-white text-lg hover:bg-white/20'
					>
						<Link href='/register'>Register</Link>
					</Button>
				</div>
				{/* 🔥 モバイル用ハンバーガー */}
				<div className='md:hidden'>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant='ghost' className='text-white h-14 w-14'>
								<Menu size={30} />
							</Button>
						</SheetTrigger>

						<SheetContent side='right' className='bg-purple-700 text-white'>
							<div className='mt-10 flex flex-col gap-6 text-lg'>
								<Link href='/members' className='hover:text-gray-300'>
									Members
								</Link>
								<Link href='/lists' className='hover:text-gray-300'>
									Lists
								</Link>
								<Link href='/messages' className='hover:text-gray-300'>
									Messages
								</Link>

								<div className='border-t border-white/30 pt-6 flex flex-col gap-4'>
									<Link href='/login' className='hover:text-gray-300'>
										Login
									</Link>
									<Link href='/register' className='hover:text-gray-300'>
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
