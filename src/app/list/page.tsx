'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineHeart } from 'react-icons/ai';

interface Product {
  id: string;
  title: string;
  price: string;
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
  const productCount = 8;

  const fetchData = async (count: number) => {
    const url =
      'https://real-time-amazon-data.p.rapidapi.com/search?query=Dress&page=1&country=TR&sort_by=HIGHEST_PRICE&product_condition=ALL';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (Array.isArray(result.data.products)) {
        const products: Product[] = result.data.products.slice(0, count).map(
          (item: any): Product => ({
            id: item.asin,
            title: item.product_title,
            price: item.product_price || 'N/A',
            description: item.product_description || '',
            category: item.product_category || '',
            image: item.product_photo,
            rating: {
              rate: item.product_rating || 0,
              count: item.product_rating_count || 0
            }
          })
        );

        setProductData(products);
      } else {
        console.error('Products data is not an array:', result.data.products);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(productCount);
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
