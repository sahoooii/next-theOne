export type NewMatch = {
	userId: string;
	name: string;
	image: string | null;
};

// A側に届く → partnerUserId: B
// B側に届く → partnerUserId: A
export type MatchNewPayload = {
	partnerUserId: string;
};
