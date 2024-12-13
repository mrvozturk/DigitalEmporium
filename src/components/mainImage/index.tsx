import React from 'react';
import Image from 'next/image';

const MainImage: React.FC<{
  initialPhoto: string;
  filters: { imageUrl?: string };
}> = ({ initialPhoto, filters }) => {
  const selectedImage = filters.imageUrl || initialPhoto;

  return (
    <div
      className=' xs:hidden
         sm:flex flex-1 basis-1/4 items-start justify-center 
        sm:basis-[45%] md:basis-[35%] lg:basis-1/4
        max-w-[25vw] ml-2
      '
    >
      <Image
        src={selectedImage}
        alt='Main Product'
        width={600}
        height={700}
        className='
          w-full max-w-[25vw] max-h-[25vw] object-contain p-2 border border-gray-200 bg-gray-200
          xs:block 
        '
      />
    </div>
  );
};

export default MainImage;
