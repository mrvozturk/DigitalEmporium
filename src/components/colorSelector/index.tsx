import Image from 'next/image';
import Link from 'next/link';
import { Variant } from '@/lib/types/product';

interface ColorSelectorProps {
  colors: Variant[];
  productId: string | number;
  selectedVariantId?: number;
  price: number;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  productId,
  selectedVariantId,
  price
}) => {
  const currentColor =
    colors.find(v => v.id === selectedVariantId) ?? colors[0];

  return (
    <div className='hidden xs:block'>
      <h2 className='text-xs text-black mt-1 mb-1'>
        Color: <span className='font-bold'>{currentColor?.color ?? 'N/A'}</span>
      </h2>

      <div className='flex overflow-x-auto gap-2 scrollbar-hide'>
        {colors.map(variant => {
          const isActive = currentColor?.id === variant.id;
          const image = variant.variant_photos?.[0];

          return (
            <Link
              key={variant.id}
              href={`/product/${productId}?variantId=${variant.id}`}
              shallow
            >
              <div className='flex flex-col items-center'>
                <div
                  className={`w-16 h-16 rounded-full border flex items-center justify-center overflow-hidden 
                    ${isActive ? 'border-2 border-black' : 'border-gray-300'} 
                    hover:border-2 hover:border-black`}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt={variant.color ?? 'Color'}
                      width={50}
                      height={50}
                      className='w-full h-full object-cover rounded-full'
                    />
                  ) : (
                    <div className='w-full h-full bg-gray-200 flex items-center justify-center text-xs rounded-full'>
                      {variant.color?.[0] ?? '?'}
                    </div>
                  )}
                </div>
                <p className='text-xs text-gray-700 mt-1'>{price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
