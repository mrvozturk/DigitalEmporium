export interface Product {
  id: number;
  product_title: string; // name
  customers_say?: string; // description
  product_price: number; // price
  product_photo: string; // image
  product_photos: string[]; //images
  product_star_rating?: string; // rating
  product_num_ratings?: number; // numRatings
  product_byline?: string; // Brand
  about_product: string[]; //  features
  product_details?: Record<string, string>; // details
  categoryId: number; // Category
  productUrl?: string; // URL to the product page
  variants?: Variant[];
  coupon?: string;
  delivery?: string;
  salesVolume?: string;
  asin: string;
  updatedAt?: string;
}

export interface Variant {
  id: number;
  productId: number;
  product?: Product;
  color: string | null;
  variant_photos: string[];
  skus?: Sku[];
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
  skus: Sku[];
}

type JsonValue =
  | string
  | number
  | boolean
  | { [key: string]: JsonValue }
  | Array<JsonValue>
  | null;

export interface Category {
  id: number;
  name: string;
  products?: Product[];
}
