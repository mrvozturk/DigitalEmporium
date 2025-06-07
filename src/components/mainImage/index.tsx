import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types/product';

interface MainImageProps {
  product?: Product;
  initialPhoto?: string;
  filters?: { imageUrl?: string; color?: string };
}

const MainImage: React.FC<MainImageProps> = ({
  product,
  initialPhoto,
  filters = {}
}) => {
  const getProductImage = (): string => {
    if (!product) return initialPhoto ?? '';

    // Check if a color filter is applied and find the corresponding variation
    if (filters.color && product.variations) {
      const selectedVariation = product.variations.find(
        (variation: any) => variation.colorAsin === filters.color
      );
      if (selectedVariation?.colorPhoto) {
        return selectedVariation.colorPhoto;
      }
    }

    // Fallback to existing logic if no color filter or no colorPhoto for the selected color
    if (filters.imageUrl) return filters.imageUrl;
    if (product.image) return product.image;

    return initialPhoto ?? '';
  };

  const selectedImage = getProductImage();

  const productName =
    product?.name ?? 'Main Product';

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