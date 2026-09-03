const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='min-h-[calc(100vh-80px)] pb-36 lg:pb-24'>{children}</main>
	);
};

export default HomePageLayout;
