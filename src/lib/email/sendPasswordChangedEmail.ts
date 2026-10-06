import { render } from '@react-email/render';
import { Resend } from 'resend';

import PasswordChangedEmail from '@/emails/PasswordChangedEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordChangedEmail(email: string) {
	const html = await render(PasswordChangedEmail());

	await resend.emails.send({
		from: 'The One <onboarding@resend.dev>',
		to: email,
		subject: 'Your password has been changed',
		html,
	});
}
