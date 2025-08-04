import type { Product, Order, Customer } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 129.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    category: 'Clothing',
    description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors.',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    category: 'Electronics',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and smartphone notifications.',
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    name: 'Leather Crossbody Bag',
    price: 89.99,
    image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    category: 'Accessories',
    description: 'Handcrafted genuine leather crossbody bag perfect for everyday use.',
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'Ceramic Coffee Mug Set',
    price: 34.99,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    category: 'Home & Kitchen',
    description: 'Set of 4 beautiful ceramic coffee mugs with modern minimalist design.',
    createdAt: '2024-01-11'
  },
  {
    id: '6',
    name: 'Portable Phone Charger',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4316/smartphone-technology-phone-mobile.jpg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    category: 'Electronics',
    description: '10000mAh portable power bank with fast charging and multiple USB ports.',
    createdAt: '2024-01-10'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john.doe@email.com',
    products: [
      { id: '1', name: 'Wireless Bluetooth Headphones', quantity: 1, price: 129.99 }
    ],
    total: 129.99,
    status: 'delivered',
    orderDate: '2024-01-15',
    shippingAddress: '123 Main St, New York, NY 10001'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@email.com',
    products: [
      { id: '2', name: 'Organic Cotton T-Shirt', quantity: 2, price: 24.99 },
      { id: '4', name: 'Leather Crossbody Bag', quantity: 1, price: 89.99 }
    ],
    total: 139.97,
    status: 'processing',
    orderDate: '2024-01-14',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike.johnson@email.com',
    products: [
      { id: '3', name: 'Smart Fitness Watch', quantity: 1, price: 199.99 }
    ],
    total: 199.99,
    status: 'shipped',
    orderDate: '2024-01-13',
    shippingAddress: '789 Pine St, Chicago, IL 60601'
  },
  {
    id: 'ORD-004',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah.wilson@email.com',
    products: [
      { id: '5', name: 'Ceramic Coffee Mug Set', quantity: 1, price: 34.99 },
      { id: '6', name: 'Portable Phone Charger', quantity: 1, price: 39.99 }
    ],
    total: 74.98,
    status: 'pending',
    orderDate: '2024-01-12',
    shippingAddress: '321 Elm St, Miami, FL 33101'
  },
  {
    id: 'ORD-005',
    customerName: 'David Brown',
    customerEmail: 'david.brown@email.com',
    products: [
      { id: '1', name: 'Wireless Bluetooth Headphones', quantity: 1, price: 129.99 },
      { id: '3', name: 'Smart Fitness Watch', quantity: 1, price: 199.99 }
    ],
    total: 329.98,
    status: 'cancelled',
    orderDate: '2024-01-11',
    shippingAddress: '654 Maple Dr, Seattle, WA 98101'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    joinDate: '2023-06-15',
    totalOrders: 5,
    totalSpent: 649.95,
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    joinDate: '2023-08-22',
    totalOrders: 3,
    totalSpent: 299.97,
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    joinDate: '2023-04-10',
    totalOrders: 8,
    totalSpent: 1299.92,
    status: 'active'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    joinDate: '2023-09-05',
    totalOrders: 2,
    totalSpent: 149.98,
    status: 'active'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@email.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    joinDate: '2023-03-18',
    totalOrders: 1,
    totalSpent: 329.98,
    status: 'inactive'
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    joinDate: '2023-07-12',
    totalOrders: 6,
    totalSpent: 899.94,
    status: 'active'
  }
];