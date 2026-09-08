type ContactFormProps = {
	sectionNumber?: number;
};

const ContactForm = ({sectionNumber}: ContactFormProps) => {
	return (
		<section>
			<h2 className='font-display text-2xl font-normal text-purple-950'>
				{sectionNumber}. Contact
			</h2>

			<p className='mt-4'>
				If you have any questions about these Terms of Service, you can contact
				us at:
			</p>

			<div className='mt-6 rounded-2xl border border-purple-950/10 bg-purple-50/40 p-6'>
				<p className='font-medium text-purple-950'>The One</p>
				<p className='mt-1'>Seaside Ave, Honolulu, HI 96815 USA</p>
				<p className='mt-1'>(808)-808-808</p>
				<p className='mt-1'>the-one@example</p>
			</div>
		</section>
	);
};

export default ContactForm;
