'use client';

import { useTransition } from 'react';
import { deleteAccount } from '@/app/actions/userActions';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const DeleteAccount = () => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = async () => {
		startTransition(async () => {
			await deleteAccount();
		});
	};

	return (
		<Card
			className='
		mt-6
		w-full max-w-3xl mx-auto
		bg-white/70 backdrop-blur-md
		border border-red-200
		rounded-2xl
		p-8
		transition-all duration-300
		hover:border-red-300
	'
		>
			<div className='space-y-6'>
				{/* Header */}
				<div>
					<h3 className='text-lg font-medium text-gray-900'>Danger Zone</h3>

					<p className='text-sm text-gray-500 mt-1'>
						This action cannot be undone.
					</p>
				</div>

				{/* Content */}
				<div className='space-y-4'>
					<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
						<div className='max-w-md'>
							<p className='font-medium text-gray-900'>Delete Account</p>

							<p className='text-sm text-gray-500 mt-1'>
								Permanently remove your account, profile, photos and likes.
							</p>
						</div>

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									className='
							bg-red-400
							hover:bg-red-600
							text-white
							font-medium
							shadow-sm
							hover:shadow-md
							transition-all duration-300
							w-full sm:w-auto
							sm:min-w-44
						'
								>
									Delete My Account
								</Button>
							</AlertDialogTrigger>

							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Delete Account</AlertDialogTitle>

									<AlertDialogDescription asChild>
										<div className='space-y-3 pt-2'>
											<p>
												This will permanently delete your account, profile,
												photos and likes.
											</p>
											<p>Your messages will remain visible to other members.</p>
											<p className='font-medium text-red-500'>
												This action cannot be undone.
											</p>
										</div>
									</AlertDialogDescription>
								</AlertDialogHeader>

								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>

									<AlertDialogAction
										onClick={handleDelete}
										disabled={isPending}
										className='
								bg-red-600
								hover:bg-red-700
								focus:ring-red-500
							'
									>
										{isPending ? 'Deleting...' : 'Delete Account'}
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default DeleteAccount;
