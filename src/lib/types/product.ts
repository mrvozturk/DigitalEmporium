/** Color Variant Type */
export interface VariantColor {
  value: string;
  asin: string;
  photo: string;
}

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
  fabricType: string;
  careInstructions: string;
  origin: string;
  productByline?: string;
  updatedAt?: string;
}

/** Type for objects within the attributes array of ProductVariation */
export interface VariantDetail {
  id: number;
  variantId: number;
  size?: string;
  sku?: string;
  in_stock?: boolean;
}

/** Type for size options passed to SizeSelector */
export interface SizeOption {
  value: string;
  isAvailable: boolean;
  sizeIsAvailable?: boolean;
  variant_photos?: string[];
  attributes?: VariantDetail[];
  images?: string[];
}

/** Ürün Varyasyon Tipleri */
export interface ProductVariation {
  id: string;
  productId: string;
  value: string;
  isAvailable: boolean;
  colorAsin?: string;
  colorValue?: string;
  colorPhoto?: string;
  colorIsAvailable?: boolean;
  size?: string;
  sizeIsAvailable?: boolean;
  variant_photos?: string[];
  sizes?: VariantDetail[];
  images?: string[];
  image?: string;
}

/** API Yanıt Tipleri */
export interface ApiResponse {
  success: boolean;
  message: string;
  data: ProductApiResponse[];
}

export interface ProductVariantApiResponse {
  id: number;
  productId: number;
  color?: string;
  variant_photos?: string[];
  skus?: any[];
  is_available?: boolean;
  size?: string;
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
  updated_at?: string;
  rating?: {
    rate: number;
    count: number;
  };
  product_details: Record<string, string>;
  categoryId: number;
  productVariations: ProductVariationApiResponse[];
  variants?: ProductVariantApiResponse[];
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
  size?: string;
  size_is_available?: boolean;
  variant_photos?: string[];
  color?: string;
  sku?: any;
}

export type FormVariation = {
  value: string;
  is_available: boolean;
  color_asin?: string;
  color_value?: string;
  color_is_available?: boolean;
  color_photo?: string;
  size?: string;
  size_is_available?: boolean;
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
  variations: ((data as any).productVariations || (data as any).variants || []).map((v: any) => ({
    id: v.id.toString(),
    productId: v.productId.toString(),
    value: v.value || v.color || '',
    isAvailable: v.is_available ?? false,
    colorAsin: v.color_asin || '',
    colorValue: v.color_value || v.color,
    colorPhoto: v.color_photo || v.variant_photos?.[0] || '',
    colorIsAvailable: v.color_is_available,
    size: v.size,
    sizeIsAvailable: v.size_is_available,
    variant_photos: v.variant_photos || [],
    sizes: v.skus,
    images: v.images,
    image: v.image
  })),
  coupon: data.coupon_text,
  delivery: data.delivery,
  salesVolume: data.sales_volume,
  asin: data.asin,
  fabricType: data.fabricType,
  careInstructions: data.careInstructions,
  origin: data.origin,
  productByline: data.product_byline,
  updatedAt: data.updated_at
});
