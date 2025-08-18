import {
  Product,
  createProduct,
  ProductApiResponse
} from '../lib/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/products`
  : 'https://postresql-api-pink.vercel.app/api/v1/products';

const HEADERS = {
  'Content-Type': 'application/json',
  'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_KEY ?? ''
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: HEADERS,
    cache: 'no-store'
  });
  console.log('response', response);

  if (!response.ok) {
    throw new Error(
      `Ürünleri getirirken bir hata oluştu. Status: ${response.status}`
    );
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'API yanıtı başarısız.');
  }

  return data.data.map((item: ProductApiResponse) => createProduct(item));
};

export const fetchProductById = async (
  productId: string
): Promise<Product | null> => {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: 'GET',
    headers: HEADERS
  });

  if (!response.ok) {
    throw new Error('Ürün getirilirken bir hata oluştu.');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message ?? 'API yanıtı başarısız.');
  }

  return createProduct(data.data);
};
