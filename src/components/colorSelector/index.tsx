import Image from 'next/image';
import Link from 'next/link';
import { Variant } from '@/lib/types/product';

interface ColorSelectorProps {
  colors: Variant[];
  productId: string | number;
  currentSelectedVariantId?: number;
  price: number;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  productId,
  currentSelectedVariantId,
  price
}) => {
  const selectedColor =
    colors.find(variant => variant.id === currentSelectedVariantId) ??
    colors[0];

  const getColorImage = (variant: Variant) => {
    if (variant.variant_photos && variant.variant_photos.length > 0) {
      return variant.variant_photos[0];
    }
  };

  return (
    <div className='hidden xs:block'>
      <h2 className='text-xs text-black font-normal mt-1 mb-1'>
        <span>Color: </span>
        <span className='font-bold'>{selectedColor?.color ?? 'N/A'}</span>
      </h2>

      <div className='flex overflow-x-auto whitespace-nowrap scrollbar-hide'>
        {colors.map(variant => (
          <Link
            key={variant.id}
            href={`/product/${productId}?variantId=${variant.id}`}
            shallow
          >
            <div
              className={`flex-shrink-0 w-16 h-16 flex justify-center items-center rounded-full overflow-hidden border m-1 
                ${
                  selectedColor?.id === variant.id
                    ? 'border-[2px] border-black'
                    : 'border-gray-300'
                }
                hover:border-[2px] hover:border-black`}
            >
              {getColorImage(variant) !== undefined ? (
                <Image
                  src={getColorImage(variant) as string}
                  alt={variant.color ?? 'Color'}
                  width={50}
                  height={50}
                  className='w-full h-full rounded-full object-cover'
                />
              ) : (
                <div className='w-full h-full bg-gray-200 flex items-center justify-center text-xs'>
                  {variant.color?.charAt(0) ?? '?'}
                </div>
              )}
            </div>
            <p className='text-xs text-gray-700 text-center mb-1'>{price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
