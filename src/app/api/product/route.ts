import {
  Product,
  createProduct,
  ApiResponse
} from './../../../lib/types/product';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PRODUCT}`;
const HEADERS = {
  'Content-Type': 'application/json',
  'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_KEY ?? ''
};

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: HEADERS
    });

    if (!response.ok) {
      throw new Error('Ürünleri getirirken bir hata oluştu.');
    }

    const data = (await response.json()) as ApiResponse;

    if (!data.success) {
      throw new Error(data.message || 'API yanıtı başarısız.');
    }

    return data.data.map(item => createProduct(item));
  } catch (error) {
    console.error('Ürün API Hatası:', error);
    return [];
  }
};

// GET metodu: Ürün listesini döndürür
export async function GET() {
  try {
    const products = await fetchProducts();
    console.log('Fetched Products:', products);
    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Bilinmeyen hata';
    return new Response(
      JSON.stringify({
        error: 'Ürünler getirilemedi',
        message: errorMessage
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

// Fetch a single product by ID
const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    const products = await fetchProducts();
    const product = products.find(p => p.id.toString() === productId);
    
    if (!product) {
      console.error(`Product with ID ${productId} not found`);
      return null;
    }
    
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    return null;
  }
};
