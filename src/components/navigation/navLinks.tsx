import { IconType } from 'react-icons';
import { Users, List, MessageCircle, UserCircle } from 'lucide-react';

export type NavLink = {
	href: string;
	label: string;
	icon?: IconType;
	auth?: 'guest' | 'user' | 'admin';
};

export const navLinks: NavLink[] = [
	{ href: '/members', label: 'Members', icon: Users, auth: 'user' },
	{ href: '/lists', label: 'Lists', icon: List, auth: 'user' },
	{ href: '/messages', label: 'Messages', icon: MessageCircle, auth: 'user' },
	{
		href: '/profile',
		label: 'Profile',
		icon: UserCircle,
		auth: 'user',
	},
	{ href: '/login', label: 'Login', auth: 'guest' },
];
