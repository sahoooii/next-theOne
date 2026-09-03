import HomeHero from '@/components/home/HomeHero';
import NewMembers from '@/components/home/NewMembers';
import TodaysPicks from '@/components/home/TodaysPicks';

const HomePage = async () => {
	return (
		<div>
			<HomeHero />
			<TodaysPicks />
			<NewMembers />
			{/* HowItWorks */}
			{/* HomeCTA */}
		</div>
	);
};

export default HomePage;
