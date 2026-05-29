import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { differenceInYears, format, isToday, isYesterday } from 'date-fns';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// dob→ Date of birth
export function calculateAge(dob: Date) {
	return differenceInYears(new Date(), dob);
}

// To format date time
export function formatShortDateTime(date: Date) {
	return format(date, 'dd MMM yy h:mm:a')
}

// For chat display to show date or time
export function formatMessageDate(date: Date) {
	if (isToday(date)) return 'Today';

	if (isYesterday(date)) return 'Yesterday';

	return format(date, 'dd MMM');
}

// Display only time ex: 11:10PM
export function formatChatTime(date: Date) {
	return format(date, 'h:mm a');
}

// サーバーから返ってきたエラーをReact Hook Formに流し込む
export function handleFormServerErrors<T extends FieldValues>(
	error: Record<string, string> | string, //{[key: string]: string}
	setFormError: (msg: string) => void, //文字列を受け取る関数
	setError: UseFormSetError<T>, //React Hook Form専用型
) {
	if (typeof error === 'string') {
		setFormError(error);
	} else {
		Object.entries(error).forEach(([field, message]) => {
			//存在するfield名だけOK
			setError(field as Path<T>, {
				message,
			});
		});
	}
}
