import Link from 'next/link';
import { GiBigDiamondRing } from 'react-icons/gi';
import { Button } from './ui/button';

type NotFoundProps = {
	title: string;
	subText: string;
	link: {
		href: string;
		label: string;
	};
};

export default function NotFoundView({ title, subText, link }: NotFoundProps) {
	return (
		<div className='min-h-screen flex items-center justify-center px-6'>
			{/* 背景グラデーション */}
			<div className='absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-purple-50' />

			{/* コンテンツ */}
			<div className='relative z-10 w-full max-w-md text-center'>
				{/* ガラスカード */}
				<div className='backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-10'>
					{/* アイコン */}
					<div className='flex justify-center mb-6'>
						<div className='p-4 rounded-full bg-purple-500/10'>
							<GiBigDiamondRing className='text-purple-500 text-3xl' />
						</div>
					</div>

					{/* タイトル */}
					<h1 className='text-2xl font-semibold text-gray-800 tracking-wide'>
						{title}
					</h1>

					{/* サブテキスト */}
					<p className='text-gray-500 text-sm mt-3'>{subText}</p>

					{/* CTA */}
					<div className='mt-8'>
						<Button asChild className='flex-1'>
							<Link
								href={link.href}
								className='
                inline-block
                text-sm
                font-medium
                text-white
                shadow-md
                hover:opacity-90
                transition
              '
							>
								{link.label}
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
