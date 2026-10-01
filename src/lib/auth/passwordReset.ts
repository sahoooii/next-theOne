import bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';

import { prisma } from '@/lib/prisma';
import { ActionResult } from '@/types';

// Tokenの生成
export async function generatePasswordResetToken(userId: string) {
	const rawToken = randomBytes(32).toString('hex');

	const tokenHash = createHash('sha256').update(rawToken).digest('hex');

	const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

	await prisma.$transaction([
		prisma.passwordResetToken.deleteMany({
			where: { userId },
		}),
		prisma.passwordResetToken.create({
			data: {
				userId,
				tokenHash,
				expiresAt,
			},
		}),
	]);

	return rawToken;
}

// Tokenの検証処理
export async function verifyPasswordResetToken(rawToken: string) {
	// URLから受け取った rawToken をハッシュ
	const tokenHash = createHash('sha256').update(rawToken).digest('hex');

	// DB検索 Tokenが存在するか
	const resetToken = await prisma.passwordResetToken.findUnique({
		where: { tokenHash },
	});

	if (!resetToken) {
		return null;
	}

	// 期限切れのチェック
	if (resetToken.expiresAt < new Date()) {
		return null;
	}

	// 使用済みか
	if (resetToken.usedAt) {
		return null;
	}

	return resetToken;
}

export async function resetPassword(
	rawToken: string,
	newPassword: string,
): Promise<ActionResult<string>> {
	// Validate token
	const resetToken = await verifyPasswordResetToken(rawToken);

	if (!resetToken) {
		return {
			status: 'error',
			error: 'Invalid or expired reset token',
		};
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	// User.passwordHash->新しいhashに更新, PasswordResetToken.usedAt->現在時刻に更新
	await prisma.$transaction([
		prisma.user.update({
			where: { id: resetToken.userId },
			data: {
				passwordHash: hashedPassword,
			},
		}),
		prisma.passwordResetToken.update({
			where: { id: resetToken.id },
			data: {
				usedAt: new Date(),
			},
		}),
	]);

	return {
		status: 'success',
		data: 'Password reset successfully',
	};
}
