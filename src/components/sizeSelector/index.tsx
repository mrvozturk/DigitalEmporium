'use client';
import React, { useState } from 'react';
import styles from './index.module.css';

interface Size {
  value: string;
}

interface SizeSelectorProps {
  sizes: Size[];
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div>
      <h2 className={styles.sizeHeading}>
        Size: {selectedSize ? <strong>{selectedSize}</strong> : ''}
      </h2>
      <div className={styles.sizeScrollContainer}>
        {sizes.map((size) => (
          <button
            key={size.value} 
            className={`${styles.sizeButton} ${
              selectedSize === size.value ? styles.selectedSize : ''
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
