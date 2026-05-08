'use client';

import { useForm } from 'react-hook-form';
import { Member } from '@prisma/client';
import {
	memberEditSchema,
	MemberEditSchema,
} from '@/lib/schema/memberEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Props = {
	member: Member;
};

const EditForm = ({ member }: Props) => {
	const form = useForm<MemberEditSchema>({
		resolver: zodResolver(memberEditSchema),
		mode: 'onTouched',
		defaultValues: {
			name: member.name || '',
			description: member.description || '',
			city: member.city || '',
			country: member.country || '',
		},
	});

	const onSubmit = (data: MemberEditSchema) => {
		console.log(data);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>About me</FormLabel>

							<FormControl>
								<Textarea
									placeholder='Tell people about yourself'
									className='flex min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500'
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-sm text-red-500' />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					disabled={
						!form.formState.isDirty ||
						!form.formState.isValid ||
						form.formState.isSubmitting
					}
				>
					Save changes
				</Button>
			</form>
		</Form>
	);
};

export default EditForm;
