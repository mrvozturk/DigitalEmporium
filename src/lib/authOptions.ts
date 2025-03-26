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
    // Register provider
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null;
        
        try {
          // Type assertion for credentials
          const creds = credentials as Record<string, any>;
          
          // Önce kaydı yap
          const registerRes = await fetch(
            'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/register',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials)
            }
          );

          const registerData = await registerRes.json();

          if (!registerRes.ok || !registerData.success) {
            throw new Error(registerData.message || 'Kayıt başarısız!');
          }

          // Kayıt başarılıysa, login yapılmış gibi user bilgilerini döndür
          return {
            id: registerData.data?.user?.id || 0,
            email: creds.email,
            firstName: creds.firstName,
            lastName: creds.lastName,
            phoneNumber: creds.phoneNumber,
            birthDate: creds.birthDate,
            username: creds.username
          };
        } catch (error) {
          console.error('Registration error:', error);
          throw new Error('Kayıt yapılamadı. Lütfen tekrar deneyin.');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = (user as any).username;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.phoneNumber = (user as any).phoneNumber;
        token.birthDate = (user as any).birthDate;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        session.user = {};
      }
      (session.user as any).id = token.id;
      (session.user as any).email = token.email;
      (session.user as any).username = token.username;
      (session.user as any).firstName = token.firstName;
      (session.user as any).lastName = token.lastName;
      (session.user as any).phoneNumber = token.phoneNumber;
      (session.user as any).birthDate = token.birthDate;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Özel kayıt (register) endpoint'i
export async function register(req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Only POST requests are allowed'
      }),
      { status: 405 }
    );
  }

  try {
    const body = await req.json();
    const res = await fetch(
      'https://postresql-api-git-generate-products-onatvaris-projects.vercel.app/api/v1/user/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: data.message || 'Kayıt başarısız!'
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Kayıt başarılı' }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Kayıt sırasında hata oluştu'
      }),
      { status: 500 }
    );
  }
}
