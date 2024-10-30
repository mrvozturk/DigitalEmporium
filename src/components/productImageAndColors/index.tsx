'use client'; // Use client-side rendering
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
  colors,
}) => {
  // Set the initial state using the first color in the colors array
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
        <span>{selectedColorName}</span>
      </h2>

      <div className={styles.colorOptions}>
        {colors.map((color, index) => (
          <Link
            key={index}
            href={`?colorName=${color.value}`}
            shallow 
            onClick={() => handleColorSelect(color.photo, color.value)} // Call onClick to handle color selection
          >
            <div className={styles.colorOption}>
              <Image src={color.photo} alt={color.value} width={50} height={50} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductImageAndColors;