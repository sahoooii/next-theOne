type UnreadBadgeProps = {
	count: number;
	className?: string;
};

// Messages: Add purple dot with unread count number, when user have unread message
const UnreadBadge = ({ count, className = '' }: UnreadBadgeProps) => {
	if (count <= 0) return null;

	const displayCount = count > 99 ? '99+' : count;

	return (
		<span
			className={`
				min-w-5 h-5 px-1.5
				rounded-full
				bg-purple-500
				text-white
				text-xs font-medium
				flex items-center justify-center
				${className}
			`}
		>
			{displayCount}
		</span>
	);
};

export default UnreadBadge;
