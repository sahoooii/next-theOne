import HomeHero from '@/components/home/hero/HomeHero';
import TodaysPicks from '@/components/home/todaysPicks/TodaysPicks';
import NewMembers from '@/components/home/newMembers/NewMembers';
import HowItWorks from '@/components/home/howItWorks/HowItWorks';

const HomePage = async () => {
	return (
		<div>
			<HomeHero />
			<TodaysPicks />
			<NewMembers />
			<HowItWorks />
			{/* HomeCTA */}
		</div>
	);
};

export default HomePage;
