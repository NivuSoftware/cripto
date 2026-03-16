import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/acceso-admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/services' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Noticias', path: '/blog' },
    { name: 'Testimonios', path: '/testimonials' },
    { name: 'Contacto', path: '/contact' },
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/593987472745', '_blank');
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-[#f7931a]/20' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-[88px]">
          {/* Logo */}
          <Link to="/" className="flex h-full items-center group py-2">
            <img
              src="/images/logo.png"
              alt="HablemosCripto"
              className="h-9 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 relative group ${
                  location.pathname === item.path
                    ? 'text-[#f7931a]'
                    : 'text-gray-300 hover:text-[#f7931a]'
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#f7931a] to-[#d4af37] transform transition-transform duration-300 ${
                    location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          {!isAdminRoute && (
            <button
              onClick={handleWhatsAppClick}
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#f7931a] hover:bg-[#f7931a]/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-[#f7931a]/20"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-[#f7931a]/10 text-[#f7931a]'
                      : 'text-gray-300 hover:bg-[#f7931a]/5 hover:text-[#f7931a]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {!isAdminRoute && (
                <button
                  onClick={() => {
                    handleWhatsAppClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
