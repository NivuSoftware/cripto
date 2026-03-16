import { motion } from 'framer-motion';
import { useState } from 'react';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../lib/adminAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo =
    typeof location.state?.from === 'string' && location.state.from.startsWith('/')
      ? location.state.from
      : '/admin';

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'No fue posible iniciar sesion');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src="/images/reveal.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-[#120700]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,147,26,0.25),transparent_42%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md rounded-[28px] border border-[#f7931a]/20 bg-black/70 p-8 shadow-[0_0_60px_rgba(247,147,26,0.12)] backdrop-blur-xl"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <img
              src="/images/logo.png"
              alt="HablemosCripto"
              className="mb-5 h-14 w-auto object-contain"
            />
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f7931a]/25 bg-[#f7931a]/10 text-[#f7931a]">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-bold text-white">Acceso administrativo</h1>
            <p className="mt-3 text-sm text-gray-300">
              Inicia sesion para entrar al panel privado.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm text-gray-300">
                Correo
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-xl border border-[#f7931a]/15 bg-[#0f0f0f]/90 px-4 py-3 text-white outline-none transition focus:border-[#f7931a] focus:ring-2 focus:ring-[#f7931a]/20"
                placeholder="admin@hablemoscripto.com"
              />
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="password" className="text-sm text-gray-300">
                Contrasena
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f7931a]" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-xl border border-[#f7931a]/15 bg-[#0f0f0f]/90 py-3 pl-11 pr-4 text-white outline-none transition focus:border-[#f7931a] focus:ring-2 focus:ring-[#f7931a]/20"
                  placeholder="Ingresa tu contrasena"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-[#f7931a] to-[#d4af37] px-4 py-3 font-semibold text-black transition hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(247,147,26,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Ingresando...' : 'Iniciar sesion'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
