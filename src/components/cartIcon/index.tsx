'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

const CartIcon = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Link href='/cart' className='relative'>
      {/* Sepet İkonu */}
      <AiOutlineShopping className='text-3xl text-black' />

      {/* Ürün Sayısı Badgesi */}
      {cartItems.length > 0 && (
        <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w- h-5 flex items-center justify-center rounded-full'>
          {cartItems.length}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
