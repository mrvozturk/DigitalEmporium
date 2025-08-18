import { fetchProducts } from '@/services/productService';

// GET metodu: Ürün listesini döndürür
export async function GET() {
  try {
    console.log('Fetching products...');
    const products = await fetchProducts();
    console.log('Products fetched successfully:', products.length);
    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Detailed error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Bilinmeyen hata';
    return new Response(
      JSON.stringify({
        error: 'Ürünler getirilemedi',
        message: errorMessage,
        details: error instanceof Error ? error.stack : undefined
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