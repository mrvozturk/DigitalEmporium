import Image from 'next/image';
import Link from 'next/link';
import { Variant } from '@/lib/types/product';

interface ProductImageAndColorsProps {
  colors: Variant[];
  productId: number;
  selectedVariantId?: number;
}

const ProductImageAndColors: React.FC<ProductImageAndColorsProps> = ({
  colors,
  productId,
  selectedVariantId
}) => {
  const currentColor =
    colors.find(v => v.id === selectedVariantId) ?? colors[0];

  return (
    <div className='flex flex-col items-start xs:hidden'>
      <h2 className='text-xs sm:text-xs lg:text-sm mt-1 mb-2 text-black'>
      Renk:{' '}
        <span className='font-medium'>{currentColor?.color ?? 'N/A'}</span>
      </h2>

      <div className='flex gap-2 xs:gap-1'>
        {colors.map(variant => {
          const isActive = currentColor?.id === variant.id;

          return (
            <Link
              key={variant.id}
              href={`/product/${productId}?variantId=${variant.id}`}
            >
              <div
                className={`w-10 h-10 xs:w-8 xs:h-8 rounded-lg overflow-hidden cursor-pointer border 
                  ${isActive ? 'border-2 border-black' : 'border-gray-300'} 
                  hover:border-2 hover:border-black`}
              >
                {variant.variant_photos?.[0] ? (
                  <Image
                    src={variant.variant_photos[0]}
                    alt={variant.color ?? 'Color option'}
                    width={40}
                    height={40}
                    className='object-cover w-full h-full'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-200 flex items-center justify-center text-xs'>
                    {variant.color?.[0] ?? '?'}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageAndColors;
