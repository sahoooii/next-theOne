import { RelationshipGoal, WantKids, MaritalStatus } from '@prisma/client';

export const relationshipGoalOptions = [
	{
		value: RelationshipGoal.LONG_TERM_RELATIONSHIP,
		label: 'Long-term relationship',
		emoji: '❤️',
	},
	{
		value: RelationshipGoal.MARRIAGE,
		label: 'Marriage',
		emoji: '💍',
	},
	{
		value: RelationshipGoal.CASUAL_DATING,
		label: 'Casual dating',
		emoji: '🥂',
	},
	{
		value: RelationshipGoal.FRIENDSHIP,
		label: 'Friendship',
		emoji: '🤝',
	},
] as const;

export const wantKidsOptions = [
	{ value: WantKids.YES, label: 'Yes', emoji: '👶' },
	{ value: WantKids.NO, label: 'No', emoji: '🚫' },
	{ value: WantKids.NOT_SURE, label: 'Not sure', emoji: '🤔' },
] as const;

export const maritalStatusOptions = [
	{
		value: MaritalStatus.NEVER_MARRIED,
		label: 'Never married',
		emoji: '💍',
	},
	{
		value: MaritalStatus.DIVORCED,
		label: 'Divorced',
		emoji: '💔',
	},
	{
		value: MaritalStatus.WIDOWED,
		label: 'Widowed',
		emoji: '🕊️',
	},
] as const;

export const hasKidsOptions = [
	{ value: true, label: 'Yes', emoji: '👨‍👩‍👧' },
	{ value: false, label: 'No', emoji: '👤' },
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

export const interestCategories = [
	{
		value: 'travel-outdoors',
		label: 'Travel & Outdoors',
		emoji: '🌍',
		options: [
			{ value: 'Travel', label: 'Travel', emoji: '✈️' },
			{ value: 'Hiking', label: 'Hiking', emoji: '🥾' },
			{ value: 'Nature', label: 'Nature', emoji: '🌿' },
			{ value: 'Beach & Ocean', label: 'Beach & Ocean', emoji: '🏖️' },
		],
	},
	{
		value: 'food-lifestyle',
		label: 'Food & Lifestyle',
		emoji: '☕',
		options: [
			{ value: 'Coffee', label: 'Coffee', emoji: '☕' },
			{ value: 'Cooking', label: 'Cooking', emoji: '🍳' },
			{ value: 'Food & Dining', label: 'Food & Dining', emoji: '🍽️' },
			{ value: 'Fitness', label: 'Fitness', emoji: '💪' },
			{ value: 'Yoga', label: 'Yoga', emoji: '🧘' },
			{ value: 'Fashion', label: 'Fashion', emoji: '👗' },
			{ value: 'Pets', label: 'Pets', emoji: '🐾' },
			{ value: 'Gardening', label: 'Gardening', emoji: '🪴' },
		],
	},
	{
		value: 'arts-creativity',
		label: 'Arts & Creativity',
		emoji: '🎨',
		options: [
			{ value: 'Photography', label: 'Photography', emoji: '📷' },
			{ value: 'Reading', label: 'Reading', emoji: '📚' },
			{ value: 'Art & Design', label: 'Art & Design', emoji: '🎨' },
			{ value: 'Writing', label: 'Writing', emoji: '✍️' },
		],
	},
	{
		value: 'entertainment',
		label: 'Entertainment',
		emoji: '🎵',
		options: [
			{ value: 'Music', label: 'Music', emoji: '🎵' },
			{ value: 'Movies & TV', label: 'Movies & TV', emoji: '🎬' },
			{ value: 'Concerts', label: 'Concerts', emoji: '🎤' },
			{ value: 'Gaming', label: 'Gaming', emoji: '🎮' },
			{ value: 'Dancing', label: 'Dancing', emoji: '💃' },
		],
	},
	{
		value: 'other-interests',
		label: 'Other Interests',
		emoji: '✨',
		options: [
			{ value: 'Sports', label: 'Sports', emoji: '⚽' },
			{ value: 'Volunteering', label: 'Volunteering', emoji: '🤝' },
			{ value: 'Technology', label: 'Technology', emoji: '💻' },
		],
	},
] as const;

// Existing values remain unchanged.
// This flattened list can be reused for validation and profile display.
export const interestsOptions = interestCategories.flatMap(({ options }) => [
	...options,
]);
