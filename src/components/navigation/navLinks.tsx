import { IconType } from 'react-icons';
import { IoMdPeople } from 'react-icons/io';
import { IoListSharp } from 'react-icons/io5';
import { TiMessages } from 'react-icons/ti';
import { IoPersonCircleOutline } from 'react-icons/io5';

export type NavLink = {
	href: string;
	label: string;
	icon?: IconType;
	auth?: 'guest' | 'user' | 'admin';
};

export const navLinks: NavLink[] = [
	{ href: '/members', label: 'Members', icon: IoMdPeople, auth: 'user' },
	{ href: '/lists', label: 'Lists', icon: IoListSharp, auth: 'user' },
	{ href: '/messages', label: 'Messages', icon: TiMessages, auth: 'user' },
	{
		href: '/profile',
		label: 'Profile',
		icon: IoPersonCircleOutline,
		auth: 'user',
	},
	{ href: '/login', label: 'Login' },
];
