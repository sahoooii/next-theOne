'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	resetPasswordSchema,
	ResetPasswordSchema,
} from '@/lib/schema/authSchemas';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { GiBigDiamondRing } from 'react-icons/gi';
import { Loader2 } from 'lucide-react';

import { showToast } from '@/lib/toast';

import { resetPasswordAction } from '@/app/actions/authActions';
import { handleFormServerErrors } from '@/lib/utils';

const ResetPasswordForm = ({ token }: { token: string }) => {
	const router = useRouter();

	const form = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		mode: 'onTouched',
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const [isPending, startTransition] = useTransition();

	const onSubmit = async (data: ResetPasswordSchema) => {
		const result = await resetPasswordAction(token, data.password);

		if (result.status === 'success') {
			showToast('Password reset successfully', 'success');

			startTransition(() => {
				router.push('/login');
				router.refresh();
			});
		} else {
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
						Reset Password
					</CardTitle>

					<CardDescription className='text-muted-foreground'>
						Create a new password for your account
					</CardDescription>
				</div>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
						{/* New Password */}
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>

									<FormControl>
										<Input type='password' className='h-11' {...field} />
									</FormControl>

									<FormMessage className='text-sm text-red-500' />
								</FormItem>
							)}
						/>

						{/* Confirm Password */}
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>

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
							Reset Password
						</Button>
					</form>
				</Form>
			</CardContent>

			<CardFooter className='flex justify-center'>
				<p className='text-sm text-muted-foreground text-center'>
					Remember your password?{' '}
					<Link href='/login' className='text-primary hover:underline'>
						Sign in
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default ResetPasswordForm;
