'use client';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';

export function AddToCartButton({ id, src }: { id: string; src: string }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("Butona tıklandı, sepete ekleniyor:", { id, src }); 
    dispatch(addToCart({ id, src, quantity: 1 ,
      title: '',
      price: ''
    }));
  };

  return (
    <button
      className='bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800'
      onClick={handleClick}
    >
      Add to Cart
    </button>
  );
}
