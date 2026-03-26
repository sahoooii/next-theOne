'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchema } from '@/lib/schema/registerForm';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GiBigDiamondRing } from 'react-icons/gi';
import Link from 'next/link';
import { registerUser } from '@/app/actions/authActions';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const RegisterForm = () => {
	// For entire of server error
	const [formError, setFormError] = useState('');

	const form = useForm<RegisterSchema>({
		// resolver: zodResolver(registerSchema),
		mode: 'onTouched',
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: RegisterSchema) => {
		const result = await registerUser(data);

		if (result.status === 'success') {
			console.log('User registered successfully');
		} else {
			// For entire of server error
			if (typeof result.error === 'string') {
				setFormError(result.error);
			} else {
				// For field error
				Object.entries(result.error).forEach(([field, message]) => {
					form.setError(field as keyof RegisterSchema, {
						message,
					});
				});
			}
		}
	};

	return (
		<Card className='w-full max-w-sm mx-auto border-none shadow-xl bg-background/80 backdrop-blur'>
			<CardHeader className='space-y-4 text-center'>
				<div className='mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10'>
					<GiBigDiamondRing size={28} className='text-primary drop-shadow-sm' />
				</div>

				<div>
					<CardTitle className='text-2xl font-semibold'>
						Welcome to The One
					</CardTitle>
					<CardDescription className='text-muted-foreground'>
						Register to your journey
					</CardDescription>
				</div>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
						{/* Name */}
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>

									<FormControl>
										<Input
											type='text'
											placeholder='Type your name'
											className='h-11'
											{...field}
										/>
									</FormControl>
									<FormMessage className='text-sm text-red-500' />
								</FormItem>
							)}
						/>
						{/* Email */}
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>

									<FormControl>
										<Input
											type='email'
											placeholder='email@example.com'
											className='h-11'
											{...field}
										/>
									</FormControl>
									<FormMessage className='text-sm text-red-500' />
								</FormItem>
							)}
						/>
						{/* Password */}
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<div>
										<FormLabel>Password</FormLabel>
									</div>

									<FormControl>
										<Input type='password' className='h-11' {...field} />
									</FormControl>

									<FormMessage className='text-sm text-red-500' />
								</FormItem>
							)}
						/>

						{/* For entire of server error */}
						{formError && (
							<p className='text-red-500 text-sm'>{formError}</p>
						)}

						<Button
							type='submit'
							className='w-full h-11 text-base font-medium mt-2'
							disabled={!form.formState.isValid || form.formState.isSubmitting}
						>
							{form.formState.isSubmitting && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							Register
						</Button>
					</form>
				</Form>
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
					Register with Google
				</Button>
				<p className='text-sm text-muted-foreground text-center'>
					Already have an account?{' '}
					<Link href='/login' className='text-primary hover:underline'>
						Sign in
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default RegisterForm;
