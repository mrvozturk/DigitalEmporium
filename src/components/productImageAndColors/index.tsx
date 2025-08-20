import Image from 'next/image';
import Link from 'next/link';
import { Variant } from '@/lib/types/product';

interface ProductImageAndColorsProps {
  colors: Variant[];
  productId: string;
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
    // Öncelik: colorPhoto > colorValue > fallback
    if (variant.colorPhoto) {
      return (
        <Image
          src={variant.colorPhoto}
          alt={variant.value}
          width={40}
          height={40}
          className='object-cover w-full h-full'
        />
      );
    }

    if (variant.colorValue) {
      return (
        <div
          className='w-full h-full'
          style={{ backgroundColor: variant.colorValue }}
        />
      );
    }

    // Fallback: sadece photo varsa göster
    if (variant.photo) {
      return (
        <Image
          src={variant.photo}
          alt={variant.value}
          width={40}
          height={40}
          className='object-cover w-full h-full'
        />
      );
    }

    // Fallback: ilk harf göster
    return (
      <div className='w-full h-full bg-gray-200 flex items-center justify-center text-xs'>
        {variant.value.charAt(0)}
      </div>
    );
  };

  return (
    <div className='flex flex-col items-start xs:hidden'>
      <h2 className='text-xs font-normal text-black mt-1 mb-2 xs:text-xs sm:text-xs lg:text-sm'>
        <span>Color: </span>
        <span className='font-medium'>{currentSelectedColor?.value}</span>
      </h2>

      <div className='flex gap-2 xs:gap-1'>
        {colors.map((variant, index) => {
          const variantIdString = variant.id.toString();

          return (
            <Link
              key={`color-${variant.value}-${variantIdString}-${index}`}
              href={`/product/${productId}?variantId=${variantIdString}`}
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
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageAndColors;
