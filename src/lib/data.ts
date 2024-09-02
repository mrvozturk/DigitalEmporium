import MockProduct from './mock/product.json';
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
  photo: string;
  photos: string[];
  colors: { value: string; photo: string; is_available: boolean }[];
  sizes: { value: string; is_available: boolean }[];
  customersSay: string;
  categories: string[];
  brand: string;
  fabricType: string;
  careInstructions: string;
  origin: string;
}

class ProductModel implements Product {
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
  photo: string;
  photos: string[];
  colors: { value: string; photo: string; is_available: boolean }[];
  sizes: { value: string; is_available: boolean }[];
  customersSay: string;
  categories: string[];
  brand: string;
  fabricType: string;
  careInstructions: string;
  origin: string;

  constructor(props: any) {
    this.id = props.asin;
    this.title = props.product_title;
    this.price = props.product_price || '';
    this.description = props.about_product ? props.about_product.join(' ') : '';
    this.category = props.category_path
      ? props.category_path.map((cat: any) => cat.name).join(', ')
      : '';
    this.image = props.product_photo;
    this.rating = {
      rate: parseFloat(props.product_star_rating) || 0,
      count: props.product_num_ratings || 0
    };
    this.photo = props.product_photo;
    this.photos = props.product_photos || []; 
    this.colors = props.product_variations?.color || [];
    this.sizes = props.product_variations?.size || [];
    this.customersSay = props.customers_say || '';
    this.categories = props.category_path
      ? props.category_path.map((cat: any) => cat.name)
      : [];
    this.brand = props.product_byline || '';

    this.fabricType = props.product_details?.['Fabric type'] || '';
    this.careInstructions = props.product_details?.['Care instructions'] || '';
    this.origin = props.product_details?.Origin || '';
  }
}

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
    console.log('asdfas');
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.data && Object.hasOwn(result.data, 'asin')) {
      return result.data;
    } else {
      return new ProductModel(MockProduct.data);
    }
  } catch (error) {
    return MockProduct.data;
  }
};
