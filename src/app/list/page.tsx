'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineHeart } from 'react-icons/ai';

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
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setProductData(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  return (
    <div className={styles.container}>
      {productData.map(product => (
        <Link
          href={`/product/${product.id}`}
          className={styles.card}
          key={product.id}
        >
          <div className={styles.iconContainer}>
            {[
              {
                icon: <AiOutlineHeart className={styles.favIcon} />,
                onClick: () => {},
                key: 'fav'
              },
              {
                icon: <AiOutlineShopping className={styles.cartIcon} />,
                onClick: () => {},
                key: 'cart'
              }
            ].map((item, index) => (
              <button
                key={`${item.key}-${index}`}
                onClick={item.onClick}
                className={styles.button}
              >
                {item.icon}
              </button>
            ))}
          </div>
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
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductListing;
