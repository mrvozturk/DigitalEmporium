'use client';
import React from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import { GiButtonFinger } from 'react-icons/gi';

const banners = [
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/24/176fc35b-aa36-440e-b9f1-7b183785f324.png',
    title: 'EL EMEĞİ KOLEKSİYONU',
    buttonData: '/el-emegi-yeni-sezon-kadin',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/02/003828af-068a-42c0-8f4e-215c2719c0e6.png',
    title: 'İÇ GİYİM & PİJAMA',
    buttonData: '/ic-giyim-pijama',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/24/34f44797-3dce-4f9d-9f27-de18f4548684.png',
    title: 'POPLİN GÖMLEK',
    buttonData: '/poplin-gomlek',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/02/8da70bd5-fbfc-40e8-a92a-7ff926a1b053.png',
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
