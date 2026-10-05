import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
	const { data, error } = await resend.emails.send({
		from: 'The One <onboarding@resend.dev>',
		to: email,
		subject: 'Reset your password',
		html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password.</p>
      <a href="${resetUrl}">Reset your password</a>
      <p>This link will expire in 1 hour.</p>
    `,
	});

	if (error) {
		console.error('Failed to send password reset email:', error);
		throw new Error('Failed to send password reset email');
	}

	return data;
}
