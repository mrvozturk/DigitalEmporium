'use client';
import React, { useState } from 'react';
import { SizeOption } from '@/lib/types/product';

interface SizeSelectorProps {
  sizeOptions: SizeOption[];
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizeOptions }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className='xs:block hidden'>
      <h2 className='text-sm mt-2  '>
        Size:{' '}
        {selectedSize ? (
          <span className='font-semibold'>{selectedSize}</span>
        ) : (
          ''
        )}
      </h2>
      <div className='flex flex-row overflow-x-scroll whitespace-nowrap mt-1 scrollbar-hide '>
        {sizeOptions.map(size => (
          <button
            key={size.value}
            className={`shrink-0 w-1/4 lg:w-1/4 mr-2 border rounded px-3 py-2 text-xs font-bold mt-2 ${
              selectedSize === size.value
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black'
            } ${!size.skuData.in_stock ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setSelectedSize(size.value)}
            disabled={!size.skuData.in_stock}
          >
            {size.value} {size.skuData.in_stock ? '' : '(Out of Stock)'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
