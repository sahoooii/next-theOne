'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { navLinks } from './navLinks';

const BottomNav = () => {
	const pathname = usePathname();

	return (
		<div className='lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50'>
			<div
				className='
        flex items-center gap-8
        px-8 py-4
        rounded-full
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        shadow-lg
      '
			>
				{navLinks.map((link) => {
					const Icon = link.icon;
					if (!Icon) return null
					const isActive = pathname === link.href;

					return (
						<Link
							key={link.href}
							href={link.href}
							className='relative flex items-center justify-center w-12 h-12'
						>
							{isActive && (
								<motion.div
									layoutId='active-pill'
									className='
										absolute
										w-14 h-14
										rounded-full
										bg-primary/30
										shadow-[0_0_20px_rgba(168,85,247,0.5)]
										blur-[1px]
                '
									transition={{
										type: 'spring',
										stiffness: 250,
										damping: 25,
									}}
								/>
							)}

							<motion.div whileTap={{ scale: 0.85 }} className='relative z-10'>
								<Icon
									className={`w-6 h-6 transition-colors
                  ${
										isActive
											? 'text-primary'
											: 'text-gray-300 hover:text-primary'
									}`}
								/>
							</motion.div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default BottomNav;
