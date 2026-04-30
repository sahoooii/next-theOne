import { getMemberByUserId } from '@/app/actions/memberActions';
import NotFound from '@/app/members/not-found';
import { Card } from '@/components/ui/card';
import React from 'react';
import MemberDetailPageHeader from './MemberDetailPageHeader';
import { calculateAge } from '@/lib/utils';

const MemberProfileContent = async ({ userId }: { userId: string }) => {
	const member = await getMemberByUserId(userId);

	if (!member) return NotFound();

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

			{/* Description */}
			<div>
				<div className='text-xs text-gray-400 mb-2'>About</div>
				<div className='text-gray-700 leading-relaxed'>
					{member.description || 'No description provided.'}
				</div>
			</div>
		</Card>
	);
};

export default MemberProfileContent;
