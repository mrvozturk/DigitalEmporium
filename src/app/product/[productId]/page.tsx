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

export default async function Page({
  params
}: {
  readonly params: Readonly<{ productId: string; colorName?: string }>;
}) {
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

      <MainImage colors={productDetail.colors} />

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
        <ProductImageAndColors colors={productDetail.colors} />
        <ColorSelector colors={productDetail.colors} />
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
        <div className={styles.productDetails}>
          <h2 className={styles.productDetailsTitle}>Product details</h2>
          <div className={styles.productDetailsItem}>
            <strong>Fabric type</strong> <span>{productDetail.fabricType}</span>
          </div>
          <div className={styles.productDetailsItem}>
            <strong>Care instructions</strong>{' '}
            <span>{productDetail.careInstructions}</span>
          </div>
          <div className={styles.productDetailsItem}>
            <strong>Origin</strong> <span>{productDetail.origin}</span>
          </div>
          <hr className={styles.divider} />
        </div>
        <div className={styles.aboutSectionContainer}>
          <h2 className={styles.aboutSectionTitle}>About this item</h2>

          {/* Hidden checkbox to control the collapse/expand */}
          <input
            type='checkbox'
            id='toggle'
            className={styles.toggleCheckbox}
          />

          <div className={styles.aboutSection}>
            <ul>
              {productDetail.about.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Label for the checkbox acts as a toggle button */}
          <label htmlFor='toggle' className={styles.toggleButton}></label>
        </div>
      </div>

      {/* Stock and Purchase Section */}
      <div className={styles.stockAndPurchaseSection}>
        <p className={styles.inStock}>In Stock</p>
        <div className={styles.quantitySelector}>
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
        <button className={styles.addToCartButton}>Add to Cart</button>
        <button className={styles.buyNowButton}>Buy Now</button>
      </div>
    </main>
  );
}
