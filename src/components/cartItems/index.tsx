'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import { AiOutlineShopping, AiOutlineDelete } from 'react-icons/ai';
import { removeFromCart, updateQuantity } from '@/lib/features/cart/cartSlice';
import CouponInput from '../couponInput';
import { calculateTotal } from './../../lib/utils/calculateTotal';

const CartItems = () => {
  const products = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // CalculateTotal
  const total = calculateTotal(products);

  return (
    <div className='w-full max-w-6xl mx-auto p-4 bg-white xs:p-2 sm:p-0 md:p-0 lg:p-4'>
      {products.length === 0 ? (
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
        <div className='flex flex-col lg:flex-row gap-20 p-2 sm:p-4 md:p-6 lg:p-2 xs:gap-10 sm:gap-10 md:gap-10 lg:gap-20'>
          {/*  Sepet Ürünleri */}
          <div className='flex-1 mt-2'>
            <div className='flex items-center justify-start border-b pb-2 mb-1'>
              <h1 className='text-lg font-bold'>SEPETİM ({products.length})</h1>

              <span className='ml-4 text-gray-400 font-semibold'>
                FAVORİLERİM
              </span>
            </div>

            {products.map(product => (
              <div
                key={product.id}
                className='flex border-b py-2 border-gray-300 '
              >
                <div className='flex items-start justify-between  w-full xs:w-40 sm:w-[110px] md:w-[110px] lg:w-[138px]  '>
                  <Image
                    src={product.src}
                    alt={product.title}
                    width={120}
                    height={120}
                    className='object-contain border border-gray-300 rounded-md shadow-md p-1 w-[120px] h-[120px] lg:h-[150px] '
                  />
                </div>

                {/* Ürün Bilgileri */}
                <div className='l w-full ml-2 '>
                  <div className='flex flex-col flex-1 ml-1 text-start'>
                    <p className='text-xs xs:text-xxs sm:text-xxs md:text-xxs lg:text-sm  '>
                      {product.title}
                    </p>
                    <a
                      href='#'
                      className='text-xs xs:text-xxs sm:text-xxs md:text-xxs lg:text-xs underline'
                    >
                      {' '}
                      Düzenle
                    </a>

                    <p className='text-xxs lg:text-xs xs:text-2xs sm:text-xxs md:text-xxs lg:text-xs font-bold mt-2 '>
                      {product.price}
                    </p>
                    <p className='text-xs xs:text-xxs sm:text-xxs md:text-xxs lg:text-xs md:text-xxs mt-1'>
                      <span className='font-bold'> Beden: </span>
                    </p>
                    <p className='text-xs xs:text-xxs sm:text-xxs md:text-xxs lg:text-xs'>
                      <span className='font-bold'> Renk:</span>
                    </p>
                  </div>
                </div>

                {/* Adet Güncelleme ve Silme Butonları */}
                <div className='flex flex-col items-center gap-4 lg:gap-16 xs:gap-4 sm:gap-5 md:gap-5'>
                  <button
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className=' text-black-500 hover:text-red-500  xs:ml-20 sm:ml-20 md:ml-20 lg:ml-15'
                  >
                    <AiOutlineDelete
                      size={14}
                      className='w-6 h-6  xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5'
                    />
                  </button>

                  <div className='flex items-center space-x-2 xs:space-x-1 mt-12 xs:mt-[50px] sm:mt-15 md:mt-15 lg:mt-5 lg:mb-2'>
                    <button
                      className='bg-gray-200 px-2 py-0.2  rounded disabled:opacity-50 '
                      onClick={() =>
                        product.quantity > 1 &&
                        dispatch(
                          updateQuantity({
                            id: product.id,
                            quantity: product.quantity - 1
                          })
                        )
                      }
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className='px-3 font-semibold'>
                      {product.quantity}
                    </span>
                    <button
                      className='bg-gray-200 px-2 py-0.2 rounded'
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: product.id,
                            quantity: product.quantity + 1
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='w-full lg:w-1/3 '>
            <h3 className=' py-2 flex text-lg font-semibold  border-b border-gray-300 '>
              Sipariş Özeti
            </h3>
            <div className='mt-3 text-xs'>
              <div className='flex justify-between'>
                <span>Ürünlerin Toplamı ({products.length} ürün)</span>
                <span>
                  {total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}{' '}
                  TL
                </span>
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
              {/* Kupon  */}
              <CouponInput />

              <div className='flex justify-between text-lg font-semibold border-t border-gray-300 py-2 border-b mb-2'>
                <span>Toplam</span>
                <span>
                  {total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}{' '}
                  TL
                </span>
              </div>

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
