import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
	label: string;
	id: string;
	value: string | number;
};

const ReadOnlyField = ({ label, id, value }: Props) => {
	return (
		<div className='space-y-2'>
			<Label htmlFor={id} className='text-xs text-gray-400'>
				{label}
			</Label>

			<Input
				id={id}
				value={value}
				readOnly
				className='
					bg-white/30
					border-black/10
					text-gray-600
					cursor-default
					focus-visible:ring-0
					focus-visible:ring-offset-0
				'
			/>
		</div>
	);
};

export default ReadOnlyField;
