import DecorativeLine from '../utils/DecorativeLine';
import HowItWorksContents from './HowItWorksContents';

const HowItWorks = () => {
	return (
		<section className='relative overflow-hidden border-y border-purple-200/60 bg-gradient-to-b from-purple-50 to-purple-100/80 py-28'>
			<div className='mx-auto max-w-6xl px-6'>
				{/* Section heading */}
				<div className='mx-auto max-w-2xl text-center'>
					<p className='text-sm font-medium tracking-[0.35em] text-purple-700'>
						HOW IT WORKS
					</p>

					<h2 className='mt-4 font-display text-4xl font-normal tracking-wide text-purple-950 md:text-5xl'>
						Meaningful connections,
						<br />
						without the noise.
					</h2>

					<DecorativeLine />
				</div>

				{/* Steps */}
				<div className='relative mt-20'>
					{/* Connecting line */}
					<div className='absolute left-[16.66%] right-[16.66%] top-16 hidden h-px bg-purple-200 lg:block' />

					<HowItWorksContents />
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
