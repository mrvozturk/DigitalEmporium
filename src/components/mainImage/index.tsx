import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types/product';

interface MainImageProps {
  product?: Product | any; // Support both Product type and other product structures
  initialPhoto?: string;
  filters?: { imageUrl?: string };
}

const MainImage: React.FC<MainImageProps> = ({ product, initialPhoto, filters = {} }) => {
  // Get image from different possible structures
  const getProductImage = (): string => {
    if (!product) return initialPhoto || '';

    // First check if filters.imageUrl is provided
    if (filters.imageUrl) return filters.imageUrl;
    
    // Check different product image properties used in the app
    if (product.image) return product.image;
    if (product.photo) return product.photo;
    if (product.product_photo) return product.product_photo;
    if (product.productPhoto) return product.productPhoto;
    
    // Fallback to initialPhoto or empty string
    return initialPhoto || '';
  };

  const selectedImage = getProductImage();
  
  // Get product name for alt text
  const productName = product?.name || product?.title || product?.product_title || 'Main Product';

  return (
    <div
      className=' xs:hidden
         sm:flex flex-1 basis-1/4 items-start justify-center 
        sm:basis-[45%] md:basis-[35%] lg:basis-1/4
        max-w-[25vw] ml-2
      '
    >
      <Image
        src={selectedImage}
        alt={productName}
        width={600}
        height={700}
        className='
          w-full max-w-[25vw] max-h-[25vw] object-contain p-2 border border-gray-200 bg-gray-200
          xs:block 
        '
      />
    </div>
  );
};

export default MainImage;
