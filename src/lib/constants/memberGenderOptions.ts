import { Gender, SearchGender } from '@prisma/client';

export const genderOptions = [
	{ value: Gender.MALE, label: 'Male' },
	{ value: Gender.FEMALE, label: 'Female' },
	{ value: Gender.NON_BINARY, label: 'Non Binary' },
] as const;

export const searchGenderOptions = [
	{ value: SearchGender.MALE, label: 'Male' },
	{ value: SearchGender.FEMALE, label: 'Female' },
	{ value: SearchGender.NON_BINARY, label: 'Non Binary' },
	{ value: SearchGender.ANY, label: 'Any' },
] as const;
