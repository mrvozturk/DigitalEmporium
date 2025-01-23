import React, { use } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { getServerSession } from 'next-auth';
import LogoutButton from '@/components/logout';
import { authOptions } from '@/lib/authOptions';

type UserType = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  birthDate?: string | null;
  gender?: string | null;
  [key: string]: any;
};

const ProfilePage: React.FC = () => {
  const session: { user: UserType } | null = use(getServerSession(authOptions));

  const user: UserType = {
    ...session?.user
  };

  return (
    <div className='w-full flex justify-center lg:justify-start mt-5'>
      <div className='w-full max-w-3xl lg:w-[70%] xl:w-[60%] px-4 md:ml-12 lg:ml-20 xl:ml-24'>
        <h1 className='text-lg font-light mb-5 text-gray-800'>
          {user.firstName ?? 'Kullanıcı'} {user.lastName ?? ''}
        </h1>
        <div className='border border-black/40 bg-white'>
          {/* Address */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>ADRESLER</h2>
            </div>
            <FiChevronRight className='text-md text-black' />
          </div>

          {/* Email */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>
                E-POSTA ADRESİ
              </h2>
              <p className='text-[11px] text-gray-500 mt-1'>
                {user.email ?? 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-black' />
          </div>

          {/* Phone */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>TELEFON</h2>
              <p className='text-[11px] text-gray-500 mt-1'>
                {user.phoneNumber ?? 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-black ' />
          </div>

          {/* Birth Date */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>
                DOĞUM TARİHİ
              </h2>
              <p className='text-[11px] text-gray-500 mt-1'>
                {user.birthDate
                  ? new Date(user.birthDate).toISOString().split('T')[0]
                  : 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-black' />
          </div>

          {/* Gender */}
          <div className='p-5 flex justify-between items-center xs:border-b xs:border-black/40'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>CİNSİYET</h2>
              <p className='text-[11px] text-gray-500 mt-1'>
                {user.gender ?? 'Belirtilmemiş'}
              </p>
            </div>
            <FiChevronRight className='text-md text-black' />
          </div>

          {/* Password */}
          <div className='p-5 flex justify-between items-center'>
            <div>
              <h2 className='text-xs font-medium text-gray-700'>PAROLA</h2>
              <p className='text-[11px] text-gray-500 mt-1'>..........</p>
            </div>
            <FiChevronRight className='text-md text-black' />
          </div>
        </div>
        {/* Logout and Delete Account Buttons */}
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfilePage;
