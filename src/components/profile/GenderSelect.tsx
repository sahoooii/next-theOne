import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Gender } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MemberProfileSchema } from '@/lib/schema/memberProfileSchema';
import { UseFormReturn } from 'react-hook-form';

type GenderSelectProps = {
	form: UseFormReturn<MemberProfileSchema>;
};

const genderOptions = [
	{ value: Gender.MALE, label: 'Male' },
	{ value: Gender.FEMALE, label: 'Female' },
	{ value: Gender.NON_BINARY, label: 'Non Binary' },
];

const GenderSelect = ({ form }: GenderSelectProps) => {
	return (
		<FormField
			control={form.control}
			name='gender'
			render={({ field }) => (
				<FormItem>
					<FormLabel className='text-xs text-gray-400'>Gender</FormLabel>

					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className='bg-white/50 border-black/10'>
								<SelectValue placeholder='Select your gender' />
							</SelectTrigger>
						</FormControl>

						<SelectContent>
							{genderOptions.map((gender) => (
								<SelectItem key={gender.value} value={gender.value}>
									{gender.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<FormMessage className='text-sm text-red-400' />
				</FormItem>
			)}
		/>
	);
};

export default GenderSelect
