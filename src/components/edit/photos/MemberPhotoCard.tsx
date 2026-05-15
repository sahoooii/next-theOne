import { Photo } from '@prisma/client';
import MemberImage from './MemberImage';
import { GiBigDiamondRing } from 'react-icons/gi';
import { AiFillDelete } from 'react-icons/ai';

type Props = {
	photo: Photo;
	editing?: boolean;
	isMain: boolean;
	onSetMain: (photo: Photo) => void;
	loading: {
		type: string;
		isLoading: boolean;
		id: string;
	};
};

// Photo UI for one photo
const MemberPhotoCard = ({
	photo,
	editing,
	isMain,
	onSetMain,
	loading,
}: Props) => {
	const isMainLoading =
		loading.isLoading && loading.type === 'main' && loading.id === photo.id;
	return (
		<div className='group relative'>
			{/* Display member image */}
			<MemberImage photo={photo} />

			{editing && (
				<div
					className='
						absolute inset-0
						opacity-0
						group-hover:opacity-100
						transition-opacity duration-300
					'
				>
					{/* Dark overlay */}
					<div
						className='
							absolute inset-0
							bg-black/20
						'
					/>

					{/* Main Badge */}
					{isMain && (
						<div
							className='
								absolute top-3 left-3 z-20
								flex items-center gap-1
								rounded-full
								bg-black/40
								backdrop-blur-md
								px-3 py-1
								text-xs text-white
							'
						>
							<GiBigDiamondRing size={14} />
							Main
						</div>
					)}

					{/* Set Main Button */}
					{!isMain && (
						<button
							onClick={() => onSetMain(photo)}
							className='
								absolute top-3 left-3 z-20
								rounded-full
								bg-white/80
								backdrop-blur-md
								p-2
								text-gray-700
								transition hover:bg-white
							'
						>
							{/* Loading image for a changing main photo */}
							{isMainLoading ? (
								<GiBigDiamondRing
									size={18}
									className='animate-[spin_3s_linear_infinite]'
								/>
							) : (
								<GiBigDiamondRing size={18} />
							)}
						</button>
					)}

					{/* Delete Button */}
					<button
						className='
							absolute top-3 right-3 z-20
							rounded-full
							bg-black/40
							backdrop-blur-md
							p-2
							text-white
							transition hover:bg-black/60
						'
					>
						<AiFillDelete size={18} />
					</button>
				</div>
			)}
		</div>
	);
};

export default MemberPhotoCard
