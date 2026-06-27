'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

export const useSignOut = () => {
	const [isSigningOut, setIsSigningOut] = useState(false);

	const handleSignOut = async () => {
		if (isSigningOut) return;

		setIsSigningOut(true);

		await signOut({
			callbackUrl: '/login',
		});
	};

	return {
		isSigningOut,
		handleSignOut,
	};
};
