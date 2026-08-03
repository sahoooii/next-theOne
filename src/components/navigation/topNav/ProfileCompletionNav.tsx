'use client';

import { useState } from 'react';
import { useSignOut } from '@/hooks/useSignOut';

import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetTitle,
	SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { Menu } from 'lucide-react';

import BrandLogo from '../shared/BrandLogo';
import { SignOutButton } from '../shared/SignOutButton';

const ProfileCompletionNav = () => {
	// For hamburger menu button
	const [open, setOpen] = useState(false);

	const { handleSignOut } = useSignOut();

	return (
		<nav className='sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-950/80 via-purple-900/70 to-purple-950/80 border-b border-white/10 shadow-lg shadow-black/20'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-6 h-20'>
				{/* Left：Brand Logo */}
				<BrandLogo />

				{/* DeskTop */}
				<div className='hidden lg:flex items-center gap-6'>
					<SignOutButton onSignOut={handleSignOut} />
				</div>

				{/* Mobile */}
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
							<SheetTitle className='sr-only'>
								Mobile navigation menu
							</SheetTitle>
							<SheetDescription className='sr-only'>
								User account navigation menu
							</SheetDescription>

							<div className='mt-8 flex flex-col gap-6'>
								{/* Side bar: Menu */}
								<div className='flex flex-col gap-2 px-2'>
									{/* SignOut */}
									<SheetClose asChild>
										<SignOutButton
											variant='menu'
											onSignOut={handleSignOut}
											onSuccess={() => setOpen(false)}
										/>
									</SheetClose>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
};

export default ProfileCompletionNav;
