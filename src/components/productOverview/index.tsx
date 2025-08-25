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
  const ratingValue = product.product_star_rating
    ? parseFloat(product.product_star_rating)
    : 0;
  const starRating = Math.round(ratingValue);

  return (
    <div className='xs:block hidden'>
      {!showDetailsSection &&
        !showPurchaseSection &&
        !showPriceSection &&
        !showProductDivider && (
          <div className='w-full px-4'>
            <div className='flex justify-between items-center w-full'>
              {product.product_byline && (
                <p
                  className='text-xs font-medium mt-2 mr-2'
                  style={{ color: '#007185' }}
                >
                  {product.product_byline}
                </p>
              )}
              <div className='flex items-center mt-2'>
                {product.product_star_rating && (
                  <>
                    <span className='text-xs mr-2' style={{ color: '#007185' }}>
                      {ratingValue.toFixed(1)}
                    </span>
                    <div className='flex items-center'>
                      {[...Array(5)].map((_, index) => (
                        <a
                          href='#review'
                          key={`${product.product_title}-star-${index}`}
                          className='text-md'
                        >
                          <AiFillStar
                            color={index < starRating ? '#ffc107' : '#e4e5e9'}
                          />
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <h1 className='text-base font-medium text-gray-700 mt-2'>
              {product.product_title}
            </h1>
            {product.salesVolume && (
              <p className='text-xs text-gray-500 mt-1'>
                {product.salesVolume} satış
              </p>
            )}
          </div>
        )}

      {showPriceSection && (
        <p className='text-base font-semibold text-black mt-2 xs:hidden'>
          Fiyat: <span>{Number(product.product_price).toFixed(2)}₺</span>
        </p>
      )}

      {showProductDivider && <hr className='my-4 border-t border-gray-300' />}

      {showPurchaseSection && (
        <div className='w-full p-1 mt-4 rounded-lg'>
          <p className='text-green-700 text-lg font-medium mb-2'>Stok Durumu</p>
          <div className='w-full mb-4'>
            <select
              id='quantity'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-200 text-base'
              defaultValue=''
            >
              <option value='' disabled hidden>
                Ürün Miktarı:
              </option>
              {[1, 2, 3, 4, 5].map(qty => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </div>
          <button className='w-full py-3 bg-yellow-400 text-black font-medium rounded-lg hover:border-4 hover:border-black-500'>
            Sepete Ekle
          </button>
          <button className='w-full py-3 bg-orange-500 text-black font-medium rounded-lg mt-4 hover:border-4 hover:border-black-500'>
            Satın Al
          </button>
        </div>
      )}

      {showDetailsSection && (
        <div className='flex flex-col gap-4 mt-4'>
          <h2 className='text-xl font-bold text-gray-900'>Ürün Hakkında </h2>

          {product.about_product?.length > 0 && (
            <div className='flex flex-col mb-4'>
              <strong className='text-md text-gray-900 mb-2'>Özellikler</strong>
              <ul className='list-disc ml-5'>
                {product.about_product.map(feature => (
                  <li
                    key={`feature-${feature}`}
                    className='text-sm text-gray-700 mb-1'
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.product_details &&
            Object.entries(product.product_details).map(([key, value]) => (
              <div
                className='flex flex-col text-base mb-4'
                key={`detail-${key}-${value}`}
              >
                <strong className='text-md text-gray-900'>{key}</strong>
                <span className='text-sm text-gray-700'>{value}</span>
              </div>
            ))}

          {product.customers_say && (
            <div className='flex flex-col text-base mb-4'>
              <strong className='text-md text-gray-900'>Description</strong>
              <span className='text-sm text-gray-700'>
                {product.customers_say}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductOverview;
