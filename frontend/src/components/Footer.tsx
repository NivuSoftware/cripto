import { Link } from 'react-router-dom';
import { Facebook, MessageCircle } from 'lucide-react';
import { Bitcoin } from './icons/Bitcoin';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Noticias', path: '/blog' },
    { name: 'Servicios', path: '/services' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Testimonios', path: '/testimonials' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <footer className="relative bg-black border-t border-[#f7931a]/20 overflow-hidden">
      {/* Tech Grid Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(247, 147, 26, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(247, 147, 26, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center group">
              <img
                src="/images/logo.png"
                alt="HablemosCripto"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Educación en activos digitales y minería de Bitcoin. Construyendo el futuro financiero.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#f7931a] mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#f7931a] text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#f7931a] mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/593987472745"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#f7931a] text-sm transition-colors duration-300 group"
                >
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>(+593) 987472745</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-[#f7931a] mb-4">Síguenos</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/dcjacome"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#f7931a]/10 border border-[#f7931a]/20 flex items-center justify-center text-[#f7931a] hover:bg-[#f7931a] hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(247,147,26,0.3)]"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#f7931a]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} HablemosCripto. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Powered by</span>
              <Bitcoin className="w-4 h-4 text-[#f7931a] animate-pulse" />
              <span className="text-[#f7931a]">Bitcoin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#f7931a]/50 to-transparent" />
    </footer>
  );
}
