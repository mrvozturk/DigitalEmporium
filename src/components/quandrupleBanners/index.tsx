'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const QuadrupleBanners: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const images = [
    'https://ktnimg2.mncdn.com/cms/2024/03/19/3a13246e-a9f3-4999-b970-00e05010d59e.png',
    'https://ktnimg2.mncdn.com/cms/2024/03/19/35b1cda7-bd8c-44ba-9c42-0a89386246c1.png',
    'https://ktnimg2.mncdn.com/cms/2024/03/19/f99753d9-35fa-4dfe-bd89-450cf5afcceb.png',
    'https://ktnimg2.mncdn.com/cms/2024/03/19/bb0f1e17-45e2-43cc-a2e7-8465388af311.png'
  ];

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerText}>
        <h1>BLOG</h1>
        <p>Sezon trendleri ve stil haberleri senin için Koton Blogda</p>
        <button className={styles.bannerButton}>TRENDLERİ KEŞFET</button>
      </div>
      <div className={styles.bannerWrap}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.bannerImage}
            onMouseEnter={() => handleMouseEnter(index)}
            style={{
              flex: hoveredIndex === index ? 4 : 1,
              zIndex: hoveredIndex === index ? 1 : 0
            }}
          >
            <Image
              src={image}
              alt='Picture'
              width={500}
              height={500}
              style={{
                transform: hoveredIndex === index ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.mobileBanner}>
        <Image
          src='https://ktnimg2.mncdn.com/cms/2024/03/19/46a12a93-f734-4344-a3e6-ab94930e7f16.png'
          alt='Mobile Picture'
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default QuadrupleBanners;
