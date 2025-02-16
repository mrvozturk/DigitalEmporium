'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import { AiOutlineShopping } from 'react-icons/ai';

const CartItems = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className='w-full max-w-4xl p-4 bg-white rounded-md'>
      {cartItems.length === 0 ? (
        <div className='xs:p-0 sm:p-0 md:p-0 lg:p-0 mt-20 xs:mt-10 p-6 flex flex-col items-center text-center'>
          <AiOutlineShopping className='text-5xl mb-4' />
          <h2 className='text-xl font-bold mb-2'>Sepetiniz Boş</h2>
          <p className='mb-6 text-xs'>
            Alışverişe başlayın ve yeni gelen ürünlerimize göz atın.
          </p>
          <section className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-2'>
            {['Kadın', 'Erkek', 'Çocuk', 'Bebek'].map(category => (
              <a
                key={category}
                href='#'
                className='text-xs font-bold border border-black px-6 py-2 hover:bg-black hover:text-white transition text-center'
              >
                {category}
              </a>
            ))}
          </section>
        </div>
      ) : (
        <>
          {/* Sepet Başlığı ve Alışverişe Devam Et */}
          <div className='flex justify-between items-center border-b border-gray-300 pb-4 '>
            <h1 className='text-xl font-bold'>Sepetim</h1>
            <a href='#' className='text-sm text-black-600 hover:underline'>
              Alışverişe Devam Et
            </a>
          </div>

          {/* Sepet Ürünleri */}
          {cartItems.map(item => (
            <div key={item.id} className='flex  border-b border-gray-300 py-4'>
              {/* Ürün Resmi */}
              <div className='w-24 h-32 '>
                <Image
                  src={item.src}
                  alt={item.title}
                  width={100}
                  height={130}
                  className='object-contain w-full h-full'
                />
              </div>

              {/* Ürün Bilgileri */}
              <div className='flex flex-col  items-start'>
                {/* Ürün Başlığı */}
                <p className='text-xs '>{item.title}</p>

                {/* Renk, Beden ve Düzenle Butonu */}
                <div className='mt-1  '>
                  <a
                    href='#'
                    className=' text-xs text-black-600 underline block'
                  >
                    Düzenle
                  </a>
                  <div className='text-xs'>
                    {' '}
                    <p className='font-bold mt-1 mr-2'>Renk:</p>
                    <p className='font-bold'>Beden:</p>
                  </div>
                </div>
              </div>

              {/* Adet ve Fiyat Bilgileri */}
              <div className='flex items-center gap-8 ml-auto'>
                {/* Adet Seçimi */}
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

                {/* Fiyat */}
                <p className='text-xs font-bold'>{item.price} TL</p>
              </div>
            </div>
          ))}
          {/* Sipariş Özeti */}
          <div className='mt-6 p-4'>
            <h3 className='text-xl flex justify-between font-semibold'>Sipariş Özeti</h3>
            <p className='flex justify-between mt-2 text-xs'>
              <span>Ürünlerin Toplamı ({cartItems.length} ürün)</span>
            </p>
            <p className='flex justify-between text-xs text-red-500 mt-2'>
              <span>Yeni Sezon Ürünlerde Kargo Bedava</span>
              <span>-0,00 TL</span>
            </p>
            <p className='flex justify-between text-xs text-red-500 mt-2'>
              <span>Kargo Bedava</span>
              <span>-0,00 TL</span>
            </p>
            <p className='flex justify-between text-xs text-black-500 mt-2'>
              <span>Toplam İndirim</span>
              <span>-0,00 TL</span>
            </p>
            <hr className='my-2' />
            <p className='flex justify-between mt-2 text-lg font-semibold'>
              <span> Toplam </span>
            </p>
            <button className='mt-4 w-full bg-black text-white py-2 font-semibold'>
              SİPARİŞİ TAMAMLA
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
