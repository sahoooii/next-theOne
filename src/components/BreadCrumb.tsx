import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const BreadCrumb = ({
	name,
	link,
	title,
}: {
	name: string;
	link: string;
	title: string;
}) => {
	return (
		<Breadcrumb
			className='
				mb-2
				px-3 py-2
			'
		>
			<BreadcrumbList className='text-sm'>
				<BreadcrumbItem>
					<BreadcrumbLink
						href={link}
						className='text-black/60
							hover:text-black
							transition-colors'
					>
						{title}
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator className='text-black/30' />
				<BreadcrumbPage
					className='text-black
						font-medium
						tracking-wide'
				>
					{name}
				</BreadcrumbPage>
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default BreadCrumb;
