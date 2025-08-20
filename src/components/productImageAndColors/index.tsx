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
  const currentSelectedColor =
    colors.find(variant => variant.id === selectedVariantId) ?? colors[0];

  const renderColorDisplay = (variant: Variant) => {
    if (variant.variant_photos && variant.variant_photos.length > 0) {
      return (
        <Image
          src={variant.variant_photos[0]}
          alt={variant.color ?? 'Color option'}
          width={40}
          height={40}
          className='object-cover w-full h-full'
        />
      );
    }
  };

  return (
    <div className='flex flex-col items-start xs:hidden'>
      <h2 className='text-xs font-normal text-black mt-1 mb-2 xs:text-xs sm:text-xs lg:text-sm'>
        <span>Color: </span>
        <span className='font-medium'>
          {currentSelectedColor?.color ?? 'N/A'}
        </span>
      </h2>

      <div className='flex gap-2 xs:gap-1'>
        {colors.map(variant => (
          <Link
            key={variant.id}
            href={`/product/${productId}?variantId=${variant.id}`}
          >
            <div
              className={`w-10 h-10 xs:w-8 xs:h-8 border rounded-lg overflow-hidden cursor-pointer ${
                currentSelectedColor?.id === variant.id
                  ? 'border-2 border-black'
                  : 'border-gray-300'
              } hover:border-2 hover:border-black`}
            >
              {renderColorDisplay(variant)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductImageAndColors;
