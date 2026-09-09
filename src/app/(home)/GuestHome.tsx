import {
	getGuestNewMembers,
	getGuestTodaysPicks,
} from '../actions/homeActions';

import HomeHero from '@/components/home/hero/HomeHero';
import TodaysPicks from '@/components/home/todaysPicks/TodaysPicks';
import NewMembers from '@/components/home/newMembers/NewMembers';
import HowItWorks from '@/components/home/howItWorks/HowItWorks';
import HomeCTA from '@/components/home/cta/HomeCTA';

const GuestHome = async () => {
	const members = await getGuestTodaysPicks();
	const newMembers = await getGuestNewMembers();

	return (
		<>
			<HomeHero ctaLabel='Get Started' ctaHref='/register' />
			<TodaysPicks members={members} />
			<NewMembers newMembers={newMembers} />
			<HowItWorks />
			<HomeCTA ctaLabel='Get Started' ctaHref='/register' />
		</>
	);
};

export default GuestHome;
