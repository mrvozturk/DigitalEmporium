'use client';
// components/MainImage.tsx
import Image from 'next/image';
import styles from './index.module.css';

interface MainImageProps {
  initialColor: { value: string; photo: string };
}

const MainImage: React.FC<MainImageProps> = ({ initialColor }) => {
  return (
    <div className={styles.imageContainer}>
      <Image
        id="mainProductImage" // Ana resmin id'si
        src={initialColor.photo}
        alt={initialColor.value}
        width={600}
        height={700}
        className={styles.productImage}
      />
    </div>
  );
};

export default MainImage;
