/** Ürün Tipleri */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  rating: string;
  numRatings: number;
  brand: string;
  features: string[];
  details: Record<string, string>;
  category: number;
  variations: ProductVariation[];
  coupon?: string;
  delivery?: string;
  salesVolume?: string;
  asin: string;
}

/** Ürün Varyasyon Tipleri */
export interface ProductVariation {
  id: number;
  productId: number;
  value: string;
  isAvailable: boolean;
  colorAsin?: string;
  colorValue?: string;
  colorPhoto?: string;
  colorIsAvailable?: boolean;
}

/** API Yanıt Tipleri */
export interface ApiResponse {
  success: boolean;
  message: string;
  data: ProductApiResponse[];
}

export interface ProductApiResponse {
  id: number;
  asin: string;
  product_title: string;
  product_price: string;
  about_product: string[];
  product_photo: string;
  product_star_rating: string;
  product_num_ratings: number;
  product_photos: string[];
  customers_say: string;
  product_byline: string;
  sales_volume: string;
  delivery: string;
  coupon_text: string;
  brand: string;
  fabricType: string;
  careInstructions: string;
  origin: string;
  productUrl: string;
  productPhoto: string;
  couponText?: string;
  rating?: {
    rate: number;
    count: number;
  };
  product_details: Record<string, string>;
  categoryId: number;
  productVariations: ProductVariationApiResponse[];
}

export interface ProductVariationApiResponse {
  id: number;
  productId: number;
  value: string;
  is_available: boolean;
  color_asin?: string;
  color_value?: string;
  color_photo?: string;
  color_is_available?: boolean;
}

export type FormVariation = {
  value: string;
  is_available: boolean;
  color_asin?: string;
  color_value?: string;
  color_is_available?: boolean;
  color_photo?: string;
};

export type ProductFormData = {
  asin: string;
  product_title: string;
  product_price: string;
  product_star_rating: string;
  product_num_ratings: number;
  product_photo?: string;
  coupon_text: string;
  about_product: string[];
  categoryId: number;
  brand: string;
  customers_say: string;
  careInstructions: string;
  origin: string;
  product_details: Record<string, string>;
  productVariations: FormVariation[];
  fabricType: string;
  currency?: string;
  product_url?: string;
  product_byline?: string;
  sales_volume?: string;
  delivery?: string;
  product_photos: string[];
};

export const createProduct = (data: ProductApiResponse): Product => ({
  id: data.id,
  name: data.product_title,
  description: data.customers_say || '',
  price: parseFloat(data.product_price) || 0,
  image: data.product_photo ? data.product_photo.trim() : '',
  images: (data.product_photos || []).map(url => url.trim()),
  rating: data.product_star_rating,
  numRatings: data.product_num_ratings,
  brand: data.product_byline?.replace('By ', '') || '',
  features: data.about_product || [],
  details: data.product_details || {},
  category: data.categoryId,
  variations: (data.productVariations || []).map(v => ({
    id: v.id,
    productId: v.productId,
    value: v.value,
    isAvailable: v.is_available,
    colorAsin: v.color_asin,
    colorValue: v.color_value,
    colorPhoto: v.color_photo ? v.color_photo.trim() : undefined,
    colorIsAvailable: v.color_is_available
  })),
  coupon: data.coupon_text,
  delivery: data.delivery,
  salesVolume: data.sales_volume,
  asin: data.asin
});
