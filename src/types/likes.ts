// 誰が自分をlikeしたか知るためのもの
export type LikeNewPayload = {
	sourceUserId: string;
	targetUserId: string;
};
