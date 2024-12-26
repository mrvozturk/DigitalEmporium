'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { resetRegisterData } from '@/lib/features/user/registerSlice';
import { FiChevronRight } from 'react-icons/fi';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.register);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(resetRegisterData());
    window.location.href = '/auth';
  };

  if (!isClient) {
    return <div className='text-center mt-5'>Yükleniyor...</div>;
  }

  return (
    <div className='w-full flex justify-center lg:justify-start mt-5'>
      <div className='w-full max-w-3xl lg:w-[70%] xl:w-[60%] px-4 md:ml-12 lg:ml-20 xl:ml-24'>
        <h1 className='text-lg font-light mb-5 text-gray-800'>
          {`${user.firstName || 'Kullanıcı'} ${user.lastName || ''}`}
        </h1>

        <div className='border border-black/40 bg-white'>
          {/* Adresler */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>ADRESLER</h2>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* E-posta */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>
                E-POSTA ADRESİ
              </h2>
              <p className='text-[13px] text-gray-500 mt-1'>
                {user.email || 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* Telefon */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>TELEFON</h2>
              <p className='text-[13px] text-gray-500 mt-1'>
                {user.phoneNumber || 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* Doğum Tarihi */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>
                DOĞUM TARİHİ
              </h2>
              <p className='text-[13px] text-gray-500 mt-1'>
                {user.birthdate || 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* Cinsiyet */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>CİNSİYET</h2>
              <p className='text-[13px] text-gray-500 mt-1'>
                {user.gender || 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>

          {/* Parola */}
          <div className='p-5 flex justify-between items-center'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>PAROLA</h2>
              <p className='text-[13px] text-gray-500 mt-1'>..........</p>
            </div>
            <FiChevronRight className='text-md text-gray-400' />
          </div>
        </div>

        {/* Logout and Delete Account Buttons */}
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
      </div>
    </div>
  );
};

export default ProfilePage;
