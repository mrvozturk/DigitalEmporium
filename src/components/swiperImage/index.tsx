'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import styles from './index.module.css';

// ProductDetail type'ını oluşturuyoruz
interface ProductDetail {
  photos: string[];
  title: string;
}

interface ImageSwiperProps {
  productDetail: ProductDetail;
}

const ImageSwiper = ({ productDetail }: ImageSwiperProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (thumbnailsRef.current) {
        const thumbnails = thumbnailsRef.current;
        const scrollLeft = thumbnails.scrollLeft;
        const thumbnailWidth = thumbnails.clientWidth;

        // Kaydırılan pozisyona göre aktif index'i hesapla
        const newIndex = Math.round(scrollLeft / thumbnailWidth);
        setActiveIndex(newIndex);
      }
    };

    // Kaydırma olayını dinleme
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
        {productDetail.photos.map((photo, index) => (
          <Image
            key={index}
            src={photo}
            alt={productDetail.title}
            width={340}
            height={352}
            className={styles.thumbnailImage}
          />
        ))}
      </div>
      <div className={styles.pagination} id='paginationDots'>
        {productDetail.photos.map((_, index) => (
          <span
            key={index}
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
