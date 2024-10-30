'use client';
// components/ColorSelector.tsx
import Image from 'next/image';
import { useState } from 'react';
import styles from './index.module.css';

interface ColorSelectorProps {
  colors: { value: string; photo: string }[];
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors }) => {
  const [selectedColorName, setSelectedColorName] = useState(colors[0].value);

  const handleColorSelect = (colorPhoto: string, colorName: string) => {
    const mainImage = document.getElementById(
      'mainProductImage'
    ) as HTMLImageElement;
    if (mainImage) {
      mainImage.src = colorPhoto;
      mainImage.setAttribute('src', colorPhoto);
    }
    setSelectedColorName(colorName);
  };

  return (
    <div>
      <h2 className={styles.productColorTitle}>
        <span className={styles.colorLabel}>Color:</span>
        <span className={styles.pieceInfo}>{selectedColorName}</span>{' '}
      </h2>
      <div className={styles.colors}>
        {colors.map((color, index) => (
          <div
            key={index}
            className={styles.colorOption}
            onClick={() => handleColorSelect(color.photo, color.value)} // Renk seçimi
          >
            <Image
              src={color.photo}
              alt={color.value}
              width={50}
              height={50}
              className={styles.colorImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
