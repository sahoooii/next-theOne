'use client';

import React, { useEffect, useState } from 'react';

import { useMatch } from '@/providers/MatchProvider';

import { NewMatch } from '@/types/matches';

import { getNewMatches } from '@/app/actions/matchActions';

import { Card } from '@/components/ui/card';

import MemberDetailPageHeader from '@/components/members/memberDetail/MemberDetailPageHeader';
import NewMatchesCard from './NewMatchesCard';

type Props = {
	initialMatches: NewMatch[];
	currentUserId: string;
};

const NewMatchesClient = ({ initialMatches, currentUserId }: Props) => {
	const { latestMatch } = useMatch();

	const [displayedNewMatches, setDisplayedNewMatches] =
		useState(initialMatches);

	useEffect(() => {
		setDisplayedNewMatches(initialMatches);
	}, [initialMatches]);

	useEffect(() => {
		if (!latestMatch) return;

		const partnerUserId = latestMatch.partnerUserId;

		async function fetchNewMatch() {
			// Note: getNewMatches -> refactor later
			const newMatches = await getNewMatches(currentUserId);

			const newMatch = newMatches.find(
				(match) => match.userId === partnerUserId,
			);

			if (!newMatch) return;

			setDisplayedNewMatches((currentMatches) => {
				if (currentMatches.some((match) => match.userId === newMatch.userId)) {
					return currentMatches;
				}

				// Add the new member to the beginning
				return [newMatch, ...currentMatches];
			});
		}

		fetchNewMatch();
	}, [latestMatch, currentUserId]);

	if (displayedNewMatches.length === 0) {
		return null;
	}

	return (
		<div className='flex justify-center px-4'>
			<Card
				className='
	w-full
	max-w-2xl
	bg-white/70 backdrop-blur-md
	border border-black/10
	rounded-2xl
	px-6 pt-6 pb-2 mb-4 overflow-visible
'
			>
				{/* Header */}
				<MemberDetailPageHeader title='New Matches' />
				{/* Contents */}
				<div className='flex gap-3 overflow-x-auto py-4 px-2 scrollbar-hide'>
					{displayedNewMatches.map((newMatch) => (
						<NewMatchesCard key={newMatch.userId} newMatch={newMatch} />
					))}
				</div>
			</Card>
		</div>
	);
};

export default NewMatchesClient;
