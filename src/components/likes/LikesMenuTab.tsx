'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { motion } from 'framer-motion';

import { useLike } from '@/providers/LikeProvider';

import { Member } from '@prisma/client';

import { tabs } from './Tabs';
import MemberCard from '@/components/members/utils/MemberCard';
import { LoadingDisplay } from '@/components/LoadingDisplay';
import { getMemberByUserId } from '@/app/actions/memberActions';
import { useMatch } from '@/providers/MatchProvider';

type Props = {
	members: Member[];
};

const LikesMenuTab = ({ members }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// 現在どのTabを見ているか
	const current = searchParams.get('type') || 'source';

	const [isPending, startTransition] = useTransition();

	const { latestLike } = useLike();

	const { latestMatch } = useMatch();

	// 今このタブで表示するMember一覧
	const [displayedMembers, setDisplayedMembers] = useState(members);

	// Menu: Likes You
	useEffect(() => {
		if (current !== 'target') return;
		if (!latestLike) return;

		const sourceUserId = latestLike.sourceUserId;

		// Get member info using the latest like
		async function fetchNewMember() {
			// Realtimeで新しくLikeしてきたMember
			const newMember = await getMemberByUserId(sourceUserId);

			if (!newMember) return;

			// currentMembers= 現在表示されているMember一覧
			// 同じmemberがすでにいないかチェック/ Already displayed
			setDisplayedMembers((currentMembers) => {
				if (
					currentMembers.some((member) => member.userId === newMember.userId)
				) {
					return currentMembers;
				}

				// Add the new member to the beginning
				return [newMember, ...currentMembers];
			});
		}
		fetchNewMember();
	}, [current, latestLike]);

	// Menu: Matches
	useEffect(() => {
		if (current !== 'mutual') return;
		if (!latestMatch) return;

		const partnerUserId = latestMatch.partnerUserId;

		// Get member info using the latest match
		async function fetchNewMember() {
			const newMember = await getMemberByUserId(partnerUserId);

			if (!newMember) return;

			setDisplayedMembers((currentMembers) => {
				if (currentMembers.some((member) => member.userId === newMember.userId)) {
					return currentMembers;
				}

				return [newMember, ...currentMembers];
			});
		}

		fetchNewMember();
	}, [current, latestMatch]);

	const handleTabChange = (key: string) => {
		startTransition(() => {
			const params = new URLSearchParams(searchParams);
			params.set('type', key);
			router.replace(`${pathname}?${params.toString()}`);
		});
	};

	const activeTab = tabs.find((tab) => tab.id === current) || tabs[0];

	return (
		<div className='max-w-5xl mx-auto px-4'>
			<div className='overflow-x-auto'>
				<div
					className='flex gap-6 border-b border-black/10 pb-2
		sm:justify-start md:justify-start
		justify-center min-w-max'
				>
					{tabs.map((tab) => {
						const isActive = tab.id === current;

						return (
							<button
								key={tab.id}
								onClick={() => handleTabChange(tab.id)}
								className={`
					relative px-4 py-2 rounded-lg
					text-base tracking-wide
					transition-all duration-300
					${
						isActive
							? 'text-black bg-black/5'
							: 'text-gray-400 hover:text-black hover:bg-black/5'
					}
				`}
							>
								{tab.label}
								{/* Active underline */}
								{isActive && (
									<motion.div
										layoutId='list-underline'
										className='absolute left-3 right-3 -bottom-[2px] h-[2px] bg-purple-500'
										transition={{ type: 'spring', stiffness: 300, damping: 30 }}
									/>
								)}
							</button>
						);
					})}
				</div>
			</div>

			{isPending ? (
				<LoadingDisplay message='Preparing your connections list...' />
			) : (
				<>
					{/* Show members  */}
					{displayedMembers.length > 0 ? (
						<div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
							{displayedMembers.map((member) => (
								<MemberCard key={member.id} member={member} />
							))}
						</div>
					) : (
						// If no liked, likes you, matches members, show empty message
						<div className='mt-8 flex flex-col items-center text-center space-y-3'>
							<p className='text-gray-900 text-sm tracking-wide'>
								{activeTab.emptyTitle}
							</p>
							<p className='text-gray-400 text-xs'>
								{activeTab.emptyDescription}
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default LikesMenuTab;
