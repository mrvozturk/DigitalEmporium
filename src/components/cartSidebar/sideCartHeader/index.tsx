import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface CartHeaderProps {
  onClose: () => void;
  count: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ onClose, count }) => {
  return (
    <div className='flex items-center justify-between p-5 border-b'>
      <h2 className='text-lg font-bold'>Sepet ({count})</h2>
      <button onClick={onClose} className='hover:text-black'>
        <AiOutlineClose size={24} />
      </button>
    </div>
  );
};

export default CartHeader;
