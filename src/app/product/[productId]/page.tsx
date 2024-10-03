import React from 'react';
import Image from 'next/image';
import { getProduct, Product } from '../../../lib/data';
import styles from './index.module.css';
import { AiFillStar } from 'react-icons/ai';

import { SwiperImage } from '@/components';

export default async function Page({
  params
}: {
  params: { productId: string };
}) {
  const { productId }: { productId: string } = params;
  const productDetail: Product = await getProduct(productId);

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  const starRating = Math.round(productDetail.rating.rate);

  return (
    <main className={styles.productDetail}>
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

      <div className={styles.imageThumbnailsContainer}>
        <SwiperImage
          productDetail={{
            photos: productDetail.photos,
            title: productDetail.title
          }}
        />
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={productDetail.photo}
          alt={productDetail.title}
          priority
          width={600}
          height={700}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <p className={styles.productBrand}>{productDetail.brand}</p>{' '}
        <h1>{productDetail.title}</h1>
        <div className={styles.reviewSection}>
          <span className={styles.ratingValue}>
            {productDetail.rating.rate.toFixed(1)}
          </span>

          <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => (
              <a href='#review' key={index} className={styles.starLink}>
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
        <hr className={styles.divider}></hr>
        <p className={styles.productPrice}>
          Price: <span>{productDetail.price}</span>
        </p>
        <h2 className={styles.productColorTitle}>Color</h2>
        <div className={styles.colors}>
          {productDetail.colors.map((color, index) => (
            <div key={index} className={styles.colorOption}>
              <Image
                src={color.photo}
                alt={color.value}
                width={50}
                height={50}
                className={styles.colorImage}
              />
            </div>
          ))}
        </div>
        <div className={styles.sizeSelector}>
          <h2 className={styles.sizeSelectorTitle}>Size:</h2>
          <select className={styles.sizeDropdown}>
            {productDetail.sizes.map((size, index) => (
              <option key={index} value={size.value}>
                {size.value}
              </option>
            ))}
          </select>
          <div className={styles.sizeScrollContainer}>
            {productDetail.sizes.map((size, index) => (
              <button key={index} className={styles.sizeButton}>
                {size.value}
              </button>
            ))}
          </div>
        </div>
        <hr className={styles.productDivider}></hr>
        <p>
          <span className={styles.priceText}>{productDetail.price}</span>
        </p>
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
      </div>
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
      <hr className={styles.productDivider}></hr>

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
    </main>
  );
}
