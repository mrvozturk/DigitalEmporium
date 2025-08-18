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
  variations: Variant[];
  coupon?: string;
  delivery?: string;
  salesVolume?: string;
  asin: string;
  updatedAt?: string;
}

export interface Variant {
  id: number;
  product?: Product;
  productId: number;
  color?: string;
  variant_photos?: string[];
  sizes?: Sku[];
  value: string;
  variantId: number;
  colorAsin?: string;
  colorValue?: string;
  colorPhoto?: string;
  asin: string;
  photo: string;
  sizeOptions: SizeOption[];
}

export interface Sku {
  id: number;
  variantId: number;
  size: string | null;
  sku: string;
  in_stock: boolean;
}

export interface SizeOption {
  value: string;
  skuData: Sku;
}

export interface ProductApiResponse {
  id: number;
  asin: string | null;
  product_title: string;
  product_price: string;
  about_product: string[];
  product_photos: string[];
  product_photo: string | null;
  product_star_rating: string | null;
  product_num_ratings: number | null;
  customers_say: string | null;
  product_byline: string | null;
  sales_volume: string | null;
  delivery: string | null;
  coupon_text: string | null;
  productUrl: string;
  updated_at?: string;
  rating?: {
    rate: number;
    count: number;
  };
  product_details: JsonValue | null;
  categoryId: number;
  Category?: Category;
  variants?: Variant[];
}

type JsonValue =
  | string
  | number
  | boolean
  | { [key in string]?: JsonValue }
  | Array<JsonValue>
  | null;
export interface Category {
  id: number;
  name: string;
  products?: Product[];
}

export const createProduct = (data: ProductApiResponse): Product => ({
  id: data.id,
  name: data.product_title,
  description: data.customers_say || '',
  price: parseFloat(data.product_price) || 0,
  image: data.product_photo ? data.product_photo.trim() : '',
  images: (data.product_photos || []).map(url => url.trim()),
  rating: data.product_star_rating || '',
  numRatings: data.product_num_ratings || 0,
  brand: data.product_byline?.replace('By ', '') || '',
  features: data.about_product || [],
  details: (data.product_details || {}) as Record<string, string>,
  category: data.categoryId,
  variations: (data.variants || []).map((v: Variant) => ({
    id: v.id,
    productId: v.productId,
    variantId: v.id,
    value: v.value || v.color || '',
    colorAsin: v.colorAsin || '',
    colorValue: v.colorValue || v.color,
    colorPhoto: v.colorPhoto || v.variant_photos?.[0] || '',
    variant_photos: v.variant_photos || [],
    asin: v.asin,
    photo: v.photo,
    sizes: ((v as any).skus || []).map((skuItem: Sku) => ({
      id: skuItem.id,
      variantId: skuItem.variantId,
      size: skuItem.size || null,
      sku: skuItem.sku || '',
      in_stock: skuItem.in_stock ?? false
    })) as Sku[],
    sizeOptions: v.sizeOptions
  })),
  coupon: data.coupon_text || '',
  delivery: data.delivery || '',
  salesVolume: data.sales_volume || '',
  asin: data.asin || '',
  updatedAt: data.updated_at
});
