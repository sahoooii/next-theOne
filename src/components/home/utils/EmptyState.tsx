type EmptyStateProps = {
	title: string;
	description: string;
};

const EmptyState = ({ title, description }: EmptyStateProps) => {
	return (
		<div className='flex min-h-[280px] items-center justify-center rounded-2xl border border-purple-100 bg-purple-50/30 px-6'>
			<div className='max-w-md text-center'>
				<p className='font-display text-2xl font-normal tracking-wide text-purple-950'>
					{title}
				</p>

				<p className='mt-3 text-sm leading-6 text-purple-900/60'>
					{description}
				</p>
			</div>
		</div>
	);
};

export default EmptyState;
