import MemberCard from '@/components/members/utils/MemberCard';
import { GiBigDiamondRing } from 'react-icons/gi';
import { getMembers } from '@/app/actions/memberActions';

const MembersPageContent = async () => {
	const members = await getMembers();
	return (
		<div className='max-w-5xl mx-auto px-4'>
			{/* Header */}
			<div className='relative overflow-hidden rounded-2xl mb-10'>
				{/* bg */}
				<div className='absolute inset-0 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950' />
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_70%)]' />

				{/* subtle border*/}
				<div className='absolute inset-0 border border-white/10 rounded-2xl' />

				{/* Content */}
				<div
					className='relative flex flex-col items-center text-center
		py-10 sm:py-12
		px-4
		space-y-4'
				>
					{/* Icon */}
					<div className='bg-white/10 p-3 rounded-full backdrop-blur'>
						<GiBigDiamondRing className='text-white text-xl' />
					</div>

					{/* Title */}
					<h1 className='text-lg sm:text-xl text-white tracking-[0.25em] font-light'>
						MEMBERS
					</h1>

					{/* Divider */}
					<div className='w-10 h-px bg-white/20' />

					{/* Tagline */}
					<p className='text-white/60 text-xs sm:text-sm tracking-wide'>
						Find your one.
					</p>
				</div>
			</div>
			{/* Members Section */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{members?.map((member) => (
					<MemberCard member={member} key={member.id} />
				))}
			</div>
		</div>
	);
};

export default MembersPageContent;
