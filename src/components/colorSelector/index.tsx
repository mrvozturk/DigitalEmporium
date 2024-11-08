'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

interface Color {
  value: string;
  photo: string;
  price: string;
}

interface ColorSelectorProps {
  colors: Color[];
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors }) => {
  const [selectedColorName, setSelectedColorName] = useState(colors[0].value);

  const handleColorSelect = (colorName: string) => {
    setSelectedColorName(colorName);
  };

  return (
    <div className={styles.colors}>
      <h2 className={styles.productColorTitle}>
        <span>Color: </span>
        <span className={styles.selectedColorName}>{selectedColorName}</span>
      </h2>

      <div className={styles.colorOptions}>
        {colors.map((color) => (
          <Link
            key={color.value}
            href={`?colorName=${color.value}`}
            shallow
            onClick={() => handleColorSelect(color.value)}
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
                className={styles.colorImage}
              />
            </div>
            <p className={styles.productPrice}>$29{color.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
