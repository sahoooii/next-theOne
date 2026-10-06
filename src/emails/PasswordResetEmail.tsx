import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Img,
	Html,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

type PasswordResetEmailProps = {
	resetUrl: string;
};

export default function PasswordResetEmail({
	resetUrl,
}: PasswordResetEmailProps) {
	return (
		<Html>
			<Head />

			<Tailwind>
				<Body className='bg-[#0f0f12] py-12'>
					<Container className='mx-auto max-w-[480px] rounded-xl bg-[#18181c] px-8 py-10 text-white'>
						<Section className='text-center'>
							{/* Brand */}
							<Section className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8b5cf6]/10'>
								<Img
									src={`${process.env.NEXT_PUBLIC_APP_URL}/images/the-one-ring.png`}
									alt='The One'
									width='28'
									height='28'
								/>
							</Section>
							<Text className='m-4 text-xl font-semibold text-white'>
								The One
							</Text>
							<Heading className='mt-8 mb-0 text-2xl font-semibold text-white'>
								Reset your password
							</Heading>
							<Text className='mt-4 text-base leading-6 text-[#a1a1aa]'>
								We received a request to reset the password for your account.
							</Text>

							<Button
								href={resetUrl}
								className='mt-8 rounded-md bg-[#8b5cf6] px-8 py-3 text-center text-base font-medium text-white'
							>
								Reset Password
							</Button>
							<Section className='mt-8'>
								<Text className='m-0 text-sm leading-5 text-[#a1a1aa]'>
									This link will expire in 1 hour.
								</Text>

								<Text className='mt-3 text-sm leading-5 text-[#71717a]'>
									If you didn&apos;t request a password reset, you can safely
									ignore this email.
								</Text>
							</Section>

							{/* Footer */}
							<Section className='mt-10 border-t border-[#27272a] pt-6 text-center'>
								<Text className='m-0 text-sm font-medium text-[#a1a1aa]'>
									The One
								</Text>

								<Text className='mt-2 text-xs text-[#52525b]'>
									This is an automated message. Please do not reply.
								</Text>
							</Section>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
