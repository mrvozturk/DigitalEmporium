'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart } from '@/lib/features/cart/cartSlice';
import { Product, Variant, Sku } from '@/lib/types/product';

interface ProductActionsProps {
  product: Product;
  currentSelectedVariant: Variant;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  currentSelectedVariant
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const skuSelect = document.getElementById(
      'size-select'
    ) as HTMLSelectElement | null;
    const selectedSkuId = skuSelect ? Number(skuSelect.value) : undefined;
    const sku: Sku | undefined = currentSelectedVariant?.skus?.find(
      s => s.id === selectedSkuId
    );

    if (!sku) {
      alert('Lütfen beden seçiniz.');
      return;
    }

    // Miktar seçimi
    const qtySelect = document.getElementById(
      'quantity-select'
    ) as HTMLSelectElement | null;
    const quantity = qtySelect ? Number(qtySelect.value) : 1;

    if (quantity <= 0) {
      alert('Lütfen ürün adedi seçiniz.');
      return;
    }

    dispatch(
      addToCart({
        product,
        variant: currentSelectedVariant,
        sku,
        quantity
      })
    );

    dispatch(toggleCart(true));
  };

  return (
    <div className='flex flex-col bg-white sm:p-4 md:p-4 p-6 rounded-lg border border-gray-300 w-full max-w-[250px] sm:max-w-[26vw] md:max-w-[24vw] lg:max-w-[250px] hidden sm:flex'>
      <p className='text-green-600 text-base mb-2 mt-0'>Stok Durumu</p>

      <div className='w-full mb-5'>
        <select
          id='quantity-select'
          className='w-full p-2.5 border border-gray-300 rounded-md bg-gray-50 text-sm'
          defaultValue={1}
        >
          {[1, 2, 3, 4, 5].map(qty => (
            <option key={`qty-${qty}`} value={qty}>
              {qty}
            </option>
          ))}
        </select>
      </div>

      <button
        className='block w-full py-2 text-sm text-black bg-yellow-400 rounded-full cursor-pointer mb-4'
        onClick={handleAddToCart}
      >
        Sepete Ekle
      </button>

      <button className='block w-full py-2 text-sm text-black bg-orange-500 rounded-full cursor-pointer'>
        Satın Al
      </button>
    </div>
  );
};

export default ProductActions;
