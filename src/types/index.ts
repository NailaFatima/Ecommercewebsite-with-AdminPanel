export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  paymentMethod: string;
  orderDate: Date;
}

export interface FilterOptions {
  category: string[];
  size: string[];
  color: string[];
  priceRange: [number, number];
}

export type SortOption = 'price-low' | 'price-high' | 'popularity' | 'newest';