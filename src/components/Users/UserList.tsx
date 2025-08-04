import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit3,
  UserPlus,
  Mail,
  Calendar,
  DollarSign,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  User,
  X
} from 'lucide-react';
import type { Customer } from '../../types';
import { mockCustomers } from '../../data/mockData';

export const UserList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const statuses = ['all', 'active', 'inactive'];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleCustomerStatus = (customerId: string) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId 
        ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' }
        : customer
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage customer accounts and information</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center font-medium transition-colors">
          <UserPlus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
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
                  {status === 'all' ? 'All Users' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredCustomers.length} of {customers.length} users
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                customer.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {customer.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Joined {formatDate(customer.joinDate)}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <ShoppingBag className="w-4 h-4 mr-2" />
                {customer.totalOrders} orders
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                {formatPrice(customer.totalSpent)} spent
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedCustomer(customer)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
              
              <button
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit User"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              
              <button
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => toggleCustomerStatus(customer.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  customer.status === 'active'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {customer.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} results
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

      {/* User Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={selectedCustomer.avatar}
                    alt={selectedCustomer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-6">
                  <h4 className="text-xl font-semibold text-gray-900">{selectedCustomer.name}</h4>
                  <p className="text-gray-600">{selectedCustomer.email}</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    selectedCustomer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-medium text-gray-900">Account Information</h5>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-600">Joined:</span>
                      <span className="ml-2 font-medium">{formatDate(selectedCustomer.joinDate)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-600">User ID:</span>
                      <span className="ml-2 font-medium">{selectedCustomer.id}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-medium text-gray-900">Purchase History</h5>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <ShoppingBag className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-600">Total Orders:</span>
                      <span className="ml-2 font-medium">{selectedCustomer.totalOrders}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-600">Total Spent:</span>
                      <span className="ml-2 font-medium">{formatPrice(selectedCustomer.totalSpent)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-600">Average Order:</span>
                      <span className="ml-2 font-medium">
                        {formatPrice(selectedCustomer.totalSpent / Math.max(selectedCustomer.totalOrders, 1))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h5 className="font-medium text-gray-900 mb-4">Quick Actions</h5>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Send Email
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    View Orders
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Edit Profile
                  </button>
                  <button
                    onClick={() => toggleCustomerStatus(selectedCustomer.id)}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                      selectedCustomer.status === 'active'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {selectedCustomer.status === 'active' ? 'Deactivate User' : 'Activate User'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedCustomer(null)}
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