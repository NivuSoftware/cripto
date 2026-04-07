import { motion } from 'framer-motion';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { MessageCircle, Facebook, Instagram, Send, Phone, Youtube } from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { absoluteUrl, createBreadcrumbSchema } from '../lib/site';
import { contactService } from '../services/contactService';

type SubmitState = 'idle' | 'success' | 'error';

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

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await contactService.send(formData);

      setSubmitState('success');
      setSubmitMessage(response.message || '¡Gracias por tu mensaje! Te contactaremos pronto.');
      setFormData({ nombre: '', telefono: '', email: '', mensaje: '' });

      setTimeout(() => {
        setSubmitMessage('');
        setSubmitState('idle');
      }, 5000);
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'No pudimos enviar tu mensaje en este momento. Inténtalo nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (submitMessage) {
      setSubmitMessage('');
      setSubmitState('idle');
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <PageSeo
        title="Contacto para asesoría en Bitcoin y minería"
        description="Habla con ¡Hablemos Cripto! para recibir asesoría sobre Bitcoin, minería de Bitcoin, formación cripto y oportunidades dentro del ecosistema digital."
        path="/contact"
        keywords={[
          'contacto bitcoin',
          'asesoria bitcoin',
          'consultoria mineria bitcoin',
          'whatsapp bitcoin ecuador',
          'contacto cripto',
        ]}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contacto | ¡Hablemos Cripto!',
            description:
              'Canales de contacto para solicitar información y asesoría sobre Bitcoin, minería y educación cripto.',
            url: absoluteUrl('/contact'),
            inLanguage: 'es',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: '¡Hablemos Cripto!',
            url: absoluteUrl('/'),
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '+593987472745',
                contactType: 'customer support',
                availableLanguage: ['es', 'en'],
                areaServed: ['EC', 'ES', 'LATAM'],
              },
            ],
          },
          createBreadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Contacto', path: '/contact' },
          ]),
        ]}
      />

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
                  <label htmlFor="telefono" className="block text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#f7931a]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f7931a] transition-colors"
                    placeholder="+593 987 472 745"
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
                    className={`rounded-lg border p-4 text-center ${
                      submitState === 'error'
                        ? 'border-red-500/30 bg-red-500/10 text-red-200'
                        : 'border-[#f7931a]/30 bg-[#f7931a]/10 text-[#f7b45f]'
                    }`}
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
                  icon={<Facebook className="w-6 h-6" />}
                  title="Facebook"
                  content="dcjacome"
                  href="https://www.facebook.com/dcjacome/"
                />

              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Síguenos en redes
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map(({ name, href, icon: Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="w-12 h-12 rounded-lg bg-[#f7931a]/10 border border-[#f7931a]/20 flex items-center justify-center text-[#f7931a] hover:bg-[#f7931a] hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(247,147,26,0.3)]"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
