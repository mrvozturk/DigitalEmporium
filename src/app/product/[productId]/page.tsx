import React from 'react';
import { fetchProductById } from '@/services/productService';
import { Product } from '@/lib/types/product';
import { AiFillStar } from 'react-icons/ai';
import { SwiperImage } from '@/components';
import ProductOverview from '@/components/productOverview';
import SizeSelector from '@/components/sizeSelector';
import ProductImageAndColors from '@/components/productImageAndColors';
import MainImage from '@/components/mainImage';
import ColorSelector from '@/components/colorSelector';

export type FiltersType = {
  imageUrl: string;
};

export default async function Page({
  params,
  searchParams
}: {
  readonly params: Readonly<{ productId: string; colorName?: string }>;
  readonly searchParams: Readonly<FiltersType>;
}) {
  const filters = searchParams;
  const { productId } = params;
  const product: Product | null = await fetchProductById(productId);

  if (!product) {
    return <div>Loading...</div>;
  }

  const starRating = Math.round(parseFloat(product.rating) || 0);

  return (
    <main className='productDetail flex flex-row justify-between lg:px-4 lg:py-2 mx-auto sm:px-3 md:px-3 xs:flex-col xs:py-0 xs:justify-center'>
      <ProductOverview product={product} />
      <div>
        <SwiperImage
          product={product}
          colors={product.variations
            .filter(v => v.colorValue)
            .map(v => ({
              value: v.value,
              isAvailable: v.isAvailable,
              colorValue: v.colorValue
            }))}
        />
      </div>

      <MainImage product={product} filters={filters} />

      <div className='basis-[60%] bg-white px-3'>
        <p className='text-[0.75rem] lg:text-[0.85rem] md:text-[0.75rem] sm:text-[0.85rem] text-[#007185] font-semibold xs:hidden'>
          {product.brand}
        </p>{' '}
        <h1 className='flex font-weight-bold text-[#111] leading-[1.3] my-1 xs:text-[0.9rem] sm:text-[0.9rem] md:text-[1.2rem] lg:text-[1.3rem] xs:hidden'>
          {product.name}
        </h1>
        <div className='reviewSection flex items-center lg:mt-2 sm:mt-1 md:mt-1'>
          <span className='text-base font-bold mr-1 lg:text-xs sm:text-[0.75rem] md:text-[0.65rem] xs:hidden'>
            {product.rating}
          </span>

          <div className='flex ml-0.5 mr-1'>
            {[...Array(5)].map((_, index) => (
              <a
                href='#review'
                key={`star-${productId}-${index}`}
                className='flex items-center'
              >
                <AiFillStar
                  color={index < starRating ? '#ffc107' : '#e4e5e9'}
                  className='text-[1.1rem] sm:text-[0.9rem] xs:hidden'
                />
              </a>
            ))}
          </div>

          <div className='reviewSection flex items-center lg:mt-0'>
            <a
              href='#reviews'
              className="text-[0.75rem] text-[#007185] no-underline cursor-pointer hover:text-[#d47b00] hover:underline after:content-['|'] after:ml-1 after:mr-1 after:text-[#2c697d] last:after:content-[''] xs:text-[0.25rem] sm:text-[0.64rem] md:text-[0.6rem] lg:text-[0.7rem] xl:text-[0.75rem] xs:hidden"
            >
              {product.numRatings} değerlendirme
            </a>
            <a
              href='#search'
              className="text-[0.75rem] text-[#007185] no-underline cursor-pointer hover:text-[#d47b00] hover:underline after:content-['|'] after:ml-1 after:mr-1 after:text-[#2c697d] last:after:content-[''] xs:text-[0.25rem] sm:text-[0.64rem] md:text-[0.6rem] lg:text-[0.7rem] xl:text-[0.75rem] xs:hidden"
            >
              Bu sayfayı ara
            </a>
          </div>
        </div>
        <hr className='border-t border-gray-300 xs:hidden' />
        <p className='text-base font-semibold text-black mt-2 xs:hidden '>
          Price: <span>{product.price.toFixed(2)}₺</span>
        </p>
        {product.variations.some(v => v.colorValue) && (
          <ProductImageAndColors
            colors={product.variations
              .filter(v => v.colorValue)
              .map(v => ({
                value: v.value,
                isAvailable: v.isAvailable,
                colorValue: v.colorValue ?? '',
                colorPhoto: v.colorPhoto ?? ''
              }))}
            productId={productId}
          />
        )}
        {product.variations.some(v => v.colorValue) && (
          <ColorSelector
            colors={product.variations
              .filter(v => v.colorValue)
              .map(v => ({
                value: v.colorValue ?? '',
                asin: v.colorAsin ?? '',
                photo: v.colorPhoto ?? ''
              }))}
            productId={productId}
            price={product.price.toFixed(2)}
          />
        )}
        <div>
          <SizeSelector
            sizes={product.variations
              .filter(v => !v.colorValue && v.size)
              .map(v => ({
                value: v.size ?? v.value,
                isAvailable: v.sizeIsAvailable ?? v.isAvailable
              }))}
          />
        </div>
        <div className='mt-2 text-black text-[0.8rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] xs:hidden'>
          <h2 className='hidden sm:block'>Size:</h2>
          <select className='mt-1 w-[20%] p-1.5 border border-[#31737d] rounded-lg bg-gray-90 outline-none text-sm text-[0.8rem] sm:text-[0.7rem] md:text-[0.9rem] lg:text-[0.8rem] focus:ring-2 focus:ring-teal-500 hover:border-gray-400 sm:w-[40%] md:w-[45%] md:text-base lg:w-[30%] xl:w-[25%]'>
            {product.variations
              .filter(v => !v.colorValue && v.size)
              .map(size => (
                <option
                  key={`${size.value}-${size.size ?? size.value}`}
                  value={size.size ?? size.value}
                  disabled={!(size.sizeIsAvailable ?? size.isAvailable)}
                >
                  {size.size ?? size.value}
                  {!(size.sizeIsAvailable ?? size.isAvailable)
                    ? ' (Out of Stock)'
                    : ''}
                </option>
              ))}
          </select>
        </div>
        <ProductOverview product={product} showProductDivider={true} />
        <ProductOverview product={product} showPriceSection={true} />
        <ProductOverview product={product} showPurchaseSection={true} />
        <hr className='mt-4 mb-1 xs:block sm:hidden'></hr>
        <ProductOverview product={product} showDetailsSection={true} />
        <div className='mt-4 xs:hidden'>
          <h2 className='text-xl font-bold mb-2 text-black'>Product details</h2>

          {product.details &&
            Object.entries(product.details).map(([key, value]) => (
              <div
                className='flex justify-start text-sm mb-3'
                key={`detail-${key}-${value}`}
              >
                <strong className='font-semibold text-black'>{key}</strong>
                <span className='text-black text-sm ml-2'>{value}</span>
              </div>
            ))}

          <hr className='border-t border-gray-300 mt-2' />
        </div>
        <div className='flex flex-col leading-6'>
          <h2 className='text-xl font-bold text-black my-2 sm:text-lg'>
            About this item
          </h2>

          <input type='checkbox' id='toggle' className='hidden peer' />

          <div className='text-[0.9rem] leading-6 text-gray-800 max-h-16 overflow-hidden transition-[max-height] duration-300 ease-in-out font-medium peer-checked:max-h-full sm:text-gray-700'>
            <ul>
              {product.features.map((point) => (
                <li key={`feature-${point}`}>{point}</li>
              ))}
            </ul>
          </div>

          <label
            htmlFor='toggle'
            className="block mt-2 bg-transparent border-none text-[#007185] cursor-pointer text-[0.9rem] hover:underline hover:text-[#007185] peer-checked:after:content-['See_less'] after:content-['See_more']"
            aria-label='Toggle more information'
          ></label>
        </div>
      </div>

      <div className='flex flex-col bg-white sm:p-4 md:p-4 p-6 rounded-lg border border-gray-300 w-full max-w-[250px] sm:max-w-[26vw] md:max-w-[24vw] lg:max-w-[250px] hidden sm:flex'>
        <p className='text-green-600 text-base mb-2 mt-0'>In Stock</p>
        <div className='w-full mb-5'>
          <select
            id='quantity'
            className='w-full p-2.5 border border-gray-300 rounded-md bg-gray-50 text-sm'
            defaultValue=''
          >
            <option value='' disabled hidden>
              Quantity:
            </option>
            {[1, 2, 3, 4, 5].map(qty => (
              <option key={`qty-${qty}`} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>
        <button className='block w-full py-2 text-sm text-black bg-yellow-400 rounded-full cursor-pointer mb-4'>
          Add to Cart
        </button>
        <button className='block w-full py-2 text-sm text-black bg-orange-500 rounded-full cursor-pointer'>
          Buy Now
        </button>
      </div>
    </main>
  );
}
