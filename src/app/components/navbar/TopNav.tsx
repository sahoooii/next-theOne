'use client';

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { GiMatchTip } from 'react-icons/gi';
import Link from 'next/link';

const TopNav = () => {
	return (
		<nav className='w-full bg-gradient-to-r from-purple-400 to-purple-700 text-white'>
			{' '}
			<div className='mx-auto grid max-w-6xl grid-cols-3 items-center px-8 py-3'>
				{/* 左：NextMatch */}
				<Link href='/' className='flex items-center gap-3 justify-self-start'>
					<GiMatchTip size={40} className='text-gray-200' />
					<div className='flex text-3xl font-bold'>
						<span className='text-gray-900'>Next</span>
						<span className='text-gray-200'>Match</span>
					</div>
				</Link>

				{/* 中央：Members */}
				<div className='flex justify-center gap-3'>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink
									href='/members'
									className='text-xl uppercase text-white'
								>
									Members
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink
									href='/lists'
									className='text-xl uppercase text-white'
								>
									Lists
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink
									href='/messages'
									className='text-xl uppercase text-white'
								>
									Messages
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* 右：About */}
				<div className='flex justify-self-end gap-4'>
					<Button
						variant='ghost'
						className='text-white text-lg hover:bg-white/20'
					>
						Login
					</Button>
					<Button
						variant='ghost'
						className='text-white text-lg hover:bg-white/20'
					>
						Register
					</Button>
				</div>
			</div>
		</nav>
	);
};

export default TopNav;
