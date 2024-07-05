'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductListing: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then(res => res.json())
      .then(data => setProductData(data));
  }, []);

  return (
    <div className={styles.container}>
      {productData.map(product => (
        <Link
          href={`/product/${product.id}`}
          className={styles.card}
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          key={product.id}
        >
          <Image
            src={product.image}
            alt={product.title}
            priority
            width={300}
            height={300}
            className={styles.productImage}
          />
          <div className={styles.itemDescription}>
            <h2 className={styles.title}>{product.title}</h2>
            <div className={styles.buttonContainer}>
              <Link href={`/product/${product.id}`} className={styles.button}>
                Alışverişe Başla
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductListing;
