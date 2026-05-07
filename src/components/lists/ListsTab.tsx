'use client';

import { Member } from '@prisma/client';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MemberCard from '@/components/members/utils/MemberCard';

type Props = {
	members: Member[];
	likeIds: string[];
};

type Tab = {
	id: string;
	label: string;
	emptyTitle: string;
	emptyDescription: string;
};

const ListsTab = ({ members, likeIds }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const current = searchParams.get('type') || 'source';

	const tabs: Tab[] = [
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

	const handleTabChange = (key: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('type', key);
		router.replace(`${pathname}?${params.toString()}`);
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
			{/* Show members  */}
			{members.length > 0 ? (
				<div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{members.map((member) => (
						<MemberCard key={member.id} member={member} likeIds={likeIds} />
					))}
				</div>
			) : (
				// If no likes, liked, matches members, show empty message
				<div className='mt-8 flex flex-col items-center text-center space-y-3'>
					<p className='text-gray-900 text-sm tracking-wide'>
						{activeTab.emptyTitle}
					</p>
					<p className='text-gray-400 text-xs'>{activeTab.emptyDescription}</p>
				</div>
			)}
		</div>
	);
};

export default ListsTab;
