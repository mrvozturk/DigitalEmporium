'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { fetchProductData, Product } from '../../../lib/productData';

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
    <main>
      <h1>{product.title}</h1>
      <Image
        src={product.image}
        alt={product.title}
        priority
        width={300}
        height={300}
      />
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </p>
    </main>
  );
};

export default ProductDetailPage;
