'use client';
import React from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import { GiButtonFinger } from 'react-icons/gi';

const banners = [
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/04/18/1490aa22-333e-41e6-b1c1-4207beaadc40.png',
    title: 'EL EMEĞİ KOLEKSİYONU',
    buttonData: '/el-emegi-yeni-sezon-kadin',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/03/18/78056947-f73e-43ac-bfc1-000ca6756df6.png',
    title: 'İÇ GİYİM & PİJAMA',
    buttonData: '/ic-giyim-pijama',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/03/28/df302119-8a71-4583-afa8-7324f4acfdbf.png',
    title: 'POPLİN GÖMLEK',
    buttonData: '/poplin-gomlek',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/03/18/f5d6294a-d017-42fc-a3b7-109e112e5666.png',
    title: 'SEZONUN TRENDLERİ',
    buttonData: '/sezonun-trendleri',
    button: 'ALIŞVERİŞE BAŞLA'
  }
];

const QuadrupleBannersWithoutAnimation: React.FC = () => {
  return (
    <div className={styles.bannerContainer}>
      {banners.map((banner, index) => (
        <div key={index} className={styles.cardbodyimages}>
          <Image src={banner.src} alt={banner.title} width={800} height={480} />
          <div className={styles.buttonContainer}>
            {' '}
            <h2 className={styles.title}>{banner.title}</h2>
            <a href={banner.buttonData} className={styles.button}>
              {banner.button}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuadrupleBannersWithoutAnimation;
