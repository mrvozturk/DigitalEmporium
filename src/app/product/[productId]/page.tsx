import React from 'react';
import { fetchProductById } from '@/services/productService';
import { Product, SizeOption, Sku, Variant } from '@/lib/types/product';
import { AiFillStar } from 'react-icons/ai';
import SwiperImage from '@/components/swiperImage';
import ProductOverview from '@/components/productOverview';
import SizeSelector from '@/components/sizeSelector';
import ProductImageAndColors from '@/components/productImageAndColors';
import MainImage from '@/components/mainImage';
import ColorSelector from '@/components/colorSelector';
import Swiper from 'swiper';

export type FiltersType = {
  imageUrl?: string;
  color?: string; // colorAsin
  variantId?: string;
};

export default async function Page({
  params,
  searchParams
}: {
  readonly params: Readonly<{ productId: string }>;
  readonly searchParams: Readonly<FiltersType>;
}) {
  const { productId } = params;
  const filters = searchParams;
  const colorAsin = searchParams.color;

  const product: Product | null = await fetchProductById(productId);
  if (!product) return <div>Loading...</div>;

  const selectedVariantId = filters.variantId
    ? parseInt(filters.variantId, 10)
    : undefined;

  const currentSelectedVariant: Variant =
    product.variants?.find(v => v.id === selectedVariantId) ??
    product.variants?.[0]!; // Non-null assertion to guarantee Variant type

  // Size options mapping
  const sizeOptions: SizeOption[] = (currentSelectedVariant?.sizes || [])
    .filter((skuItem: Sku) => skuItem.size && skuItem.in_stock !== undefined)
    .map((skuItem: Sku) => ({
      value: skuItem.size || '',
      skuData: skuItem,
      sizes: currentSelectedVariant.sizes ?? []
    }));

  const starRating = Math.round(parseFloat(product.product_star_rating ?? '0'));

  return (
    <main className='productDetail flex flex-row justify-between lg:px-4 lg:py-2 mx-auto sm:px-3 md:px-3 xs:flex-col xs:py-0 xs:justify-center'>
      <ProductOverview product={product} />

      {/* Swiper Images */}
      <div>
        <SwiperImage
          product={product}
          colors={
            product.variants?.map(v => ({
              value: v.value,
              photo: v.colorPhoto ?? v.photo ?? v.variant_photos?.[0] ?? '',
              asin: v.colorAsin ?? v.asin
            })) ?? []
          }
          variantId={currentSelectedVariant.id}
        />
      </div>

      <MainImage product={product} filters={filters} />

      <div className='basis-[60%] bg-white px-3'>
        <p className='text-[0.75rem] lg:text-[0.85rem] md:text-[0.75rem] sm:text-[0.85rem] text-[#007185] font-semibold xs:hidden'>
          {product.product_byline}
        </p>
        <h1 className='flex font-weight-bold text-[#111] leading-[1.3] my-1 xs:text-[0.9rem] sm:text-[0.9rem] md:text-[1.2rem] lg:text-[1.3rem] xs:hidden'>
          {product.product_title}
        </h1>

        {/* Reviews */}
        <div className='reviewSection flex items-center lg:mt-2 sm:mt-1 md:mt-1'>
          <span className='text-base font-bold mr-1 lg:text-xs sm:text-[0.75rem] md:text-[0.65rem] xs:hidden'>
            {product.product_star_rating}
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
              {product.product_num_ratings} değerlendirme
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

        <p className='text-base font-semibold text-black mt-2 xs:hidden'>
          Price: <span> {product.product_price}</span>
        </p>

        {/* Color Pickers */}
        {product.variants?.some(v => v.colorValue) && (
          <ProductImageAndColors
            colors={product.variants ?? []}
            productId={productId}
            selectedVariantId={currentSelectedVariant.id}
          />
        )}

        {product.variants?.some(v => v.colorValue) && (
          <ColorSelector
            colors={product.variants ?? []}
            productId={productId}
            currentSelectedColorAsin={
              colorAsin || product.variants?.[0]?.colorAsin
            }
            price={product.product_price.toFixed(2)}
          />
        )}

        {/* Sizes */}
        <div className='xs:block sm:hidden'>
          <SizeSelector sizeOptions={sizeOptions} />
        </div>
        <div className='mt-2 text-black text-[0.8rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] xs:hidden sm:block'>
          <h2 className='hidden sm:block'>Size:</h2>
          <select className='mt-1 w-[20%] p-1.5 border border-[#31737d]'>
            {sizeOptions.map(size => (
              <option
                key={size.value}
                value={size.value}
                disabled={!size.skuData.in_stock}
              >
                {size.value} {size.skuData.in_stock ? '' : '(Out of Stock)'}
              </option>
            ))}
          </select>
        </div>

        {/* Product Overview Sections */}
        <ProductOverview product={product} showProductDivider={true} />
        <ProductOverview product={product} showPriceSection={true} />
        <ProductOverview product={product} showPurchaseSection={true} />
        <hr className='mt-4 mb-1 xs:block sm:hidden' />
        <ProductOverview product={product} showDetailsSection={true} />

        {/* Product Details */}
        <div className='mt-4 xs:hidden'>
          <h2 className='text-xl font-bold mb-2 text-black'>Product details</h2>
          {product.product_details &&
            Object.entries(product.product_details).map(([key, value]) => (
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

        {/* About this item */}
        <div className='flex flex-col leading-6'>
          <h2 className='text-xl font-bold text-black my-2 sm:text-lg'>
            About this item
          </h2>

          <input type='checkbox' id='toggle' className='hidden peer' />

          <div className='text-[0.9rem] leading-6 text-gray-800 max-h-16 overflow-hidden transition-[max-height] duration-300 ease-in-out font-medium peer-checked:max-h-full sm:text-gray-700'>
            <ul>
              {product.about_product.map(point => (
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

      {/* Right Side Add to Cart Section */}
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
