'use client';

import { signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';

import { resetRegisterData } from '@/lib/features/user/registerSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetRegisterData());
    signOut({ callbackUrl: '/' });
  };
  return (
    <>
      <div className='mt-6'>
        <button
          onClick={handleLogout}
          className='text-xs text-gray-400 underline'
        >
          Oturumu sonlandır
        </button>
      </div>
      <div className='mt-1'>
        <button
          onClick={handleLogout}
          className='text-xs text-gray-400 underline'
        >
          Hesabınızı Silin
        </button>
      </div>
    </>
  );
};

export default LogoutButton;
