// Cloudinary URL に transformation parameter を差し込む

type ImageType = 'avatar' | 'card' | 'gallery';

const imageTransformations: Record<ImageType, string> = {
	avatar: 'c_thumb,g_face,w_300,h_300,q_auto,f_auto/',

	card: 'c_fill,g_auto:face,w_600,h_800,q_auto,f_auto/',

	gallery: 'c_fill,g_auto:face,w_900,h_1200,q_auto,f_auto/',
};

export function transformImageUrl(imageUrl?: string | null, type: ImageType = 'card') {
	if (!imageUrl) return null;

	if (!imageUrl.includes('cloudinary')) return imageUrl;

	const uploadIndex = imageUrl.indexOf('/upload/') + '/upload/'.length;

	const transformation = imageTransformations[type];

	return (
		imageUrl.slice(0, uploadIndex) +
		transformation +
		imageUrl.slice(uploadIndex)
	);
}
