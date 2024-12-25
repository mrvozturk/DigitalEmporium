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
    <div className='w-full flex justify-center md:justify-start mt-5'>
      <div className='w-full max-w-lg md:w-[55%] lg:w-[50%] xl:w-[45%] md:ml-12 p-4'>
        <h1 className='text-lg font-light mb-5 md:text-left text-gray-800'>
          {`${user.firstName || ''} ${user.lastName || ''}`}
        </h1>

        <div className='border border-gray-200 bg-white shadow-sm rounded-lg'>
          {/* Adresler */}
          <div className='p-5 flex justify-between items-center xs:border-b md:border-0'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>ADRESLER</h2>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* E-posta */}
          <div className='p-5 flex justify-between items-center xs:border-b md:border-0'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>
                E-POSTA ADRESİ
              </h2>
              <p className='text-[13px] text-gray-500'>{user.email || ''}</p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* Telefon */}
          <div className='p-5 flex justify-between items-center xs:border-b md:border-0'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>TELEFON</h2>
              <p className='text-[13px] text-gray-500'>
                {user.phoneNumber || ''}
              </p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* Doğum Tarihi */}
          <div className='p-5 flex justify-between items-center xs:border-b md:border-0'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>
                DOĞUM TARİHİ
              </h2>
              <p className='text-[13px] text-gray-500'>
                {user.birthdate || 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* Cinsiyet */}
          <div className='p-5 flex justify-between items-center  xs:border-b md:border-0'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>CİNSİYET</h2>
              <p className='text-[13px] text-gray-500'>
                {user.gender || 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* Parola */}
          <div className='p-5 flex justify-between items-center  xs:border-b md:border-0'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>PAROLA</h2>
              <p className='text-[13px] text-gray-500'>..........</p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>
        </div>

        <div className='mt-6'>
          <button
            onClick={handleLogout}
            className='text-xs text-gray-400 underline'
          >
            Oturumu sonlandır
          </button>
        </div>
        <div className='mt-2'>
          <button
            onClick={handleLogout}
            className='text-xs text-gray-400 underline'
          >
            Hesabınızı Silin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
