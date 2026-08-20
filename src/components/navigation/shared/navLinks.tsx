import { IconType } from 'react-icons';
import { Users, MessageCircle, Heart } from 'lucide-react';

export type NavLink = {
	href: string;
	label: string;
	icon?: IconType;
	badge?: number;
};

export const getAuthNavLinks = (
	unreadConversationCount: number,
	connectionsBadgeCount: number,
): NavLink[] => [
	{
		href: '/members',
		label: 'Members',
		icon: Users,
	},
	{
		href: '/connections',
		label: 'Connections',
		icon: Heart,
		badge: connectionsBadgeCount,
	},
	{
		href: '/messages',
		label: 'Messages',
		icon: MessageCircle,
		badge: unreadConversationCount,
	},
];

export const guestNavLinks: NavLink[] = [{ href: '/login', label: 'Login' }];
