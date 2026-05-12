import { cloudinary } from '@/lib/cloudinary';

// Change folder name later
const allowedFolders = ['the-one/userImages', 'the-one/messages'];

export async function POST(request: Request) {
	//request bodyの取得
	const body = (await request.json()) as {
		paramsToSign: Record<string, string>;
	};

	const { paramsToSign } = body;

	const folder = paramsToSign.folder;

	// folder validation
	if (!allowedFolders.includes(folder)) {
		return Response.json({ error: 'Invalid folder' }, { status: 400 });
	}

	// Cloudinary の署名を生成
	const signature = cloudinary.utils.api_sign_request(
		paramsToSign,
		process.env.CLOUDINARY_API_SECRET as string,
	);

	return Response.json({ signature });
}
