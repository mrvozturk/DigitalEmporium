// NextAuth için gerekli temel tipleri import ediyoruz
import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
// Kimlik doğrulama için Credentials provider'ı import ediyoruz
import CredentialsProvider from 'next-auth/providers/credentials';
// Özel tip tanımlamalarını import ediyoruz
import { CustomSession, CustomUser } from './types/auth';

async function fetchWithError<T>(
  url: string,
  credentials: unknown
): Promise<T> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (process.env.NODE_ENV === 'development') {
    headers.append(
      'x-vercel-protection-bypass',
      'pAzEiUDxe0LtLxE6m24n6TgpsdsCzlcd'
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
        return await fetchWithError(
          'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/register',
          credentials
        );
      }
    }),

    CredentialsProvider({
      id: 'login',
      name: 'Login',
      credentials: {},
      async authorize(credentials) {
        return await fetchWithError(
          'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/login',
          credentials
        );
      }
    })
  ],

  // NextAuth callback fonksiyonları
  callbacks: {
    // JWT token oluşturma ve güncelleme işlemleri
    async jwt({ token, user }) {
      if (user) {
        // API'den gelen kullanıcı verilerini token'a ekliyoruz
        if ((user as CustomUser).token && (user as CustomUser).user) {
          token.accessToken = (user as CustomUser).token;
          token.user = (user as CustomUser).user;
        } else {
          token.user = user;
        }
      }
      return token;
    },

    // Oturum oluşturma ve güncelleme işlemleri
    async session({ session, token }: { session: Session; token: JWT }) {
      const customSession = session as CustomSession;

      // Token'dan kullanıcı bilgilerini session'a aktarıyoruz
      customSession.user = (token as any).user?.user ?? (token as any).user;

      return customSession;
    }
  }
};
