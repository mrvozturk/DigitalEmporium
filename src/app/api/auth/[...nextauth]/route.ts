import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // Secret key for JWT
  session: {
    strategy: 'jwt' // Use JWT for session management
  },
  pages: {
    signIn: '/' // Redirect to homepage for sign-in
  },
  providers: [
    // Registration Provider
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
          body: raw
          // redirect: 'follow' as RequestRedirect
        };

        const register = await (
          await fetch(
            'https://postresql-api-pink.vercel.app/api/v1/user/register',
            requestOptions
          )
        ).json();

        console.log('register', register);

        if (!register.user) {
          console.error('Backend Error Response:', register);
          throw new Error(JSON.stringify(register));
        }

        return register.user;
      }
    }),

    // Login Provider
    CredentialsProvider({
      id: 'login',
      name: 'Login',
      credentials: {},
      async authorize(credentials, req) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify(credentials);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };

        const login = await (
          await fetch(
            'https://postresql-api-pink.vercel.app/api/v1/user/login',
            requestOptions
          )
        ).json();

        console.log('login', login);

        if (!login.user) {
          console.error('Backend Error Response:', login);
          throw new Error(JSON.stringify(login));
        }

        return login.user;
      }
    })
  ],
  callbacks: {
    // JWT callback to add user data to the token
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    // Session callback to pass token data into the session
    async session({ session, token }) {
      session.user = token.user as Session['user'];
      return session;
    }
  }
});

export { handler as GET, handler as POST };
