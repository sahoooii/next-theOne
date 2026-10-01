import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import NotFoundView from '@/components/NotFoundView';
import { verifyPasswordResetToken } from '@/lib/auth/passwordReset';

type ResetPasswordPageProps = {
	searchParams: Promise<{
		token?: string;
	}>;
};

export default async function ResetPasswordPage({
	searchParams,
}: ResetPasswordPageProps) {
	const { token } = await searchParams;

	if (!token) return null;

	const result = await verifyPasswordResetToken(token);

	if (!result) {
		return (
			<NotFoundView
				title='Invalid or expired reset link'
				subText='Please try again'
				link={{ href: '/login', label: 'Back to Login' }}
			/>
		);
	}

	return <ResetPasswordForm token={token} />;
}
