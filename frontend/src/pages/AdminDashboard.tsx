import { motion } from 'framer-motion';
import { LogOut, Shield, UserCircle2, Waypoints } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../lib/adminAuth';

export default function AdminDashboard() {
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,147,26,0.2),transparent_35%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col gap-4 rounded-[28px] border border-[#f7931a]/20 bg-black/65 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#f7931a]">
              Area Privada
            </p>
            <h1 className="text-3xl font-bold">Panel administrativo</h1>
            <p className="mt-2 text-sm text-gray-300">
              Acceso restringido solo para usuarios administradores autenticados.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#f7931a]/30 bg-[#f7931a]/10 px-5 py-3 text-sm font-semibold text-[#f7b45f] transition hover:border-[#f7931a] hover:bg-[#f7931a]/15"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesion
          </button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          <AdminCard
            icon={<Shield className="h-6 w-6" />}
            title="Sesion protegida"
            description="Esta vista solo se renderiza cuando el backend valida la cookie de sesion admin."
          />
          <AdminCard
            icon={<UserCircle2 className="h-6 w-6" />}
            title="Usuario activo"
            description={user?.email ?? 'Administrador autenticado'}
          />
          <AdminCard
            icon={<Waypoints className="h-6 w-6" />}
            title="Ruta oculta"
            description="El acceso existe solo por URL y no aparece en la navegacion publica."
          />
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 rounded-[32px] border border-[#f7931a]/20 bg-gradient-to-br from-[#0d0d0d]/95 to-black/90 p-8 shadow-[0_0_50px_rgba(247,147,26,0.08)]"
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#d4af37]">
              Bienvenido
            </p>
            <h2 className="text-2xl font-bold text-white md:text-4xl">
              La sesion administrativa ya esta activa.
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-300">
              Desde aqui puedes extender el panel con modulos reales de gestion. La base ya quedo
              lista: autenticacion, proteccion de ruta y cierre de sesion, manteniendo el look del
              sitio con el mismo lenguaje visual e imagen de fondo.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function AdminCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[24px] border border-[#f7931a]/20 bg-black/60 p-6 backdrop-blur-lg"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f7931a]/20 to-[#d4af37]/20 text-[#f7931a]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-300">{description}</p>
    </motion.div>
  );
}
