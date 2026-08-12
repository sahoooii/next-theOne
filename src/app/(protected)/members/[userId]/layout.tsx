import React, { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { getAuthUserId } from '@/app/actions/authActions'
import { getMemberByUserId } from '@/app/actions/memberActions';

import { isMatched } from '@/lib/matching/isMatched';

import BreadCrumb from '@/components/BreadCrumb';
import MemberSidebar from '@/components/members/memberDetail/MemberSidebar';

// Complete-profile
const Layout = async ({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ userId: string }>;
}) => {
	// Partner
	const { userId } = await params;
	// Login user
	const currentUserId = await getAuthUserId();

	const member = await getMemberByUserId(userId);
	if (!member) notFound();

	const matched = await isMatched(currentUserId, userId);

	const basePath = `/members/${member.userId}`;

	const navLinks = [
		{ name: 'Profile', href: `${basePath}` },
		{ name: 'Photos', href: `${basePath}/photos` },
		...(matched ? [{ name: 'Chat', href: `${basePath}/chat` }] : []),
	];

	return (
		<>
			<BreadCrumb name={member.name} link='/members' title='Members' />
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[80vh]'>
				{/* Sidebar */}
				<div className='lg:col-span-3 mt-6 lg:mt-8 order-1'>
					<MemberSidebar
						member={member}
						navLinks={navLinks}
						likeInfo={{
							targetId: member.userId,
						}}
					/>
				</div>

				{/* Content */}
				<div className='lg:col-span-9 mt-6 lg:mt-8 order-2'>
					<div className='h-full'>{children}</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
