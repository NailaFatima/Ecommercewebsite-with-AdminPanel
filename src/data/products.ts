import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg'
    ],
    description: 'Premium quality cotton t-shirt with a comfortable fit. Perfect for everyday wear.',
    features: ['100% Cotton', 'Machine Washable', 'Comfortable Fit', 'Durable Fabric'],
    rating: 4.5,
    reviews: 128,
    isNew: false,
    isSale: true
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    price: 79.99,
    category: 'Jeans',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Light Blue'],
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      'https://images.pexels.com/photos/7679447/pexels-photo-7679447.jpeg'
    ],
    description: 'Modern slim-fit jeans with premium denim fabric. Comfortable and stylish.',
    features: ['Slim Fit', 'Premium Denim', 'Five Pocket Design', 'Belt Loops'],
    rating: 4.8,
    reviews: 89,
    isNew: true
  },
  {
    id: '3',
    name: 'Casual Button Shirt',
    price: 49.99,
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Light Blue', 'Gray'],
    images: [
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg',
      'https://images.pexels.com/photos/7679480/pexels-photo-7679480.jpeg'
    ],
    description: 'Versatile button-up shirt suitable for both casual and semi-formal occasions.',
    features: ['Cotton Blend', 'Classic Fit', 'Button Closure', 'Collar Design'],
    rating: 4.3,
    reviews: 64
  },
  {
    id: '4',
    name: 'Comfortable Hoodie',
    price: 59.99,
    category: 'Hoodies',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Maroon'],
    images: [
      'https://images.pexels.com/photos/7679448/pexels-photo-7679448.jpeg',
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg'
    ],
    description: 'Cozy hoodie with a soft fleece lining. Perfect for cool weather.',
    features: ['Fleece Lined', 'Kangaroo Pocket', 'Drawstring Hood', 'Ribbed Cuffs'],
    rating: 4.6,
    reviews: 156
  },
  {
    id: '5',
    name: 'Summer Dress',
    price: 69.99,
    originalPrice: 89.99,
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral', 'Solid Blue', 'Black', 'White'],
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg'
    ],
    description: 'Elegant summer dress with a flattering silhouette. Perfect for special occasions.',
    features: ['Flowing Fabric', 'Flattering Cut', 'Zipper Closure', 'Lined'],
    rating: 4.7,
    reviews: 92,
    isSale: true
  },
  {
    id: '6',
    name: 'Athletic Shorts',
    price: 34.99,
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray', 'Red'],
    images: [
      'https://images.pexels.com/photos/7679447/pexels-photo-7679447.jpeg',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'
    ],
    description: 'Lightweight athletic shorts with moisture-wicking fabric. Great for workouts.',
    features: ['Moisture Wicking', 'Elastic Waistband', 'Side Pockets', 'Quick Dry'],
    rating: 4.4,
    reviews: 203,
    isNew: true
  }
];

export const categories = ['T-Shirts', 'Jeans', 'Shirts', 'Hoodies', 'Dresses', 'Shorts'];
export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38'];
export const colors = ['White', 'Black', 'Navy', 'Gray', 'Blue', 'Light Blue', 'Red', 'Maroon', 'Floral'];