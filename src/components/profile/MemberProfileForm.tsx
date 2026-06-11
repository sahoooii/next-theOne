/* eslint-disable @typescript-eslint/no-unused-vars */

import { Member } from '@prisma/client';

type Props = {
	member?: Member;
	mode: 'create' | 'edit';
};

const MemberProfileForm = ({ member, mode }: Props) => {
	return <div>MemberProfileForm</div>;
};

export default MemberProfileForm;
