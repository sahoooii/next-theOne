const MemberDetailPageHeader = ({ title }: { title: string }) => {
	return (
		<>
			<div className='mb-6'>
				<h2 className='text-xl font-semibold text-gray-900'>{title}</h2>
				<div className='h-[2px] w-10 bg-purple-500 rounded-full' />
			</div>
			{/* Underline */}
			<div className='h-px bg-black/10 mb-6' />
		</>
	);
};

export default MemberDetailPageHeader;
