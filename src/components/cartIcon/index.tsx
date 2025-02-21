'use client';
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleCart } from '@/lib/features/cart/cartSlice';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SideCart from './../sideCart';

const CartIcon = () => {
  const products = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (products.length > 0) dispatch(toggleCart(true));
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      dispatch(toggleCart(false));
    }, 3000);
  };

  return (
    <div
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sepet İkonu */}
      <Link
        href='/cart'
        className='flex items-center hover:text-gray-600 relative'
      >
        <span className='hidden md:block mr-6'>Sepet [{products.length}]</span>
        <div className='relative block md:hidden'>
          <AiOutlineShoppingCart className='text-xl' />
          {products.length > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full'>
              {products.length}
            </span>
          )}
        </div>
      </Link>

      {/* SideCart  */}
      {isCartOpen && products.length > 0 && (
        <div className='absolute top-12 right-0 w-[350px] z-50'>
          <SideCart
            isOpen={isCartOpen}
            onClose={() => dispatch(toggleCart(false))}
          />
        </div>
      )}
    </div>
  );
};

export default CartIcon;
