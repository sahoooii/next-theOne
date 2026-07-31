export function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='min-h-[calc(100vh-80px)] mx-auto px-6 p-10 pb-36 lg:pb-24'>
			<div className='max-w-6xl mx-auto'>{children}</div>
		</main>
	);
}
