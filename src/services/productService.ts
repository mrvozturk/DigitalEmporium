import {
  Product,
  createProduct,
  ApiResponse
} from '../lib/types/product';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}products`;
const HEADERS = {
  'Content-Type': 'application/json',
  'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_KEY ?? ''
};

// Tüm ürünleri getir
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Ürünler getiriliyor:', API_URL);
    console.log('Kullanılan başlıklar:', HEADERS);

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: HEADERS
    });

    console.log('API Yanıt durumu:', response.status);

    if (!response.ok) {
      throw new Error('Ürünleri getirirken bir hata oluştu.');
    }

    const data = (await response.json()) as ApiResponse;
    console.log('API Yanıt verisi:', data);

    if (!data.success) {
      throw new Error(data.message || 'API yanıtı başarısız.');
    }

    const products = data.data.map(item => createProduct(item));
    console.log('Oluşturulan ürünler:', products);
    return products;
  } catch (error) {
    console.error('Ürün API Hatası:', error);
    return [];
  }
};

// ID'ye göre tek bir ürün getir
export const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'GET',
      headers: HEADERS
    });

    if (!response.ok) {
      throw new Error('Ürün getirilirken bir hata oluştu.');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'API yanıtı başarısız.');
    }

    return createProduct(data.data);
  } catch (error) {
    console.error(`${productId} ID'li ürün getirilirken hata:`, error);
    return null;
  }
};
