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
    <button onClick={handleClick} className='bg-blue-500 text-white px-4 py-2 rounded'>
      Sepete Ekle
    </button>
  );
}
