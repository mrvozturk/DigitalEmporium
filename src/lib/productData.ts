export interface Product {
    id: string;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
  export const fetchProductData = async (count: number): Promise<Product[]> => {
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
        const products: Product[] = result.data.products.slice(0, count).map(
          (item: any): Product => ({
            id: item.asin,
            title: item.product_title,
            price: item.product_price || 'N/A',
            description: item.product_description || '',
            category: item.product_category || '',
            image: item.product_photo,
            rating: {
              rate: item.product_rating || 0,
              count: item.product_rating_count || 0
            }
          })
        );
  
        return products;
      } else {
        console.error('Products data is not an array:', result.data.products);
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  