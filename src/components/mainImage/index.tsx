import React from 'react';
import Image from 'next/image';
import { Product, Variant } from '@/lib/types/product';

interface MainImageProps {
  product?: Product;
  initialPhoto?: string;
  filters?: { imageUrl?: string; variantId?: number };
}

const MainImage: React.FC<MainImageProps> = ({
  product,
  initialPhoto,
  filters = {}
}) => {
  const getProductImage = (): string => {
    if (!product) return initialPhoto ?? '';

    if (filters.variantId && product.variants) {
      const selectedVariant: Variant | undefined = product.variants.find(
        (variant: Variant) => variant.id === filters.variantId
      );

      if (selectedVariant) {
        if (
          selectedVariant.variant_photos &&
          selectedVariant.variant_photos.length > 0
        ) {
          return selectedVariant.variant_photos[0];
        }
      }
    }

    if (filters.imageUrl) return filters.imageUrl;

    if (product.product_photo) return product.product_photo;

    if (product.product_photos && product.product_photos.length > 0) {
      return product.product_photos[0];
    }

    return initialPhoto ?? '';
  };

  const selectedImage = getProductImage();
  const productName = product?.product_title ?? 'Main Product';

  return (
    <div
      className='xs:hidden sm:flex flex-1 basis-1/4 items-start justify-center 
                 sm:basis-[45%] md:basis-[35%] lg:basis-1/4 max-w-[25vw] ml-2'
    >
      {selectedImage ? (
        <Image
          src={selectedImage}
          alt={productName}
          width={600}
          height={700}
          className='w-full max-w-[25vw] max-h-[25vw] object-contain p-2 border border-gray-200 bg-gray-200 xs:block'
        />
      ) : (
        <div className='w-full h-[25vw] flex items-center justify-center border border-gray-200 bg-gray-100 text-gray-500 text-sm'>
          No Image
        </div>
      )}
    </div>
  );
};

export default MainImage;
