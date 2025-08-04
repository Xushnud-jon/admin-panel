import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Store 
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'users', label: 'Users', icon: Users },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isOpen }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => {}}
        />
      )}
      
      <aside className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 flex flex-col
      `}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">Store Admin</h1>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onPageChange(item.id)}
                    className={`
                      w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Version 1.0.0
          </div>
        </div>
      </aside>
    </>
  );
};