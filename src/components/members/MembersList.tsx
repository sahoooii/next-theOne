'use client';

import React, { useState } from 'react';

import { getMembers } from '@/app/actions/memberActions';

import { Member } from '@prisma/client';
import { MembersCursor } from '@/types/members';

import MemberCard from './utils/MemberCard';
import { Button } from '../ui/button';

import { Loader2 } from 'lucide-react';

type MembersListProps = {
	initialMembers: Member[];
	initialCursor: MembersCursor | null;
};

const MembersList = ({ initialMembers, initialCursor }: MembersListProps) => {
	// initialMembersはサーバーから最初にもらった12人
	const [members, setMembers] = useState(initialMembers);
	const [cursor, setCursor] = useState(initialCursor);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleLoadMore = async () => {
		if (!cursor || isLoading) return;

		setIsLoading(true);
		setError(false);

		try {
			const result = await getMembers({ cursor });

			// membersを追加
			setMembers((prev) => [...prev, ...result.members]);

			// cursorを更新
			setCursor(result.nextCursor);
		} catch {
			console.error(error);
			setError(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{members.map((member) => (
					// key?
					<MemberCard member={member} key={member.id} />
				))}
			</div>

			{error && <p>Failed to load members.</p>}

			{cursor && (
				<div className='mt-8 flex justify-center'>
					<Button
						onClick={handleLoadMore}
						disabled={isLoading}
						className='h-11
      w-40
      mt-2
      rounded-xl
      bg-[#6C43B1]/55
      hover:bg-[#6C43B1]/70
      border border-white/10
      backdrop-blur-md
      text-white/90
      text-sm font-medium
      shadow-sm shadow-black/20
      transition-all duration-200'
					>
						{isLoading ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' /> Loading...
							</>
						) : (
							<>Load More</>
						)}
					</Button>
				</div>
			)}
		</>
	);
};

export default MembersList;
