import React, { useState } from 'react';
import { LoginPage } from './components/Auth/LoginPage';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { ProductList } from './components/Products/ProductList';
import { AddProduct } from './components/Products/AddProduct';
import { OrderList } from './components/Orders/OrderList';
import { UserList } from './components/Users/UserList';
import { useAuth } from './hooks/useAuth';
import type { Product } from './types';
import { mockProducts } from './data/mockData';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('dashboard');
  };

  const handleAddProduct = () => {
    setCurrentPage('add-product');
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setCurrentPage('add-product');
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts([newProduct, ...products]);
    }
    
    setCurrentPage('products');
    setEditingProduct(null);
  };

  const handleBackToProducts = () => {
    setCurrentPage('products');
    setEditingProduct(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'products':
        return (
          <ProductList 
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
          />
        );
      case 'add-product':
        return (
          <AddProduct
            onBack={handleBackToProducts}
            onSave={handleSaveProduct}
            editingProduct={editingProduct}
          />
        );
      case 'orders':
        return (
          <OrderList />
        );
      case 'users':
        return (
          <UserList />
        );
      default:
        return <DashboardHome />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onLogout={handleLogout}
    >
      {renderCurrentPage()}
    </DashboardLayout>
  );
}

export default App;