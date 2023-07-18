import NextAuth from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshAccessTokenError';
    accessToken?: string | unknown;
    jwt?: string | unknown;
  }
}
