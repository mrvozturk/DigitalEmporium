import Image from 'next/image';
import Link from 'next/link';

interface Color {
  value: string;
  isAvailable: boolean;
  colorValue?: string;
  colorPhoto?: string;
  colorAsin?: string;
}

interface ProductImageAndColorsProps {
  colors: Color[];
  productId: string;
}

const ProductImageAndColors: React.FC<ProductImageAndColorsProps> = ({
  colors,
  productId
}) => {
  const selectedColor = colors.find(color => color.colorAsin === productId) ?? colors[0];

  return (
    <div className='flex flex-col items-start xs:hidden'>
      <h2 className='text-xs font-normal text-black mt-1 mb-2 xs:text-xs sm:text-xs lg:text-sm'>
        <span>Color: </span>
        <span className='font-medium'>{selectedColor?.value}</span>
      </h2>

      <div className='flex gap-2 xs:gap-1'>
        {colors.map((color, index) => {
          const hasImage = !!color.colorPhoto;
          
          return (
            <Link 
              key={color.colorAsin} 
              href={`${color.colorAsin}`}
              shallow
            >
              <div
                className={`w-10 h-10 xs:w-8 xs:h-8 border rounded-lg overflow-hidden cursor-pointer ${
                  selectedColor?.value === color.value
                    ? 'border-2 border-black'
                    : 'border-gray-300'
                } hover:border-2 hover:border-black`}
              >
                {hasImage ? (
                  <Image
                    src={color.colorPhoto ?? ''}
                    alt={color.value}
                    width={40}
                    height={40}
                    className='object-cover w-full h-full'
                  />
                ) : color.colorValue ? (
                  <div 
                    className="w-full h-full"
                    style={{ backgroundColor: color.colorValue }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
                    {color.value.charAt(0)}
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
