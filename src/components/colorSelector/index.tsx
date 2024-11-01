'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

interface Color {
  value: string;
  photo: string;
  price: string; // Added price property to Color interface
}

interface ColorSelectorProps {
  colors: Color[];
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors }) => {
  const [selectedColorName, setSelectedColorName] = useState(colors[0].value);
  const [selectedColorPhoto, setSelectedColorPhoto] = useState(colors[0].photo);


  const handleColorSelect = (colorPhoto: string, colorName: string) => {
    setSelectedColorPhoto(colorPhoto);
    setSelectedColorName(colorName);
  };

  return (
    <div className={styles.colors}>
      <h2 className={styles.productColorTitle}>
        <span>Color: </span>
        <span className={styles.selectedColorName}>{selectedColorName}</span>
      </h2>

      <div className={styles.colorOptions}>
        {colors.map((color, index) => (
          <Link
            key={index}
            href={`?colorName=${color.value}`}
            shallow
            onClick={() => handleColorSelect(color.photo, color.value)}
          >
            <div className={styles.colorOption}>
              <Image
                src={color.photo}
                alt={color.value}
                width={50}
                height={50}
                className={styles.colorImage}
              />
            </div>
            <p className={styles.productPrice}>$29{color.price}</p> {/* Added price below each image */}

          </Link>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
