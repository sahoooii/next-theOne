'use client';

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/app/components/ui/navigation-menu';
import { GiMatchTip } from 'react-icons/gi';

const TopNav = () => {
	return (
		<nav className='w-full bg-gradient-to-r from-purple-400 to-purple-700 text-white'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
				<div className='flex items-center gap-3'>
					<GiMatchTip size={40} />
					<div className='flex text-3xl font-bold'>
						<span>Next</span>
						<span>Match</span>
					</div>
				</div>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink href='#members'>Members</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href='#about'>About</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</nav>
	);
};

export default TopNav;
