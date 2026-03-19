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
import { GiBigDiamondRing } from 'react-icons/gi';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<Card className='w-full max-w-sm mx-auto border-none shadow-xl bg-background/80 backdrop-blur'>
			<CardHeader className='space-y-4 text-center'>
				<div className='mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10'>
					<GiBigDiamondRing size={28} className='text-primary drop-shadow-sm' />
				</div>

				<div>
					<CardTitle className='text-2xl font-semibold'>Welcome back</CardTitle>
					<CardDescription className='text-muted-foreground'>
						Sign in to continue your journey
					</CardDescription>
				</div>
			</CardHeader>

			<CardContent>
				<form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='email@example.com'
							className='h-11'
							{...register('email', { required: 'Email is required' })}
							// isInValid={!!errors.email}
							// errorMessage={errors.email?.message as string}
						/>
					</div>

					<div className='space-y-2'>
						<div className='flex items-center justify-between'>
							<Label htmlFor='password'>Password</Label>
							<a
								href='#'
								className='text-sm text-muted-foreground hover:text-primary transition'
							>
								Forgot password?
							</a>
						</div>

						<Input
							id='password'
							type='password'
							className='h-11'
							{...register('password', { required: 'Password is required' })}
							// isInValid={!!errors.password}
							// errorMessage={errors.password?.message as string}
						/>
					</div>

					<Button
						type='submit'
						className='w-full h-11 text-base font-medium mt-2'
						// isDisabled={!isValid}
					>
						Sign in
					</Button>
				</form>
			</CardContent>

			<CardFooter className='flex flex-col gap-4'>
				<div className='relative w-full'>
					<div className='absolute inset-0 flex items-center'>
						<span className='w-full border-t' />
					</div>
					<div className='relative text-center text-xs uppercase text-muted-foreground'>
						<span className='bg-background px-2'>or</span>
					</div>
				</div>

				<Button variant='outline' className='w-full h-11'>
					Continue with Google
				</Button>

				<p className='text-sm text-muted-foreground text-center'>
					Don’t have an account?{' '}
					<a href='#' className='text-primary hover:underline'>
						Sign up
					</a>
				</p>
			</CardFooter>
		</Card>
	);
};

export default LoginForm;
