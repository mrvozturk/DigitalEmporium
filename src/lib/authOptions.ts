import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? process.env.SECRET, // Secret key for JWT
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
        };

        const register = await (
          await fetch(
            'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/register',
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

        try {
          const response = await fetch(
            'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/login',
            requestOptions
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const login = await response.json();

          if (!login.user) {
            console.error('Backend Error Response:', login);
            throw new Error(JSON.stringify(login));
          }

          return login.user;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
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
};
