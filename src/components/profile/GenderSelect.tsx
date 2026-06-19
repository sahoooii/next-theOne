import { Control, FieldValues, Path} from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { selectItemClass } from '@/lib/styles';

type Option = {
	value: string;
	label: string;
};

type GenderSelectProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder: string;
	options: Option[];
};

export function GenderSelect<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	options,
}: GenderSelectProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className='text-xs text-gray-400'>{label}</FormLabel>

					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className='bg-white/50 border-black/10'>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>

						<SelectContent className='bg-white border border-black/10 shadow-xl rounded-xl'>
							{options.map((option) => (
								<SelectItem
									key={option.value}
									value={option.value}
									className={selectItemClass}
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<FormMessage className='text-sm text-red-400' />
				</FormItem>
			)}
		/>
	);
}
