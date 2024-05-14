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
    'https://ktnimg2.mncdn.com/cms/2024/05/03/a927d428-9060-49b9-837d-55c66aa6982b.png',
    'https://ktnimg2.mncdn.com/cms/2024/05/03/6bcc0746-7afa-4180-a03e-d0363b6c88aa.png',
    'https://ktnimg2.mncdn.com/cms/2024/05/03/8cb89c8d-87fe-4a12-b3c5-54d1a3041101.png',
    'https://ktnimg2.mncdn.com/cms/2024/05/03/61140670-b452-4e4f-a94a-3f297ccb7d91.png'
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
              flex: hoveredIndex === index ? 3.2 : 1,
              zIndex: hoveredIndex === index ? 1 : 1
            }}
          >
            <Image
              src={image}
              alt='Picture'
              width={800}
              height={480}
              style={{}}
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
