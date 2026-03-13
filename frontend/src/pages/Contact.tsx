import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MessageCircle, Facebook, Send, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('¡Gracias por tu mensaje! Te contactaremos pronto.');
      setFormData({ nombre: '', email: '', mensaje: '' });
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7931a]/10 via-transparent to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-[#f7931a] via-[#d4af37] to-[#ffeb3b] bg-clip-text text-transparent">
                Contáctanos
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Estamos aquí para ayudarte a comenzar tu viaje en el mundo de Bitcoin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Envíanos un mensaje
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-gray-300 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#f7931a]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f7931a] transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#f7931a]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f7931a] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-gray-300 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#f7931a]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f7931a] transition-colors resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,147,26,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensaje
                    </>
                  )}
                </button>

                {submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#f7931a]/10 border border-[#f7931a]/30 rounded-lg text-[#f7931a] text-center"
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* WhatsApp CTA */}
              <div className="bg-gradient-to-br from-[#f7931a]/20 to-[#d4af37]/20 border border-[#f7931a]/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¿Quieres minar y tener Bitcoin?
                </h3>
                <p className="text-gray-300 mb-6">
                  Contáctanos directamente por WhatsApp para asesoría personalizada
                </p>
                <a
                  href="https://wa.me/593987472745"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Abrir WhatsApp
                </a>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <ContactItem
                  icon={<Phone className="w-6 h-6" />}
                  title="Teléfono"
                  content="(+593) 987472745"
                  href="tel:+593987472745"
                />

                <ContactItem
                  icon={<MessageCircle className="w-6 h-6" />}
                  title="WhatsApp"
                  content="(+593) 987472745"
                  href="https://wa.me/593987472745"
                />

                <ContactItem
                  icon={<Facebook className="w-6 h-6" />}
                  title="Facebook"
                  content="dcjacome"
                  href="https://www.facebook.com/dcjacome"
                />

                <ContactItem
                  icon={<MapPin className="w-6 h-6" />}
                  title="Ubicación"
                  content="Ecuador"
                />
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Síguenos en redes
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/dcjacome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-[#f7931a]/10 border border-[#f7931a]/20 flex items-center justify-center text-[#f7931a] hover:bg-[#f7931a] hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(247,147,26,0.3)]"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Horario de Atención
            </h2>
            <div className="max-w-md mx-auto space-y-3 text-gray-300">
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábados: 10:00 AM - 2:00 PM</p>
              <p>WhatsApp disponible 24/7</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}

function ContactItem({ icon, title, content, href }: ContactItemProps) {
  const Wrapper = href ? 'a' : 'div';
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Wrapper
      {...props}
      className="flex items-start gap-4 bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-xl p-6 hover:border-[#f7931a]/50 transition-all duration-300 group cursor-pointer"
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#f7931a]/20 to-[#d4af37]/20 flex items-center justify-center text-[#f7931a] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-left">
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-gray-400">{content}</p>
      </div>
    </Wrapper>
  );
}
