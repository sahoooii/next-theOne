import TopNav from '@/components/navigation/topNav/TopNav';
import { PageLayout } from '@/components/layout/PageLayout';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<TopNav />
			<PageLayout>{children}</PageLayout>
			{/* BottomNav */}
		</>
	);
};

export default AuthLayout;
