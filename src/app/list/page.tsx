'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AiOutlineShopping, AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import { getProducts, Product } from '../../lib/data';

const ProductListing: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const productCount = 8; // Gösterilecek ürün sayısı

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts(productCount);
      setProductData(products);
    };

    fetchData();
  }, [productCount]);

  const addToFavorites = (productId: string) => {
    console.log(`Product ${productId} added to favorites`);
  };

  const addToCart = (productId: string) => {
    console.log(`Product ${productId} added to cart`);
  };

  return (
    <div className='grid gap-5 p-4 grid-cols-2 md:grid-cols-4'>
      {/* 
        grid: Elemanları bir ızgarada düzenler.
        gap-5: Elemanlar arasında 20px boşluk bırakır.
        p-4: Tüm kenarlardan 16px iç boşluk.
        grid-cols-2: Küçük ekranlarda iki sütun.
        md:grid-cols-4: Orta ve büyük ekranlarda dört sütun.
      */}
      {productData.map(product => (
        <Link
          href={`/product/${product.id}`}
          className='flex flex-col justify-between overflow-hidden cursor-pointer relative border border-gray-200 rounded-md shadow-md'
          key={product.id}
        >
          {/* 
            flex flex-col: İçerikler dikey olarak düzenlenir.
            justify-between: İçerikler arasında eşit boşluk bırakılır.
            overflow-hidden: Taşan içerikleri gizler.
            cursor-pointer: İmleç, üzerine gelindiğinde el simgesi olur.
            relative: İçindeki pozisyonlama için referans olur.
            border border-gray-200: Açık gri kenarlık.
            rounded-md: Kenarlar yuvarlatılır.
            shadow-md: Orta yoğunlukta gölge eklenir.
          */}
          <div className='absolute top-2 right-2 flex flex-col gap-2 z-10 p-1'>
            {/* 
              absolute: Eleman, ebeveynine göre pozisyonlanır.
              top-2 right-2: Üstten ve sağdan 8px boşluk.
              flex flex-col: İçerikler dikey düzenlenir.
              gap-2: Elemanlar arasında 8px boşluk.
              z-10: Z-index değeri 10, üstte görünür.
              p-1: 4px iç boşluk.
            */}
            <button
              className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-200'
              onClick={event => {
                event.stopPropagation(); // Tıklama etkisini durdurur
                addToFavorites(product.id); // Favorilere ekler
              }}
            >
              <AiOutlineHeart className='text-black text-lg' />
              {/* 
                text-black: İkon rengi siyah.
                text-lg: Yazı/ikon boyutu büyük (1.125rem, 18px).
              */}
            </button>
            <button
              className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-200'
              onClick={event => {
                event.stopPropagation(); // Tıklama etkisini durdurur
                addToCart(product.id); // Sepete ekler
              }}
            >
              <AiOutlineShopping className='text-black text-lg' />
            </button>
          </div>

          <Image
            src={product.photo}
            alt={product.title}
            priority
            width={300}
            height={300}
            className='w-full h-64 object-contain p-4'
          />
          {/* 
            w-full: Genişlik %100.
            h-64: Yükseklik 256px.
            object-contain: Görüntü kırpılmadan sığdırılır.
            p-4: İç boşluk her taraftan 16px.
          */}

          <div className='flex flex-col justify-between mt-2 flex-1'>
            {/* 
              flex flex-col: İçerikler dikey düzenlenir.
              justify-between: İçerikler eşit aralıklıdır.
              mt-2: Üstte 8px boşluk.
              flex-1: Esnek alan kullanımı.
            */}
            <h2 className='text-md font-bold tracking-tight leading-5 line-clamp-3 mb-4 px-4'>
              {product.title}
            </h2>

            {/* 
              text-lg: Yazı boyutu büyük.
              font-bold: Kalın yazı stili.
              px-5: Yatayda 20px iç boşluk.
              sm:text-base: Küçük ekranlarda yazı boyutu 1rem (16px).
            */}
            <div className='flex flex-col mt-2 mb-2 px-4'>
              {/* 
                flex flex-col: İçerikler dikey düzenlenir.
                mt-2: Üstte 8px boşluk.
                mb-2: Altta 8px boşluk.
                px-5: Yatayda 20px iç boşluk.
              */}
              <p className='text-sm text-gray-500 mb-2'>
                {product.rating.count} yorum
              </p>
              {/* 
                text-sm: Yazı boyutu küçük (0.875rem, 14px).
                text-gray-500: Yazı rengi açık gri.
                mb-2: Altta 8px boşluk.
              */}
              <p className='text-sm font-bold text-black'>{product.price}₺</p>
              {/* 
                text-sm: Yazı boyutu küçük.
                font-bold: Kalın yazı.
                text-black: Yazı rengi siyah.
              */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductListing;
