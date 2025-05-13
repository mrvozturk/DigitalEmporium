import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CustomSession } from './types/auth';

if (!process.env.API_BASE_URL) {
  throw new Error('API_BASE_URL environment variable is not defined');
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? process.env.SECRET,

  session: {
    strategy: 'jwt'
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

        if (process.env.NODE_ENV === 'development') {
          myHeaders.append(
            'x-vercel-protection-bypass',
            process.env.VERCEL_BYPASS_KEY ?? ''
          );
        }

        const raw = JSON.stringify(credentials);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };

        try {
          const response = await fetch(
            `${process.env.API_BASE_URL}user/register`,
            requestOptions
          );
          const register = await response.json();

          if (!register.success) {
            throw new Error(JSON.stringify(register));
          }

          const responseData = register.data;
          const userData = responseData.user ?? responseData;

          if (!responseData.token) {
            return {
              ...userData,
              id: userData.id,
              requiresLogin: true
            };
          }

          return {
            ...userData,
            id: userData.id,
            token: responseData.token
          };
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : JSON.stringify(error)
          );
        }
      }
    }),

    CredentialsProvider({
      id: 'login',
      name: 'Login',
      credentials: {},
      async authorize(credentials, req) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        if (process.env.NODE_ENV === 'development') {
          myHeaders.append(
            'x-vercel-protection-bypass',
            process.env.VERCEL_BYPASS_KEY ?? ''
          );
        }

        const raw = JSON.stringify(credentials);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };

        try {
          const response = await fetch(
            `${process.env.API_BASE_URL}user/login`,
            requestOptions
          );
          const login = await response.json();

          if (!login.success) {
            throw new Error(JSON.stringify(login));
          }

          const loginData = login.data;
          const userData = loginData.user ?? loginData;

          if (!loginData.token) {
            throw new Error('Token alınamadı. Lütfen tekrar giriş yapın.');
          }

          return {
            ...userData,
            id: userData.id,
            token: loginData.token
          };
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : JSON.stringify(error)
          );
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;

        if ((user as any).requiresLogin) {
          token.requiresLogin = true;
          return token;
        }

        if (!(user as any).token) {
          token.error = 'missing_token';
        } else {
          token.accessToken = (user as any).token;
        }
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      const customSession = session as CustomSession;

      if (token.requiresLogin || token.error === 'missing_token') {
        customSession.error = token.error ?? 'requires_login';
      }

      customSession.user = token.user as CustomSession['user'];

      if (token.accessToken) {
        customSession.accessToken = token.accessToken as string;
      }

      return customSession;
    }
  }
};
