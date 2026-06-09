import { auth } from '@/auth';

export default async function Home() {
	const session = await auth();

	return (
		<div className='space-y-4'>
			<h3 className='text-2xl'>Dashboard coming soon...</h3>
			{session ? (
				<div>
					You can see Today&apos;s Matches, New Likes, Unread Messages, etc...
				</div>
			) : (
				<div>Not logged in</div>
			)}
		</div>
	);
}
