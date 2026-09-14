'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginSchema } from '@/lib/schema/loginSchema';

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
import { signInUser } from '@/app/actions/authActions';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { showToast } from '@/lib/toast';

const LoginForm = () => {
	const router = useRouter();

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: 'onTouched',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [isPending, startTransition] = useTransition();

	const onSubmit = async (data: LoginSchema) => {
		const result = await signInUser(data);

		if (result.status === 'success') {
			showToast('Welcome back to your journey', 'success');

			startTransition(() => {
				router.push('/members');
				router.refresh();
			});
		} else {
			showToast(result.error as string, 'error');
		}
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
				<Form {...form}>
					<form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
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
									<div className='flex items-center justify-between'>
										<FormLabel>Password</FormLabel>
										{/* <a
											href='#'
											className='text-sm text-muted-foreground hover:text-primary transition'
										>
											Forgot password?
										</a> */}
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
							Sign in
						</Button>
					</form>
				</Form>
			</CardContent>

			<CardFooter className='flex flex-col gap-4'>
				{/* <div className='relative w-full'>
					<div className='absolute inset-0 flex items-center'>
						<span className='w-full border-t' />
					</div>
					<div className='relative text-center text-xs uppercase text-muted-foreground'>
						<span className='bg-background px-2'>or</span>
					</div>
				</div>

				<Button variant='outline' className='w-full h-11'>
					Continue with Google
				</Button> */}

				<p className='text-sm text-muted-foreground text-center'>
					Don’t have an account?{' '}
					<Link href='/register' className='text-primary hover:underline'>
						Sign up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default LoginForm;
