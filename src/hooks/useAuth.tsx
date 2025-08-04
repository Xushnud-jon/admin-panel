import { useState, useEffect } from 'react';
import type { AuthState, User } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(savedUser)
      });
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple demo authentication
    if (email === 'admin@store.com' && password === 'admin123') {
      const user: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@store.com',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      };
      
      setAuthState({
        isAuthenticated: true,
        user
      });
      
      localStorage.setItem('adminUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
    localStorage.removeItem('adminUser');
  };

  return {
    ...authState,
    login,
    logout
  };
};