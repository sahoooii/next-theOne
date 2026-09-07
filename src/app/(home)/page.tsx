import HomeHero from '@/components/home/hero/HomeHero';
import TodaysPicks from '@/components/home/todaysPicks/TodaysPicks';
import NewMembers from '@/components/home/newMembers/NewMembers';
import HowItWorks from '@/components/home/howItWorks/HowItWorks';
import HomeCTA from '@/components/home/cta/HomeCTA';

const HomePage = async () => {
	return (
		<div>
			<HomeHero />
			<TodaysPicks />
			<NewMembers />
			<HowItWorks />
			<HomeCTA />
		</div>
	);
};

export default HomePage;
