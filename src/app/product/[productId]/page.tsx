'use client';

import { useParams } from 'next/navigation';

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.productId;

  return (
    <div>
      <h1>Product Detail for ID: {productId}</h1>
    </div>
  );
};

export default ProductDetailPage;
