import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const navigationMenuTriggerStyle = cva(
	'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
);

function cn(...inputs: (string | undefined)[]) {
	return twMerge(inputs.filter(Boolean).join(' '));
}

const NavigationMenu = NavigationMenuPrimitive.Root;

const NavigationMenuList = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.List
		ref={ref}
		className={cn('flex items-center gap-4', className)}
		{...props}
	/>
));
NavigationMenuList.displayName = 'NavigationMenuList';

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuLink = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Link>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Link
		ref={ref}
		className={cn(navigationMenuTriggerStyle(), className)}
		{...props}
	/>
));
NavigationMenuLink.displayName = 'NavigationMenuLink';

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
};

