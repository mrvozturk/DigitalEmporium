// NextAuth için gerekli temel tipleri import ediyoruz
import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
// Kimlik doğrulama için Credentials provider'ı import ediyoruz
import CredentialsProvider from 'next-auth/providers/credentials';
// Özel tip tanımlamalarını import ediyoruz
import { CustomSession, CustomUser } from './types/auth';

async function fetchAuthData<T>(url: string, credentials: unknown): Promise<T> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (process.env.NODE_ENV === 'development') {
    headers.append(
      'x-vercel-protection-bypass',
      `${process.env.VERCEL_BYPASS}`
    );
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(credentials)
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(JSON.stringify(result));
    }
    return result.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error(JSON.stringify(error));
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? process.env.SECRET,

  session: { strategy: 'jwt' },

  pages: { signIn: '/' },

  providers: [
    CredentialsProvider({
      id: 'register',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        return await fetchAuthData(
          `${process.env.API_BASE_URL}user/register`,
          credentials
        );
      }
    }),

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
            'http://192.168.1.106:3000/api/v1/user/login',
            requestOptions
          )
        ).json();

        console.log('login', login);

        if (!login.data.user) {
          console.error('Backend Error Response:', login);
          throw new Error(JSON.stringify(login));
        }

        return login.data;
      }
    })
  ],

  // NextAuth callback fonksiyonları
  callbacks: {
    // JWT token oluşturma ve güncelleme işlemleri
    async jwt({ token, user }) {
      console.log('token', token);
      console.log('user', user);
      if (user) {
        // token.user = user;
        token.user = user;
      }
      return token;
    },

    // Session callback to pass token data into the session
    async session({ session, token }) {
      console.log('session', session);
      console.log('token', token);
      session.user = token.user as Session['user'];
      console.log('session', session);
      return session;
    }
  }
};
