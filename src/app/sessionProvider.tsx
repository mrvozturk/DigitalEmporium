'use client';

import { SessionProvider as NextAuthProvider } from 'next-auth/react';

export function SessionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
