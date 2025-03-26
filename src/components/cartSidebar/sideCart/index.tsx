'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeFromCart } from '@/lib/features/cart/cartSlice';
import { calculateTotal } from '@/lib/utils/calculateTotal';
import SideCartHeader from '../sideCartHeader';
import CartProductItem from '../cartProductItem:';
import OrderSummary from '../orderSummary:';
import CouponInput from '../../couponInput';

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideCart: React.FC<SideCartProps> = ({ isOpen, onClose }) => {
  const products = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const total = calculateTotal(products);

  return (
    <div
      className={`fixed right-5 w-96 h-[650px] bg-white shadow-2xl rounded-lg transform mt-1 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      } transition-all duration-300 z-50 flex flex-col`}
    >
      {/* Cart Header */}
      <SideCartHeader onClose={onClose} count={products.length} />

      {products.length === 0 ? (
        <div className='flex items-center justify-center flex-1 text-gray-500'>
          Sepetiniz boş
        </div>
      ) : (
        <>
          {/* Ücretsiz Kargo Bilgisi */}
          <div className='px-6 py-3 border-b text-center'>
            <p className='text-sm font-semibold text-red-600'>
              ÜCRETSİZ STANDART GÖNDERİ!
            </p>
            <p className='text-xs text-black'>
              Adrese ücretsiz standart gönderi fırsatı elde ettin
            </p>
          </div>

          {/* Cart Items */}
          <div className='p-5 overflow-y-auto flex-1 max-h-[350px]'>
            {products.map(product => (
              <CartProductItem
                key={product.id}
                product={product}
                onRemove={(id: string) => dispatch(removeFromCart(id))}
              />
            ))}
            <CouponInput />
          </div>

          {/* Cart Order Summary */}
          <OrderSummary total={total} count={products.length} />
        </>
      )}
    </div>
  );
};

export default SideCart;
