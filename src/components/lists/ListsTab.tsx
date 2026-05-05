'use client';

import { Key } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Member } from '@prisma/client';
import { Tabs } from '@/components/ui/tabs';

type Props = {
	members: Member[];
	likeIds: string[];
};

const ListsTab = ({ members, likeIds }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const tabs = [
		{ id: 'source', label: 'Members I have liked' },
		{ id: 'target', label: 'Members that like me' },
		{ id: 'mutual', label: 'Mutual likes' },
	];

	const handleTabChange = (key: Key) => {
		const params = new URLSearchParams(searchParams);
		params.set('type', key.toString());
		router.replace(`${pathname}?${params.toString()}`)
	};
	
	return (
		<div className='flex w-full flex-col mt-10 gap-5'>
			<Tabs></Tabs>
		</div>
	);
};

export default ListsTab;
