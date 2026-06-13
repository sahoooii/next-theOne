'use client';

import MemberProfileForm from '@/components/profile/MemberProfileForm';
// import { MemberProfileSchema } from '@/lib/schema/memberProfileSchema';

const CompleteProfilePage = () => {
	const handleCreate = async (data: unknown) => {
		console.log(data);
	};
	return <MemberProfileForm mode='create' onSubmit={handleCreate} />;
};

export default CompleteProfilePage;
