import NotFoundView from '@/components/NotFoundView';

export default function NotFound() {
	return (
		<NotFoundView
			title='Member Not Found'
			subText='The profile you’re looking for...'
			link={{ href: '/members', label: 'Back to Members' }}
		/>
	);
}
