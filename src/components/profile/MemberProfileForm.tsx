'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { showToast } from '@/lib/toast';
import { Check } from 'lucide-react';
import { Loader2 } from 'lucide-react';

import { Member } from '@prisma/client';

import {
	MemberCreateSchema,
	memberCreateSchema,
} from '@/lib/schema/memberCreateSchema';
import {
	MemberEditSchema,
	memberEditSchema,
} from '@/lib/schema/memberEditSchema';

import {
	createMemberProfile,
	updateMemberProfile,
} from '@/app/actions/userActions';

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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Calendar } from '@/components/ui/calendar';

import { calculateAge, cn, handleFormServerErrors } from '@/lib/utils';
import { countryOptions } from '@/lib/countries';
import ReadOnlyField from '@/components/edit/ReadOnlyField';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import { genderOptions, searchGenderOptions } from '@/lib/constants/memberGenderOptions';
import { GenderSelect } from './GenderSelect';
import DeleteAccount from '../edit/DeleteAccount';

type Props = {
	member?: Member;
	mode: 'create' | 'edit';
};

type MemberFormValues = MemberCreateSchema | MemberEditSchema;

const MemberProfileForm = ({ member, mode }: Props) => {
	// To handle open and close select country list
	const [open, setOpen] = useState(false);

	const router = useRouter();

	const schema = mode === 'create' ? memberCreateSchema : memberEditSchema;

	const defaultValues =
		mode === 'create'
			? {
					description: '',
					city: '',
					country: '',
					gender: undefined,
					searchGender: undefined,
					dateOfBirth: undefined,
				}
			: {
					name: member?.name ?? '',
					description: member?.description ?? '',
					city: member?.city ?? '',
					country: member?.country ?? '',
					searchGender: member?.searchGender,
				};

	const form = useForm<MemberFormValues>({
		resolver: zodResolver(schema),
		mode: 'onTouched',
		defaultValues,
	});

	const [isPending, startTransition] = useTransition();

	const isLoading = form.formState.isSubmitting || isPending;

	// For complete-profile(create)
	const handleCreateSubmit = async (data: MemberCreateSchema) => {
		const result = await createMemberProfile(data);

		if (result.status === 'success') {
			showToast('User profile created successfully', 'success');

			startTransition(() => {
				router.push('/members/edit/photos');
			});
			return;
		}

		const globalError = handleFormServerErrors(result.error, form.setError);

		if (globalError) {
			showToast(globalError, 'error');
		}
	};

	// For edit user profile(edit)
	const handleEditSubmit = async (data: MemberEditSchema) => {
		const nameUpdated = data.name !== member?.name;

		const result = await updateMemberProfile(data, nameUpdated);

		if (result.status === 'success') {
			showToast('User profile updated successfully', 'success');

			form.reset(data);

			startTransition(() => {
				router.refresh();
			});
			return;
		}

		const globalError = handleFormServerErrors(result.error, form.setError);

		if (globalError) {
			showToast(globalError, 'error');
		}
	};

	const onSubmit = async (data: MemberFormValues) => {
		if (mode === 'create') {
			return handleCreateSubmit(data as MemberCreateSchema);
		}

		return handleEditSubmit(data as MemberEditSchema);
	};

	return (
		<>
			<Card
				className='
				w-full max-w-3xl mx-auto
				bg-white/70 backdrop-blur-md
				border border-black/10
				rounded-2xl
				p-8
			'
			>
				{/* Header */}
				{mode === 'create' && (
					<MemberDetailPageHeader title='Complete Profile' />
				)}
				{mode === 'edit' && <MemberDetailPageHeader title='Edit Profile' />}

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						{/* Info Grid */}
						<div className='grid md:grid-cols-2 gap-4'>
							{/* Name */}
							{mode === 'edit' && (
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs text-gray-400'>
												Name
											</FormLabel>
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
							)}

							{/* DOB */}
							{mode === 'create' && (
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
														captionLayout='dropdown'
														startMonth={new Date(1940, 0)}
														endMonth={
															new Date(
																new Date().getFullYear() - 18,
																new Date().getMonth(),
															)
														}
														disabled={{
															after: new Date(
																new Date().getFullYear() - 18,
																new Date().getMonth(),
																new Date().getDate(),
															),
														}}
													/>
												</PopoverContent>
											</Popover>

											<FormMessage className='text-sm text-red-400' />
										</FormItem>
									)}
								/>
							)}

							{/* Read only - DOB */}
							{mode === 'edit' && member && (
								<ReadOnlyField
									label='Date Of Birth'
									id='dateOfBirth'
									value={calculateAge(member.dateOfBirth)}
								/>
							)}

							{/* Gender create*/}
							{mode === 'create' && (
								<GenderSelect
									control={form.control}
									name='gender'
									label='Gender'
									placeholder='Select your gender'
									options={genderOptions}
									setValue={form.setValue}
								/>
							)}
							
							{/* Read only - Gender  edit*/}
							{mode === 'edit' && member && (
								<ReadOnlyField
									label='Gender'
									id='gender'
									value={member.gender}
								/>
							)}

							{/* Search Gender */}
							<GenderSelect
								control={form.control}
								name='searchGender'
								label='Looking For'
								placeholder="Select who you'd like to meet"
								options={searchGenderOptions}
								setValue={form.setValue}
							/>

							{/* Editable - City */}
							<FormField
								control={form.control}
								name='city'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xs text-gray-400'>
											City
										</FormLabel>
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

										<Popover open={open} onOpenChange={setOpen}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant='outline'
														className={cn(
															'w-full justify-between bg-white/50 border-black/10',
															!field.value && 'text-gray-400',
														)}
													>
														{field.value
															? countryOptions.find(
																	(country) => country.value === field.value,
																)?.label
															: 'Select your country'}
													</Button>
												</FormControl>
											</PopoverTrigger>

											<PopoverContent className='p-0 bg-white border-black/10'>
												<Command>
													<CommandInput placeholder='Search country...' />

													<CommandList>
														<CommandEmpty>No country found.</CommandEmpty>

														<CommandGroup>
															{countryOptions.map((country) => (
																<CommandItem
																	key={country.value}
																	value={country.label}
																	// onSelect={() => {
																	// 	field.onChange(country.value);
																	// 	setOpen(false);
																	// }}
																	onSelect={() => {
																		form.setValue('country', country.value, {
																			shouldDirty: true,
																			shouldTouch: true,
																			shouldValidate: true,
																		});

																		setOpen(false);
																	}}
																>
																	<Check
																		className={cn(
																			'mr-2 h-4 w-4',
																			field.value === country.value
																				? 'opacity-100'
																				: 'opacity-0',
																		)}
																	/>
																	{country.label}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
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

						{/* Submit */}
						<div className='flex justify-center lg:justify-end'>
							<Button
								type='submit'
								disabled={
									!form.formState.isDirty ||
									!form.formState.isValid ||
									isLoading
								}
								className='w-full lg:w-auto lg:min-w-32'
							>
								{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								{mode === 'create' ? 'Complete Profile' : 'Save Changes'}
							</Button>
						</div>
					</form>
				</Form>
			</Card>

			{/* Danger zone */}
			{mode === 'edit' && <DeleteAccount />}
		</>
	);
};

export default MemberProfileForm;
