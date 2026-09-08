import ContactForm from '@/components/home/utils/ContactForm';

const TermsPage = () => {
	return (
		<main className='bg-white'>
			<div className='mx-auto max-w-3xl px-6 py-16 md:py-24'>
				{/* Header */}
				<header className='mb-16'>
					<p className='text-sm font-medium uppercase tracking-[0.2em] text-purple-700'>
						Terms
					</p>

					<h1 className='mt-4 font-display text-4xl font-normal tracking-tight text-purple-950 md:text-5xl'>
						Terms of Service
					</h1>

					{/* Edit when updated */}
					<p className='mt-6 text-sm tracking-wide text-purple-950/50'>
						Last updated: September 8, 2026
					</p>
				</header>

				<div className='space-y-12 text-sm leading-7 text-purple-950/75'>
					{/* Acceptance of Terms */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							1. Acceptance of Terms
						</h2>

						<p className='mt-4'>
							By creating an account or using The One, you agree to be bound by
							these Terms of Service. If you do not agree with these terms,
							please do not use the service.
						</p>
					</section>

					{/* Eligibility */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							2. Eligibility
						</h2>

						<p className='mt-4'>
							The One is intended for users who are 18 years of age or older.
							Users under the age of 18 are not permitted to create an account
							or use the service.
						</p>

						<p className='mt-4'>
							By creating an account, you confirm that you meet this age
							requirement and that the information you provide is accurate.
						</p>
					</section>

					{/* Account Registration */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							3. Account Registration
						</h2>

						<p className='mt-4'>
							You are responsible for providing accurate and up-to-date
							information when creating your account.
						</p>

						<p className='mt-4'>
							You are responsible for maintaining the security of your account
							and should not share your account credentials with others.
						</p>

						<p className='mt-4'>
							You may not create an account on behalf of another person or
							impersonate another individual.
						</p>
					</section>

					{/* User Profiles */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							4. User Profiles
						</h2>

						<p className='mt-4'>
							You are responsible for the information, photos, and other content
							you add to your profile.
						</p>

						<p className='mt-4'>
							Profile information should be truthful and should not be used to
							deceive, impersonate, or mislead other users.
						</p>

						<p className='mt-4'>
							You must not upload content that you do not have the right to use,
							or content that is illegal, abusive, threatening, or otherwise
							inappropriate.
						</p>
					</section>

					{/* Likes, Matches, and Messaging */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							5. Likes, Matches, and Messaging
						</h2>

						<p className='mt-4'>
							The One allows users to express interest in other users through
							likes. When two users like each other, they become a match.
						</p>

						<p className='mt-4'>
							Messaging is available only between users who have mutually
							matched.
						</p>

						<p className='mt-4'>
							You agree to communicate respectfully and not use messaging to
							harass, threaten, deceive, or otherwise harm another user.
						</p>
					</section>

					{/* Prohibited Conduct */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							6. Prohibited Conduct
						</h2>

						<p className='mt-4'>When using The One, you must not:</p>

						<ul className='mt-4 list-disc space-y-2 pl-5'>
							<li>Harass, threaten, bully, or intimidate other users</li>
							<li>Impersonate another person</li>
							<li>
								Use the service for scams, fraud, or other deceptive activities
							</li>
							<li>Send spam or unsolicited promotional content</li>
							<li>
								Share another user&apos;s personal information without
								permission
							</li>
							<li>Upload illegal or harmful content</li>
							<li>
								Attempt to gain unauthorized access to the service or another
								user&apos;s account
							</li>
							<li>Use automated tools to access or abuse the service</li>
							<li>Use the service for any unlawful purpose</li>
						</ul>
					</section>

					{/* User Content */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							7. User Content
						</h2>

						<p className='mt-4'>
							You retain ownership of the content you submit to The One,
							including your profile information, photos, and messages.
						</p>

						<p className='mt-4'>
							By submitting content, you grant The One the limited rights
							necessary to store, display, and process that content as part of
							providing the service.
						</p>

						<p className='mt-4'>
							You are responsible for ensuring that your content does not
							violate these Terms or the rights of others.
						</p>
					</section>

					{/* Account Deletion and Termination */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							8. Account Deletion and Termination
						</h2>

						<p className='mt-4'>
							You may delete your account at any time through the service.
							Account deletion will remove your profile and associated
							information as described in our Privacy Policy.
						</p>

						<p className='mt-4'>
							We may suspend or terminate an account if we reasonably believe
							that the account has violated these Terms or is being used in a
							way that may harm other users or the service.
						</p>
					</section>

					{/* Third-Party Services */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							9. Third-Party Services
						</h2>

						<p className='mt-4'>
							The One may rely on third-party services to provide certain
							functionality, such as image storage and management.
						</p>

						<p className='mt-4'>
							Your use of third-party services may also be subject to their
							respective terms and policies.
						</p>
					</section>

					{/* Disclaimer */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							10. Disclaimer
						</h2>

						<p className='mt-4'>
							The One is provided to help users discover and communicate with
							potential connections. We do not guarantee that you will find a
							match, relationship, or any particular outcome through the
							service.
						</p>

						<p className='mt-4'>
							We do not guarantee that information provided by other users is
							accurate, complete, or reliable. You are responsible for
							exercising appropriate judgment when interacting with other users.
						</p>

						<p className='mt-4'>
							The service may occasionally be unavailable or contain errors.
						</p>
					</section>

					{/* Limitation of Liability */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							11. Limitation of Liability
						</h2>

						<p className='mt-4'>
							To the extent permitted by applicable law, The One is provided on
							an &quot;as is&quot; and &quot;as available&quot; basis. We are
							not responsible for losses or damages arising from your use of the
							service or interactions with other users, except where liability
							cannot be excluded under applicable law.
						</p>
					</section>

					{/* Changes to These Terms */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							12. Changes to These Terms
						</h2>

						<p className='mt-4'>
							We may update these Terms of Service from time to time. Any
							changes will be reflected on this page with an updated revision
							date.
						</p>

						<p className='mt-4'>
							By continuing to use The One after changes are posted, you agree
							to the updated terms.
						</p>
					</section>

					{/* Contact */}
					<ContactForm sectionNumber={13} />
				</div>
			</div>
		</main>
	);
};

export default TermsPage;
