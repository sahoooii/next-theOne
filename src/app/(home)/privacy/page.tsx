import ContactForm from '@/components/home/utils/ContactForm';

const PrivacyPage = () => {
	return (
		<main className='bg-white'>
			<div className='mx-auto max-w-3xl px-6 py-16 md:py-24'>
				{/* Header */}
				<header className='mb-16'>
					<p className='text-sm font-medium uppercase tracking-[0.2em] text-purple-700'>
						Privacy
					</p>

					<h1 className='mt-4 font-display text-4xl font-normal tracking-tight text-purple-950 md:text-5xl'>
						Privacy Policy
					</h1>

					{/* Edit when updated */}
					<p className='mt-6 text-sm tracking-wide text-purple-950/50'>
						Last updated: September 8, 2026
					</p>
				</header>

				<div className='space-y-12 text-sm leading-7 text-purple-950/75'>
					{/* Introduction */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							1. Introduction
						</h2>

						<p className='mt-4'>
							The One is a dating application designed to help people build
							meaningful connections. This Privacy Policy explains what
							information we collect, how we use it, and how we handle your
							information when you use The One.
						</p>
					</section>

					{/* Information We Collect */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							2. Information We Collect
						</h2>

						<p className='mt-4'>
							When you create and use an account, we may collect the following
							information:
						</p>

						<ul className='mt-4 list-disc space-y-2 pl-5'>
							<li>Name</li>
							<li>Email address</li>
							<li>Country and city</li>
							<li>Gender</li>
							<li>Search gender preferences</li>
							<li>Profile photo</li>
							<li>Bio or profile description</li>
						</ul>

						<p className='mt-4'>
							We also collect information generated through your use of the
							service, such as likes, matches, and messages.
						</p>
					</section>

					{/* How We Use Your Information */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							3. How We Use Your Information
						</h2>

						<p className='mt-4'>
							We use the information we collect to provide and operate The One,
							including:
						</p>

						<ul className='mt-4 list-disc space-y-2 pl-5'>
							<li>Creating and managing your account</li>
							<li>Authenticating your account</li>
							<li>Displaying your profile to other users</li>
							<li>Helping you discover potential connections</li>
							<li>Managing likes and matches</li>
							<li>Enabling messaging between matched users</li>
							<li>Maintaining and improving the service</li>
							<li>Protecting the security and integrity of the service</li>
						</ul>
					</section>

					{/* Profile Information and Visibility */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							4. Profile Information and Visibility
						</h2>

						<p className='mt-4'>
							Information included in your profile, such as your name, location,
							gender, profile photo, and bio, may be visible to other registered
							users as part of the service.
						</p>

						<p className='mt-4'>
							Your email address is not displayed to other users.
						</p>
					</section>

					{/* Likes, Matches, and Messages */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							5. Likes, Matches, and Messages
						</h2>

						<p className='mt-4'>
							The One allows users to express interest in other users through
							likes. When two users like each other, they become a match.
						</p>

						<p className='mt-4'>
							Messages are only available between users who have mutually
							matched. Messages are exchanged within The One and are not
							intended to be publicly visible.
						</p>
					</section>

					{/* Third-Party Services */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							6. Third-Party Services
						</h2>

						<p className='mt-4'>
							The One uses third-party services to provide certain
							functionality.
						</p>

						<div className='mt-6 rounded-2xl border border-purple-950/10 bg-purple-50/40 p-6'>
							<h3 className='font-medium text-purple-950'>Cloudinary</h3>

							<p className='mt-2'>
								Profile photos are stored and managed using Cloudinary, a
								third-party image management service.
							</p>
						</div>
					</section>

					{/* Data Security */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							7. Data Security
						</h2>

						<p className='mt-4'>
							We take reasonable measures to protect your information from
							unauthorized access, alteration, disclosure, or destruction.
						</p>

						<p className='mt-4'>
							Passwords are securely hashed before being stored and are not
							stored in plain text.
						</p>
					</section>

					{/* Data Retention and Account Deletion */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							8. Data Retention and Account Deletion
						</h2>

						<p className='mt-4'>
							We retain your information for as long as necessary to provide the
							service and maintain your account.
						</p>

						<p className='mt-4'>
							You can delete your account through the service. When your account
							is deleted, associated profile information and photos are also
							removed. Photos stored through Cloudinary are deleted when your
							account is deleted.
						</p>

						<p className='mt-4'>
							Information associated with your account, including your
							participation in conversations, may no longer be available after
							account deletion.
						</p>
					</section>

					{/* Age Requirement */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							9. Age Requirement
						</h2>

						<p className='mt-4'>
							The One is intended for users who are 18 years of age or older.
							Users under the age of 18 are not permitted to create an account
							or use the service.
						</p>

						<p className='mt-4'>
							We do not knowingly collect personal information from individuals
							under the age of 18.
						</p>
					</section>

					{/* Changes */}
					<section>
						<h2 className='font-display text-2xl font-normal text-purple-950'>
							10. Changes to This Privacy Policy
						</h2>

						<p className='mt-4'>
							We may update this Privacy Policy from time to time. Any changes
							will be reflected on this page with an updated revision date.
						</p>
					</section>

					{/* Contact */}
					<ContactForm sectionNumber={11} />
				</div>
			</div>
		</main>
	);
};

export default PrivacyPage;
