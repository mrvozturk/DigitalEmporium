import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/login',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials)
            }
          );

          const user = await res.json();

          if (!res.ok || !user.success) {
            throw new Error(user.message || 'Giriş başarısız!');
          }

          return user.data.user; // Başarılı girişte kullanıcı bilgilerini döndür
        } catch (error) {
          console.error('Login error:', error);
          throw new Error('Giriş yapılamadı. Lütfen tekrar deneyin.');
        }
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

        // Development ortamı
        if (process.env.NODE_ENV === 'development') {
          myHeaders.append(
            'x-vercel-protection-bypass',
            process.env.VERCEL_PROTECTION_BYPASS_KEY ?? ''
          );
        }

        const raw = JSON.stringify(credentials);
        console.log('raw', raw);
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };

        const login = await (
          await fetch(
            'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/login',
            requestOptions
          )
        ).json();

        if (!login.success) {
          console.error('Backend Error Response:', login);
          throw new Error(JSON.stringify(login));
          }

        /**
         * Login yanıtından data nesnesini doğrudan döndür
         * Bu şekilde token ve user bilgileri orijinal yapıda korunur
         */
        return login.data;
      }
    })
  ],
  callbacks: {
    // JWT callback to add user data to the token
    async jwt({ token, user }) {
      if (user) {
        // API'den dönen veri yapısı: { token: "...", user: {...} }
        if ((user as CustomUser).token && (user as CustomUser).user) {
          // Token bilgisini accessToken olarak sakla
          token.accessToken = (user as CustomUser).token;
          // Kullanıcı bilgilerini token'daki user özelliğine ata
          token.user = (user as CustomUser).user;
        } else {
          // Eğer beklenen yapıda değilse, olduğu gibi ata
          token.user = user;
        }
      }
      return token;
    },

    // Session callback to pass token data into the session
    async session({ session, token }: { session: any; token: any }) {
      // Type the session as our custom session
      const customSession = session as CustomSession;

      // Copy user data from token to session
      customSession.user = token.user as CustomSession['user'];

      // Add the access token to the session if available
      if (token.accessToken) {
        customSession.accessToken = token.accessToken as string;
    }

      return customSession;
    }
  }
};
