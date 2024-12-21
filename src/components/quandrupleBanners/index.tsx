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
      <div className='flex flex-col font-bold  mr-12 p-0  lg:max-w-3xl '>
        <h1 className='text-xs font-normal tracking-widest xs:text-2xl md:text-5xl lg:text-5xl sm:text-3xl'>
          BLOG
        </h1>
        <p className='text-sm mb:text-sm xs:text-sm lg:text-lg md:text-base mt-0 mb-2'>
          Sezon trendleri ve stil haberleri senin için Koton Blogda
        </p>
        <a
          href='/list'
          className=' px-4 py-2 lg:px-5 lg:py-1.5 lg:text-sm md:px-5 md:py-1.5 md:text-xs sm:px-3 sm:py-1 xs:px-3 xs:py-1 xs:text-[0.6rem] sm:text-[0.6rem] bg-black text-white border border-black hover:bg-white hover:text-black inline-block max-w-max'
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
