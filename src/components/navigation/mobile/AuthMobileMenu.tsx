'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetTitle,
	SheetDescription,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { Menu, User, UserCircle} from 'lucide-react';

import { SignOutProps } from '@/types';
import { transformImageUrl } from '@/lib/transFormImageUrl';
import { SignOutButton } from '../shared/SignOutButton';

type Props = SignOutProps & {
	session: Session | null;
	userInfo: {
		name: string | null;
		image: string | null;
	} | null;
};

const AuthMobileMenu = ({
	session,
	userInfo,
	onSignOut,
}: Props) => {
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
					<SheetDescription className='sr-only'>
						User account navigation menu
					</SheetDescription>

					<div className='mt-8 flex flex-col gap-6'>
						{/* User Info */}
						<div className='flex items-center gap-4 px-4 pb-4 border-b border-white/10'>
							<Avatar className='h-12 w-12 ring-2 ring-purple-400/40'>
								<AvatarImage
									className='object-cover object-[center_20%]'
									src={transformImageUrl(userInfo?.image, 'avatar') || ''}
								/>
								<AvatarFallback>
									{userInfo?.name?.charAt(0) || <User />}
								</AvatarFallback>
							</Avatar>

							<div>
								<p className='text-sm font-semibold'>
									{userInfo?.name || 'User'}
								</p>
								<p className='text-xs text-white/60'>{session?.user?.email}</p>
							</div>
						</div>

						{/* Side bar: Menu */}
						<div className='flex flex-col gap-2 px-2'>
							<SheetClose asChild>
								<Link className='menu-item' href='/members/edit'>
									<UserCircle size={22} />
									Edit Profile
								</Link>
							</SheetClose>

							{/* SignOut */}
							<SheetClose asChild>
								<SignOutButton
									variant='menu'
									onSignOut={onSignOut}
									onSuccess={() => setOpen(false)}
								/>
							</SheetClose>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default AuthMobileMenu;
