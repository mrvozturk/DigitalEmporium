import React from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import { FiltersType } from '@/app/product/[productId]/page';

const MainImage: React.FC<{
  initialPhoto: string;
  filters: FiltersType;
}> = ({ initialPhoto, filters }) => {
  const selectedImage = filters.imageUrl || initialPhoto;

  return (
    <div className={styles.imageContainer}>
      <Image
        src={selectedImage}
        alt={selectedImage}
        width={600}
        height={700}
        className={styles.productImage}
      />
    </div>
  );
};

export default MainImage;
