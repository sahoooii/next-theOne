'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetHeader,
	SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { IoIosLogIn } from 'react-icons/io';

const MobileMenu = () => {
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
					<Button
						variant='ghost'
						className='text-white p-4'
						aria-label='Open menu'
					>
						<Menu className='w-8 h-8' />
					</Button>
				</SheetTrigger>

				<SheetContent
					side='right'
					className=' bg-purple-950/95 backdrop-blur-xl border-l border-white/10 text-white'
				>
					<SheetHeader>
						<VisuallyHidden>
							<SheetTitle>Mobile navigation menu</SheetTitle>
						</VisuallyHidden>
					</SheetHeader>

					<div className='mt-10 flex flex-col gap-6 text-lg'>
						<div className='border-t border-white/10 pt-6 flex flex-col gap-4'>
							<SheetClose asChild>
								<Link
									href='/login'
									className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition'
								>
									<IoIosLogIn size={26} />
									Login
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link
									href='/register'
									className='flex items-center justify-center rounded-lg bg-primary px-4 py-3 font-semibold hover:bg-primary/90 transition'
								>
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

export default MobileMenu;
