'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { GiBigDiamondRing } from 'react-icons/gi';

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<div className="flex items-center justify-center min-h-[60vh] px-4">
			<Card
				className="
					w-full max-w-md
					bg-white/70 backdrop-blur-md
					border border-black/10
					rounded-2xl
					p-8
					text-center
					space-y-6
				"
			>
				{/* Icon */}
				<div className="flex justify-center">
					<div className="bg-purple-100/60 p-3 rounded-full">
						<GiBigDiamondRing className="text-purple-500 text-xl animate-pulse" />
					</div>
				</div>

				{/* Message */}
				<CardContent className="p-0 space-y-2">
					<p className="text-gray-900 font-medium tracking-wide">
						Something went wrong
					</p>
					<p className="text-sm text-gray-500">
						Please try again in a moment.
					</p>

					{/* Debug（本番では消してもOK） */}
					{process.env.NODE_ENV === 'development' && (
						<p className="text-xs text-gray-400 mt-2">
							{error.message}
						</p>
					)}
				</CardContent>

				{/* Action */}
				<CardFooter className="p-0 flex justify-center">
					<Button
						onClick={reset}
						className="bg-black/90 hover:bg-black text-white px-6"
					>
						Try again
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Error;
