import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';

const stats = [
  {
    name: 'Total Products',
    value: '1,234',
    change: '+12%',
    changeType: 'increase',
    icon: Package,
    color: 'bg-blue-500'
  },
  {
    name: 'Total Orders',
    value: '856',
    change: '+8%',
    changeType: 'increase',
    icon: ShoppingCart,
    color: 'bg-green-500'
  },
  {
    name: 'Total Users',
    value: '2,341',
    change: '+23%',
    changeType: 'increase',
    icon: Users,
    color: 'bg-purple-500'
  },
  {
    name: 'Revenue',
    value: '$45,231',
    change: '-3%',
    changeType: 'decrease',
    icon: DollarSign,
    color: 'bg-yellow-500'
  }
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: '$129.99', status: 'completed' },
  { id: '#ORD-002', customer: 'Jane Smith', product: 'Cotton T-Shirt', amount: '$24.99', status: 'pending' },
  { id: '#ORD-003', customer: 'Mike Johnson', product: 'Fitness Watch', amount: '$199.99', status: 'processing' },
  { id: '#ORD-004', customer: 'Sarah Wilson', product: 'Leather Bag', amount: '$89.99', status: 'completed' },
];

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.changeType === 'increase' ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{order.amount}</p>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Sales Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chart visualization would go here</p>
              <p className="text-sm text-gray-400">Connect your analytics service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};