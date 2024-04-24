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
    'https://ktnimg2.mncdn.com/cms/2024/04/22/d12fb8f9-33b1-4fd7-b27a-9bb4b99efd99.png',
    'https://ktnimg2.mncdn.com/cms/2024/04/22/c9780508-fb37-4e34-9f64-73d027fc612c.png',
    'https://ktnimg2.mncdn.com/cms/2024/04/22/7d9e9ae6-c737-4776-bf5a-b4702bc5c27e.png',
    'https://ktnimg2.mncdn.com/cms/2024/04/22/ed86d22b-4fed-4f6c-95eb-7cf6e1f16f98.png'
  ];

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerText}>
        <h1>BLOG</h1>
        <p>Sezon trendleri ve stil haberleri senin için Koton Blogda </p>
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
                transform: hoveredIndex === index ? 'scale(1)' : 'scale(1)'
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.mobileBanner}>
        <Image
          src='https://ktnimg2.mncdn.com/cms/2024/04/22/a3878e02-1178-40e5-97ec-ffe4d7167048.png'
          alt='Mobile Picture'
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default QuadrupleBanners;
