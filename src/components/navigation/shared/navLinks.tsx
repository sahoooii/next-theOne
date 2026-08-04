import { IconType } from 'react-icons';
import { Users, List, MessageCircle } from 'lucide-react';

export type NavLink = {
	href: string;
	label: string;
	icon?: IconType;
	badge?: number;
};

export const getAuthNavLinks = (unreadConversationCount: number): NavLink[] => [
	{
		href: '/members',
		label: 'Members',
		icon: Users,
	},
	{
		href: '/lists',
		label: 'Lists',
		icon: List,
	},
	{
		href: '/messages',
		label: 'Messages',
		icon: MessageCircle,
		badge: unreadConversationCount,
	},
];

export const guestNavLinks: NavLink[] = [{ href: '/login', label: 'Login' }];
