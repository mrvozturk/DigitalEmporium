import React from 'react';
import Image from 'next/image';
import { getProduct, Product } from '../../../lib/data';
import styles from './index.module.css';
import { AiFillStar } from 'react-icons/ai';

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
  console.log('productDetail.product_photo', productDetail);

  return (
    <main className={styles.productDetail}>
      <div className={styles.imageThumbnails}>
        {productDetail.photos.map((photo, index) => (
          <Image
            key={index}
            src={photo}
            alt={productDetail.title}
            width={58}
            height={60}
            className={styles.thumbnailImage}
          />
        ))}
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
        <p className={styles.additionalInfo}>Fiyatlara KDV dahildir.</p>
        <div className={styles.productVariants}>
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
            <h2>Size</h2>
            <select className={styles.sizeDropdown}>
              {productDetail.sizes.map((size, index) => (
                <option key={index} value={size.value}>
                  {size.value}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.productDetails}>
            <h2 className={styles.productDetailsTitle}>Product details</h2>
            <div className={styles.productDetailsItem}>
              <strong>Fabric type</strong>{' '}
              <span>{productDetail.fabricType}</span>
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
      </div>
    </main>
  );
}
