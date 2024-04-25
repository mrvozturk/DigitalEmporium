'use client';

import React from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const images = [
  'https://ktnimg2.mncdn.com/cms/2024/04/18/1490aa22-333e-41e6-b1c1-4207beaadc40.png',
  'https://ktnimg2.mncdn.com/cms/2024/03/18/78056947-f73e-43ac-bfc1-000ca6756df6.png',
  'https://ktnimg2.mncdn.com/cms/2024/03/28/df302119-8a71-4583-afa8-7324f4acfdbf.png',
  'https://ktnimg2.mncdn.com/cms/2024/03/18/f5d6294a-d017-42fc-a3b7-109e112e5666.png'
];

const QuadrupleBannersWithoutAnimation: React.FC = () => {
  return (
    <div className={styles.bannerContainer}>
      {images.map((image, index) => (
        <div key={index} className={styles.cardbodyimages}>
          <Image src={image} alt='Picture' width={800} height={480} />
        </div>
      ))}
    </div>
  );
};

export default QuadrupleBannersWithoutAnimation;
