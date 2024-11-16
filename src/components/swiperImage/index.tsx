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
    <div className={styles.imageThumbnailsContainer}>
      <div
        className={styles.imageThumbnails}
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
            className={styles.thumbnailImage}
            onClick={() => handleThumbnailClick(photo)}
          />
        ))}
      </div>

      <div className={styles.pagination} id='paginationDots'>
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
