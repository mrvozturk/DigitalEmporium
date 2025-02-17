'use client';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';

import { AiOutlineShoppingCart } from 'react-icons/ai';

export function AddToCartButton({
  id,
  src,
  title,
  price
}: {
  id: string;
  src: string;
  title: string;
  price: string;
}) {
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Sepete ekleniyor:', { id, src, title, price });

    dispatch(addToCart({ id, src, quantity: 1, title, price }));
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
