'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import { useRouter } from 'next/navigation';
import { AiOutlineShopping, AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import { getProducts, Product } from '../../lib/data';

const ProductListing: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]);

  const productCount = 8;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts(productCount);
      setProductData(products);
    };

    fetchData();
  }, [productCount]);

  const handleProductClick = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className={styles.container}>
      {productData.map(product => (
        <Link
          href={`/product/${product.id}`}
          className={styles.card}
          key={product.id}
          onClick={() => handleProductClick(product)}
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
            src={product.photo}
            alt={product.title}
            priority
            width={300}
            height={300}
            className={styles.productImage}
          />
          <div className={styles.itemDescription}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>{product.title}</h2>
            </div>
            <div className={styles.commentContainer}>
              <p className={styles.commentCount}>
                {product.rating.count} yorum
              </p>
              <p className={styles.price}>{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductListing;
