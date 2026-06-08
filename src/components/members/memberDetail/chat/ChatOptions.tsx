import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
	onDeleteClick: () => void;
};

const ChatOptions = ({ onDeleteClick }: Props) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	return (
		<DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
			<DropdownMenuTrigger asChild>
				<button
					className='
						mt-1
						opacity-0
						text-gray-400
						transition-opacity
		group-hover:opacity-100 focus:outline-none
					'
				>
					<MoreHorizontal className='h-4 w-4' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='start'
				side='left'
				className='
		w-32
		rounded-2xl
		border-black/10
		bg-white/90
		backdrop-blur-xl
	'
			>
				<DropdownMenuItem
					onSelect={() => {
						setDropdownOpen(false);
						onDeleteClick();
					}}
					className='
		cursor-pointer
		rounded-xl
		py-2.5
		text-purple-700
		focus:bg-purple-50
	'
				>
					<Trash2 className='mr-2 h-4 w-4' />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ChatOptions;
