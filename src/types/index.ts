// 成功/失敗をデータとして返す
// T は「成功したときに返したいデータの型」
export type ActionResult<T> =
	| { status: 'success'; data: T }
	| { status: 'error'; error: Record<string, string> | string };


export type SignOutProps = {
  isSigningOut: boolean;
  onSignOut: () => Promise<void>;
};
