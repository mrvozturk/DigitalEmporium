'use client';
import React, { useEffect, useState } from 'react';
import { Product, Variant, SizeOption } from '@/lib/types/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';

interface MobileAddToCart {
  product: Product;
  currentSelectedVariant: Variant;
}

const MobileAddToCart: React.FC<MobileAddToCart> = ({
  product,
  currentSelectedVariant
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = (e: any) => setSelectedSize(e.detail);
    window.addEventListener('sizeSelected', listener);
    return () => window.removeEventListener('sizeSelected', listener);
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Lütfen önce beden seçiniz.');
      return;
    }
    dispatch(
      addToCart({
        product: product,
        variant: currentSelectedVariant,
        sku: selectedSize.skuData,
        quantity
      })
    );
  };

  return (
    <div className='block md:hidden w-full p-1 mt-4 rounded-lg'>
      <p className='text-green-700 text-lg font-medium mb-2'>Stok Durumu</p>
      <div className='w-full mb-4'>
        <select
          id='quantity'
          className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-200 text-base'
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(qty => (
            <option key={qty} value={qty}>
              {qty}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddToCart}
        className='w-full py-3 bg-yellow-400 text-black font-medium rounded-lg hover:border-4 hover:border-black-500'
      >
        Sepete Ekle
      </button>
      <button
        onClick={handleAddToCart}
        className='w-full py-3 bg-orange-500 text-black font-medium rounded-lg mt-4 hover:border-4 hover:border-black-500'
      >
        Satın Al
      </button>
    </div>
  );
};

export default MobileAddToCart;
