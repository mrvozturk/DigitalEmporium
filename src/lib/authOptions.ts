// NextAuth için gerekli temel tipleri import ediyoruz
import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
// Kimlik doğrulama için Credentials provider'ı import ediyoruz
import CredentialsProvider from 'next-auth/providers/credentials';
// Özel tip tanımlamalarını import ediyoruz
import { CustomSession, CustomUser } from './types/auth';

// NextAuth yapılandırma ayarları
export const authOptions: NextAuthOptions = {
  // JWT token imzalama için kullanılacak gizli anahtar
  secret: process.env.NEXTAUTH_SECRET ?? process.env.SECRET,

  // Oturum yönetimi için JWT stratejisini kullanıyoruz
  session: { strategy: 'jwt' },

  // Özel sayfa yönlendirmeleri
  pages: { signIn: '/' },

  // Kimlik doğrulama sağlayıcıları
  providers: [
    // Kayıt işlemi için provider
    CredentialsProvider({
      id: 'register',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        if (process.env.NODE_ENV === 'development') {
          myHeaders.append(
            'x-vercel-protection-bypass',
            'pAzEiUDxe0LtLxE6m24n6TgpsdsCzlcd'
          );
        }

        try {
          const response = await fetch(
            'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/register',
            {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(credentials)
            }
          );

          const register = await response.json();

          if (!register.success) {
            throw new Error(JSON.stringify(register));
          }

          return register.data;
        } catch (error) {
          throw error instanceof Error
            ? error
            : new Error(JSON.stringify(error));
        }
      }
    }),

    // Giriş işlemi için provider
    CredentialsProvider({
      id: 'login',
      name: 'Login',
      credentials: {},
      async authorize(credentials) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        if (process.env.NODE_ENV === 'development') {
          myHeaders.append(
            'x-vercel-protection-bypass',
            'pAzEiUDxe0LtLxE6m24n6TgpsdsCzlcd'
          );
        }

        try {
          const response = await fetch(
            'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/login',
            {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(credentials)
            }
          );

          const login = await response.json();

          if (!login.success) {
            throw new Error(JSON.stringify(login));
          }

          return login.data;
        } catch (error) {
          throw error instanceof Error
            ? error
            : new Error(JSON.stringify(error));
        }
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
      customSession.user = (token as any).user?.user || (token as any).user;

      // Token varsa session'a ekliyoruz
      if ((token as any).accessToken) {
        customSession.accessToken = (token as any).accessToken as string;
      }

      return customSession;
    }
  }
};
