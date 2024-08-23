'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

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

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
      const parsedProduct = JSON.parse(savedProduct);
      if (parsedProduct.id === productId) {
        setProduct(parsedProduct);
      }
    }
  }, [productId]);

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div>
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
    </div>
  );
};

export default ProductDetailPage;
