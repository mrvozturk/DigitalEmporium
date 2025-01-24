import React from 'react';

const ProfileItem: React.FC = () => {
  return (
    <div className='p-5 flex justify-between items-center border-b border-black/40'>
      <div className='flex flex-col gap-2 w-full'>
        <div className='h-4 bg-gray-300 rounded w-1/3'></div>
        <div className='h-3 bg-gray-200 rounded w-2/3'></div>
      </div>
      <div className='h-5 w-5 bg-gray-300 rounded-full'></div>
    </div>
  );
};

const ProfileSkeleton: React.FC = () => {
  return (
    <div className='w-full flex justify-center lg:justify-start mt-5'>
      <div className='w-full max-w-3xl lg:w-[70%] xl:w-[60%] px-4 md:ml-12 lg:ml-20 xl:ml-24 animate-pulse'>
        {/* Kullanıcı Adı */}
        <div className='h-6 bg-gray-300 rounded mb-5 w-1/2'></div>

        {/* Bilgi Kartı */}
        <div className='border border-black/40 bg-white'>
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <ProfileItem key={index} />
            ))}
        </div>

        {/* Çıkış ve Hesap Silme Butonları */}
        <div className='mt-6'>
          <div className='h-4 bg-gray-300 rounded w-1/4 mb-2'></div>
          <div className='h-4 bg-gray-300 rounded w-1/4'></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
