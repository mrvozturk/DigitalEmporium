import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
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
        try {
          const myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');

          const raw = JSON.stringify(credentials);

          const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow' // Doğru türde ayarlandı
          };

          const response = await fetch(
            'https://postresql-api-pink.vercel.app/api/v1/user/register',
            requestOptions
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend Error Response:', errorData);
            throw new Error(JSON.stringify(errorData));
          }

          const register = await response.json();

          if (!register.user) {
            console.error('Invalid user data from backend:', register);
            throw new Error(JSON.stringify(register));
          }

          return register.user;
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authorization failed. Please try again.');
        }
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
