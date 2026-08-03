import { IconType } from 'react-icons';
import { Users, List, MessageCircle } from 'lucide-react';

export type NavLink = {
	href: string;
	label: string;
	icon?: IconType;
	auth?: 'guest' | 'user' | 'admin';
};

export const authNavLinks: NavLink[] = [
	{ href: '/members', label: 'Members', icon: Users },
	{ href: '/lists', label: 'Lists', icon: List },
	{ href: '/messages', label: 'Messages', icon: MessageCircle },
];

export const guestNavLinks: NavLink[] = [{ href: '/login', label: 'Login' }];
