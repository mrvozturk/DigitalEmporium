'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const CartIcon = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className='relative'>
      {' '}
      {/* <li> yerine <div> kullanıldı */}
      <Link
        href='/cart'
        className='flex items-center hover:text-gray-600 relative'
      >
        <span className='hidden md:block mr-6'>Sepet [{cartItems.length}]</span>

        <div className='relative block md:hidden'>
          <AiOutlineShoppingCart className='text-xl' />
          {cartItems.length > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full'>
              {cartItems.length}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;
