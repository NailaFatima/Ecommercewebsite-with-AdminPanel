export interface User {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'manager' | 'staff';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface AdminProduct {
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
  stock: number;
  lowStockThreshold: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  orderDate: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
  isActive: boolean;
  registrationDate: Date;
}

export interface Transaction {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  method: string;
  status: 'successful' | 'pending' | 'failed' | 'refunded';
  date: Date;
  refundAmount?: number;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  lowStockProducts: number;
  pendingOrders: number;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
  revenue: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  productCount: number;
}

export interface AdminSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  taxRate: number;
  shippingRate: number;
  freeShippingThreshold: number;
  currency: string;
}