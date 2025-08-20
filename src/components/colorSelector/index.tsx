import Image from 'next/image';
import Link from 'next/link';
import { Variant } from '@/lib/types/product';

interface ColorSelectorProps {
  colors: Variant[];
  productId: string;
  currentSelectedColorAsin?: string;
  price: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  productId,
  currentSelectedColorAsin,
  price
}) => {
  const selectedColor =
    colors.find(color => color.colorAsin === currentSelectedColorAsin) ??
    colors[0];

  const getColorImage = (color: Variant) => {
    // Eğer variant_photos varsa ilk fotoğrafı al
    if (color.variant_photos && color.variant_photos.length > 0) {
      return color.variant_photos[0];
    }
    // fallback olarak colorPhoto veya photo
    return color.colorPhoto ?? color.photo ?? '';
  };

  return (
    <div className='hidden xs:block'>
      <h2 className='text-xs text-black font-normal mt-1 mb-1'>
        <span>Color: </span>
        <span className='font-bold'>{selectedColor?.value}</span>
      </h2>

      <div className='flex overflow-x-auto whitespace-nowrap scrollbar-hide'>
        {colors.map(color => (
          <Link
            key={color.variantId}
            href={`/product/${productId}?variantId=${color.variantId}&color=${color.colorAsin}`}
            shallow
          >
            <div
              className={`flex-shrink-0 w-16 h-16 flex justify-center items-center rounded-full overflow-hidden border m-1 
              ${
                selectedColor?.variantId === color.variantId
                  ? 'border-[2px] border-black'
                  : 'border-gray-300'
              }
              hover:border-[2px] hover:border-black`}
            >
              <Image
                src={getColorImage(color)}
                alt={color.value}
                width={50}
                height={50}
                className='w-full h-full rounded-full object-cover'
              />
            </div>
            <p className='text-xs text-gray-700 text-center mb-1'>{price}₺</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
