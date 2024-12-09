import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Product } from '../../lib/data';

interface ProductOverviewProps {
  productDetail: Product;
  starRating: number;
  showDetailsSection?: boolean;
  showPurchaseSection?: boolean;
  showPriceSection?: boolean;
  showProductDivider?: boolean;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({
  productDetail,
  starRating,
  showDetailsSection = false,
  showPurchaseSection = false,
  showPriceSection = false,
  showProductDivider = false
}) => {
  return (
    <div className=' xs:block hidden'>
      {!showDetailsSection &&
        !showPurchaseSection &&
        !showPriceSection &&
        !showProductDivider && (
          <div className='w-full px-4'>
            <div className='flex justify-between items-center w-full'>
              <p
                className='text-xs font-medium  mt-2 mr-2 '
                style={{ color: '#007185' }}
              >
                {productDetail.brand}
              </p>
              <div className='flex items-center mt-2'>
                <span className='text-xs mr-2' style={{ color: '#007185' }}>
                  {productDetail.rating.rate.toFixed(1)}
                </span>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, index) => (
                    <a
                      href='#review'
                      key={`${productDetail.title}-star-${index}`}
                      className='text-md'
                    >
                      <AiFillStar
                        color={index < starRating ? '#ffc107' : '#e4e5e9'}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <h1 className='text-base font-medium text-gray-700 mt-2'>
              {productDetail.title}
            </h1>
          </div>
        )}

      {showPriceSection && (
        <p className='text-2xl font-semibold text-gray-900 mt-4'>
          {productDetail.price}
        </p>
      )}

      {showProductDivider && <hr className='my-4 border-t border-gray-300' />}

      {showPurchaseSection && (
        <div className='w-full p-1 mt-4 rounded-lg'>
          <p className='text-green-700 text-lg font-medium mb-2'>In Stock</p>
          <div className='w-full mb-4'>
            <select
              id='quantity'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-200 text-base'
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
          <button className='w-full py-3 bg-yellow-400 text-black font-medium rounded-lg hover:border-4 hover:border-black-500'>
            Add to Cart
          </button>
          <button className='w-full py-3 bg-orange-500 text-black font-medium rounded-lg mt-4 hover:border-4 hover:border-black-500'>
            Buy Now
          </button>
        </div>
      )}

      {showDetailsSection && (
        <div className='flex flex-col gap-4 mt-4'>
          <h2 className='text-xl font-bold text-gray-900'>Product details</h2>
          <div className='flex flex-col text-base mb-4'>
            <strong className='text-md text-gray-900'>Fabric type</strong>
            <span className='text-sm text-gray-700'>
              {productDetail.fabricType}
            </span>
          </div>
          <div className='flex flex-col text-base mb-4'>
            <strong className='text-md text-gray-900'>Care instructions</strong>
            <span className='text-sm text-gray-700'>
              {productDetail.careInstructions}
            </span>
          </div>
          <div className='flex flex-col text-base mb-4'>
            <strong className='text-md text-gray-900'>Origin</strong>
            <span className='text-sm text-gray-700'>
              {productDetail.origin}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOverview;
