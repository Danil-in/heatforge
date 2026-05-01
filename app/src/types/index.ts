export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'grill' | 'accessory';
  price: number;
  oldPrice?: number;
  badge?: 'new' | 'bestseller' | 'sale';
  description: string;
  features: string[];
  specs: Record<string, string>;
  images: string[];
  videoUrl?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string;
  recipe?: {
    prepTime: string;
    cookTime: string;
    servings: number;
    ingredients: string[];
    steps: string[];
  };
  tags: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}
