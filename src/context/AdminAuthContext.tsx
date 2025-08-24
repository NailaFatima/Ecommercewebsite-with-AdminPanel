import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '../types/admin';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      } catch (error) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Mock authentication - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === 'admin' && password === 'admin123') {
        const user: User = {
          id: '1',
          username: 'admin',
          email: 'admin@stylehub.com',
          role: 'super_admin',
          isActive: true,
          lastLogin: new Date(),
          createdAt: new Date(),
        };
        
        const token = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify(user));
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        return true;
      } else if (username === 'manager' && password === 'manager123') {
        const user: User = {
          id: '2',
          username: 'manager',
          email: 'manager@stylehub.com',
          role: 'manager',
          isActive: true,
          lastLogin: new Date(),
          createdAt: new Date(),
        };
        
        const token = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify(user));
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    dispatch({ type: 'LOGOUT' });
  };

  const hasPermission = (permission: string): boolean => {
    if (!state.user) return false;
    
    const rolePermissions = {
      super_admin: ['*'],
      manager: ['products', 'orders', 'customers', 'inventory', 'analytics'],
      staff: ['orders', 'customers', 'inventory'],
    };
    
    const userPermissions = rolePermissions[state.user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};