// SignOutButton.tsx

'use client';

import { useState } from 'react';
import { Loader2, LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Props = {
	onSignOut: () => Promise<void>;
	onSuccess?: () => void;
	variant?: 'button' | 'menu';
};

export function SignOutButton({
	onSignOut,
	onSuccess,
	variant = 'button',
}: Props) {
	const [isSigningOut, setIsSigningOut] = useState(false);

	const handleSignOut = async () => {
		try {
			setIsSigningOut(true);

			await onSignOut();

			onSuccess?.();
		} finally {
			setIsSigningOut(false);
		}
	};

	if (variant === 'menu') {
		return (
			<button
				onClick={handleSignOut}
				disabled={isSigningOut}
				className='menu-item text-red-400 hover:bg-red-500/10'
			>
				<SignOutContent isSigningOut={isSigningOut} />
			</button>
		);
	}

	return (
		<Button
			onClick={handleSignOut}
			disabled={isSigningOut}
			className='rounded-md bg-primary px-4 py-2 text-white font-semibold hover:bg-primary/90 transition'
		>
			<SignOutContent isSigningOut={isSigningOut} />
		</Button>
	);
}

function SignOutContent({ isSigningOut }: { isSigningOut: boolean }) {
	return isSigningOut ? (
		<>
			<Loader2 className='mr-2 h-4 w-4 animate-spin' />
			<LogOut size={20} />
			Signing out...
		</>
	) : (
		<>
			<LogOut size={20} />
			Sign out
		</>
	);
}
