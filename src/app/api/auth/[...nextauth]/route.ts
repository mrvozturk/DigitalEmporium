import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // Gizli anahtar tanımlandı
  session: {
    strategy: 'jwt' // JWT tabanlı oturum
  },
  pages: {
    signIn: '/'
  },
  providers: [
    CredentialsProvider({
      id: 'register',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify(credentials);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow' as RequestRedirect 
        };

        const register = await (
          await fetch(
            'https://postresql-api-pink.vercel.app/api/v1/user/register',
            requestOptions
          )
        ).json();

        if (!register.user) {
          console.error('Backend Error Response:', register);
          throw new Error(JSON.stringify(register));
        }

        return register.user;
      }
    })
  ],
  callbacks: {
    // JWT callback (Kullanıcı verilerini JWT'ye ekleme)
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    // Session callback (Session içine token'dan veri aktarma)
    async session({ session, token }) {
      session.user = token.user as Session['user'];
      return session;
    }
  }
});

export { handler as GET, handler as POST };
