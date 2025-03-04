'use client';
import React, { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleCart } from '@/lib/features/cart/cartSlice';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SideCart from './../sideCart';

const CartIcon = () => {
  const productCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseEnter = useCallback(() => {
    if (productCount > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      dispatch(toggleCart(true));
    }
  }, [dispatch, productCount]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      dispatch(toggleCart(false));
    }, 1000);
  }, [dispatch]);

  return (
    <div className='relative'>
      {/* Sepet Linki */}
      <Link
        href='/cart'
        className='relative flex items-center hover:text-gray-600'
      >
        <button
          type='button'
          className='flex items-center focus:outline-none'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
        >
          <span className='hidden md:block mr-6'>Sepet [{productCount}]</span>
          <div className='relative md:hidden'>
            <AiOutlineShoppingCart className='text-xl' />
            {productCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full'>
                {productCount}
              </span>
            )}
          </div>
        </button>
      </Link>

      {/* SideCart */}
      {isCartOpen && productCount > 0 && (
        <div className='hidden md:block absolute top-12 right-0 w-[350px] z-50'>
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
