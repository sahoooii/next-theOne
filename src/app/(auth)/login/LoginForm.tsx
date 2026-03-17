'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaUnlockAlt } from 'react-icons/fa';

const LoginForm = () => {
	return (
		<Card className='w-full max-w-sm mx-auto my-10'>
			<CardHeader>
				<CardTitle className='mx-auto flex items-center gap-3 text-2xl'>
					<FaUnlockAlt size={24} className='text-primary' />
					Login
				</CardTitle>
				<CardDescription>
					Welcome back to The One
				</CardDescription>
				<Button variant='link'>Sign Up</Button>
			</CardHeader>
			<CardContent>
				<form>
					<div className='flex flex-col gap-6'>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='m@example.com'
								required
							/>
						</div>
						<div className='grid gap-2'>
							<div className='flex items-center'>
								<Label htmlFor='password'>Password</Label>
								<a
									href='#'
									className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
								>
									Forgot your password?
								</a>
							</div>
							<Input id='password' type='password' required />
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className='flex-col gap-2'>
				<Button type='submit' className='w-full'>
					Login
				</Button>
				<Button variant='outline' className='w-full'>
					Login with Google
				</Button>
			</CardFooter>
		</Card>
	);
};

export default LoginForm;
