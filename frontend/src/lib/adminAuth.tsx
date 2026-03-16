import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { adminAuthService } from '../services/adminAuthService';
import type { AdminLoginCredentials, AdminUser } from '../types/admin';

interface AdminAuthContextValue {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (credentials: AdminLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    setIsLoading(true);

    try {
      const data = await adminAuthService.getSession();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshSession();
  }, []);

  const login = async (credentials: AdminLoginCredentials) => {
    const data = await adminAuthService.login(credentials);
    setUser(data.user ?? null);
  };

  const logout = async () => {
    try {
      await adminAuthService.logout();
    } finally {
      setUser(null);
    }
  };

  const value = {
    isLoading,
    isAuthenticated: Boolean(user),
    user,
    login,
    logout,
    refreshSession,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }

  return context;
}
