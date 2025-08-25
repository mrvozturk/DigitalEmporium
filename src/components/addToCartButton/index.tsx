'use client';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart } from '@/lib/features/cart/cartSlice';
import { Product, Variant, Sku } from '@/lib/types/product';
import { AiOutlineShoppingCart } from 'react-icons/ai';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(addToCart({ product }));
    dispatch(toggleCart(true));
  };

  return (
    <button
      className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-200'
      onClick={handleClick}
    >
      <AiOutlineShoppingCart className='text-lg' />
    </button>
  );
}
