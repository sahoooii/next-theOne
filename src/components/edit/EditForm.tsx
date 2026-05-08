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
import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { Input } from '@/components/ui/input';
import { calculateAge } from '@/lib/utils';
import ReadOnlyField from './ReadOnlyField';

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
		<Card
			className='
				h-full
				bg-white/70 backdrop-blur-md
				border border-black/10
				rounded-2xl
				p-8
			'
		>
			{/* Header */}
			<MemberDetailPageHeader title='Edit Profile' />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					{/* Info Grid */}
					<div className='grid grid-cols-2 gap-4'>
						{/* Editable - Name */}
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xs text-gray-400'>Name</FormLabel>
									<FormControl>
										<Input
											className='bg-white/50 border-black/10'
											placeholder='Your name'
											{...field}
										/>
									</FormControl>
									<FormMessage className='text-sm text-red-400' />
								</FormItem>
							)}
						/>

						{/* Read only - Gender */}
						<ReadOnlyField label='Gender' id='gender' value={member.gender} />

						{/* Read only - Age */}
						<ReadOnlyField
							label='Age'
							id='age'
							value={calculateAge(member.dateOfBirth)}
						/>

						{/* Editable - City */}
						<FormField
							control={form.control}
							name='city'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xs text-gray-400'>City</FormLabel>
									<FormControl>
										<Input
											className='bg-white/50 border-black/10'
											placeholder='City'
											{...field}
										/>
									</FormControl>
									<FormMessage className='text-sm text-red-400' />
								</FormItem>
							)}
						/>
					</div>

					{/* Editable - Country */}
					<FormField
						control={form.control}
						name='country'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-xs text-gray-400'>Country</FormLabel>

								<FormControl>
									<Input
										className='bg-white/50 border-black/10'
										placeholder='Country'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Editable - Description */}
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-xs text-gray-400'>
									About You
								</FormLabel>

								<FormControl>
									<Textarea
										placeholder='Tell people about yourself'
										className='min-h-[140px] resize-none bg-white/50 border-black/10'
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-sm text-red-400' />
							</FormItem>
						)}
					/>

					{/* Submit */}
					<div className='flex justify-center lg:justify-end'>
						<Button
							type='submit'
							disabled={
								!form.formState.isDirty ||
								!form.formState.isValid ||
								form.formState.isSubmitting
							}
							className='w-full lg:w-auto lg:min-w-32'
						>
							Save Changes
						</Button>
					</div>
				</form>
			</Form>
		</Card>
	);
};

export default EditForm;
