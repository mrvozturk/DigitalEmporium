import React from 'react';
import Image from 'next/image';
import { AiOutlineHeart, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

interface CartItemProps {
  product: {
    id: string;
    src: string;
    title: string;
    price: string;
    quantity: number;
  };
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, onRemove }) => {
  return (
    <div key={product.id} className='flex mb-3 pb-3 border-b'>
      <Image
        src={product.src}
        alt={product.title}
        width={80}
        height={120}
        className='object-contain border border-gray-300 rounded-md shadow-md p-1 w-[80px] h-[120px]'
      />
      <div className='flex-1 flex flex-col justify-between px-3'>
        <div>
          <h3 className='text-sm mb-1'>{product.title}</h3>
          <p className='text-xs font-bold mb-2'>{product.price}</p>
          <p className='text-xs text-gray-500'>
            {product.quantity} adet | M | Orta gri
          </p>
        </div>
        <div className='flex justify-end space-x-3 mt-4'>
          <button className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-200'>
            <AiOutlineHeart size={18} />
          </button>
          <button className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-200'>
            <AiOutlineEdit size={18} />
          </button>
          <button
            onClick={() => onRemove(product.id)}
            className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-200'
          >
            <AiOutlineDelete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
