import { GiBigDiamondRing } from 'react-icons/gi';

type Props = {
	message: string;
	type?: 'success' | 'error' | 'info';
};

export function CustomToast({ message, type = 'info' }: Props) {
	const styles = {
		success: 'bg-purple-950/60 border-purple-400/20',
		error: 'bg-purple-950/60 border-red-400/40',
		info: 'bg-purple-950/60 border-white/10',
	};

	const iconStyles = {
		success: 'text-purple-300',
		error: 'text-red-400',
		info: 'text-purple-300',
	};

	return (
		<div
			className={`
				backdrop-blur-lg
				${styles[type]}
				border
				text-white
				shadow-xl
				rounded-2xl
				px-5 py-4
				flex items-center gap-4
				min-w-[320px] max-w-[420px]
			`}
		>
			{/* アイコン */}
			<div className='w-10 h-10 rounded-full flex items-center justify-center bg-black/30'>
				<GiBigDiamondRing
					size={20}
					className={`${iconStyles[type]} drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]`}
				/>
			</div>

			{/* テキスト */}
			<div className='flex flex-col'>
				<p className='text-sm font-medium tracking-wide text-white'>The One</p>
				<p
					className={`text-sm mt-1 leading-relaxed ${
						type === 'error' ? 'text-white' : 'text-white/90'
					}`}
				>
					{message}
				</p>
			</div>
		</div>
	);
}
