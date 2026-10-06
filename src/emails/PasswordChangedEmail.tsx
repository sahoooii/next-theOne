import {
	Body,
	Column,
	Container,
	Head,
	Html,
	Img,
	Row,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

export default function PasswordChangedEmail() {
	return (
		<Html>
			<Head />
			<Tailwind>
				<Body className='bg-[#0f0f12] py-12'>
					<Container className='mx-auto max-w-[480px] rounded-xl bg-[#18181c] px-8 py-10 text-white'>
						<Section className='text-center'>
							{/* Brand Logo*/}
							<Section className='mx-auto h-12 w-12 rounded-full bg-[#8b5cf6]/10'>
								<Row>
									<Column align='center' className='h-12'>
										<Img
											src={`${process.env.NEXT_PUBLIC_APP_URL}/images/the-one-ring.png`}
											alt='The One'
											width='28'
											height='28'
										/>
									</Column>
								</Row>
							</Section>
							<Text className='mt-6 mb-0 text-xl font-semibold text-white'>
								The One
							</Text>
							<Text className='mt-8 mb-0 text-2xl font-semibold text-white'>
								Password changed
							</Text>
							<Text className='mt-4 text-base leading-6 text-[#a1a1aa]'>
								Your password has been successfully changed.
							</Text>
							<Text className='mt-6 text-sm leading-5 text-[#71717a]'>
								If you didn&apos;t make this change, please contact us
								immediately.
							</Text>

							{/* Footer */}
							<Section className='mt-10 border-t border-[#27272a] pt-6 text-center'>
								<Text className='mb-4 text-sm font-medium text-[#a1a1aa]'>
									The One
								</Text>

								{/* Contact */}
								<Text className='m-0 text-xs font-medium text-[#a1a1aa]'>
									Contact Us
								</Text>

								<Text className='mt-2 text-xs leading-5 text-[#71717a]'>
									Seaside Ave, Honolulu, HI 96815 USA
									<br />
									TEL: (808)-808-808
									<br />
									Mail: the-one@example.com
								</Text>
							</Section>
							
							{/* Footer */}
							<Section className='mt-6 text-center'>
								<Text className='m-0 text-xs text-[#52525b]'>
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
