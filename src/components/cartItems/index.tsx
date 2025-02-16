'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import { AiOutlineShopping } from 'react-icons/ai';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className='w-full max-w-6xl mx-auto p-4 bg-white'>
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center text-center mt-20'>
          <AiOutlineShopping className='text-5xl mb-4' />
          <h2 className='text-xl font-bold mb-2'>Sepetiniz Boş</h2>
          <p className='mb-6 text-xs'>
            Alışverişe başlayın ve yeni ürünlere göz atın.
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
            {['Kadın', 'Erkek', 'Çocuk', 'Bebek'].map(category => (
              <a
                key={category}
                href='#'
                className='text-xs font-bold border border-black px-6 py-2 hover:bg-black hover:text-white transition text-center'
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row gap-20 xs:gap-6 md:gap-6 lg:gap-20 xs:p-2 sm:p-4 md:p-6 lg:p-0'>
          {/* 🚀 Sepet Ürünleri */}
          <div className='flex-1 mt-2'>
            <div className='flex justify-between items-center border-b border-gray-300 pb-4'>
              <h1 className='text-lg font-bold'>Sepetim</h1>
              <a href='#' className='text-xs text-black-600 underline'>
                Alışverişe Devam Et
              </a>
            </div>
            {cartItems.map(item => (
              <div
                key={item.id}
                className='flex border-b border-gray-300 py-4 '
              >
                {/* Ürün Resmi */}
                <div className='w-40 h-48 xs:w-30 xs:h-32 border border-gray-200 rounded-lg shadow-sm flex items-center justify-center '>
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={100}
                    height={130}
                    className='object-contain w-full h-[180px] xs:w-full xs:h-[100px] '
                  />
                </div>

                {/* Ürün Bilgileri */}
                <div className='flex flex-col w-full items-start ml-4'>
                  {/* Ürün Bilgileri */}
                  <p className='text-xs text-left leading-tight max-w-[400px] xs:text-xxs '>
                    {item.title}
                  </p>
                  <div className='mt-1 '>
                    <a
                      href='#'
                      className='text-xs text-black-600 underline block'
                    >
                      Düzenle
                    </a>
                    <div className='  text-xs mt-1'>
                      <p className=' flex font-bold mr-2 '>Renk:</p>

                      <p className='font-bold mr-2 '>Beden:</p>
                    </div>
                  </div>
                </div>
                {/* Adet ve Fiyat Bilgileri */}
                <div className='flex items-center gap-8 ml-auto mt-4'>
                  <select className='border px-3 py-1 text-xxs'>
                    {[1, 2, 3, 4, 5].map(num => (
                      <option
                        key={num}
                        value={num}
                        selected={num === item.quantity}
                      >
                        {num}
                      </option>
                    ))}
                  </select>
                  <p className='text-xs font-bold'>{item.price} </p>
                </div>
              </div>
            ))}
          </div>

          {/* 🛒 Sipariş Özeti */}
          <div className='w-full lg:w-1/3 '>
            <h3 className=' py-3 flex text-lg font-semibold  border-b border-gray-300 '>
              Sipariş Özeti
            </h3>
            <div className='mt-3 text-xs'>
              <div className='flex justify-between'>
                <span>Ürünlerin Toplamı ({cartItems.length} ürün)</span>
              </div>
              <div className='flex justify-between text-red-500 mt-2'>
                <span>Yeni Sezon Ürünlerde Kargo Bedava</span>
                <span>-0,00 TL</span>
              </div>
              <div className='flex justify-between text-red-500 mt-2'>
                <span>Kargo Bedava</span>
                <span>-0,00 TL</span>
              </div>
              <div className='flex justify-between text-black-500 mt-2'>
                <span>Toplam İndirim</span>
                <span>-0,00 TL</span>
              </div>
              <hr className='my-3' />
              <div className='flex justify-between text-lg font-semibold'>
                <span>Toplam</span>
              </div>
              <hr className='my-3' />

              <button className='mt-4 w-full bg-black text-white py-2 font-semibold'>
                SİPARİŞİ TAMAMLA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
