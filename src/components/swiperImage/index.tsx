'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductDetail {
  photos: string[];
  title: string;
}

interface Color {
  value: string;
  photo: string;
}

interface ImageSwiperProps {
  productDetail: ProductDetail;
  colors: Color[];
}

const ImageSwiper = ({ productDetail, colors }: ImageSwiperProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollLeft = 0;
      setActiveIndex(0);
    }
  }, []);

  const handleThumbnailClick = (photo: string, index: number) => {
    setActiveIndex(index);
    router.push(`?imageUrl=${photo}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (thumbnailsRef.current) {
        const thumbnails = thumbnailsRef.current;
        const { scrollLeft } = thumbnails;
        const thumbnailWidth = thumbnails.clientWidth;

        const newIndex = Math.round(scrollLeft / thumbnailWidth);
        setActiveIndex(newIndex);
      }
    };

    const thumbnailsElement = thumbnailsRef.current;
    if (thumbnailsElement) {
      thumbnailsElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (thumbnailsElement) {
        thumbnailsElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className='w-full flex flex-col justify-center items-center p-0 xs:bg-[#f6f4f4] xs:mt-2 '>
      <div
        className='flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-0 w-full sm:flex-col gap-2 items-center hide-scrollbar'
        id='imageThumbnails'
        ref={thumbnailsRef}
      >
        {productDetail.photos.map((photo, index) => (
          <Image
            key={photo}
            src={photo}
            alt={productDetail.title}
            width={340}
            height={352}
            className={`w-full flex-shrink-0 snap-center aspect-[4/5] object-contain object-center cursor-pointer align-center xs:p-3
              xs:w-full xs:aspect-square xs:object-contain 
              sm:w-[70px] sm:h-[50px] sm:border sm:border-[#b8b4b4] sm:rounded-md sm:shadow-lg 
              md:w-[55px] md:h-[45px]
              lg:w-[45px] lg:h-[55px]`}
            onClick={() => handleThumbnailClick(photo, index)}
          />
        ))}
      </div>
      <div
        className='flex justify-center items-center  xs:bg-white xs:border xs:bg-[#f6f4f4]  xs:py-4 xs:w-full sm:hidden xs:mb-3'
        id='paginationDots'
      >
        {productDetail.photos.map((photo, index) => (
          <span
            key={`dot-${photo}`}
            className={`xs:inline-block xs:h-2.5 xs:w-2.5 xs:rounded-full xs:mx-1 xs:border xs:border-[#8b8a8a] ${
              index === activeIndex
                ? 'xs:bg-[#1a6b7c] xs:border-none'
                : 'xs:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSwiper;
