'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { fetchProductData, Product } from '../../../lib/productData';
import styles from './index.module.css';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProductData(8);
      const selectedProduct = products.find(p => p.id === productId);
      setProduct(selectedProduct || null);
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.productDetail}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.title}
          priority
          width={300}
          height={300}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <h1>{product.title}</h1>

        <p>{product.description}</p>
        <p> {product.price}</p>
      </div>
    </main>
  );
};

export default ProductDetailPage;
