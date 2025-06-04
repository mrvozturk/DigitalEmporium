'use client';
import React, { useState } from 'react';
import { SizeOption } from "@/lib/types/product";

interface Size {
  value: string;
}

interface SizeSelectorProps {
  sizeOptions: SizeOption[];
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizeOptions }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div  className='xs:block hidden'>
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
            }`}
            onClick={() => setSelectedSize(size.value)}
          >
            {size.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
