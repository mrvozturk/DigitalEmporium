import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types/product';

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
  const selectedImage =
    // Variant fotoğrafı
    (filters.variantId &&
      product?.variants?.find(v => v.id === filters.variantId)
        ?.variant_photos?.[0]) ??
    // Filtrede imageUrl varsa
    filters.imageUrl ??
    // Ürünün ana fotoğrafı
    product?.product_photo ??
    // Ürünün fotoğraflarından ilki
    product?.product_photos?.[0] ??
    // Başlangıç fotoğrafı
    initialPhoto ??
    '';

  return (
    <div
      className='xs:hidden sm:flex flex-1 basis-1/4 items-start justify-center 
                 sm:basis-[45%] md:basis-[35%] lg:basis-1/4 max-w-[25vw] ml-2'
    >
      {selectedImage ? (
        <Image
          src={selectedImage}
          alt={product?.product_title ?? 'Main Product'}
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
