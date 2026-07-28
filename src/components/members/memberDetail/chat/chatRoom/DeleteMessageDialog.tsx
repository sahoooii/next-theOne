import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type DeleteMessageDialogProps = {
	open: boolean;
	onClose: () => void;
	onDelete: () => Promise<void>;
};

const DeleteMessageDialog = ({
	open,
	onClose,
	onDelete,
}: DeleteMessageDialogProps) => {
	return (
		<AlertDialog
			open={open}
			onOpenChange={(open) => {
				if (!open) {
					onClose();
				}
			}}
		>
			<AlertDialogContent
				className='
	w-[90%]
	max-w-sm
	rounded-3xl
	border-black/10
	bg-white/90
	p-6
	md:p-8
	backdrop-blur-xl
'
			>
				<AlertDialogHeader>
					<AlertDialogTitle
						className='
						pt-4
						text-xl
						font-semibold
						text-gray-900
					'
					>
						Delete message?
					</AlertDialogTitle>
					<div className='h-[2px] w-10 rounded-full bg-purple-500' />

					<AlertDialogDescription
						className='
						pt-1
						text-sm
						text-gray-500
					'
					>
						This message will be permanently removed.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel
						className='
						rounded-2xl
						border-black/10
					'
					>
						Cancel
					</AlertDialogCancel>

					<AlertDialogAction
						onClick={onDelete}
						className='
						rounded-2xl
						bg-purple-500
						text-white
						hover:bg-purple-400
					'
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteMessageDialog;
