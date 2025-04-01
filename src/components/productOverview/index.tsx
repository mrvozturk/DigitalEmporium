import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Product } from '../../lib/types/product';

interface ProductOverviewProps {
  product: Product;
  showDetailsSection?: boolean;
  showPurchaseSection?: boolean;
  showPriceSection?: boolean;
  showProductDivider?: boolean;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({
  product,
  showDetailsSection = false,
  showPurchaseSection = false,
  showPriceSection = false,
  showProductDivider = false
}) => {
  // Calculate star rating from string rating
  const starRating = Math.round(parseFloat(product.rating) || 0);

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
                {product.brand}
              </p>
              <div className='flex items-center mt-2'>
                <span className='text-xs mr-2' style={{ color: '#007185' }}>
                  {product.rating}
                </span>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, index) => (
                    <a
                      href='#review'
                      key={`${product.name}-star-${index}`}
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
              {product.name}
            </h1>
            {product.salesVolume && (
              <p className='text-xs text-gray-500 mt-1'>
                {product.salesVolume} satış
              </p>
            )}
          </div>
        )}

      {showPriceSection && (
        <p className='text-2xl font-semibold text-gray-900 mt-4'>
          {product.price.toFixed(2)}₺
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

          {product.features && product.features.length > 0 && (
            <div className='flex flex-col mb-4'>
              <strong className='text-md text-gray-900 mb-2'>Features</strong>
              <ul className='list-disc ml-5'>
                {product.features.map((feature, index) => (
                  <li
                    key={`feature-${index}`}
                    className='text-sm text-gray-700 mb-1'
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.details &&
            Object.entries(product.details).map(([key, value], index) => (
              <div
                className='flex flex-col text-base mb-4'
                key={`detail-${index}`}
              >
                <strong className='text-md text-gray-900'>{key}</strong>
                <span className='text-sm text-gray-700'>{value}</span>
              </div>
            ))}

          {product.description && (
            <div className='flex flex-col text-base mb-4'>
              <strong className='text-md text-gray-900'>Description</strong>
              <span className='text-sm text-gray-700'>
                {product.description}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductOverview;
