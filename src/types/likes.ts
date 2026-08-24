// 誰が自分をlikeしたか知るためのもの
// Like:new
export type LikeNewPayload = {
	sourceUserId: string;
	targetUserId: string;
};

// Like:delete
export type LikeDeletePayload = {
	sourceUserId: string;
	targetUserId: string;
};

// 最後に起きたイベントを管理するため
export type LikeEvent =
	| {
			type: 'new';
			payload: LikeNewPayload;
	  }
	| {
			type: 'delete';
			payload: LikeDeletePayload;
	  };
