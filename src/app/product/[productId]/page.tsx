import React from 'react';
import { getProduct, Product } from '../../../lib/data';
import styles from './index.module.css';
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
  const productDetail: Product = await getProduct(productId);

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  const starRating = Math.round(productDetail.rating.rate);

  return (
    <main className={styles.productDetail}>
      {/* Display product overview */}
      <ProductOverview productDetail={productDetail} starRating={starRating} />
      {/* Image Thumbnails */}
      <div className={styles.imageThumbnailsContainer}>
        <SwiperImage
          productDetail={{
            photos: productDetail.photos,
            title: productDetail.title
          }}
          colors={productDetail.colors}
        />
      </div>

      <MainImage initialPhoto={productDetail.photo} filters={filters} />

      {/* Product Info */}
      <div className={styles.productInfo}>
        <p className={styles.productBrand}>{productDetail.brand}</p>{' '}
        <h1>{productDetail.title}</h1>
        {/* Review Section */}
        <div className={styles.reviewSection}>
          <span className={styles.ratingValue}>
            {productDetail.rating.rate.toFixed(1)}
          </span>

          <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => (
              <a
                href='#review'
                key={`star-${productId}-${index}`}
                className={styles.starLink}
              >
                <AiFillStar
                  color={index < starRating ? '#ffc107' : '#e4e5e9'}
                />
              </a>
            ))}
          </div>

          <a href='#reviews' className={styles.reviewText}>
            {productDetail.rating.count} değerlendirme
          </a>
          <a href='#search' className={styles.reviewText}>
            Bu sayfayı ara
          </a>
        </div>
        <hr className={styles.divider} />
        {/* Price Section */}
        <p className={styles.productPrice}>
          Price: <span>{productDetail.price}</span>
        </p>
        {!!productDetail.colors.length && (
          <ProductImageAndColors
            colors={productDetail.colors}
            productId={productId}
          />
        )}
        {!!productDetail.colors.length && (
          <ColorSelector
            colors={productDetail.colors}
            productId={productId}
            price={productDetail.price}
          />
        )}
        {/* Size Selector */}
        <div className={styles.sizeSelector}>
          <SizeSelector sizes={productDetail.sizes} />{' '}
        </div>
        {/* Size Selector */}
        <div className={styles.sizeSelector}>
          <h2 className={styles.sizeSelectorTitle}>Size:</h2>
          <select className={styles.sizeDropdown}>
            {productDetail.sizes.map(size => (
              <option key={size.value} value={size.value}>
                {size.value}
              </option>
            ))}
          </select>
        </div>
        <ProductOverview
          productDetail={productDetail}
          starRating={starRating}
          showProductDivider={true}
        />
        <ProductOverview
          productDetail={productDetail}
          starRating={starRating}
          showPriceSection={true}
        />
        <ProductOverview
          productDetail={productDetail}
          starRating={starRating}
          showPurchaseSection={true}
        />
        <hr className={styles.productDivider}></hr>
        <ProductOverview
          starRating={starRating}
          productDetail={productDetail}
          showDetailsSection={true}
        />
        {/* Product Details */}
        <div className='mt-4 xs:hidden'>
          <h2 className='text-xl font-bold mb-2 text-black'>Product details</h2>
          <div className='flex justify-start text-sm mb-3'>
            <strong className='font-semibold text-black'>Fabric type</strong>
            <span className='text-black text-sm ml-2'>
              {productDetail.fabricType}
            </span>
          </div>
          <div className='flex justify-start text-sm mb-3'>
            <strong className='font-semibold text-black'>
              Care instructions
            </strong>
            <span className='text-black text-sm ml-2'>
              {productDetail.careInstructions}
            </span>
          </div>
          <div className='flex justify-start text-sm mb-3'>
            <strong className='font-semibold text-black'>Origin</strong>
            <span className='text-black text-sm ml-2'>
              {productDetail.origin}
            </span>
          </div>
          <hr className='border-t border-gray-300 mt-2' />
        </div>
        <div className='flex flex-col leading-6'>
          <h2 className='text-xl font-bold text-black my-2 sm:text-lg'>
            About this item
          </h2>

          {/* Hidden checkbox to control the collapse/expand */}
          <input type='checkbox' id='toggle' className='hidden peer' />

          <div className='text-[0.9rem] leading-6 text-gray-800 max-h-16 overflow-hidden transition-[max-height] duration-300 ease-in-out font-medium peer-checked:max-h-full sm:text-gray-700'>
            <ul>
              {productDetail.about.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Label for the checkbox acts as a toggle button */}
          <label
            htmlFor='toggle'
            className="block mt-2 bg-transparent border-none text-[#007185] cursor-pointer text-[0.9rem] hover:underline hover:text-[#007185] peer-checked:after:content-['See_less'] after:content-['See_more']"
            aria-label='Toggle more information'
          ></label>
        </div>
      </div>

      {/* Stock and Purchase Section */}
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
              <option key={qty} value={qty}>
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
