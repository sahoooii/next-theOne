import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		// Googleのメール検証状態を確認
		async signIn({ account, profile }) {
			if (account?.provider === 'google') {
				return profile?.email_verified === true;
			}
			return true;
		},
		// 既存のセッション設計を維持
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	...authConfig,
});
