import React, { ReactNode } from 'react';

import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberSidebar from '@/components/members/memberDetail/MemberSidebar';

import NotFound from '@/app/not-found';
import BreadCrumb from '@/components/BreadCrumb';
import { getAuthUserId } from '@/app/actions/authActions';

const Layout = async ({ children }: { children: ReactNode }) => {
	const userId = await getAuthUserId();

	const member = await getMemberByUserId(userId);
	if (!member) return NotFound();

	const basePath = `/members/edit`;

	const navLinks = [
		{ name: 'Profile', href: `${basePath}` },
		{ name: 'Photos', href: `${basePath}/photos` },
	];

	// Add update
	return (
		<>
			<BreadCrumb name={member.name} link='/' title='Home' />

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[80vh]'>
				{/* Sidebar */}
				<div className='lg:col-span-3 mt-6 lg:mt-8 order-1'>
					<MemberSidebar member={member} navLinks={navLinks} />
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
