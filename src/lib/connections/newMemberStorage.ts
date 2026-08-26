import { NEW_MEMBER_DURATION, NEW_MEMBER_STORAGE_KEY } from './constants';

export type NewMemberRecord = {
	userId: string;
	expiresAt: number;
};

// localStorageからNEW Memberのデータを読み込む
const readStoredNewMembers = (): NewMemberRecord[] => {
	const stored = localStorage.getItem(NEW_MEMBER_STORAGE_KEY);

	// localStorageに何も保存されていなかったら、空配列を返す
	if (!stored) return [];

	try {
		return JSON.parse(stored);
	} catch {
		localStorage.removeItem(NEW_MEMBER_STORAGE_KEY);
		return [];
	}
};

// 現在まだ有効なNEW Memberだけを取得する
export const getStoredNewMembers = (): NewMemberRecord[] => {
	const members = readStoredNewMembers();
	const now = Date.now();

	// 期限がまだ未来にあるMemberだけ残す
	const activeMembers = members.filter((member) => member.expiresAt > now);

	// Remove expired members from localStorage
	localStorage.setItem(NEW_MEMBER_STORAGE_KEY, JSON.stringify(activeMembers));

	return activeMembers;
};

// 新しくMatchしたMemberをNEWとして保存する
export const saveNewMember = (userId: string) => {
	const members = readStoredNewMembers();

	const newMember: NewMemberRecord = {
		userId,
		expiresAt: Date.now() + NEW_MEMBER_DURATION,
	};

	const updatedMembers = [
		...members.filter((member) => member.userId !== userId),
		newMember,
	];

	localStorage.setItem(NEW_MEMBER_STORAGE_KEY, JSON.stringify(updatedMembers));
};

// 指定したユーザーをNEW一覧から削除する
export const removeNewMember = (userId: string) => {
	const members = readStoredNewMembers();

	const updatedMembers = members.filter((member) => member.userId !== userId);

	localStorage.setItem(NEW_MEMBER_STORAGE_KEY, JSON.stringify(updatedMembers));
};
