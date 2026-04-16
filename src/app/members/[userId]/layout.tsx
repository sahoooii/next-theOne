import React, { ReactNode } from 'react';
import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberSidebar from '@/components/members/memberDetail/MemberSidebar';
import NotFound from '@/app/not-found';

const Layout = async ({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;

	const member = await getMemberByUserId(userId);
	if (!member) return NotFound();

	return (
		<div className='grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[80vh]'>
			{/* Sidebar */}
			<div className='lg:col-span-3 mt-6 lg:mt-8 order-1'>
				<MemberSidebar member={member} />
			</div>

			{/* Content */}
			<div className='lg:col-span-9 mt-6 lg:mt-8 order-2'>
				<div className='h-full'>{children}</div>
			</div>
		</div>
	);
};

export default Layout;
