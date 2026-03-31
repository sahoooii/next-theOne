'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetTitle,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { Button } from '@/components/ui/button';
import { Menu, LogIn, User, UserCircle, LogOut } from 'lucide-react';


const MobileMenu = ({ session }: { session: Session | null }) => {
	// For hamburger menu button
	const [open, setOpen] = useState(false);

	const pathname = usePathname();

	// When change a route, close a menu
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<div className='lg:hidden'>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button variant='ghost' className='text-white p-4'>
						<Menu className='w-8 h-8' />
					</Button>
				</SheetTrigger>

				<SheetContent
					side='right'
					className='bg-purple-950/95 backdrop-blur-xl border-l border-white/10 text-white'
				>
					<SheetTitle className='sr-only'>Mobile navigation menu</SheetTitle>
					<div className='mt-8 flex flex-col gap-6'>
						{/* 🔥 User Info */}
						{session && (
							<div className='flex items-center gap-4 px-4 pb-4 border-b border-white/10'>
								<Avatar className='h-12 w-12 ring-2 ring-purple-400/40'>
									<AvatarImage src={session.user?.image || ''} />
									<AvatarFallback>
										{session.user?.name?.charAt(0) || <User />}
									</AvatarFallback>
								</Avatar>

								<div>
									<p className='text-sm font-semibold'>
										{session.user?.name || 'User'}
									</p>
									<p className='text-xs text-white/60'>{session.user?.email}</p>
								</div>
							</div>
						)}

						{/* 🔥 Menu */}
						<div className='flex flex-col gap-2 px-2'>
							{!session ? (
								<>
									<SheetClose asChild>
										<Link className='menu-item' href='/login'>
											<LogIn size={20} strokeWidth={1.8} />
											Login
										</Link>
									</SheetClose>

									<SheetClose asChild>
										<Link className='menu-item-primary' href='/register'>
											Register
										</Link>
									</SheetClose>
								</>
							) : (
								<>
									<SheetClose asChild>
										<Link className='menu-item' href='/profile'>
											<UserCircle size={22} />
											Edit Profile
										</Link>
									</SheetClose>

									<SheetClose asChild>
										<button
											onClick={() => signOut({ callbackUrl: '/login' })}
											className='menu-item text-red-400 hover:bg-red-500/10'
										>
											<LogOut size={20} />
											Sign out
										</button>
									</SheetClose>
								</>
							)}
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default MobileMenu;
