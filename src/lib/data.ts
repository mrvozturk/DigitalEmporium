import MockProduct from './mock/product.json';
import MockProducts from './mock/listProducts.json';

export type VariantColor = {
  asin: string;
  value: string;
  photo: string;
  is_available: boolean;
};

export interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  photo: string;
  photos: string[];
  colors: VariantColor[];
  sizes: { value: string; is_available: boolean }[];
  customersSay: string;
  categories: string[];
  brand: string;
  fabricType: string;
  careInstructions: string;
  origin: string;
  about: string[];
  salesVolume: string;
  delivery: string;
  couponText: string;
}

export const createProduct = (props: any): Product => ({
  id: props.asin || '',
  title: props.product_title || '',
  price: props.product_price || '',
  description: props.about_product ? props.about_product.join(' ') : '',
  category: props.category_path
    ? props.category_path.map((cat: any) => cat.name).join(', ')
    : '',
  image: props.product_photo || '',
  rating: {
    rate: parseFloat(props.product_star_rating) || 0,
    count: props.product_num_ratings || 0
  },
  photo: props.product_photo || '',
  photos: props.product_photos || [],
  colors: props.product_variations?.color || [],
  sizes: props.product_variations?.size || [],
  customersSay: props.customers_say || '',
  categories: props.category_path?.map((cat: any) => cat.name) || [],
  brand: props.product_byline || '',
  fabricType: props.product_details?.['Fabric type'] || '',
  careInstructions: props.product_details?.['Care instructions'] || '',
  origin: props.product_details?.Origin || '',
  about: props.about_product || [],
  salesVolume: props.sales_volume || '',
  delivery: props.delivery || '',
  couponText: props.coupon_text || ''
});

export const getProducts = async (count: number): Promise<Product[]> => {
  const url =
    'https://real-time-amazon-data.p.rapidapi.com/search?query=Dress&page=1&country=TR&sort_by=HIGHEST_PRICE&product_condition=ALL';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '',
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (Array.isArray(result.data.products)) {
      return result.data.products
        .slice(0, count)
        .map((item: any) => createProduct(item));
    } else {
      console.warn('API verisi bir dizi değil. Yedek veriler kullanılıyor.');
      return MockProducts.data.products
        .slice(0, count)
        .map((item: any) => createProduct(item));
    }
  } catch (error) {
    console.error('Ürün liste verisi alınırken hata oluştu:', error);
    return MockProducts.data.products
      .slice(0, count)
      .map((item: any) => createProduct(item));
  }
};

export const getProduct = async (
  productId: string = 'B07ZPKBL9V'
): Promise<Product> => {
  const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${productId}&country=US`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '',
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.data && Object.hasOwn(result.data, 'asin')) {
      return createProduct(result.data);
    } else {
      console.warn('Ürün verisi bulunamadı. Yedek ürün verisi kullanılıyor.');
      return createProduct(MockProduct.data);
    }
  } catch (error) {
    console.error('Ürün verisi alınırken hata oluştu:', error);
    return createProduct(MockProduct.data);
  }
};
