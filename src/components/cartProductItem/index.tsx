import React from 'react';
import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/lib/features/cart/cartSlice';

interface CartProductItemProps {
  product: {
    id: string;
    src: string;
    title: string;
    price: string;
    quantity: number;
  };
}

const CartProductItem: React.FC<CartProductItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className='flex border-b py-2 border-gray-300'>
      {/* Ürün Resmi */}
      <div className='flex items-start justify-between w-full xs:w-40 sm:w-[110px] md:w-[110px] lg:w-[138px]'>
        <Image
          src={product.src}
          alt={product.title}
          width={120}
          height={120}
          className='object-contain border border-gray-300 rounded-md shadow-md p-1 w-[120px] h-[120px] lg:h-[150px]'
        />
      </div>

      {/* Ürün Bilgileri */}
      <div className='w-full ml-2'>
        <div className='flex flex-col flex-1 ml-1 text-start'>
          <p className='text-xs xs:text-xxs sm:text-xxs md:text-xxs lg:text-sm'>
            {product.title}
          </p>
          <a
            href='#'
            className='text-xs xs:text-xxs sm:text-xxs md:text-xxs lg:text-xs underline'
          >
            Düzenle
          </a>
          <p className='text-xxs lg:text-xs xs:text-2xs sm:text-xxs md:text-xxs lg:text-xs font-bold mt-2'>
            {product.price}
          </p>
          <p className='text-xs xs:text-xxs sm:text-xxs md:text-xxs lg:text-xs mt-1'>
            <span className='font-bold'>Beden:</span>
          </p>
          <p className='text-xs xs:text-xxs sm:text-xxs md:text-xxs lg:text-xs'>
            <span className='font-bold'>Renk:</span>
          </p>
        </div>
      </div>

      {/* Adet Güncelleme ve Silme Butonları */}
      <div className='flex flex-col items-center gap-4 lg:gap-16 xs:gap-4 sm:gap-5 md:gap-5'>
        {/* Silme Butonu */}
        <button
          onClick={() => dispatch(removeFromCart(product.id))}
          className='text-black-500 hover:text-red-500 xs:ml-20 sm:ml-20 md:ml-20 lg:ml-15'
        >
          <AiOutlineDelete className='w-6 h-6 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5' />
        </button>

        {/* Adet Güncelleme */}
        <div className='flex items-center space-x-2 xs:space-x-1 mt-12 xs:mt-[50px] sm:mt-15 md:mt-15 lg:mt-5 lg:mb-2'>
          <button
            className='bg-gray-200 px-2 py-0.2 rounded disabled:opacity-50'
            onClick={() =>
              product.quantity > 1 &&
              dispatch(
                updateQuantity({
                  id: product.id,
                  quantity: product.quantity - 1
                })
              )
            }
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <span className='px-3 font-semibold'>{product.quantity}</span>
          <button
            className='bg-gray-200 px-2 py-0.2 rounded'
            onClick={() =>
              dispatch(
                updateQuantity({
                  id: product.id,
                  quantity: product.quantity + 1
                })
              )
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
