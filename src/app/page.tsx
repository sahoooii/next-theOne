import { auth } from '@/auth';

export default async function Home() {
	const session = await auth();

	return (
		<div className='space-y-4'>
			<h3 className='text-2xl'>User Session Data:</h3>
			{session ? (
				<div>
					Add section later...
				</div>
			) : (
				<div>Not logged in</div>
			)}
		</div>
	);
}
