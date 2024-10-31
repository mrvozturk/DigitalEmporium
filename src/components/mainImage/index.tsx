// MainImage.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from './index.module.css';

interface Color {
  value: string;
  photo: string;
}

interface MainImageProps {
  colors: Color[];
}

const MainImage: React.FC<MainImageProps> = ({ colors }) => {
  const searchParams = useSearchParams();
  const colorName = searchParams.get('colorName');
  const imageUrl = searchParams.get('imageUrl');

  const selectedColor =
    colors.find(color => color.value === colorName) || colors[0];

  return (
    <div className={styles.imageContainer}>
      <Image
        src={imageUrl || selectedColor.photo} 
        alt={selectedColor.value}
        width={600}
        height={700}
        className={styles.productImage}
      />
    </div>
  );
};

export default MainImage;
