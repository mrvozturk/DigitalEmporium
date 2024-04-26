'use client';
import React from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const images = [
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/04/18/1490aa22-333e-41e6-b1c1-4207beaadc40.png',
    title: 'EL EMEĞİ KOLEKSİYONU',
    buttonLink: '/el-emegi-yeni-sezon-kadin',
    buttonData: 'ALIŞVERİŞE BAŞLA'
  },
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/03/18/78056947-f73e-43ac-bfc1-000ca6756df6.png',
    title: 'İÇ GİYİM & PİJAMA',
    buttonLink: '/ikinci-resim-linki',
    buttonData: 'ALIŞVERİŞE BAŞLA'
  },
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/03/28/df302119-8a71-4583-afa8-7324f4acfdbf.png',
    title: 'POPLİN GÖMLEK',
    buttonLink: '/ucuncu-resim-linki',
    buttonData: 'ALIŞVERİŞE BAŞLA'
  },
  {
    src:
      'https://ktnimg2.mncdn.com/cms/2024/03/18/f5d6294a-d017-42fc-a3b7-109e112e5666.png',
    title: 'SEZONUN TRENDLERİ',
    buttonLink: '/dorduncu-resim-linki',
    buttonData: 'ALIŞVERİŞE BAŞLA'
  }
];

const QuadrupleBannersWithoutAnimation: React.FC = () => {
  return (
    <div className={styles.bannerContainer}>
      {images.map((image, index) => (
        <div key={index} className={styles.cardbodyimages}>
          <Image src={image.src} alt={image.title} width={800} height={480} />
          <div className={styles.buttonContainer}>
            <h2 className={styles.title}>{image.title}</h2>

            <a
              href={image.buttonLink}
              className={styles.button}
              data-text={image.buttonData}
            >
              {image.buttonData}
              <div className={styles.hrLine}></div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuadrupleBannersWithoutAnimation;
