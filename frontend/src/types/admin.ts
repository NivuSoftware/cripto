export interface AdminUser {
  id: number;
  email: string;
  is_admin: boolean;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminSessionResponse {
  authenticated: boolean;
  user: AdminUser;
  panel_title?: string;
}

export interface AdminLogoutResponse {
  authenticated: boolean;
}
