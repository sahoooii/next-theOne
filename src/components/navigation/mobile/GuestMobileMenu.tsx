'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetTitle,
	SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { Menu, LogIn } from 'lucide-react';

const GuestMobileMenu = () => {
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
						Guest account navigation menu
					</SheetDescription>

					<div className='mt-8 flex flex-col gap-6'>
						{/* Side bar: Menu */}
						<div className='flex flex-col gap-2 px-2'>
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
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default GuestMobileMenu;
