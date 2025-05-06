import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CustomSession } from './types/auth';

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
            'pAzEiUDxe0LtLxE6m24n6TgpsdsCzlcd'
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
            'https://postresql-api-pink.vercel.app/api/v1/user/register',
            requestOptions
          );
          const register = await response.json();

          console.log('register response:', register);
          console.log('register data structure:', register.data);

          if (!register.success) {
            console.error('Backend Error Response:', register);
            throw new Error(JSON.stringify(register));
          }

          const responseData = register.data;

          const userData = responseData.user ?? responseData;

          if (!responseData.token) {
            console.warn(
              'Backend API token döndürmedi. Kullanıcı girişi gerekecek.'
            );

            return {
              ...userData,
              id: userData.id ?? String(Date.now()),
              requiresLogin: true
            };
          }

          return {
            ...userData,
            id: userData.id ?? String(Date.now()),
            token: responseData.token
          };
        } catch (error) {
          console.error('Registration error:', error);
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
            'pAzEiUDxe0LtLxE6m24n6TgpsdsCzlcd'
          );
        }

        const raw = JSON.stringify(credentials);
        console.log('raw', raw);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };

        try {
          const response = await fetch(
            'https://postresql-api-pink.vercel.app/api/v1/user/login',
            requestOptions
          );
          const login = await response.json();

          if (!login.success) {
            console.error('Backend Error Response:', login);
            throw new Error(JSON.stringify(login));
          }

          const loginData = login.data;

          const userData = loginData.user ?? loginData;

          if (!loginData.token) {
            console.error('Login API token döndürmedi. Yetkilendirme hatası.');
            throw new Error('Token alınamadı. Lütfen tekrar giriş yapın.');
          }

          return {
            ...userData,
            id: userData.id ?? String(Date.now()),
            token: loginData.token
          };
        } catch (error) {
          console.error('Login error:', error);
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
          console.warn('JWT callback: Kullanıcı tokenı bulunamadı');
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