import { FilePenLine, LogOut, Newspaper } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../lib/adminAuth';

export function AdminShell() {
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/acceso-admin', { replace: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src="/images/reveal.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/88 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,147,26,0.18),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-[#f7931a]/15 bg-black/65 p-6 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f7931a]/25 to-[#d4af37]/15 text-[#f7931a]">
              <FilePenLine className="h-7 w-7" />
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.35em] text-[#f7931a]">
                Panel editorial
              </p>
              <h1 className="text-3xl font-bold">Administrador de blog</h1>
              <p className="mt-2 text-sm text-gray-300">
                Gestiona publicaciones, borradores e imagenes del contenido desde un solo lugar.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
              Sesion: <span className="font-semibold text-white">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-[#f7931a]/25 bg-[#f7931a]/10 px-4 py-3 text-sm font-semibold text-[#f7b45f] transition hover:border-[#f7931a] hover:bg-[#f7931a]/15"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesion
            </button>
          </div>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-[#f7931a]/15 bg-black/60 p-4 backdrop-blur-xl">
            <nav className="space-y-2">
              <NavLink
                to="/admin/blog"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Newspaper className="h-4 w-4" />
                Posts del blog
              </NavLink>
            </nav>
          </aside>

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
