'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const QuadrupleBanners: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const images = [
    {
      id: '1',
      src:
        'https://ktnimg2.mncdn.com/cms/2024/05/20/92bb0c02-f1b4-4885-b15c-75ad6a11496e.png'
    },
    {
      id: '2',
      src:
        'https://ktnimg2.mncdn.com/cms/2024/05/20/6185e44e-4cb0-49bf-9080-55a3256d5be7.png'
    },
    {
      id: '3',
      src:
        'https://ktnimg2.mncdn.com/cms/2024/05/20/e237f683-de61-499c-9315-4e8974cd499d.png'
    },
    {
      id: '4',
      src:
        'https://ktnimg2.mncdn.com/cms/2024/05/20/98142ef2-1241-404b-9489-27fc93e2e585.png'
    }
  ];

  return (
    <div className='flex justify-between items-center mx-4 lg:mx-12 my-1 '>
      <div className='flex flex-col font-bold space-y-6 mr-12'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-wide'>BLOG</h1>
        <p className='text-sm md:text-base lg:text-lg'>
          Sezon trendleri ve stil haberleri senin için Koton Blogda
        </p>
        <a
          href='/list'
          className='bg-black text-white px-8 py-2 text-xs md:text-sm hover:bg-white hover:text-black border border-transparent hover:border-black transition-colors w-fit'
        >
          TRENDLERİ KEŞFET
        </a>
      </div>

      <div className='hidden lg:flex w-full h-60 lg:h-80'>
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`flex-1 transition-all duration-700 ease-in-out overflow-hidden ${
              hoveredIndex === index ? 'flex-[3.2] z-10' : 'z-1'
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <Image
              src={image.src}
              alt={`Image ${index + 1}`}
              width={800}
              height={480}
              className='object-cover h-full w-full transition-transform duration-1000'
            />
          </div>
        ))}
      </div>

      <div className='block lg:hidden my-2 '>
        <Image
          src='https://ktnimg2.mncdn.com/cms/2024/04/22/a3878e02-1178-40e5-97ec-ffe4d7167048.png'
          alt='Mobile Banner'
          width={500}
          height={500}
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default QuadrupleBanners;
