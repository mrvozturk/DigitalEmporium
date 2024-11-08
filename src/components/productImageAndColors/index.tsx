'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

interface Color {
  value: string;
  photo: string;
}

interface ProductImageAndColorsProps {
  colors: Color[];
}

const ProductImageAndColors: React.FC<ProductImageAndColorsProps> = ({
  colors
}) => {
  const [selectedColorName, setSelectedColorName] = useState(colors[0].value);

  const handleColorSelect = (colorPhoto: string, colorName: string) => {
    setSelectedColorName(colorName);
  };

  return (
    <div className={styles.colors}>
      <h2 className={styles.productColorTitle}>
        <span>Color:</span>
        <span>{selectedColorName}</span>
      </h2>

      <div className={styles.colorOptions}>
        {colors.map(color => (
          <Link
            key={color.value}
            href={`?colorName=${color.value}`}
            shallow
            onClick={() => handleColorSelect(color.photo, color.value)}
          >
            <div
              className={`${styles.colorOption} ${
                selectedColorName === color.value ? styles.selectedColor : ''
              }`}
            >
              <Image
                src={color.photo}
                alt={color.value}
                width={50}
                height={50}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductImageAndColors;
