'use client';

import { UseFormReturn } from 'react-hook-form';

import { MessageSchema } from '@/lib/schema/messageSchema';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { SendHorizonal } from 'lucide-react';

type ChatInputProps = {
	form: UseFormReturn<MessageSchema>;
	onSubmit: (data: MessageSchema) => Promise<void>;
	handleTypingChange: (text: string) => Promise<void>;
};

const ChatInput = ({ form, onSubmit, handleTypingChange }: ChatInputProps) => {
	// Press enter to submit message
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (
			e.key === 'Enter' &&
			!e.shiftKey &&
			form.formState.isValid &&
			!form.formState.isSubmitting
		) {
			e.preventDefault();

			form.handleSubmit(onSubmit)();
		}
	};

	return (
		<div
			className='
					border-t
					border-black/10
					bg-white/40
					p-4
					backdrop-blur-xl
				'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex items-end gap-3'
				>
					<FormField
						control={form.control}
						name='text'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormMessage className='text-sm text-red-700' />

								<FormControl>
									<Textarea
										{...field}
										placeholder='Write a message...'
										onKeyDown={handleKeyDown}
										onChange={(e) => {
											field.onChange(e);
											handleTypingChange(e.target.value);
										}}
										className='
												min-h-[56px]
												resize-none
												rounded-2xl
												border-black/10
												bg-white/80
												text-sm
												placeholder:text-gray-400
												focus-visible:ring-1
												focus-visible:ring-purple-400
											'
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						size='icon'
						disabled={
							!form.formState.isDirty ||
							!form.formState.isValid ||
							form.formState.isSubmitting
						}
						className='
								h-12
								w-12
								rounded-full
								bg-purple-500
								transition-all
								duration-300
								hover:bg-purple-400
							'
					>
						<SendHorizonal className='h-5 w-5' />
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default ChatInput;
