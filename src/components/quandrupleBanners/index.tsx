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
    'https://ktnimg2.mncdn.com/cms/2024/05/20/92bb0c02-f1b4-4885-b15c-75ad6a11496e.png',
    'https://ktnimg2.mncdn.com/cms/2024/05/20/6185e44e-4cb0-49bf-9080-55a3256d5be7.png',
    'https://ktnimg2.mncdn.com/cms/2024/05/20/e237f683-de61-499c-9315-4e8974cd499d.png',
    'https://ktnimg2.mncdn.com/cms/2024/05/20/98142ef2-1241-404b-9489-27fc93e2e585.png'
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
