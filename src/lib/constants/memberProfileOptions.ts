import { RelationshipGoal, WantKids, MaritalStatus } from '@prisma/client';

export const relationshipGoalOptions = [
	{
		value: RelationshipGoal.LONG_TERM_RELATIONSHIP,
		label: 'Long-term relationship',
	},
	{ value: RelationshipGoal.MARRIAGE, label: 'Marriage' },
	{ value: RelationshipGoal.CASUAL_DATING, label: 'Casual dating' },
	{ value: RelationshipGoal.FRIENDSHIP, label: 'Friendship' },
] as const;

export const wantKidsOptions = [
	{ value: WantKids.YES, label: 'Yes' },
	{ value: WantKids.NO, label: 'No' },
	{ value: WantKids.NOT_SURE, label: 'Not sure' },
] as const;

export const maritalStatusOptions = [
	{ value: MaritalStatus.NEVER_MARRIED, label: 'Never married' },
	{ value: MaritalStatus.DIVORCED, label: 'Divorced' },
	{ value: MaritalStatus.WIDOWED, label: 'Widowed' },
] as const;

export const hasKidsOptions = [
	{ value: 'yes', label: 'Yes' },
	{ value: 'no', label: 'No' },
] as const;

export const languageOptions = [
	{ value: 'en', label: 'English' },
	{ value: 'ja', label: 'Japanese' },
	{ value: 'es', label: 'Spanish' },
	{ value: 'fr', label: 'French' },
	{ value: 'de', label: 'German' },
	{ value: 'it', label: 'Italian' },
	{ value: 'pt', label: 'Portuguese' },
	{ value: 'zh', label: 'Chinese' },
	{ value: 'ko', label: 'Korean' },
	{ value: 'hi', label: 'Hindi' },
	{ value: 'ar', label: 'Arabic' },
	{ value: 'ru', label: 'Russian' },
] as const;

export const interestsOptions = [
	{ value: 'Travel', label: 'Travel' },
	{ value: 'Photography', label: 'Photography' },
	{ value: 'Fitness', label: 'Fitness' },
	{ value: 'Nature', label: 'Nature' },
	{ value: 'Fashion', label: 'Fashion' },
	{ value: 'Coffee', label: 'Coffee' },
	{ value: 'Reading', label: 'Reading' },
	{ value: 'Music', label: 'Music' },
	{ value: 'Hiking', label: 'Hiking' },
	{ value: 'Cooking', label: 'Cooking' },
	{ value: 'Food & Dining', label: 'Food & Dining' },
	{ value: 'Yoga', label: 'Yoga' },
	{ value: 'Gaming', label: 'Gaming' },
	{ value: 'Movies & TV', label: 'Movies & TV' },
	{ value: 'Concerts', label: 'Concerts' },
	{ value: 'Art & Design', label: 'Art & Design' },
	{ value: 'Sports', label: 'Sports' },
	{ value: 'Dancing', label: 'Dancing' },
	{ value: 'Pets', label: 'Pets' },
	{ value: 'Volunteering', label: 'Volunteering' },
	{ value: 'Technology', label: 'Technology' },
	{ value: 'Writing', label: 'Writing' },
	{ value: 'Gardening', label: 'Gardening' },
	{ value: 'Beach & Ocean', label: 'Beach & Ocean' },
] as const;
