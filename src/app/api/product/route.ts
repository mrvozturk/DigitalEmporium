import { fetchProducts } from '@/services/productService';

// GET metodu: Ürün listesini döndürür
export async function GET() {
  try {
    const products = await fetchProducts();
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
