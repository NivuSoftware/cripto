import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Facebook, Instagram, MessageCircle, Youtube } from 'lucide-react';
import { Bitcoin } from './icons/Bitcoin';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69A4.83 4.83 0 0 1 15.86 3h-3.1v12.4a2.67 2.67 0 1 1-2.67-2.67c.23 0 .45.03.67.08V9.67a5.8 5.8 0 0 0-.67-.04A5.78 5.78 0 1 0 15.86 15V8.72a7.9 7.9 0 0 0 4.6 1.47V7.15c-.29 0-.58-.15-.87-.46Z" />
    </svg>
  );
}

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

  const socialLinks: Array<{
    name: string;
    href: string;
    icon: LucideIcon | typeof TikTokIcon;
  }> = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/dcjacome/',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/dvjacome/',
      icon: Instagram,
    },
    {
      name: 'TikTok',
      href: 'https://vm.tiktok.com/ZS98JrYVLj4N1-OMwWb/',
      icon: TikTokIcon,
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@hablemoscripto2025',
      icon: Youtube,
    },
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
                alt="¡Hablemos Cripto!"
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
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-10 h-10 rounded-lg bg-[#f7931a]/10 border border-[#f7931a]/20 flex items-center justify-center text-[#f7931a] hover:bg-[#f7931a] hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(247,147,26,0.3)]"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#f7931a]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} ¡Hablemos Cripto!. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Powered by</span>
              <Bitcoin className="w-4 h-4 text-[#f7931a] animate-pulse" />
              <span className="text-[#f7931a]">Bitcoin</span>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-6">
          <div className="flex justify-center">
            <a
              href="https://www.nivusoftware.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-center text-gray-400 transition-colors duration-300 hover:text-white"
            >
              <img
                src="/images/logo_nube.png"
                alt="Nivusoftware"
                className="h-5 w-auto object-contain"
              />
              <span className="text-sm sm:text-base">
                Desarrollado por <span className="font-semibold text-white">Nivusoftware</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Animated Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#f7931a]/50 to-transparent" />
    </footer>
  );
}
