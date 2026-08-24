export type NewMatch = {
	userId: string;
	name: string;
	image: string | null;
};

// Match:new
// A側に届く → partnerUserId: B
// B側に届く → partnerUserId: A
export type MatchNewPayload = {
	partnerUserId: string;
};

// Match:delete
export type MatchDeletePayload = {
	partnerUserId: string;
};

// 最後に起きたイベントを管理するため
export type MatchEvent =
	| {
			type: 'new';
			payload: MatchNewPayload;
	  }
	| {
			type: 'delete';
			payload: MatchDeletePayload;
	  };
