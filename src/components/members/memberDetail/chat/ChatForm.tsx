'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { messageSchema, MessageSchema } from '@/lib/schema/messageSchema';

import { SendHorizonal } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

const mockMessages = [
	{
		// 相手
		id: 1,
		text: 'Hey, how was your day?',
		isCurrentUser: false,
	},
	{
		// 自分
		id: 2,
		text: 'Pretty good. Just finished working out.',
		isCurrentUser: true,
	},
	{
		id: 3,
		text: 'Nice. You always seem disciplined.',
		isCurrentUser: false,
	},
	{
		id: 4,
		text: 'ha ha ha',
		isCurrentUser: true,
	},
];

const ChatForm = () => {
	const router = useRouter();

	const params = useParams<{ userId: string }>();

	const form = useForm<MessageSchema>({
		resolver: zodResolver(messageSchema),
		mode: 'onChange',
		defaultValues: {
			text: '',
		},
	});

	const onSubmit = (data: MessageSchema) => {
		console.log(data);

		form.reset();
	};

	return (
		<div
			className='
				flex
				h-[calc(100vh-120px)]
				flex-col
				overflow-hidden
				rounded-3xl
				border
				border-black/10
				bg-white/70
				backdrop-blur-md
			'
		>
			{/* Header */}
			<div
				className='
					flex
					items-center
					justify-between
					border-b
					border-black/10
					px-6
					py-4
				'
			>
				<div>
					{/* Change to sender name */}
					<h2 className='text-lg font-semibold text-gray-900'>Emily</h2>

					<p className='text-sm text-gray-500'>Active now</p>
				</div>
			</div>

			{/* Messages */}
			<div
				className='
					flex-1
					space-y-4
					overflow-y-auto
					p-6
				'
			>
				{/* Change from DB data */}
				{mockMessages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.isCurrentUser ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`
								relative
		max-w-[75%]
		px-4
		py-3
		text-sm
		leading-relaxed
		shadow-sm
		transition-all
		duration-300
							${
								message.isCurrentUser
									? `
					rounded-3xl
					rounded-br-sm
					bg-purple-500/90
					text-white
				`
									: `
					rounded-3xl
					rounded-bl-sm
					border
					border-black/5
					bg-black/5
					text-gray-800
				`
							}
	`}
						>
							{message.text}
						</div>
					</div>
				))}
			</div>

			{/* Form */}
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
											placeholder='Write a message...'
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
											{...field}
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
								rounded-2xl
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
		</div>
	);
};

export default ChatForm;
