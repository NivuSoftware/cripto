import { apiRequest } from './http';
import type {
  AdminLoginCredentials,
  AdminLogoutResponse,
  AdminSessionResponse,
} from '../types/admin';

export const adminAuthService = {
  login(credentials: AdminLoginCredentials) {
    return apiRequest<AdminSessionResponse>({
      path: '/admin/login',
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getSession() {
    return apiRequest<AdminSessionResponse>({
      path: '/admin/session',
      method: 'GET',
    });
  },

  logout() {
    return apiRequest<AdminLogoutResponse>({
      path: '/admin/logout',
      method: 'POST',
    });
  },
};
