import { AdminProduct, AdminOrder, Customer, Transaction, DashboardStats, SalesData, Category } from '../types/admin';

export const mockProducts: AdminProduct[] = [
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
    description: 'Premium quality cotton t-shirt with a comfortable fit.',
    features: ['100% Cotton', 'Machine Washable', 'Comfortable Fit'],
    stock: 45,
    lowStockThreshold: 10,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    price: 79.99,
    category: 'Jeans',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Light Blue'],
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'
    ],
    description: 'Modern slim-fit jeans with premium denim fabric.',
    features: ['Slim Fit', 'Premium Denim', 'Five Pocket Design'],
    stock: 8,
    lowStockThreshold: 10,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    name: 'Casual Button Shirt',
    price: 49.99,
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Light Blue'],
    images: [
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg'
    ],
    description: 'Versatile button-up shirt for casual and semi-formal occasions.',
    features: ['Cotton Blend', 'Classic Fit', 'Button Closure'],
    stock: 23,
    lowStockThreshold: 15,
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
  },
];

export const mockOrders: AdminOrder[] = [
  {
    id: 'ORD1704067200000',
    customerId: 'CUST001',
    customerName: 'John Doe',
    customerEmail: 'john.doe@email.com',
    items: [
      {
        productId: '1',
        productName: 'Classic Cotton T-Shirt',
        price: 29.99,
        quantity: 2,
        size: 'M',
        color: 'White',
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg'
      }
    ],
    total: 69.97,
    status: 'processing',
    paymentMethod: 'Credit Card',
    paymentStatus: 'completed',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      phone: '+1-555-0123'
    },
    orderDate: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: 'ORD1704153600000',
    customerId: 'CUST002',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@email.com',
    items: [
      {
        productId: '2',
        productName: 'Slim Fit Denim Jeans',
        price: 79.99,
        quantity: 1,
        size: '32',
        color: 'Blue',
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'
      }
    ],
    total: 89.98,
    status: 'shipped',
    paymentMethod: 'UPI',
    paymentStatus: 'completed',
    shippingAddress: {
      name: 'Jane Smith',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      zipCode: '90210',
      phone: '+1-555-0456'
    },
    orderDate: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-03'),
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0123',
    totalOrders: 5,
    totalSpent: 349.95,
    lastOrderDate: new Date('2024-01-01'),
    isActive: true,
    registrationDate: new Date('2023-12-01'),
  },
  {
    id: 'CUST002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1-555-0456',
    totalOrders: 3,
    totalSpent: 269.97,
    lastOrderDate: new Date('2024-01-02'),
    isActive: true,
    registrationDate: new Date('2023-11-15'),
  },
  {
    id: 'CUST003',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1-555-0789',
    totalOrders: 1,
    totalSpent: 79.99,
    lastOrderDate: new Date('2023-12-28'),
    isActive: true,
    registrationDate: new Date('2023-12-20'),
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    orderId: 'ORD1704067200000',
    customerId: 'CUST001',
    amount: 69.97,
    method: 'Credit Card',
    status: 'successful',
    date: new Date('2024-01-01'),
  },
  {
    id: 'TXN002',
    orderId: 'ORD1704153600000',
    customerId: 'CUST002',
    amount: 89.98,
    method: 'UPI',
    status: 'successful',
    date: new Date('2024-01-02'),
  },
];

export const mockDashboardStats: DashboardStats = {
  totalSales: 1250,
  totalOrders: 45,
  totalCustomers: 128,
  totalRevenue: 15750.50,
  lowStockProducts: 3,
  pendingOrders: 8,
};

export const mockSalesData: SalesData[] = [
  { date: '2024-01-01', sales: 12, orders: 8, revenue: 450.50 },
  { date: '2024-01-02', sales: 18, orders: 12, revenue: 720.25 },
  { date: '2024-01-03', sales: 15, orders: 10, revenue: 580.75 },
  { date: '2024-01-04', sales: 22, orders: 15, revenue: 890.00 },
  { date: '2024-01-05', sales: 28, orders: 18, revenue: 1120.30 },
  { date: '2024-01-06', sales: 25, orders: 16, revenue: 980.45 },
  { date: '2024-01-07', sales: 30, orders: 20, revenue: 1250.80 },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'T-Shirts', description: 'Casual and formal t-shirts', isActive: true, productCount: 25 },
  { id: '2', name: 'Jeans', description: 'Denim jeans and pants', isActive: true, productCount: 18 },
  { id: '3', name: 'Shirts', description: 'Button-up shirts', isActive: true, productCount: 22 },
  { id: '4', name: 'Hoodies', description: 'Comfortable hoodies and sweatshirts', isActive: true, productCount: 15 },
  { id: '5', name: 'Dresses', description: 'Elegant dresses for all occasions', isActive: true, productCount: 12 },
  { id: '6', name: 'Shorts', description: 'Casual and athletic shorts', isActive: false, productCount: 8 },
];