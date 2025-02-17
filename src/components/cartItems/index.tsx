'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import { AiOutlineShopping, AiOutlineClose } from 'react-icons/ai';

import { removeFromCart } from '@/lib/features/cart/cartSlice';

const CartItems = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className='w-full max-w-6xl mx-auto p-4 bg-white xs:p-2 sm:p-0 md:p-0 lg:p-0'>
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
        <div className='flex flex-col lg:flex-row gap-20 p-2 sm:p-4 md:p-6 lg:p-0 xs:gap-10 sm:gap-10 md:gap-10 lg:gap-20'>
          {/*  Sepet Ürünleri */}
          <div className='flex-1 mt-2'>
            <div className='flex justify-between items-center border-b border-gray-300 pb-4'>
              <h1 className='text-lg font-bold'>Sepetim</h1>
              <a href='#' className='text-xs text-black-600 underline'>
                Alışverişe Devam Et
              </a>
            </div>
            {cartItems.map(item => (
              <div key={item.id} className='flex border-b border-gray-300 py-4'>
                <div className='w-40 h-48 xs:w-30 xs:h-32 border border-gray-200 rounded-lg shadow-sm flex items-center justify-center'>
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={100}
                    height={130}
                    className='object-contain w-full h-[180px] xs:h-[100px]'
                  />
                </div>

                {/* Ürün Bilgileri */}
                <div className='l w-full ml-2 '>
                  <div>
                    <p className=' text-xs text-start '>{item.title}</p>
                  </div>
                  <a
                    href='#'
                    className='flex flex-col text-xs text-black-600 underline mt-1 xs:text-xxs text-start'
                  >
                    Düzenle
                  </a>
                  <div className='flex flex-col w-full'>
                    <div className='  text-xs mt-1'>
                      <p className=' flex font-bold mr-2 xs:mr-3 xs:text-xxs'>
                        Renk:
                      </p>
                      <p className=' flex font-bold mr-2 xs:mr-3 xs:text-xxs xs:mb-2 sm:mb-0 md:mb-2 lg:mb-0'>
                        Beden:
                      </p>{' '}
                    </div>
                    <div className='flex flex-col  xs:flex-row md:gap-4 lg:gap-4.5 w-full lg:justify-end lg:flex-row lg:items-center xs:mt-0 sm:mt-0 md:mt-0 lg:mt-0 '>
                      <select
                        value={item.quantity}
                        onChange={e => {
                          const newQuantity = Number(e.target.value);
                        }}
                        className='border px-2 py-1 text-xxs xs:py-1 md:py-1 lg:px-2 lg:py-1 w-full xs:w-12 md:w-12 lg:w-80 lg:h-8 max-w-[60px]'
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-4 mt-2 xs:mt-20 sm:mt-6 md:mt-10 lg:mt-0 '>
                  <p className='text-xs lg:text-sm font-bold  lg:ml-2.5'>
                    {item.price}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className=' flex text-black-200   '
                >
                  <AiOutlineClose className='text-lg text-lg xs:text-xs sm:text-xs md:text-xs lg:text-sm xs:mt-1 sm:mt-1 md:mt-1 lg:mt-0 ' />
                </button>
              </div>
            ))}
          </div>

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

              <button className='mt-2 w-full h-10 text-sm bg-black text-white  font-semibold'>
                SİPARİŞİ TAMAMLA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
