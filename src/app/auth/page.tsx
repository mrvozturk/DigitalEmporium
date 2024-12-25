'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';

import LoginForm from './login';
import RegisterForm from './register';

import style from './index.module.css';

const AccountProcess: React.FC = () => {
  const user = useSelector((state: RootState) => state.register);
  const router = useRouter();

  useEffect(() => {
    if (user.email) {
      router.push('/auth/profile');
    }
  }, [user.email, router]);

  return (
    <div className={style.container}>
      {!user.email ? (
        <>
          <RegisterForm />
          <LoginForm />
        </>
      ) : (
        <div>Yönlendiriliyorsunuz...</div>
      )}
    </div>
  );
};

export default AccountProcess;
