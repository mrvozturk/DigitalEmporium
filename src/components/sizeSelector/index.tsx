'use client';
import React, { useState } from 'react';
import { SizeOption } from '@/lib/types/product';

interface SizeSelectorProps {
  sizeOptions: SizeOption[];
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizeOptions }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSelect = (size: SizeOption) => {
    if (!size.skuData.in_stock) return;
    setSelectedSize(size.value);

    window.dispatchEvent(new CustomEvent('sizeSelected', { detail: size }));
  };

  return (
    <div className='xs:block hidden'>
      <h2 className='text-sm mt-2'>
        Size:{' '}
        {selectedSize ? (
          <span className='font-semibold'>{selectedSize}</span>
        ) : (
          <span className='text-gray-500'>Select a size</span>
        )}
      </h2>

      <div className='flex flex-row overflow-x-scroll whitespace-nowrap mt-1 scrollbar-hide'>
        {sizeOptions.map(size => {
          const isSelected = selectedSize === size.value;
          const inStock = size.skuData?.in_stock;

          return (
            <button
              key={size.value}
              className={`shrink-0 w-1/4 mr-2 border rounded px-3 py-2 text-xs font-bold mt-2 transition
                ${
                  isSelected
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black'
                }
                ${
                  !inStock
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-black-100'
                }
              `}
              onClick={() => handleSelect(size)}
              disabled={!inStock}
            >
              {size.value} {!inStock && '(Out of Stock)'}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
