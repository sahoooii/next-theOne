export type ActionResult<T> =
	| { status: 'success'; data: T }
	| { status: 'error'; error: Record<string, string> | string };
