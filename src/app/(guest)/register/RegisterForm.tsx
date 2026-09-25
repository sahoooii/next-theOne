'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

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
import { registerUser } from '@/app/actions/authActions';
import { Loader2 } from 'lucide-react';
import { showToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { handleFormServerErrors } from '@/lib/utils';
import GoogleIconButton from '@/components/navigation/shared/GoogleIconButton';

const RegisterForm = () => {
	const router = useRouter();

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: 'onTouched',
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const [isPending, startTransition] = useTransition();

	const onSubmit = async (data: RegisterSchema) => {
		const result = await registerUser(data);

		// After register account, then user login
		if (result.status === 'success') {
			await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			showToast('User registered successfully', 'success');

			startTransition(async () => {
				router.push('/complete-profile');
				router.refresh();
			});
		} else {
			// For entire of server error
			const globalError = handleFormServerErrors(result.error, form.setError);

			if (globalError) {
				showToast(globalError, 'error');
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

						<Button
							type='submit'
							className='w-full h-11 text-base font-medium mt-2'
							disabled={
								!form.formState.isValid ||
								form.formState.isSubmitting ||
								isPending
							}
						>
							{(form.formState.isSubmitting || isPending) && (
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

				<GoogleIconButton text='Register with Google' />

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
