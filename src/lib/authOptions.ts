import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CustomSession } from './types/auth';

/**
 * NextAuth Kimlik Doğrulama Ayarları
 * Bu dosya kullanıcı kayıt, giriş ve oturum yönetimi için temel yapılandırmayı içerir
 */
export const authOptions: NextAuthOptions = {
  // JWT için gizli anahtar, çevre değişkenlerinden alınır
  secret: process.env.NEXTAUTH_SECRET ?? process.env.SECRET,

  // Oturum yönetimi stratejisi olarak JWT kullanılır
  session: {
    strategy: 'jwt'
  },

  // Özel sayfa yönlendirmeleri
  pages: {
    signIn: '/' // Giriş için ana sayfaya yönlendir
  },

  // Kimlik doğrulama sağlayıcıları
  providers: [
    // Kayıt İşlemi Sağlayıcısı
    CredentialsProvider({
      id: 'register',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        // API isteği için header'lar oluştur
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        // Geliştirme ortamı için özel bypass header'ı ekle
        if (process.env.NODE_ENV === 'development') {
          myHeaders.append(
            'x-vercel-protection-bypass',
            'pAzEiUDxe0LtLxE6m24n6TgpsdsCzlcd'
          );
        }

        // Kullanıcı bilgilerini JSON formatına dönüştür
        const raw = JSON.stringify(credentials);

        // API isteği için ayarları oluştur
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };

        try {
          // Kayıt API'sine istek gönder
          const response = await fetch(
            'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/register',
            requestOptions
          );
          const register = await response.json();

          // Debug için yanıtı konsola yazdır
          console.log('register response:', register);
          console.log('register data structure:', register.data);

          // Başarısız yanıt durumunda hata fırlat
          if (!register.success) {
            console.error('Backend Error Response:', register);
            throw new Error(JSON.stringify(register));
          }

          // API yanıt yapısını işle
          const responseData = register.data;

          // Kullanıcı bilgilerini al (iki farklı yapıyı da destekler)
          const userData = responseData.user || responseData;

          // Token kontrolü
          if (!responseData.token) {
            console.warn(
              'Backend API token döndürmedi. Kullanıcı girişi gerekecek.'
            );

            // Token yoksa, NextAuth'un kullanıcı oturumunu otomatik olarak oluşturmamasını sağla
            // Bunun yerine frontend'de kullanıcıyı giriş sayfasına yönlendirmek daha güvenli
            return {
              ...userData,
              id: userData.id || String(Date.now()),
              requiresLogin: true // Frontend'e kullanıcının giriş yapması gerektiğini bildir
            };
          }

          // Token varsa normal şekilde döndür
          return {
            ...userData,
            id: userData.id || String(Date.now()),
            token: responseData.token
          };
        } catch (error) {
          // Hata durumunda loglama yap ve hata fırlat
          console.error('Registration error:', error);
          throw new Error(
            error instanceof Error ? error.message : JSON.stringify(error)
          );
        }
      }
    }),

    // Giriş İşlemi Sağlayıcısı
    CredentialsProvider({
      id: 'login',
      name: 'Login',
      credentials: {},
      async authorize(credentials, req) {
        // API isteği için header'lar oluştur
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        // Geliştirme ortamı için özel bypass header'ı ekle
        if (process.env.NODE_ENV === 'development') {
          myHeaders.append(
            'x-vercel-protection-bypass',
            'pAzEiUDxe0LtLxE6m24n6TgpsdsCzlcd'
          );
        }

        // Kullanıcı bilgilerini JSON formatına dönüştür
        const raw = JSON.stringify(credentials);
        console.log('raw', raw);

        // API isteği için ayarları oluştur
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };

        try {
          // Giriş API'sine istek gönder
          const response = await fetch(
            'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/login',
            requestOptions
          );
          const login = await response.json();

          // Başarısız yanıt durumunda hata fırlat
          if (!login.success) {
            console.error('Backend Error Response:', login);
            throw new Error(JSON.stringify(login));
          }

          // API yanıt yapısını işle
          const loginData = login.data;

          // Kullanıcı bilgilerini al (iki farklı yapıyı da destekler)
          const userData = loginData.user || loginData;

          // Token kontrolü
          if (!loginData.token) {
            console.error('Login API token döndürmedi. Yetkilendirme hatası.');
            throw new Error('Token alınamadı. Lütfen tekrar giriş yapın.');
          }

          // Token varsa normal şekilde döndür
          return {
            ...userData,
            id: userData.id || String(Date.now()),
            token: loginData.token
          };
        } catch (error) {
          // Hata durumunda loglama yap ve hata fırlat
          console.error('Login error:', error);
          throw new Error(
            error instanceof Error ? error.message : JSON.stringify(error)
          );
        }
      }
    })
  ],

  // NextAuth geri çağrı fonksiyonları
  callbacks: {
    // JWT tokenı oluşturma ve güncelleme
    async jwt({ token, user }) {
      if (user) {
        // Kullanıcı bilgilerini token'a ekle
        token.user = user;

        // Kullanıcının giriş yapması gerekiyorsa işaretle
        if ((user as any).requiresLogin) {
          token.requiresLogin = true;
          return token;
        }

        // Token bilgisini kontrol et
        if (!(user as any).token) {
          console.warn('JWT callback: Kullanıcı tokenı bulunamadı');
          token.error = 'missing_token';
        } else {
          // Giriş/kayıt işleminden gelen token'ı kullan
          token.accessToken = (user as any).token;
        }
      }
      return token;
    },

    // Oturum bilgilerini oluştur ve güncelle
    async session({ session, token }: { session: any; token: any }) {
      // Oturum nesnesini özel tipimize dönüştür
      const customSession = session as CustomSession;

      // Eğer kullanıcının giriş yapması gerekiyorsa veya token hatası varsa
      if (token.requiresLogin || token.error === 'missing_token') {
        customSession.error = token.error || 'requires_login';
      }

      // Token'dan kullanıcı bilgilerini oturuma kopyala
      customSession.user = token.user as CustomSession['user'];

      // Token bilgisini oturuma ekle
      if (token.accessToken) {
        customSession.accessToken = token.accessToken as string;
      }

      // Özelleştirilmiş oturumu döndür
      return customSession;
    }
  }
};
