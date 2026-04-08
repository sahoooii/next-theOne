import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

import { Users } from 'lucide-react';

const DropdownMenuDeskTop = ({ session }: { session: Session | null }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='focus:outline-none'>
					<Avatar
						className='
          cursor-pointer
          transition-all duration-300
          hover:scale-105
          hover:ring-2 hover:ring-purple-400/60
          hover:shadow-[0_0_12px_rgba(168,85,247,0.6)]
					w-11 h-11 ring-1 ring-white/10
        '
					>
						<AvatarImage
							className='object-cover object-top'
							src={session?.user?.image || ''}
						/>

						<AvatarFallback className='bg-purple-500/20 text-white'>
							{session?.user?.name?.charAt(0) || <Users size={18} />}
						</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='end'
				className='
    w-52
    bg-purple-950/95
    backdrop-blur-xl
    border border-white/10
    shadow-[0_10px_40px_rgba(0,0,0,0.6)]
    animate-in fade-in zoom-in-95
  '
			>
				{/* User info */}
				<div className='px-3 py-2 border-b border-white/10'>
					<p className='text-sm text-white font-medium'>
						{session?.user?.name || 'User'}
					</p>
					<p className='text-xs text-white/60'>{session?.user?.email}</p>
				</div>
				{/* Menu */}
				<DropdownMenuItem
					asChild
					className='cursor-pointer hover:bg-white/10 transition text-white'
				>
					<Link href='/profile'>Edit Profile</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						signOut({
							callbackUrl: '/login',
						})
					}
					className='cursor-pointer text-red-400 hover:bg-red-500/10 transition'
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownMenuDeskTop;
