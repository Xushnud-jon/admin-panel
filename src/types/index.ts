export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippingAddress: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}