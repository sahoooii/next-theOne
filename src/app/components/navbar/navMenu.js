import { IoMdPeople } from 'react-icons/io';
import { IoListSharp } from 'react-icons/io5';
import { TiMessages } from 'react-icons/ti';
import { IoPersonCircleOutline } from 'react-icons/io5';

export const navMenu = [
	{ href: '/members', label: 'Members', icon: IoMdPeople },
	{ href: '/lists', label: 'Lists', icon: IoListSharp },
	{ href: '/messages', label: 'Messages', icon: TiMessages },
	{ href: '/profile', label: 'Profile', icon: IoPersonCircleOutline },
];
