import { GiBigDiamondRing } from 'react-icons/gi';

interface LoadingDisplayProps {
	message?: string;
}

export const LoadingDisplay = ({
	message = 'Loading...',
}: LoadingDisplayProps) => {
	return (
		<div className='flex items-center justify-center h-full min-h-[60vh]'>
			<div className='absolute inset-0 bg-gradient-to-br from-purple-950/20 to-transparent blur-2xl' />
			<div className='flex flex-col items-center gap-4'>
				<GiBigDiamondRing className='text-purple-400 text-4xl animate-[spin_3s_linear_infinite]' />
				<p className='text-sm text-black/60 tracking-wide'>{message}</p>
			</div>
		</div>
	);
};
