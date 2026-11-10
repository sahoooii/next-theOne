'use client';

import { useState } from 'react';

import { Member } from '@prisma/client';

import { Card } from '@/components/ui/card';
import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';

import {
	relationshipGoalOptions,
	wantKidsOptions,
	maritalStatusOptions,
	hasKidsOptions,
	languageOptions,
	interestsOptions,
} from '@/lib/constants/memberProfileOptions';

import { calculateAge } from '@/lib/utils';

type Props = {
	member: Member;
};

type ProfileOption = {
	value: string | boolean;
	label: string;
	emoji?: string;
};

const MemberProfileContent = ({ member }: Props) => {
	const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');

	// Convert cm to feet and inches
	const cmToFeetInches = (cm: number) => {
		const totalInches = cm / 2.54;
		const feet = Math.floor(totalInches / 12);
		const inches = Math.round((totalInches % 12) * 10) / 10;

		if (inches >= 12) {
			return {
				feet: feet + 1,
				inches: 0,
			};
		}

		return { feet, inches };
	};

	// Convert option values to display labels
	const getOptionLabel = (
		options: readonly ProfileOption[],
		value: string | boolean,
	) => {
		const option = options.find((option) => option.value === value);
		return option?.label ?? value;
	};

	const getOptionEmoji = (
		options: readonly ProfileOption[],
		value: string | boolean,
	) => {
		const option = options.find((option) => option.value === value);
		return option?.emoji ?? '';
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
			<MemberDetailPageHeader title='Profile' />

			{/* Info Grid */}
			<div className='grid grid-cols-2 gap-4 mb-8'>
				<div>
					<div className='text-xs text-gray-400'>Name</div>
					<div className='text-gray-900 font-medium'>{member.name}</div>
				</div>

				<div>
					<div className='text-xs text-gray-400'>Gender</div>
					<div className='text-gray-900 font-medium'>{member.gender}</div>
				</div>

				<div>
					<div className='text-xs text-gray-400'>Age</div>
					<div className='text-gray-900 font-medium'>
						{calculateAge(member.dateOfBirth)}
					</div>
				</div>

				<div>
					<div className='text-xs text-gray-400'>Location</div>
					<div className='text-gray-900 font-medium'>
						{member.city}, {member.country}
					</div>
				</div>
			</div>
			{/* About */}
			<div>
				<div className='text-xs text-gray-400 mb-2'>About</div>
				<div className='text-gray-700 leading-relaxed'>
					{member.description || 'No description provided.'}
				</div>
			</div>

			{/* Basic Information */}
			{(member.height != null ||
				member.languages.length > 0 ||
				member.relationshipGoals.length > 0) && (
				<div className='mt-8'>
					<h3 className='text-sm font-semibold text-gray-900 mb-4'>
						Basic Information
					</h3>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6'>
						{/* Height */}
						{member.height != null && (
							<div>
								<div className='text-xs text-gray-400 mb-1'>📏 Height</div>

								<div className='text-gray-900 font-medium flex flex-wrap items-center gap-2'>
									{heightUnit === 'cm' ? (
										<>{member.height.toString()} cm</>
									) : (
										<>
											{cmToFeetInches(Number(member.height)).feet} ft{' '}
											{cmToFeetInches(Number(member.height)).inches} in
										</>
									)}

									<div className='flex gap-1'>
										<button
											type='button'
											onClick={() => setHeightUnit('cm')}
											className={`text-xs px-2 py-1 rounded ${
												heightUnit === 'cm'
													? 'bg-purple-100 text-purple-700'
													: 'bg-gray-100 text-gray-500'
											}`}
										>
											cm
										</button>

										<button
											type='button'
											onClick={() => setHeightUnit('ft')}
											className={`text-xs px-2 py-1 rounded ${
												heightUnit === 'ft'
													? 'bg-purple-100 text-purple-700'
													: 'bg-gray-100 text-gray-500'
											}`}
										>
											ft / in
										</button>
									</div>
								</div>
							</div>
						)}

						{/* Languages */}
						{member.languages.length > 0 && (
							<div>
								<div className='text-xs text-gray-400 mb-1'>🌐 Languages</div>

								<div className='text-gray-900 font-medium'>
									{member.languages
										.map((language) =>
											getOptionLabel(languageOptions, language),
										)
										.join(' / ')}
								</div>
							</div>
						)}

						{/* Relationship Goals */}
						{member.relationshipGoals.length > 0 && (
							<div>
								<div className='text-xs text-gray-400 mb-1'>
									Relationship Goals
								</div>

								{/* Mobile: Vertical / Desktop: Horizontal */}
								<div className='flex flex-col gap-1 lg:flex-row lg:flex-wrap lg:gap-0 text-gray-900 font-medium'>
									{member.relationshipGoals.map((goal, index) => {
										const emoji = getOptionEmoji(relationshipGoalOptions, goal);
										const label = getOptionLabel(relationshipGoalOptions, goal);

										return (
											<span key={goal}>
												{index > 0 && (
													<span className='hidden lg:inline'> / </span>
												)}
												{emoji} {label}
											</span>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Family Information */}
			{(member.maritalStatus !== null ||
				member.hasKids !== null ||
				member.wantsKids !== null) && (
				<div className='mt-8'>
					<h3 className='text-sm font-semibold text-gray-900 mb-4'>
						Family Information
					</h3>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6'>
						{/* Marital Status */}
						{member.maritalStatus !== null && (
							<div>
								<div className='text-xs text-gray-400 mb-1'>Marital Status</div>

								<div className='text-gray-900 font-medium'>
									{getOptionEmoji(maritalStatusOptions, member.maritalStatus)}{' '}
									{getOptionLabel(maritalStatusOptions, member.maritalStatus)}
								</div>
							</div>
						)}

						{/* Has Children */}
						{member.hasKids !== null && (
							<div>
								<div className='text-xs text-gray-400 mb-1'>Has Children</div>

								<div className='text-gray-900 font-medium'>
									{getOptionEmoji(hasKidsOptions, member.hasKids)}{' '}
									{getOptionLabel(hasKidsOptions, member.hasKids)}
								</div>
							</div>
						)}

						{/* Wants Children */}
						{member.wantsKids !== null && (
							<div>
								<div className='text-xs text-gray-400 mb-1'>Wants Children</div>

								<div className='text-gray-900 font-medium'>
									{getOptionEmoji(wantKidsOptions, member.wantsKids)}{' '}
									{getOptionLabel(wantKidsOptions, member.wantsKids)}
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Interests */}
			{member.interests.length > 0 && (
				<div className='mt-8'>
					<h3 className='text-sm font-semibold text-gray-900 mb-4'>
						Interests
					</h3>

					<div className='flex flex-wrap gap-2'>
						{member.interests.map((interest) => {
							const emoji = getOptionEmoji(interestsOptions, interest);
							const label = getOptionLabel(interestsOptions, interest);

							return (
								<span
									key={interest}
									className='rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700'
								>
									{emoji} {label}
								</span>
							);
						})}
					</div>
				</div>
			)}
		</Card>
	);
};

export default MemberProfileContent;
