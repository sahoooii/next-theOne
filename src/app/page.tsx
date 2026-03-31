import { FaRegSmile } from 'react-icons/fa';
import { auth } from '@/auth';
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export default async function Home() {
	const session = await auth();

	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-bold'>The One</h1>

			<h3 className='text-2xl'>User Session Data:</h3>
			{session ? (
				<div>
					<pre>{JSON.stringify(session, null, 2)}</pre>
					<form
						action={async () => {
							'use server';

							await signOut();
						}}
					>
						<Button
							type='submit'
							className='inline-flex items-center gap-2 rounded-md border border-purple-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500/20'
						>
							<FaRegSmile size={20} />
							<span>Sign out</span>
						</Button>
					</form>
				</div>
			) : (
				<div>Not logged in</div>
			)}
		</div>
	);
}
