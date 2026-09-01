'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { superAdminApi } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error('Session validation failed', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      // Direct call using fetch since api.ts handles token
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login' || 'http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...credentials, role: 'SuperAdmin' }),
      });
      const data = await res.json();
      
      if (data.success && data.data) {
        const { accessToken, user: userData } = data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        router.push('/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Attempt backend logout if needed, then clear local state
    fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/logout' || 'http://localhost:5000/api/v1/auth/logout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
