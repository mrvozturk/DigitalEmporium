'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { AiOutlineShopping } from 'react-icons/ai';
import CartProductItem from '../cartProductItem';
import CartSummary from '../cartSummary';

const CartItems = () => {
  const products = useSelector((state: RootState) => state.cart.items);

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
          {/* Sepet Ürünleri */}
          <div className='flex-1 mt-2'>
            <div className='flex items-center justify-start border-b pb-2 mb-1'>
              <h1 className='text-lg font-bold'>SEPETİM ({products.length})</h1>
              <span className='ml-4 text-gray-400 font-semibold'>
                FAVORİLERİM
              </span>
            </div>

            {products.map(cartItem => (
              <CartProductItem
                key={`${cartItem.product.id}-${
                  cartItem.variant?.id || 'no-variant'
                }-${cartItem.sku?.id || 'no-sku'}`}
                product={cartItem}
              />
            ))}
          </div>

          {/* Sipariş Özeti */}
          <CartSummary />
        </div>
      )}
    </div>
  );
};

export default CartItems;
