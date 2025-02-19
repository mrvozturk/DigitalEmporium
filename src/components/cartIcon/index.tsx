'use client';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SideCart from './../sideCart';

const CartIcon = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
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

      {/* SideCart */}
      {isOpen && (
        <div className='absolute top-12 right-0 w-[350px] z-50'>
          <SideCart isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default CartIcon;
