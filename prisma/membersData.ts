import { Gender, SearchGender } from '@prisma/client';

export const membersData = [
	{
		email: 'lizz@test.com',
		username: 'lizz',
		gender: Gender.FEMALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1999-07-22',
		name: 'Lizz',
		created: '2026-06-24',
		lastActive: '2026-07-21',
		description:
			'Beach lover and early morning runner—nothing beats a sunrise by the ocean. I work in marketing and love anything creative, from photography to styling. Pretty laid-back but always up for a spontaneous road trip. Looking for someone who doesn’t take life too seriously.\r\n',
		city: 'Perth',
		country: 'Australia',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134388/lizz_iwi3ep.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134388/lizz_iwi3ep.jpg',
				publicId: 'lizz_iwi3ep',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1788306823/the-one/userImages/lizz2_her0eg.png',
				publicId: 'the-one/userImages/lizz2_her0eg',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1788306715/the-one/userImages/lizz_ojvaun.png',
				publicId: 'the-one/userImages/lizz_ojvaun',
			},
		],
	},
	{
		email: 'amanda@test.com',
		username: 'amanda',
		gender: Gender.FEMALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '1992-10-12',
		name: 'Amanda',
		created: '2026-12-09',
		lastActive: '2024-05-06',
		description:
			'Big fan of good tea, long walks, and meaningful conversations. I work in finance, but outside of that, I’m usually at a gallery or trying a new restaurant. I appreciate honesty and a bit of dry humor. Bonus points if you can recommend a great book.\r\n',
		city: 'London',
		country: 'England',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134310/amanda_xdozr2.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134310/amanda_xdozr2.jpg',
				publicId: 'amanda_xdozr2',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1781162761/the-one/userImages/amanda1_vf3t0d.png',
				publicId: 'the-one/userImages/amanda1_vf3t0d',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789107592/amanda2_o4x11k.png',
				publicId: 'amanda2_o4x11k',
			},
		],
	},
	{
		email: 'hannah@test.com',
		username: 'hannah',
		gender: Gender.FEMALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '2003-08-05',
		name: 'Hannah',
		created: '2025-08-10',
		lastActive: '2026-05-12',
		description:
			'Just graduated from  Stanford University. I was majoring psychology, always curious about how people think. I spend most of my free time at the beach or with friends, probably laughing too loud. Easygoing and a little bit goofy. Just looking to meet genuine people and see where it goes.\r\n',
		city: 'San Diego',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134537/hannah_ysviuf.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134537/hannah_ysviuf.jpg',
				publicId: 'hannah_ysviuf',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789107687/Hannah1_yjh09e.png',
				publicId: 'Hannah1_yjh09e',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789107687/Hannah1_yjh09e.png',
				publicId: 'Hannah1_yjh09e',
			},
		],
	},
	{
		email: 'misato@test.com',
		username: 'misato',
		gender: Gender.FEMALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1994-06-22',
		name: 'Misato',
		created: '2024-04-24',
		lastActive: '2026-06-17',
		description:
			'I enjoy slow mornings, good matcha, and exploring hidden spots around the city. I work in design and love creating things that feel simple but thoughtful. Calm personality, but I enjoy deep conversations. Looking for someone kind and grounded.\r\n',
		city: 'Kyoto',
		country: 'Japan',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134347/misato_dvzvhj.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134347/misato_dvzvhj.jpg',
				publicId: 'misato_dvzvhj',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108160/msato2_drbvty.jpg',
				publicId: 'msato2_drbvty',
			},
		],
	},
	{
		email: 'maria@test.com',
		username: 'maria',
		gender: Gender.NON_BINARY,
		searchGender: SearchGender.NON_BINARY,
		dateOfBirth: '1989-01-12',
		name: 'Maria',
		created: '2025-04-30',
		lastActive: '2026-08-21',
		description:
			'Architect by profession, passionate about design, culture, and travel. I love discovering new places, especially local food spots. Family and close friendships mean a lot to me. Looking for someone who’s genuine, open-minded, and enjoys life’s little moments.',
		city: 'Ciudad de México',
		country: 'Mexico',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134337/maria_bejaw2.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134337/maria_bejaw2.jpg',
				publicId: 'maria_bejaw2',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108277/maria2_ws7i4w.jpg',
				publicId: 'maria2_ws7i4w',
			},
		],
	},
	{
		email: 'josh@test.com',
		username: 'josh',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '1997-02-07',
		name: 'Josh',
		created: '2025-04-29',
		lastActive: '2026-09-08',
		description:
			'Born and raised in Hawaii, I’m all about ocean life and staying active. I work remotely in tech, so I try to balance it out with surfing or hiking. Pretty easygoing, but I value people who are genuine and grounded. Looking for something real, not rushed.\r\n',
		city: 'Hawaii',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134397/josh_ljz2yp.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134397/josh_ljz2yp.jpg',
				publicId: 'josh_ljz2yp',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1788306255/the-one/userImages/josh1_zzgtge.png',
				publicId: 'the-one/userImages/josh1_zzgtge',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1788254699/the-one/userImages/josh2_j0woyc.png',
				publicId: 'the-one/userImages/josh2_j0woyc',
			},
		],
	},
	{
		email: 'albert@test.com',
		username: 'albert',
		gender: Gender.MALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1984-04-09',
		name: 'Albert',
		created: '2025-04-05',
		lastActive: '2026-08-23',
		description:
			'I’ve built my career in consulting, but these days I’m more focused on enjoying the city at my own pace. Big fan of jazz, good wine, and conversations that go a little deeper. I appreciate independence and emotional maturity. Not into games—just real connection.\r\n',
		city: 'New York',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134310/albert_jhir2f.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134310/albert_jhir2f.jpg',
				publicId: 'albert_jhir2f',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1788307591/the-one/userImages/albert2_bsdcvh.png',
				publicId: 'the-one/userImages/albert2_bsdcvh',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108455/albert1_vkhhnk.png',
				publicId: 'albert1_vkhhnk',
			},
		],
	},
	{
		email: 'chris@test.com',
		username: 'chris',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '1989-03-23',
		name: 'Chris',
		created: '2025-03-14',
		lastActive: '2026-09-09',
		description:
			'Work in logistics, but outside of that, I’m usually at the gym or catching a game. I’m straightforward, loyal, and have a pretty dry sense of humor. Not the flashiest guy, but I show up when it counts. Looking for someone who values consistency.\r\n',
		city: 'Chicago',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134311/chris_qzbu3y.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134311/chris_qzbu3y.jpg',
				publicId: 'chris_qzbu3y',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108527/chris2_hdjtep.png',
				publicId: 'chris2_hdjtep',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108533/chris3_dynony.png',
				publicId: 'chris3_dynony',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108541/chris4_qwxxf4.png',
				publicId: 'chris4_qwxxf4',
			},
		],
	},
	{
		email: 'eric@test.com',
		username: 'eric',
		gender: Gender.MALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1992-12-01',
		name: 'Eric',
		created: '2020-01-28',
		lastActive: '2026-06-07',
		description:
			'I work in product design and enjoy building things that people actually use. Big on good tea, cycling around the city, and the occasional weekend getaway. I’m calm, thoughtful, and a bit sarcastic once you get to know me. Looking for something meaningful.\r\n',
		city: 'London',
		country: 'England',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134316/eric_vgufn4.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134316/eric_vgufn4.jpg',
				publicId: 'eric_vgufn4',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108718/eric2_aocwq6.jpg',
				publicId: 'eric2_aocwq6',
			},
		],
	},
	{
		email: 'gabriel@test.com',
		username: 'gabriel',
		gender: Gender.MALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1999-08-10',
		name: 'Gabriel',
		created: '2025-02-25',
		lastActive: '2026-09-11',
		description:
			'Love being outdoors—beach, hikes, anything with sun. I work in fitness, so staying active is a big part of my life. Pretty social and always up for meeting new people. Looking for someone who’s positive, fun, and enjoys a bit of adventure.\r\n',
		city: 'Sydney',
		country: 'Australia',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134330/gabriel_xzp4li.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134330/gabriel_xzp4li.jpg',
				publicId: 'gabriel_xzp4li',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108840/gabriel2_t99ivs.jpg',
				publicId: 'gabriel2_t99ivs',
			},
		],
	},
	{
		email: 'kaito@test.com',
		username: 'kaito',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '1998-12-24',
		name: 'Kaito',
		created: '2023-02-25',
		lastActive: '2026-09-11',
		description:
			'Working in IT, mostly backend, and I enjoy solving problems quietly. I’m not the loud type, but I care about the people close to me. On weekends, I like running or just walking around the city. Looking for someone I can feel comfortable being myself with.\r\n',
		city: 'Tokyo',
		country: 'Japan',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134336/kaito_peibyu.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134336/kaito_peibyu.jpg',
				publicId: 'kaito_peibyu',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108926/kaito1_hecjcw.png',
				publicId: 'kaito1_hecjcw',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789108934/kaito2_usaed0.png',
				publicId: 'kaito2_usaed0',
			},
		],
	},
	{
		email: 'ian@test.com',
		username: 'ian',
		gender: Gender.NON_BINARY,
		searchGender: SearchGender.ANY,
		dateOfBirth: '2002-02-20',
		name: 'Ian',
		created: '2020-02-25',
		lastActive: '2026-08-11',
		description:
			'Studying engineering and figuring things out one step at a time. I like learning new things, whether it’s tech, languages, or just random topics. Friends say I’m easy to talk to and a bit of a thinker. Open to meeting someone genuine and seeing where it goes.\r\n',
		city: 'Istanbul',
		country: 'Turkey',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789134935/ian_acp1bt.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789134935/ian_acp1bt.jpg',
				publicId: 'ian_acp1bt',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789109070/ian2_w2tnpx.jpg',
				publicId: 'ian2_w2tnp',
			},
		],
	},
	// New: Female
	{
		email: 'sarah@test.com',
		username: 'sarah',
		gender: Gender.FEMALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1995-07-22',
		name: 'Sarah',
		created: '2026-09-10',
		lastActive: '2026-09-11',
		description:
			"Always smiling and looking for the bright side of things! I'm a yoga instructor who loves early mornings, strong coffee, and sunset walks on the beach. I'm passionate about travel, trying new restaurants (especially Mexican food), and I'm currently learning to play the ukulele. Looking for someone genuine and fun-loving to share adventures with. If you can make me laugh, we're off to a great start!\r\n",
		city: 'San Diego',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789029690/the-one/userImages/sarah2_nsvvdj.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789029690/the-one/userImages/sarah2_nsvvdj.jpg',
				publicId: 'the-one/userImages/sarah2_nsvvdjg',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789029680/the-one/userImages/sarah_yqg7rh.jpg',
				publicId: 'the-one/userImages/sarah_yqg7rh',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789029797/the-one/userImages/sarah3_lkxabt.jpg',
				publicId: 'the-one/userImages/sarah3_lkxabt',
			},
		],
	},
	{
		email: 'aaliyah@test.com',
		username: 'aaliyah',
		gender: Gender.FEMALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '2000-11-14',
		name: 'Aaliyah',
		created: '2026-07-10',
		lastActive: '2026-08-15',
		description:
			'UI/UX designer with a passion for creative problem-solving and modern aesthetics. Outside of work, you’ll find me exploring quiet coffee shops with a good book, snapping architectural photos, or experimenting with new recipes. I love meaningful conversations, good design, and discovering new spots around the city. Looking to connect with someone ambitious, thoughtful, and down for spontaneous weekend museum trips or café hopping!\r\n',
		city: 'Toronto',
		country: 'Canada',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789029945/the-one/userImages/aaliyah_yfkw1c.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789029945/the-one/userImages/aaliyah_yfkw1c.jpg',
				publicId: 'the-one/userImages/aaliyah_yfkw1c',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789029999/the-one/userImages/aaliyah2_apesge.jpg',
				publicId: 'the-one/userImages/aaliyah2_apesge',
			},
		],
	},
	{
		email: 'eleanor@test.com',
		username: 'eleanor',
		gender: Gender.FEMALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '1997-12-23',
		name: 'Eleanor Vance',
		created: '2025-05-19',
		lastActive: '2026-09-01',
		description:
			"Librarian by day, vintage hunter by night. I'm a small-town girl with a love for old books, analog cameras, and sustainable fashion. You can usually find me sipping a latte at a cozy cafe, scouring thrift stores for unique treasures, or planning my next road trip through the countryside. Looking for someone with a sense of wonder and an appreciation for the details.\r\n",
		city: 'Stockholm',
		country: 'Sweden',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789032170/the-one/userImages/Eleanor_hnibfc.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789032170/the-one/userImages/Eleanor_hnibfc.jpg',
				publicId: 'the-one/userImages/Eleanor_hnibfc',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789032202/the-one/userImages/Eleanor_2_vv1fue.jpg',
				publicId: 'the-one/userImages/Eleanor_2_vv1fue',
			},
		],
	},
	{
		email: 'layla@test.com',
		username: 'layla',
		gender: Gender.FEMALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '2002-11-22',
		name: 'Layla',
		created: '2024-09-27',
		lastActive: '2026-08-11',
		description:
			"An architect with a passion for creative spaces and good design. When I'm not sketching new projects, you can usually find me discovering a new indie coffee shop (as pictured here!), experimenting in the kitchen, or unwinding with a sci-fi novel. I'm a bit of a homebody at heart but always down for a spontaneous road trip or a weekend market run. Looking for someone with a kind heart and a great sense of humor.\r\n",
		city: 'Dubai',
		country: 'AE',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789032464/the-one/userImages/Layla2_n1a6eu.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789032464/the-one/userImages/Layla2_n1a6eu.jpg',
				publicId: 'the-one/userImages/Layla2_n1a6eu',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789032443/the-one/userImages/Layla_ecjflk.jpg',
				publicId: 'the-one/userImages/Layla_ecjflk',
			},
		],
	},
	{
		email: 'chloe@test.com',
		username: 'chloe',
		gender: Gender.FEMALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '2003-5-29',
		name: 'Chloe',
		created: '2026-04-27',
		lastActive: '2026-09-10',
		description:
			"Adventure seeker with a serious case of wanderlust. Currently exploring the breathtaking landscapes of Iceland! I'm an outdoor enthusiast who loves hiking, photography, and finding hidden gems off the beaten path. I'm always down for an impromptu road trip and believe in collecting experiences, not things. If you enjoy crisp mountain air and the roar of a waterfall, we'll get along just fine.\r\n",
		city: 'Denver, Colorado',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789032653/the-one/userImages/Chloe_dpbl0k.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789032653/the-one/userImages/Chloe_dpbl0k.jpg',
				publicId: 'the-one/userImages/Chloe_dpbl0k',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789032686/the-one/userImages/Chloe2_zjcu48.jpg',
				publicId: 'the-one/userImages/Chloe2_zjcu48',
			},
		],
	},
	{
		email: 'ana@test.com',
		username: 'ana',
		gender: Gender.FEMALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '2005-8-31',
		name: 'Ana Swift',
		created: '2025-08-31',
		lastActive: '2026-05-30',
		description:
			'LA native 🌴 | Skate, music, 420 🍃 Unapologetically lesbian, looking to expand my circle beyond the usual faces.Spent my weekends catching beach sunsets. Down to chill if you are!\r\n',
		city: 'LosAngeles',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789033070/the-one/userImages/annnah_pmiaou.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789033070/the-one/userImages/annnah_pmiaou.jpg',
				publicId: 'the-one/userImages/annnah_pmiaou',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789033094/the-one/userImages/annah2_oip15n.jpg',
				publicId: 'the-one/userImages/annah2_oip15n',
			},
		],
	},
	{
		email: 'mia@test.com',
		username: 'mia',
		gender: Gender.FEMALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '2002-4-16',
		name: 'Mia Carter',
		created: '2023-11-21',
		lastActive: '2026-08-10',
		description:
			'I work in design and spend most of my free time either sketching, finding new coffee shops, or planning my next trip. I’m pretty easygoing and usually prefer a quiet dinner and a good conversation over a crowded night out.\r\n',
		city: 'Melbourne',
		country: 'Australia',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789084149/the-one/userImages/mia_p09zxp.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789084149/the-one/userImages/mia_p09zxp.jpg',
				publicId: 'the-one/userImages/mia_p09zxp',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789084178/the-one/userImages/mia2_df8gck.jpg',
				publicId: 'the-one/userImages/mia2_df8gck',
			},
		],
	},
	{
		email: 'sophie@test.com',
		username: 'sophie',
		gender: Gender.FEMALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1998-12-18',
		name: 'Sophie',
		created: '2020-11-21',
		lastActive: '2026-09-05',
		description:
			'I moved to Paris for work a few years ago and somehow never left. I love cooking for friends, weekend trips, and discovering little places that aren’t in every travel guide. Looking for someone kind, curious, and comfortable being themselves.\r\n',
		city: 'Lyon',
		country: 'France',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789084303/the-one/userImages/sophie_dtoay5.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789084303/the-one/userImages/sophie_dtoay5.jpg',
				publicId: 'the-one/userImages/sophie_dtoay5',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789084320/the-one/userImages/sophie2_qoer8c.jpg',
				publicId: 'the-one/userImages/sophie2_qoer8c',
			},
		],
	},
	{
		email: 'emma@test.com',
		username: 'emma',
		gender: Gender.NON_BINARY,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '2006-02-28',
		name: 'Emma Williams',
		created: '2026-07-27',
		lastActive: '2026-09-08',
		description:
			'Currently studying psychology and trying to figure out what I want to do with the rest of my twenties. I’m happiest near the ocean, especially with a book and a coffee. I can be a little shy at first, but I warm up quickly\r\n',
		city: 'Vancouver',
		country: 'Canada',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789084439/the-one/userImages/emma_ahdxee.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789084439/the-one/userImages/emma_ahdxee.jpg',
				publicId: 'the-one/userImages/emma_ahdxee',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789084544/the-one/userImages/emma2_cmpk2x.jpg',
				publicId: 'the-one/userImages/emma2_cmpk2x',
			},
		],
	},
	{
		email: 'serena@test.com',
		username: 'serena',
		gender: Gender.NON_BINARY,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1990-03-24',
		name: 'Serena Miller',
		created: '2020-04-19',
		lastActive: '2026-08-28',
		description:
			'Product manager by day, amateur photographer on weekends. I’ve lived in a few different cities and still get excited about exploring somewhere new. I appreciate people who are thoughtful, have a sense of humor, and don’t take themselves too seriously.\r\n',
		city: 'Seattle',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789084706/the-one/userImages/hannah.m_wjyhly.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789084706/the-one/userImages/hannah.m_wjyhly.jpg',
				publicId: 'the-one/userImages/hannah.m_wjyhly',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789084748/the-one/userImages/hannah.m.2_ama6h1.jpg',
				publicId: 'the-one/userImages/hannah.m.2_ama6h1',
			},
		],
	},
	{
		email: 'ava@test.com',
		username: 'ava',
		gender: Gender.FEMALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '2008-08-22',
		name: 'Ava Thompson',
		created: '2026-09-07',
		lastActive: '2026-09-11',
		description:
			'Just starting college and still getting used to having so many choices about what comes next. I spend a lot of time at the beach, take way too many photos of sunsets, and have recently become obsessed with learning how to surf properly.\r\n',
		city: 'Honolulu',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789104770/ava_ig6zvb.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789104770/ava_ig6zvb.jpg',
				publicId: 'ava_ig6zvb',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789113976/ava2_xxad41.jpg',
				publicId: 'ava2_xxad41',
			},
		],
	},
	{
		email: 'clara@test.com',
		username: 'clara',
		gender: Gender.FEMALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1987-02-20',
		name: 'Clara Rossi',
		created: '2024-10-20',
		lastActive: '2026-08-01',
		description:
			'I run a small interior design studio and have learned that I enjoy creating beautiful spaces almost as much as I enjoy living in them. I’m independent, curious, and a big fan of long dinners with good wine and even better conversation.\r\n',
		city: 'Milan',
		country: 'Italy',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789104770/clare_l7ujec.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789104770/clare_l7ujec.jpg',
				publicId: 'clare_l7ujec',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789114240/clare2_udfcqj.jpg',
				publicId: 'clare2_udfcqj',
			},
		],
	},
	{
		email: 'isabella@test.com',
		username: 'isabella',
		gender: Gender.FEMALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1983-10-12',
		name: 'Isabella',
		created: '2024-10-20',
		lastActive: '2026-08-01',
		description:
			'I’ve reached the age where I genuinely appreciate a peaceful Sunday morning. I work in publishing, love contemporary art, and travel whenever I can. I’m independent and happy with my life, but I’d like someone to share some of it with\r\n',
		city: 'Barcelona',
		country: 'Spain',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789104770/isabella_sexdyf.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789104770/isabella_sexdyf.jpg',
				publicId: 'isabella_sexdyf',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789114475/isabella2_ipqkir.jpg',
				publicId: 'isabella2_ipqkir',
			},
		],
	},
	{
		email: 'olivia@test.com',
		username: 'olivia',
		gender: Gender.FEMALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '2001-12-22',
		name: 'Olivia',
		created: '2024-06-10',
		lastActive: '2026-07-31',
		description:
			'I work in UX and have a slightly unhealthy habit of noticing every tiny detail in an app. Outside of work, I’m into swimming, street photography, and finding quiet cafés around the city. I’m not looking for anything complicated—just someone I genuinely enjoy spending time with.\r\n',
		city: 'Vancouver',
		country: 'Canada',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789104770/olivia_fetq1t.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789104770/olivia_fetq1t.jpg',
				publicId: 'olivia_fetq1t',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789114686/olivia2_yvjznk.jpg',
				publicId: 'olivia2_yvjznk',
			},
		],
	},
	{
		email: 'grace@test.com',
		username: 'grace',
		gender: Gender.FEMALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1992-02-22',
		name: 'Grace',
		created: '2025-06-10',
		lastActive: '2026-08-31',
		description:
			'I work in healthcare and value my time outside of work quite a lot. I like running, cooking simple meals, and exploring new cities without having every hour planned. Looking for something genuine rather than trying to collect matches.\r\n',
		city: 'Copenhagen',
		country: 'Denmark',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789135924/grace2_aa3ban.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789135924/grace2_aa3ban.jpg',
				publicId: 'grace2_aa3ban',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789135923/grace_nc8nf3.jpg',
				publicId: 'grace_nc8nf3',
			},
		],
	},
	{
		email: 'nora@test.com',
		username: 'nora',
		gender: Gender.FEMALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '2000-04-27',
		name: 'Nora Kim',
		created: '2026-06-18',
		lastActive: '2026-09-01',
		description:
			'I work in marketing and spend an embarrassing amount of time looking for new restaurants. I’m fairly quiet in large groups but very talkative once I’m comfortable with someone. I love photography, late-night walks, and finding places with a view.\r\n',
		city: 'Seoul',
		country: 'South Korea',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789135932/nora_cqx95f.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789135932/nora_cqx95f.jpg',
				publicId: 'nora_cqx95f',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789136422/nora2_awsamp.jpg',
				publicId: 'nora2_awsamp',
			},
		],
	},
	{
		email: 'elena@test.com',
		username: 'elena',
		gender: Gender.FEMALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1991-02-23',
		name: 'Elena Brooks',
		created: '2026-06-18',
		lastActive: '2026-09-01',
		description:
			'I’m happiest when I have a good coffee, a long walk, and nowhere I need to be. I’m studying graphic design and spend most weekends either sketching, exploring little cafés, or planning my next trip. A little quiet at first, but I open up quickly with the right person.\r\n',
		city: 'Portland',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789136605/elena_r5zauz.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789136605/elena_r5zauz.jpg',
				publicId: 'elena_r5zau',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789136612/elena2_p3392y.jpg',
				publicId: 'elena2_p3392y',
			},
		],
	},
	{
		email: 'camila@test.com',
		username: 'camila',
		gender: Gender.FEMALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1987-03-25',
		name: 'Camila',
		created: '2025-02-18',
		lastActive: '2026-09-05',
		description:
			'I run a small interior design studio and genuinely enjoy creating beautiful spaces. Outside of work, you’ll usually find me cooking for friends, walking by the sea, or discovering somewhere new to eat. I value honesty, good humor, and people who are comfortable being themselves.\r\n',
		city: 'Valencia',
		country: 'Spain',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789136857/camila_mn7alh.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789136857/camila_mn7alh.jpg',
				publicId: 'camila_mn7alh',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789136863/camila2_dgdmzi.jpg',
				publicId: 'camila2_dgdmzi',
			},
		],
	},
	{
		email: 'sophia@test.com',
		username: 'sophia',
		gender: Gender.FEMALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1999-03-29',
		name: 'Sophia',
		created: '2022-05-28',
		lastActive: '2026-05-05',
		description:
			'I work in publishing and have a soft spot for good books, live music, and dinners that turn into long conversations. I love traveling, but I’m just as happy staying home with a glass of wine and a movie. Looking for someone kind, curious, and easy to be around.\r\n',
		city: 'Manchester',
		country: 'UK',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789136881/sophia_ljfuun.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789136881/sophia_ljfuun.jpg',
				publicId: 'sophia_ljfuun',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789136875/sophia2_t9vi0l.jpg',
				publicId: 'sophia2_t9vi0l',
			},
		],
	},
	// New: Male
	{
		email: 'charlie@test.com',
		username: 'charlie',
		gender: Gender.MALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1996-11-11',
		name: 'Charlie',
		created: '2020-07-30',
		lastActive: '2026-07-28',
		description:
			"Aspiring graphic designer with a soft spot for indie coffee shops and classic cinema. Always looking for a new trail to explore or a cool concert to catch. If you can appreciate a good pun and don't mind a little friendly competition in Mario Kart, we'll get along just fine.\r\n",
		city: 'Denver, Colorado',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789026717/the-one/userImages/charlie_xwdtgy.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789026717/the-one/userImages/charlie_xwdtgy.jpg',
				publicId: 'the-one/userImages/charlie_xwdtgy',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789026817/the-one/userImages/charlie2_qdqjjd.jpg',
				publicId: 'the-one/userImages/charlie2_qdqjjd',
			},
		],
	},
	{
		email: 'alejandro@test.com',
		username: 'alejandro',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '1988-03-03',
		name: 'Alejandro',
		created: '2019-03-31',
		lastActive: '2026-08-17',
		description:
			"An architect by trade, I have a passion for blending structure with creativity, both in my work and in life. When I'm not designing, you can often find me with a coffee in one hand and a camera in the other, capturing the textures of the city or the beauty of nature. I enjoy meaningful conversations, travel (ask me about my last trip to the Amalfi Coast!), and cooking for friends—I’m told my risotto is quite good. Looking for someone with a kind heart, an intelligent mind, and a zest for life. A sense of humor is a must!\r\n",
		city: 'San Francisco',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789027001/the-one/userImages/alejandro_phftfx.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789027001/the-one/userImages/alejandro_phftfx.jpg',
				publicId: 'the-one/userImages/alejandro_phftfx',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789027109/the-one/userImages/alejandro2_hcrvgt.jpg',
				publicId: 'the-one/userImages/alejandro2_hcrvgt',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789027209/the-one/userImages/Alejandro3_ozfiaw.jpg',
				publicId: 'the-one/userImages/Alejandro3_ozfiaw',
			},
		],
	},
	{
		email: 'liam@test.com',
		username: 'liam',
		gender: Gender.NON_BINARY,
		searchGender: SearchGender.ANY,
		dateOfBirth: '2002-06-17',
		name: 'Liam Dubois',
		created: '2024-04-23',
		lastActive: '2026-05-27',
		description:
			"A Freelance graphic designer and photography enthusiast currently based in NY. Originally from Australia, so I'm always on the hunt for a café that actually knows how to make a proper flat white. You can usually find me hunting for vintage vinyl, snapping street photography, or playing acoustic guitar on sunny afternoons. Looking for someone genuine to explore music gigs and local art spots with.\r\n",
		city: 'Melbourne',
		country: 'Australia',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789027422/the-one/userImages/liam_io4uav.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789027422/the-one/userImages/liam_io4uav.jpg',
				publicId: 'the-one/userImages/liam_io4uav',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789027450/the-one/userImages/liam_rpp8aj.jpg',
				publicId: 'the-one/userImages/liam_rpp8aj',
			},
		],
	},
	{
		email: 'julian@test.com',
		username: 'julian',
		gender: Gender.MALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1996-11-24',
		name: 'Julian',
		created: '2025-09-23',
		lastActive: '2026-08-15',
		description:
			'Mexico 🇲🇽 ➔ Here Web designer who loves good fashion and better coffee. Spending my weekends wandering around town with my camera.\r\n',
		city: 'San Francisco',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789027851/the-one/userImages/julian_og0zeu.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789027851/the-one/userImages/julian_og0zeu.jpg',
				publicId: 'the-one/userImages/julian_og0zeu',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789027871/the-one/userImages/julian2_gkfnja.jpg',
				publicId: 'the-one/userImages/julian2_gkfnja',
			},
		],
	},
	{
		email: 'kris@test.com',
		username: 'kris',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '2002-01-22',
		name: 'Kris',
		created: '2024-03-23',
		lastActive: '2026-09-10',
		description:
			"Hey there, I'm Kris. When I'm not tweaking a mix or producing a track, you'll likely find me out here, exploring a new trail with my best buddy (as pictured!). I love discovering new music and independent coffee shops. A perfect day involves good sound, good coffee, and a long walk. Looking for someone who can match my energy and doesn't mind a very happy, energetic dog. Let's find a cool café or a great view.\r\n",
		city: 'London',
		country: 'United Kingdom',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789028181/the-one/userImages/kris_ppeeyl.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789028181/the-one/userImages/kris_ppeeyl.jpg',
				publicId: 'the-one/userImages/kris_ppeeyl',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789028253/the-one/userImages/kris2_zw1xof.jpg',
				publicId: 'the-one/userImages/kris2_zw1xof',
			},
		],
	},
	{
		email: 'tayler@test.com',
		username: 'tayler',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '1994-02-26',
		name: 'Tayler',
		created: '2020-10-28',
		lastActive: '2026-07-30',
		description:
			'Just a city boy with a love for live music, strong coffee, and finding hidden local spots. You can usually find me with a camera in hand, exploring the urban landscape, or catching a gig. Looking for someone genuine to share a slice of life and maybe some great street food.\r\n',
		city: 'New Orleans',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789028404/the-one/userImages/taylor_pirubc.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789028404/the-one/userImages/taylor_pirubc.jpg',
				publicId: 'the-one/userImages/taylor_pirubc',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789028415/the-one/userImages/taylor2_t5fikq.jpg',
				publicId: 'the-one/userImages/taylor2_t5fikq',
			},
		],
	},
	{
		email: 'timothy@test.com',
		username: 'timothy',
		gender: Gender.MALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1992-01-01',
		name: 'Timothy',
		created: '2026-05-28',
		lastActive: '2026-08-01',
		description:
			"Architect by day, music producer by night. I blend a love for modern design with vintage aesthetics, much like my favorite vinyl records. When I'm not designing buildings or building beats, you can find me looking for the perfect cup of coffee or finding inspiration in unique artisan workshops. Looking for someone with a sense of adventure and an appreciation for the details.\r\n",
		city: 'London',
		country: 'United Kingdom',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789028599/the-one/userImages/timothy_o7qoaf.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789028599/the-one/userImages/timothy_o7qoaf.jpg',
				publicId: 'the-one/userImages/timothy_o7qoaf',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789028624/the-one/userImages/timoth2_i1dwbq.jpg',
				publicId: 'the-one/userImages/timoth2_i1dwbq',
			},
		],
	},
	{
		email: 'daniel@test.com',
		username: 'daniel',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '1998-11-21',
		name: 'Daniel',
		created: '2024-01-20',
		lastActive: '2026-08-21',
		description:
			'I moved to Toronto after university and have grown to love the city, especially its food scene. I’m fairly ambitious when it comes to work, but I try to keep my evenings and weekends for friends, fitness, and exploring somewhere new.\r\n',
		city: 'Toronto',
		country: 'Canada',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789115138/daniel_ljdnjm.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789115138/daniel_ljdnjm.jpg',
				publicId: 'daniel_ljdnjm',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789117577/daniel2_wfacft.jpg',
				publicId: 'daniel2_wfacft',
			},
		],
	},
	{
		email: 'ethan@test.com',
		username: 'ethan',
		gender: Gender.MALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '1993-04-10',
		name: 'Ethan Books',
		created: '2025-10-29',
		lastActive: '2025-09-20',
		description:
			'I spend most of my weekdays writing code and most of my weekends trying to stay away from my laptop. I’m into climbing, live music, and finding good places to eat. Usually quiet at first, but I’m always up for a good conversation once we get going.\r\n',
		city: 'Austin',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789115138/ethan_lstbru.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789115138/ethan_lstbru.jpg',
				publicId: 'ethan_lstbru',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789117733/ethan2_cvm4rt.jpg',
				publicId: 'ethan2_cvm4rt',
			},
		],
	},
	{
		email: 'james@test.com',
		username: 'james',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '1984-08-30',
		name: 'James Wilson',
		created: '2019-04-20',
		lastActive: '2026-08-20',
		description:
			'I’ve been teaching history for more than a decade, so I probably ask too many questions. Outside the classroom, I enjoy hiking, cooking, and traveling whenever the school calendar allows it. I’m at a point in life where I value honesty, humor, and having someone to share ordinary days with.\r\n',
		city: 'Edinburgh',
		country: 'UK',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789115138/james_fh4zmf.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789115138/james_fh4zmf.jpg',
				publicId: 'james_fh4zmf',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789117854/james2_oc7aym.jpg',
				publicId: 'james2_oc7aym',
			},
		],
	},
	{
		email: 'leo@test.com',
		username: 'leo',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '2006-10-09',
		name: 'Leo',
		created: '2026-03-10',
		lastActive: '2026-09-05',
		description:
			'Studying business at university and still figuring out exactly where I want to go from here. I like basketball, late-night ramen runs, and traveling with friends whenever I have a break. I’m pretty laid-back and always interested in meeting people from different backgrounds.\r\n',
		city: 'Osaka',
		country: 'Japan',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789115138/leo_nh8zym.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789115138/leo_nh8zym.jpg',
				publicId: 'leo_nh8zym',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789115139/leo2_tosvjy.jpg',
				publicId: 'leo2_tosvjy',
			},
		],
	},
	{
		email: 'lucas@test.com',
		username: 'lucas',
		gender: Gender.MALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1996-04-15',
		name: 'Lucas Moreau',
		created: '2026-03-20',
		lastActive: '2026-08-05',
		description:
			'I work as an architect and probably notice buildings more than I should. Outside of work, I enjoy cycling, cooking, and taking long weekend trips without much of a plan. I’m looking for someone who is curious about the world and enjoys the little things.\r\n',
		city: 'Bordeaux',
		country: 'France',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789115139/lucas_uqo5ls.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789115139/lucas_uqo5ls.jpg',
				publicId: 'lucas_uqo5ls',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789118312/lucas2_swid4z.jpg',
				publicId: 'lucas2_swid4z',
			},
		],
	},
	{
		email: 'noah@test.com',
		username: 'noah',
		gender: Gender.MALE,
		searchGender: SearchGender.ANY,
		dateOfBirth: '2000-02-11',
		name: 'Noah Rossi',
		created: '2026-07-20',
		lastActive: '2026-05-05',
		description:
			'Photography started as a hobby and somehow became my job. I’m happiest wandering around a city with a camera and no particular destination. I love coffee, old movies, and people who can make me laugh without trying too hard.\r\n',
		city: 'Seattle',
		country: 'USA',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789115139/noah_lrcig8.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789115139/noah_lrcig8.jpg',
				publicId: 'noah_lrcig8',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789118490/noah2_kzy2tp.jpg',
				publicId: 'noah2_kzy2tp',
			},
		],
	},
	{
		email: 'jorge@test.com',
		username: 'jorge',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '2006-10-11',
		name: 'Jorge',
		created: '2026-08-20',
		lastActive: '2026-09-05',
		description:
			'University student, part-time café worker, and probably a little too obsessed with basketball. I like beach days, live music, and spontaneous plans with friends. Still figuring things out, but I’m always up for meeting someone new and seeing where it goes.\r\n',
		city: 'Brisbane',
		country: 'Australia',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789137631/jorge1_wdlf28.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789137631/jorge1_wdlf28.jpg',
				publicId: 'jorge1_wdlf28',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789137633/jorge2_anarl8.jpg',
				publicId: 'jorge2_anarl8',
			},
		],
	},
	{
		email: 'thomas@test.com',
		username: 'thomas',
		gender: Gender.MALE,
		searchGender: SearchGender.FEMALE,
		dateOfBirth: '2003-12-15',
		name: 'Thomas',
		created: '2026-03-21',
		lastActive: '2026-09-08',
		description:
			'I’m an architect who spends far too much time looking at buildings, even when I’m supposed to be on holiday. I enjoy cooking, cycling around the city, and taking weekend trips whenever I can. I’m looking for someone who enjoys good conversation and doesn’t take themselves too seriously.\r\n',
		city: 'Paris',
		country: 'France',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789137654/thomas_zblbsh.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789137654/thomas_zblbsh.jpg',
				publicId: 'thomas_zblbsh',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789137656/thomas2_hmkplb.jpg',
				publicId: 'thomas2_hmkplb',
			},
		],
	},
	{
		email: 'michael@test.com',
		username: 'michael',
		gender: Gender.MALE,
		searchGender: SearchGender.MALE,
		dateOfBirth: '1982-10-17',
		name: 'Michael',
		created: '2019-03-29',
		lastActive: '2026-03-05',
		description:
			'I work in finance, although my favorite part of the week is usually when I’m nowhere near a spreadsheet. I enjoy hiking, cooking, traveling, and finding quiet places away from the city. These days I’m less interested in endless small talk and more interested in getting to know someone genuinely.\r\n',
		city: 'Vancouver',
		country: 'Canada',
		image:
			'https://res.cloudinary.com/saho-dev/image/upload/v1789137641/michael_xhxbna.jpg',
		photos: [
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789137641/michael_xhxbna.jpg',
				publicId: 'michael_xhxbna',
			},
			{
				url: 'https://res.cloudinary.com/saho-dev/image/upload/v1789137648/michael2_iuuby7.jpg',
				publicId: 'michael2_iuuby7',
			},
		],
	},
];
