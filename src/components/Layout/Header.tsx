import React, { useState } from 'react';
import { Menu, Bell, Search, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuToggle: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onLogout }) => {
  const { user } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden md:flex items-center ml-4 lg:ml-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>

              <button
                onClick={handleLogoutClick}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                <p className="text-sm text-gray-500">Are you sure you want to sign out?</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              You will be redirected to the login page and will need to sign in again to access the dashboard.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};