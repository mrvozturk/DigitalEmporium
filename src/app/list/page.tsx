'use client';
import React from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const productData = [
  {
    id: 1,
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/24/176fc35b-aa36-440e-b9f1-7b183785f324.png',
    title: 'OFİSTE MODA',
    buttonData: '/ofiste-moda',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: 2,
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/02/003828af-068a-42c0-8f4e-215c2719c0e6.png',
    title: 'YENİ TRENDLER',
    buttonData: '/yeni-trendler',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: 3,
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/24/34f44797-3dce-4f9d-9f27-de18f4548684.png',
    title: 'KOTON JEANS',
    buttonData: '/koton-jeans',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: 4,
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/02/8da70bd5-fbfc-40e8-a92a-7ff926a1b053.png',
    title: 'BASİC GİYİM',
    buttonData: '/sezonun-trendleri',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: 5,
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/24/176fc35b-aa36-440e-b9f1-7b183785f324.png',
    title: 'FESTİVAL RUHU',
    buttonData: 'festival-kombinleri',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: 6,
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/02/003828af-068a-42c0-8f4e-215c2719c0e6.png',
    title: 'LEOPAR MODASI',
    buttonData: '/leopar-modası',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: 7,
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/24/34f44797-3dce-4f9d-9f27-de18f4548684.png',
    title: 'PLAJ RUHU',
    buttonData: '/plaj-ruhu',
    button: 'ALIŞVERİŞE BAŞLA'
  },
  {
    id: 8,
    src:
      'https://ktnimg2.mncdn.com/cms/2024/05/02/8da70bd5-fbfc-40e8-a92a-7ff926a1b053.png',
    title: 'TREND ALARMI',
    buttonData: '/sezonun-trendleri',
    button: 'ALIŞVERİŞE BAŞLA'
  }
];

const ProductListing: React.FC = () => {
  return (
    <div className={styles.container}>
      {productData.map(product => (
        <div key={product.id} className={styles.card}>
import Link from 'next/link';

          <Link href={product.buttonData}>
            <Image
              src={product.src}
              alt={product.title}
              width={300}
              height={300}
            />
          </a>
          <a href={product.buttonData}>
            <h2 className={styles.title}>{product.title}</h2>
          </a>
          <div className={styles.buttonContainer}>
            <a href={product.buttonData} className={styles.button}>
              {product.button}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
