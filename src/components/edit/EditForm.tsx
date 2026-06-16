'use client';

import { useForm } from 'react-hook-form';
import { Member } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	memberEditSchema,
	MemberEditSchema,
} from '@/lib/schema/memberEditSchema';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import ReadOnlyField from './ReadOnlyField';
import { calculateAge, handleFormServerErrors } from '@/lib/utils';
import { updateMemberProfile } from '@/app/actions/userActions';
import { useState } from 'react';
import { showToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';

type Props = {
	member: Member;
};

const EditForm = ({ member }: Props) => {
	// For entire of server error
	const [formError, setFormError] = useState('');

	const router = useRouter();

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

	const onSubmit = async (data: MemberEditSchema) => {
		const nameUpdated = data.name !== member.name;
		const result = await updateMemberProfile(data, nameUpdated);


		if (result.status === 'success') {
			showToast('User profile updated successfully', 'success');

			form.reset(data);
			router.refresh();
		} else {
			handleFormServerErrors(result.error, setFormError, form.setError);
		}
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
								<FormMessage className='text-sm text-red-400' />
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

					{/* For entire of server error */}
					{formError && <p className='text-red-500 text-sm'>{formError}</p>}

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
