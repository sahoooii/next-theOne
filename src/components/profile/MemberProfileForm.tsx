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

import {
	genderOptions,
	searchGenderOptions,
} from '@/lib/constants/memberGenderOptions';
import { languageOptions } from '@/lib/constants/memberProfileOptions';
import { relationshipGoalOptions } from '@/lib/constants/memberProfileOptions';
import { GenderSelect } from './GenderSelect';

import DeleteAccount from '../edit/DeleteAccount';

type Props = {
	member?: Member;
	mode: 'create' | 'edit';
};

type MemberFormValues = MemberCreateSchema | MemberEditSchema;

const MemberProfileForm = ({ member, mode }: Props) => {
	// To handle open and close select country list
	const [countriesOpen, setCountriesOpen] = useState(false);
	// To handle open and close select languages list
	const [languagesOpen, setLanguagesOpen] = useState(false);

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
					// From V2
					height: member?.height != null ? Number(member.height) : undefined,
					languages: member?.languages ?? [],
					relationshipGoals: member?.relationshipGoals ?? [],
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

							{/* Editable - Height (edit only) */}
							{mode === 'edit' && (
								<FormField
									control={form.control}
									name='height'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs text-gray-400'>
												Height (cm)
											</FormLabel>
											<FormControl>
												<Input
													type='number'
													min={100}
													max={250}
													step={0.1}
													placeholder='e.g. 165'
													className='bg-white/50 border-black/10'
													value={field.value ?? ''}
													onChange={(e) =>
														field.onChange(
															e.target.value === ''
																? undefined
																: e.target.valueAsNumber,
														)
													}
												/>
											</FormControl>
											<FormMessage className='text-sm text-red-400' />
										</FormItem>
									)}
								/>
							)}

							{/* Editable - Languages (edit only) */}
							{mode === 'edit' && (
								<FormField
									control={form.control}
									name='languages'
									render={({ field }) => {
										const selectedLanguages = field.value ?? [];

										return (
											<FormItem>
												<FormLabel className='text-xs text-gray-400'>
													Languages
												</FormLabel>

												<Popover
													open={languagesOpen}
													onOpenChange={setLanguagesOpen}
												>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																type='button'
																variant='outline'
																className={cn(
																	'w-full justify-between bg-white/50 border-black/10',
																	selectedLanguages.length === 0 &&
																		'text-gray-400',
																)}
															>
																{selectedLanguages.length > 0
																	? selectedLanguages
																			.map(
																				(value) =>
																					languageOptions.find(
																						(language) =>
																							language.value === value,
																					)?.label,
																			)
																			.filter(Boolean)
																			.join(', ')
																	: 'Select languages'}
																<span className='ml-2 text-xs text-gray-400'>
																	{selectedLanguages.length}
																</span>
															</Button>
														</FormControl>
													</PopoverTrigger>

													<PopoverContent
														className='p-0 bg-white border-black/10'
														align='start'
													>
														<Command>
															<CommandInput placeholder='Search languages...' />

															<CommandList>
																<CommandEmpty>No language found.</CommandEmpty>

																<CommandGroup>
																	{languageOptions.map((language) => {
																		const isSelected =
																			selectedLanguages.includes(
																				language.value,
																			);

																		return (
																			<CommandItem
																				key={language.value}
																				value={language.label}
																				onSelect={() => {
																					const nextValue = isSelected
																						? selectedLanguages.filter(
																								(value) =>
																									value !== language.value,
																							)
																						: [
																								...selectedLanguages,
																								language.value,
																							];

																					field.onChange(nextValue);
																				}}
																			>
																				<Check
																					className={cn(
																						'mr-2 h-4 w-4',
																						isSelected
																							? 'opacity-100'
																							: 'opacity-0',
																					)}
																				/>
																				{language.label}
																			</CommandItem>
																		);
																	})}
																</CommandGroup>
															</CommandList>
														</Command>
													</PopoverContent>
												</Popover>

												<FormMessage className='text-sm text-red-400' />
											</FormItem>
										);
									}}
								/>
							)}

							{/* Editable - Relationship Goals (edit only) */}
							{mode === 'edit' && (
								<FormField
									control={form.control}
									name='relationshipGoals'
									render={({ field }) => {
										const selectedGoals = field.value ?? [];

										return (
											<FormItem className='md:col-span-2'>
												<FormLabel className='text-xs text-gray-400'>
													Relationship Goals
													<span className='ml-2'>Select up to 2</span>
												</FormLabel>

												<FormControl>
													<div className='flex flex-wrap gap-2'>
														{relationshipGoalOptions.map((goal) => {
															const isSelected = selectedGoals.includes(
																goal.value,
															);

															return (
																<Button
																	key={goal.value}
																	type='button'
																	variant='outline'
																	onClick={() => {
																		const nextValue = isSelected
																			? selectedGoals.filter(
																					(value) => value !== goal.value,
																				)
																			: selectedGoals.length < 2
																				? [...selectedGoals, goal.value]
																				: selectedGoals;

																		field.onChange(nextValue);
																	}}
																	className={cn(
																		'rounded-full bg-white/50 border-black/10',
																		isSelected &&
																			'bg-primary/10 border-primary/40 text-primary hover:bg-primary/15',
																	)}
																	disabled={
																		!isSelected && selectedGoals.length >= 2
																	}
																>
																	{isSelected && (
																		<Check className='mr-2 h-4 w-4' />
																	)}
																	{goal.label}
																</Button>
															);
														})}
													</div>
												</FormControl>

												<FormMessage className='text-sm text-red-400' />
											</FormItem>
										);
									}}
								/>
							)}

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

										<Popover
											open={countriesOpen}
											onOpenChange={setCountriesOpen}
										>
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
																	(country) => country.label === field.value,
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
																	onSelect={() => {
																		form.setValue('country', country.label, {
																			shouldDirty: true,
																			shouldTouch: true,
																			shouldValidate: true,
																		});
																		setCountriesOpen(false);
																	}}
																>
																	<Check
																		className={cn(
																			'mr-2 h-4 w-4',
																			field.value === country.label
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
