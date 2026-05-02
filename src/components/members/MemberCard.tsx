import Image from 'next/image';
import Link from 'next/link';
import { Member } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { calculateAge } from '@/lib/utils';
import LikeButton from './LikeButton';

type Props = {
	member: Member;
};

const MemberCard = ({ member }: Props) => {
	const age = calculateAge(member.dateOfBirth);
	return (
		<Card className='group bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/30 pb-2 group cursor-pointer'>
			<CardContent className='p-3 space-y-3 flex flex-col h-full'>
				<Link
					href={`/members/${member.userId}`}
					className='absolute inset-0 z-0'
				/>

				{/* Image */}
				<div className='relative aspect-[3/4] w-full overflow-hidden rounded-xl'>
					<Image
						alt={member.name}
						src={member.image || '/images/user.png'}
						fill
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
						className='object-cover transition-transform duration-500 group-hover:scale-105'
					/>
				</div>

				{/* Info Section*/}
				<div
					className=' -mt-16 pt-10 px-4 pb-4 bg-gradient-to-t from-black/70 via-purple-900/40
    to-transparent rounded-b-2xl flex-1 '
				>
					<p className='text-white font-semibold tracking-wide'>
						{member.name}, {age}
					</p>
					<p className='text-white/80 text-sm'>
						{member.city}, {member.country}
					</p>
					{member.description && (
						<p className='text-white/80 text-xs mt-1 line-clamp-1'>
							{member.description}
						</p>
					)}
				</div>

				{/* CTA View Profile and like button */}
				<div className='flex gap-2 mt-[18px] relative z-20'>
					<Button className='flex-1 pointer-events-none' tabIndex={1}>
						View Profile
					</Button>
					{/* Like button */}
					<div className='z-30'>
						<LikeButton targetId={member.userId} hasLiked={false} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default MemberCard;
