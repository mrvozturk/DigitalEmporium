'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import { getProducts, Product } from '../../lib/data';
import { AddToCartButton } from '../../components/addToCartButton';

const ProductListing: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const productCount = 8; // Gösterilecek ürün sayısı

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts(productCount);
      setProductData(products);
    };

    fetchData();
  }, []);

  const addToFavorites = (productId: string) => {
    console.log(`Product ${productId} added to favorites`);
  };

  return (
    <div className='grid gap-5 p-4 grid-cols-2 md:grid-cols-4'>
      {productData.map(product => (
        <div
          key={product.id}
          className='relative border border-gray-200 rounded-md shadow-md overflow-hidden'
        >
          <div className='absolute top-2 right-2 flex flex-col gap-2 z-10 p-1'>
            <button
              className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-200'
              onClick={event => {
                event.stopPropagation();
                addToFavorites(product.id);
              }}
              aria-label='Favorilere ekle'
            >
              <AiOutlineHeart className='text-black text-lg' />
            </button>
            <AddToCartButton
              id={product.id}
              src={product.photo}
              title={product.title}
              price={product.price}
            />
          </div>

          {/* Ürün Kartı */}
          <Link href={`/product/${product.id}`} className='block'>
            <Image
              src={product.photo}
              alt={product.title}
              priority
              width={300}
              height={300}
              className='w-full h-64 object-contain p-4'
            />
            <div className='p-4'>
              <h2 className='text-md font-bold tracking-tight leading-5 line-clamp-3 mb-2'>
                {product.title}
              </h2>
              <p className='text-sm text-gray-500 mb-1'>
                {product.rating.count} yorum
              </p>
              <p className='text-sm font-bold text-black'>{product.price} </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
