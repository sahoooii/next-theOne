import { Member } from '@prisma/client';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { LuHeart } from 'react-icons/lu';
import Link from 'next/link';
import { calculateAge } from '@/lib/utils';

type Props = {
	member: Member;
};

const MemberCard = ({ member }: Props) => {
	const age = calculateAge(member.dateOfBirth);
	return (
		<Link href={`/members/${member.userId}`} className='block'>
			<Card className='group bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/30 pb-2'>
				<CardContent className='p-3 space-y-3 flex flex-col h-full'>
					{/* Image */}
					<div className='relative aspect-[3/4] w-full overflow-hidden rounded-xl'>
						<Image
							alt={member.name}
							src={member.image || '/images/user.png'}
							fill
							className='object-cover transition-transform duration-500 group-hover:scale-105'
						/>
					</div>

					{/* Info Section*/}
					<div
						className=' -mt-16 pt-10 px-4 pb-4 bg-gradient-to-t from-black/70 via-purple-900/40
    to-transparent  rounded-b-2xl flex-1 '
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
					<div className='flex gap-2' style={{ marginTop: '18px' }}>
						<Button className='flex-1 pointer-events-none' tabIndex={1}>
							View Profile
						</Button>
						<Button variant='ghost' className='text-white/70 hover:text-white'>
							<LuHeart
								className='text-red-400 group-hover:text-red-500 transition hover:scale-110'
								size={18}
							/>
						</Button>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default MemberCard;
