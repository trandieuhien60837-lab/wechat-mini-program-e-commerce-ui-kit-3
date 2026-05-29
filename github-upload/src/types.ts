/**
 * Types & Interfaces for WeChat E-commerce UI Kit
 */

export type PageId =
  | 'home'
  | 'categories'
  | 'list'
  | 'detail'
  | 'search'
  | 'cart'
  | 'checkout'
  | 'payment_select'
  | 'payment_result'
  | 'address_manage'
  | 'points_home'
  | 'points_detail'
  | 'points_history'
  | 'profile'
  | 'orders'
  | 'settings';

export type ScreenState = 'normal' | 'loading' | 'empty';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  sales: number;
  image: string;
  category: string;
  tags?: string[];
  specs?: string[];
  description: string;
  images: string[];
}

export interface PointsProduct {
  id: string;
  title: string;
  points: number;
  cashPrice?: number; // Some points products require cash as well (e.g., 2000 points + $5)
  originalPrice: number;
  image: string;
  stock: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSpec: string;
  checked: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending_pay' | 'pending_ship' | 'shipped' | 'completed' | 'refunded';
  address?: Address;
  createTime: string;
  payTime?: string;
  paymentMethod?: string;
}

export interface PointsLog {
  id: string;
  productTitle: string;
  pointsSpent: number;
  cashSpent?: number;
  date: string;
  status: 'pending' | 'shipped' | 'completed';
  code: string;
}
