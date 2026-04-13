import React, { ReactNode } from 'react';
import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberSidebar from '@/components/members/MemberSidebar';
import NotFound from '@/app/not-found';
import { Card } from '@/components/ui/card';

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
		<div className='grid grid-cols-12 gap-5 h-[80vh]'>
			<div className='col-span-3'>
				<MemberSidebar member={member} />
			</div>
			<div className='col-span-9'>
				<Card className='w-full h-[80vh]'>{children}</Card>
			</div>
		</div>
	);
};

export default Layout;
