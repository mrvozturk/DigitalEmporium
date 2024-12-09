'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './index.module.css';

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

  const handleThumbnailClick = (photo: string) => {
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
    <div className='w-full flex flex-col justify-center items-center  p-0 md:p-0 sm:p-0'>
  <div
  className='flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-0 w-full lg:w-full sm:flex-col sm:p-0 sm:ml-0 gap-0 items-center sm:gap-2 md:p-0 lg:p-0 hide-scrollbar'
  id='imageThumbnails'
  ref={thumbnailsRef}
>
        {productDetail.photos.map(photo => (
          <Image
            key={photo}
            src={photo}
            alt={productDetail.title}
            width={340}
            height={352}
            className={`w-full flex-shrink-0 snap-center aspect-[4/5] object-contain object-center cursor-pointer 
              xs:w-full xs:aspect-square xs:object-contain xs:bg-[#f6f4f4]
              
              sm:w-[70px] sm:h-[50px] sm:border sm:border-[#b8b4b4] sm:rounded-md sm:shadow-lg sm:ml-0 
              md:w-[55px] md:h-[45px]
              lg:w-[45px] lg:h-[55px]
            `}
            onClick={() => handleThumbnailClick(photo)}
          />
        ))}
      </div>
      <div
        className='flex justify-center items-center mt-4 xs:mt-2 xs:bg-white xs:border xs:border-[#f1eded] xs:py-4 xs:w-full xs:bg-[#fff]'
        id='paginationDots'
      >
        {productDetail.photos.map((photo, index) => (
          <span
            key={`dot-${photo}`}
            className={`${styles.dot} ${
              index === activeIndex ? styles.active : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSwiper;
