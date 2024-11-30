'use client';
import React from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const banners = [
  {
    id: '1',
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/24/176fc35b-aa36-440e-b9f1-7b183785f324.png',
    title: 'YAZ KOLEKSİYONU',
    buttonData: '/el-emegi-yeni-sezon-kadin',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: '2',
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/02/003828af-068a-42c0-8f4e-215c2719c0e6.png',
    title: 'İÇ GİYİM & PİJAMA',
    buttonData: '/ic-giyim-pijama',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: '3',
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/24/34f44797-3dce-4f9d-9f27-de18f4548684.png',
    title: 'POPLİN GÖMLEK',
    buttonData: '/poplin-gomlek',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: '4',
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/02/8da70bd5-fbfc-40e8-a92a-7ff926a1b053.png',
    title: 'SEZONUN TRENDLERİ',
    buttonData: '/sezonun-trendleri',
    button: 'ALIŞVERİŞE BAŞLA'
  }
];

const QuadrupleBannersWithoutAnimation: React.FC = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10'>
      {banners.map(banner => (
        <div key={banner.id} className='relative'>
          <Image
            src={banner.src}
            alt={banner.title}
            width={800}
            height={480}
            className='w-full h-auto'
          />
          <div className=' bottom-0 left-0 mt-2 p-2 text-black w-full'>
            <h2 className='text-xs sm:text-xs md:text-xs  custom-1024:text-base lg:text-lg'>
              {banner.title}
            </h2>

            <a
              href={banner.buttonData}
              className='text-xs sm:text-base sm:text-xs underline'
            >
              {banner.button}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuadrupleBannersWithoutAnimation;
