type Tab = {
	id: string;
	label: string;
	emptyTitle: string;
	emptyDescription: string;
};

export const tabs: Tab[] = [
	{
		id: 'source',
		label: 'Liked',
		emptyTitle: 'No connections yet',
		emptyDescription: 'People you like will appear here.',
	},
	{
		id: 'target',
		label: 'Likes You',
		emptyTitle: 'No one has found you yet',
		emptyDescription: 'This space will fill as people discover you.',
	},
	{
		id: 'mutual',
		label: 'Matches',
		emptyTitle: 'No matches yet',
		emptyDescription: 'When feelings are mutual, they’ll appear here.',
	},
];
