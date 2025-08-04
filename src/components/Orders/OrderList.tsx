import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { Order } from '../../types';
import { mockOrders } from '../../data/mockData';

export const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
        <div className="mt-4 sm:mt-0 text-sm text-gray-600">
          Total: {orders.length} orders
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Products</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Total</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-right py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-blue-600">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {order.products.length} item{order.products.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-gray-500 truncate max-w-xs">
                        {order.products.map(p => p.name).join(', ')}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{formatPrice(order.total)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{order.orderDate}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Order ID:</span> {selectedOrder.id}</p>
                    <p><span className="text-gray-500">Date:</span> {selectedOrder.orderDate}</p>
                    <p><span className="text-gray-500">Status:</span> 
                      <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-1">{selectedOrder.status}</span>
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> {selectedOrder.customerName}</p>
                    <p><span className="text-gray-500">Email:</span> {selectedOrder.customerEmail}</p>
                    <p><span className="text-gray-500">Address:</span> {selectedOrder.shippingAddress}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-900">Qty</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">Price</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.products.map((product, index) => (
                        <tr key={index}>
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4 text-center">{product.quantity}</td>
                          <td className="py-3 px-4 text-right">{formatPrice(product.price)}</td>
                          <td className="py-3 px-4 text-right font-medium">
                            {formatPrice(product.price * product.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="py-3 px-4 font-medium text-gray-900">Total</td>
                        <td className="py-3 px-4 text-right font-bold text-lg">
                          {formatPrice(selectedOrder.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};