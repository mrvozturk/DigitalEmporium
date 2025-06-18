'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import { FiRefreshCw } from 'react-icons/fi';

import { Product } from './../../lib/types/product';
import { AddToCartButton } from '../../components/addToCartButton';

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      setRefreshing(true);
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/product?_t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        next: { revalidate: 0 }
      });
      if (!response.ok) {
        throw new Error('Ürünler alınırken hata oluştu.');
      }
      const data = await response.json();
      setProducts(data.products ?? []);
      setError('');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ürünler yüklenirken bir hata oluştu';
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading && !refreshing) {
    return (
      <div className='flex justify-center items-center min-h-[60vh]'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Ürünler</h1>
        <button
          onClick={fetchProducts}
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          disabled={refreshing}
        >
          <FiRefreshCw className={`${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Yenileniyor...' : 'Yenile'}
        </button>
      </div>

      {error && !products.length ? (
        <div className='flex flex-col justify-center items-center min-h-[60vh] p-4 text-center'>
          <p className='text-red-500 text-lg mb-4'>{error}</p>
          <button
            onClick={fetchProducts}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            Tekrar Dene
          </button>
        </div>
      ) : (
        <div className='grid gap-5 grid-cols-2 md:grid-cols-4'>
          {products.map(product => (
            <div key={product.id} className='relative border border-gray-200 rounded-md shadow-md overflow-hidden'>
              <div className='absolute top-2 right-2 flex flex-col gap-2 z-10 p-1'>
                <button
                  className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-200'
                  onClick={event => {
                    event.stopPropagation();
                  }}
                  aria-label='Favorilere ekle'
                >
                  <AiOutlineHeart className='text-black text-lg' />
                </button>
                <AddToCartButton
                  id={product.id.toString()}
                  src={product.image}
                  title={product.name}
                  price={product.price.toString()}
                />
              </div>

              <Link href={`/product/${product.id}`}>
                <div className='cursor-pointer'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    priority
                    width={300}
                    height={300}
                    className='w-full h-64 object-contain p-4'
                  />

                  <div className='flex flex-col justify-between mt-2 flex-1'>
                    <h2 className='text-md font-bold tracking-tight leading-5 line-clamp-3 mb-4 px-4'>
                      {product.name}
                    </h2>

                    <div className='flex flex-col mt-2 mb-2 px-4'>
                      <div className='flex items-center mb-2'>
                        <p className='text-sm text-gray-500'>
                          {product.numRatings} yorum
                        </p>
                      </div>

                      <div className='flex justify-between items-center'>
                        <p className='text-sm font-bold text-black'>
                          {product.price}₺
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListing;
