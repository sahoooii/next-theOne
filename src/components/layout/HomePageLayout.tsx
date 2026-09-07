const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='min-h-[calc(100vh-80px)]'>{children}</main>
	);
};

export default HomePageLayout;
