import Image from 'next/image';
import Link from 'next/link';

interface Color {
  value: string;
  isAvailable: boolean;
  colorValue?: string;
  colorPhoto?: string;
  colorAsin?: string;
  variantId?: number;
}

interface ProductImageAndColorsProps {
  colors: Color[];
  productId: string;
  selectedVariantId?: number;
}

const ProductImageAndColors: React.FC<ProductImageAndColorsProps> = ({
  colors,
  productId,
  selectedVariantId
}) => {
  const currentSelectedColor =
    colors.find(color => color.variantId === selectedVariantId) ?? colors[0];

  const renderColorDisplay = (color: Color) => {
    if (color.colorPhoto) {
      return (
        <Image
          src={color.colorPhoto}
          alt={color.value}
          width={40}
          height={40}
          className='object-cover w-full h-full'
        />
      );
    }

    if (color.colorValue) {
      return (
        <div
          className='w-full h-full'
          style={{ backgroundColor: color.colorValue }}
        />
      );
    }

    return (
      <div className='w-full h-full bg-gray-200 flex items-center justify-center text-xs'>
        {color.value.charAt(0)}
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
        {colors.map((color, index) => {
          const variantIdString = color.variantId?.toString();

          return (
            <Link
              key={variantIdString ?? `color-${color.value}-${index}`}
              href={`/product/${productId}?variantId=${variantIdString}`}
            >
              <div
                className={`w-10 h-10 xs:w-8 xs:h-8 border rounded-lg overflow-hidden cursor-pointer ${
                  currentSelectedColor?.variantId === color.variantId
                    ? 'border-2 border-black'
                    : 'border-gray-300'
                } hover:border-2 hover:border-black`}
              >
                {renderColorDisplay(color)}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageAndColors;
