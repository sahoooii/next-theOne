/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Gender, Member, SearchGender } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	MemberProfileSchema,
	memberProfileSchema,
} from '@/lib/schema/memberProfileSchema';

import {
	Form,
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import ReadOnlyField from '@/components/edit/ReadOnlyField';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { selectItemClass } from '@/lib/styles';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Props = {
	member?: Member;
	mode: 'create' | 'edit';
	onSubmit: (data: unknown) => Promise<void>;
};

const genderOptions = [
	{ value: Gender.MALE, label: 'Male' },
	{ value: Gender.FEMALE, label: 'Female' },
	{ value: Gender.NON_BINARY, label: 'Non Binary' },
];

const searchGenderOptions = [
	{ value: SearchGender.MALE, label: 'Male' },
	{ value: SearchGender.FEMALE, label: 'Female' },
	{ value: SearchGender.NON_BINARY, label: 'Non Binary' },
	{ value: SearchGender.ANY, label: 'any' },
];

const MemberProfileForm = ({ member, mode, onSubmit }: Props) => {
	const [formError, setFormError] = useState('');

	const router = useRouter();

	const form = useForm<MemberProfileSchema>({
		resolver: zodResolver(memberProfileSchema),
		mode: 'onTouched',
		defaultValues: {
			name: member?.name || '',
			description: member?.description || '',
			city: member?.city || '',
			country: member?.country || '',
			gender: member?.gender,
			searchGender: member?.searchGender,
			dateOfBirth: member?.dateOfBirth,
		},
	});

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
			{mode === 'create' && <MemberDetailPageHeader title='Complete Profile' />}
			{mode === 'edit' && <MemberDetailPageHeader title='Edit Profile' />}

			<Form {...form}>
				<form className='space-y-8'>
					{/* Info Grid */}
					<div className='grid md:grid-cols-2 gap-4'>
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

						{/* DOB */}
						<FormField
							control={form.control}
							name='dateOfBirth'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xs text-gray-400'>
										Date of Birth
									</FormLabel>

									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													className={cn(
														'w-full justify-start bg-white/50 border-black/10',
														!field.value && 'text-gray-400',
													)}
												>
													{field.value
														? format(field.value, 'PPP')
														: 'Select your date of birth'}
												</Button>
											</FormControl>
										</PopoverTrigger>

										<PopoverContent className='w-auto p-0'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
											/>
										</PopoverContent>
									</Popover>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Gender */}
						{mode === 'create' && (
							<FormField
								control={form.control}
								name='gender'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xs text-gray-400'>
											Gender
										</FormLabel>

										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className='bg-white/50 border-black/10'>
													<SelectValue placeholder='Select your gender' />
												</SelectTrigger>
											</FormControl>

											<SelectContent
												className='
    bg-white
    border border-black/10
    shadow-xl
    rounded-xl
  '
											>
												{genderOptions.map((gender) => (
													<SelectItem
														key={gender.value}
														value={gender.value}
														className={selectItemClass}
													>
														{gender.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>

										<FormMessage className='text-sm text-red-400' />
									</FormItem>
								)}
							/>
						)}
						{/* Read only - Gender */}
						{mode === 'edit' && member && (
							<ReadOnlyField label='Gender' id='gender' value={member.gender} />
						)}

						{/* Search Gender */}

						<FormField
							control={form.control}
							name='searchGender'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xs text-gray-400'>
										Looking For
									</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='bg-white/50 border-black/10'>
												<SelectValue placeholder="Select who you'd like to meet" />
											</SelectTrigger>
										</FormControl>

										<SelectContent
											className='
    bg-white
    border border-black/10
    shadow-xl
    rounded-xl
  '
										>
											{searchGenderOptions.map((gender) => (
												<SelectItem
													key={gender.value}
													value={gender.value}
													className={selectItemClass}
												>
													{gender.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									<FormMessage className='text-sm text-red-400' />
								</FormItem>
							)}
						/>
						{/* Read only - Search Gender */}
						{mode === 'edit' && member && (
							<ReadOnlyField
								label='SearchGender'
								id='searchGender'
								value={member.searchGender}
							/>
						)}

						{/* Read only - Age */}
						{/* <ReadOnlyField
							label='Age'
							id='age'
							value={calculateAge(member.dateOfBirth)}
						/>
 */}

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

						{/* Editable - Country */}
						<FormField
							control={form.control}
							name='country'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xs text-gray-400'>
										Country
									</FormLabel>
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
					</div>

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

export default MemberProfileForm;
