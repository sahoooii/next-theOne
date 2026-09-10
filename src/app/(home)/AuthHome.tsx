import { getNewMembers, getTodaysPicks } from '../actions/homeActions';

import HomeHero from '@/components/home/hero/HomeHero';
import TodaysPicks from '@/components/home/todaysPicks/TodaysPicks';
import NewMembers from '@/components/home/newMembers/NewMembers';
import HowItWorks from '@/components/home/howItWorks/HowItWorks';
import HomeCTA from '@/components/home/cta/HomeCTA';

const AuthHome = async () => {
	const members = await getTodaysPicks();

	const newMembers = await getNewMembers({
		excludeUserIds: members.map((member) => member.userId),
	});

	return (
		<>
			<HomeHero ctaLabel='Explore Members' ctaHref='/members' />
			<TodaysPicks members={members} />
			<NewMembers newMembers={newMembers} />
			<HowItWorks />
			<HomeCTA ctaLabel='Find Your One' ctaHref='/members' />
		</>
	);
};

export default AuthHome;
