import Link from 'next/link';
import { GiBigDiamondRing } from 'react-icons/gi';
import { Button } from '../components/ui/button';

export default function NotFound() {
	return (
		<div className='flex flex-1 items-center justify-center px-6'>
			{/* Bg gradation */}
			<div className='absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-purple-50' />

			{/* Contents */}
			<div className='relative z-10 w-full max-w-md text-center'>
				{/* Glass Card*/}
				<div className='backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-10'>
					{/* Icon*/}
					<div className='flex justify-center mb-6'>
						<div className='p-4 rounded-full bg-purple-500/10'>
							<GiBigDiamondRing className='text-purple-500 text-3xl' />
						</div>
					</div>

					{/* Title */}
					<h1 className='text-2xl font-semibold text-gray-800 tracking-wide'>
						Not Found
					</h1>

					{/* Sub Text*/}
					<p className='text-gray-500 text-sm mt-3'>
						The page you’re looking for doesn’t exist or may have been removed.
					</p>

					{/* CTA */}
					<div className='mt-8'>
						<Button asChild className='flex-1'>
							<Link
								href='/'
								className='
                inline-block
                px-6 py-2
                text-sm
                font-medium
                text-white
                bg-gradient-to-r from-purple-500 to-purple-600
                rounded-full
                shadow-md
                hover:opacity-90
                transition
              '
							>
								Back to Home
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
