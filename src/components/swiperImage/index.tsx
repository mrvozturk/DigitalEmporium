'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product, Variant } from '@/lib/types/product';

interface Color {
  value: string;
  photo: string;
  asin: string;
}

interface ImageSwiperProps {
  product: Product;
  colors: Color[];
  variantId?: number;
}

const ImageSwiper = ({ product, colors, variantId }: ImageSwiperProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Varyant veya ürün fotoğraflarını belirle
  useEffect(() => {
    let variantImages: string[] = [];

    if (variantId && product.variants) {
      const selectedVariant: Variant | undefined = product.variants.find(
        v => v.id === variantId
      );

      if (selectedVariant) {
        if (
          selectedVariant.variant_photos &&
          selectedVariant.variant_photos.length > 0
        ) {
          variantImages = selectedVariant.variant_photos;
        } else if (selectedVariant.photo) {
          variantImages = [selectedVariant.photo];
        }
      }
    }

    if (variantImages.length === 0) {
      // Fallback ürün fotoğrafları
      if (product.product_photos && product.product_photos.length > 0) {
        variantImages = product.product_photos;
      } else if (product.product_photo) {
        variantImages = [product.product_photo];
      }
    }

    setImages(variantImages);
    setActiveIndex(0);
    if (thumbnailsRef.current) thumbnailsRef.current.scrollLeft = 0;
  }, [product, variantId]);

  const handleThumbnailClick = (photo: string, index: number) => {
    setActiveIndex(index);
    router.push(`?imageUrl=${encodeURIComponent(photo)}`);
  };

  if (images.length === 0) return null;

  return (
    <div className='w-full flex flex-col justify-center items-center p-0 xs:bg-[#f6f4f4] xs:mt-2'>
      <div
        className='flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-0 w-full sm:flex-col gap-2 items-center hide-scrollbar'
        ref={thumbnailsRef}
      >
        {images.map((photo, index) => (
          <Image
            key={photo}
            src={photo}
            alt={`${product.product_title} - ${index + 1}`}
            width={340}
            height={352}
            className={`w-full flex-shrink-0 snap-center aspect-[4/5] object-contain object-center cursor-pointer align-center xs:p-3
              xs:w-full xs:aspect-square xs:object-contain 
              sm:w-[70px] sm:h-[50px] sm:border sm:border-[#b8b4b4] sm:rounded-md sm:shadow-lg 
              md:w-[55px] md:h-[45px]
              lg:w-[45px] lg:h-[55px]`}
            onClick={() => handleThumbnailClick(photo, index)}
          />
        ))}
      </div>

      <div className='flex justify-center items-center xs:bg-white xs:border xs:bg-[#f6f4f4] xs:py-4 xs:w-full sm:hidden xs:mb-3'>
        {images.map((_, index) => (
          <span
            key={`dot-${index}`}
            className={`xs:inline-block xs:h-2.5 xs:w-2.5 xs:rounded-full xs:mx-1 xs:border xs:border-[#8b8a8a] ${
              index === activeIndex
                ? 'xs:bg-[#1a6b7c] xs:border-none'
                : 'xs:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSwiper;
