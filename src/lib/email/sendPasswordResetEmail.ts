import { Resend } from 'resend';
import { render } from '@react-email/render';

import PasswordResetEmail from '@/emails/PasswordResetEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
	const html = await render(
		PasswordResetEmail({
			resetUrl,
		}),
	);

	await resend.emails.send({
		from: 'The One <onboarding@resend.dev>',
		to: email,
		subject: 'Reset your password',
		html,
	});
}
