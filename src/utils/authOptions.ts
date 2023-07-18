import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  debug: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({user, account, profile, email, credentials})
      return true;
    },
    async jwt({ token, account,user }) {
      console.log('called jwt',account)
      if (user) {
        token.accessToken = account?.id_token;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account!.provider}/callback?access_token=${account!.access_token}`
        );
        const data = await response.json();
          console.log("🚀 ~ file: authOptions.ts:37 ~ jwt ~ response:", {data})
        token.jwt = data.jwt;
        token.id = data.user.id;
      }

        return token;
    },
    async session({ session, token }) {
      console.log('called session',{token})
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token?.accessToken;
      session.jwt = token?.jwt
      // we will not check for expired token 🥺
      // session.error = token.error;
      return session as Session;
    }
  }
};
