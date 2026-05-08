import NotFoundView from '@/components/NotFoundView';

export default function NotFound() {
	return (
		<NotFoundView
			title='Not Found'
			subText='The page you’re looking for doesn’t exist or may have been removed.'
			link={{ href: '/', label: 'Back to Home' }}
		/>
	);
}
