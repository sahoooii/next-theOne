'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	forgotPasswordSchema,
	ForgotPasswordSchema,
} from '@/lib/schema/authSchemas';

import { requestPasswordReset } from '@/app/actions/authActions';

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
import { handleFormServerErrors } from '@/lib/utils';

export default function ForgotPasswordForm() {
	const form = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		mode: 'onTouched',
		defaultValues: {
			email: '',
		},
	});

	const [isPending, startTransition] = useTransition();

	const onSubmit = async (data: ForgotPasswordSchema) => {
		startTransition(async () => {
			const result = await requestPasswordReset(data.email);

			if (result.status === 'success') {
				showToast(result.data, 'success');
				form.reset();
			} else {
				const globalError = handleFormServerErrors(result.error, form.setError);

				if (globalError) {
					showToast(globalError, 'error');
				}
			}
		});
	};

	return (
		<Card className='w-full max-w-sm mx-auto border-none shadow-xl bg-background/80 backdrop-blur'>
			<CardHeader className='space-y-4 text-center'>
				<div className='mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10'>
					<GiBigDiamondRing size={28} className='text-primary drop-shadow-sm' />
				</div>

				<div>
					<CardTitle className='text-2xl font-semibold'>
						Forgot Password?
					</CardTitle>
					<CardDescription className='text-muted-foreground'>
						Enter your email address and we&apos;ll send you a link to reset
						your password.
					</CardDescription>
				</div>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type='email'
											placeholder='you@example.com'
											{...field}
										/>
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
							{form.formState.isSubmitting || isPending ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									<p>Sending</p>
								</>
							) : (
								<p>Send Reset Link</p>
							)}
						</Button>
					</form>
				</Form>
			</CardContent>

			<CardFooter className='justify-center'>
				<Link href='/login' className='text-sm text-primary hover:underline'>
					Back to Login
				</Link>
			</CardFooter>
		</Card>
	);
}
