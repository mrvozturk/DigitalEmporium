
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';
import { VariantColor } from '@/lib/data';

interface ColorSelectorProps {
  colors: VariantColor[];
  productId: string;
  price: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  productId,
  price
}) => {
  const selectedColor = colors.find(color => color.asin === productId);

  return (
    <div className={styles.colors}>
      <h2 className={styles.productColorTitle}>
        <span>Color: </span>
        <span className={styles.selectedColorName}>{selectedColor?.value}</span>
      </h2>

      <div className={styles.colorOptions}>
        {colors.map(color => (
          <Link key={color.value} href={`${color.asin}`} shallow>
            <div
              className={`${styles.colorOption} ${
                selectedColor?.value === color.value ? styles.selectedColor : ''
              }`}
            >
              <Image
                src={color.photo}
                alt={color.value}
                width={50}
                height={50}
                className={styles.colorImage}
              />
            </div>
            <p className={styles.productPrice}>{price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
