import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { PageSeo } from '../components/PageSeo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
      <PageSeo
        title="Página no encontrada"
        description="La página solicitada no existe."
        path="/404"
        noindex
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* 404 Text */}
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 blur-3xl bg-gradient-to-r from-[#f7931a]/30 to-[#d4af37]/30"
            />
            <h1 className="relative text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#f7931a] via-[#d4af37] to-[#ffeb3b] bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Página no encontrada
            </h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]"
            >
              <Home className="w-5 h-5" />
              Ir al Inicio
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#f7931a] text-[#f7931a] rounded-lg hover:bg-[#f7931a]/10 transition-all duration-300 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver Atrás
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
