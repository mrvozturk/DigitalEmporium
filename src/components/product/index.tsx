import React from 'react';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { Product } from '../../lib/data';
import styles from './index.module.css';

interface ProductOverviewProps {
  productDetail: Product;
  starRating: number;
  showSizeScrollContainer?: boolean;
  showDetailsSection?: boolean;
  showColorSection?: boolean;
  showPurchaseSection?: boolean;
  showPriceSection?: boolean;
  showProductDivider?: boolean;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({
  productDetail,
  starRating,
  showSizeScrollContainer = false,
  showDetailsSection = false,
  showColorSection = false,
  showPurchaseSection = false,
  showPriceSection = false,
  showProductDivider = false 
}) => {
  return (
    <>
      {/* Main Product Info Section */}
      {!showSizeScrollContainer &&
        !showDetailsSection &&
        !showColorSection &&
        !showPurchaseSection &&
        !showPriceSection &&
        !showProductDivider && (
          <div className={styles.productContainer}>
            <div className={styles.ratingContainer}>
              <p className={styles.brandName}>{productDetail.brand}</p>
              <div className={styles.ratingDetails}>
                <span className={styles.ratingScore}>
                  {productDetail.rating.rate.toFixed(1)}
                </span>
                <div className={styles.ratingStars}>
                  {[...Array(5)].map((_, index) => (
                    <a href='#review' key={index} className={styles.starLink}>
                      <AiFillStar
                        color={index < starRating ? '#ffc107' : '#e4e5e9'}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <h1 className={styles.productTitleMobile}>{productDetail.title}</h1>
          </div>
        )}

      {/* Color Section */}
      {showColorSection && (
        <div>
          <div className={styles.shades}>
            {productDetail.colors.map((color, index) => (
              <div key={index} className={styles.shadeOption}>
                <Image
                  src={color.photo}
                  alt={color.value}
                  width={50}
                  height={50}
                  className={styles.shadeImage}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Size Scroll Section */}
      {showSizeScrollContainer && (
        <div className={styles.sizeScrollContainer}>
          {productDetail.sizes.map((size, index) => (
            <button key={index} className={styles.sizeButton}>
              {size.value}
            </button>
          ))}
        </div>
      )}

      {/* Price Section */}
      {showPriceSection && (
        <p>
          <span className={styles.priceText}>{productDetail.price}</span>
        </p>
      )}

      {/* Divider Section */}
      {showProductDivider && <hr className={styles.productDivider} />}

      {/* Purchase Section */}
      {showPurchaseSection && (
        <div className={styles.purchaseSection}>
          <p className={styles.stockStatus}>In Stock</p>
          <div className={styles.quantityWrapper}>
            <select
              id='quantity'
              className={styles.quantityDropdown}
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
          <button className={styles.cartButton}>Add to Cart</button>
          <button className={styles.purchaseButton}>Buy Now</button>
        </div>
      )}

      {/* Details Section */}
      {showDetailsSection && (
        <div className={styles.detailsSection}>
          <h2 className={styles.detailsTitle}>Product details</h2>
          <div className={styles.detailItem}>
            <strong>Fabric type</strong> <span>{productDetail.fabricType}</span>
          </div>
          <div className={styles.detailItem}>
            <strong>Care instructions</strong>{' '}
            <span>{productDetail.careInstructions}</span>
          </div>
          <div className={styles.detailItem}>
            <strong>Origin</strong> <span>{productDetail.origin}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductOverview;