import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../lib/adminAuth';

export function AdminRoute() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="rounded-2xl border border-[#f7931a]/20 bg-black/70 px-6 py-4 text-sm text-gray-300 backdrop-blur-md">
          Verificando acceso...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/acceso-admin" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
