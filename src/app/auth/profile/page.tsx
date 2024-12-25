'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { setRegisterData } from '@/lib/features/user/registerSlice';
import { FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.register);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      dispatch(setRegisterData(userData));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(setRegisterData({}));
    localStorage.removeItem('user');

    window.location.href = '/auth';
  };

  return (
    <div className='w-full flex justify-center md:justify-start mt-12'>
      <div className='w-full max-w-lg md:w-[55%] lg:w-[50%] xl:w-[45%] md:ml-12 p-4'>
        <h1 className='text-2xl font-medium mb-8 text-center md:text-left'>
          {`${user.firstName || ''} ${user.lastName || ''}`}
        </h1>

        <div className='border border-gray-300 rounded-md'>
          {/* Adresler */}
          <div className='p-6 flex justify-between items-center border-b border-gray-200'>
            <div>
              <h2 className='text-sm font-medium'>ADRESLER</h2>
            </div>
            <FiChevronRight className='text-lg text-gray-500' />
          </div>

          {/* E-posta */}
          <div className='p-6 flex justify-between items-center border-b border-gray-200'>
            <div>
              <h2 className='text-sm font-medium'>E-POSTA ADRESİ</h2>
              <p className='text-md text-gray-700'>{user.email || ''}</p>
            </div>
            <FiChevronRight className='text-lg text-gray-500' />
          </div>

          {/* Telefon */}
          <div className='p-6 flex justify-between items-center border-b border-gray-200'>
            <div>
              <h2 className='text-sm font-medium'>TELEFON</h2>
              <p className='text-md text-gray-700'>{user.phoneNumber || ''}</p>
            </div>
            <FiChevronRight className='text-lg text-gray-500' />
          </div>

          {/* Doğum Tarihi */}
          <div className='p-6 flex justify-between items-center border-b border-gray-200'>
            <div>
              <h2 className='text-sm font-medium'>DOĞUM TARİHİ</h2>
              <p className='text-md text-gray-700'>
                {user.birthdate || 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-lg text-gray-500' />
          </div>

          {/* Cinsiyet */}
          <div className='p-6 flex justify-between items-center'>
            <div>
              <h2 className='text-sm font-medium'>CİNSİYET</h2>
              <p className='text-md text-gray-700'>
                {user.gender || 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-lg text-gray-500' />
          </div>
        </div>

        <div className='mt-6 '>
          <button
            onClick={handleLogout}
            className='text-sm text-gray-500 hover:text-gray-700 underline'
          >
            Oturumu sonlandır
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
