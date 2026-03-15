import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Pickaxe, BookOpen, Newspaper } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Educación en Bitcoin",
      description: "Aprende todo sobre Bitcoin desde cero. Nuestros cursos están diseñados para personas sin conocimientos previos en criptomonedas.",
      features: [
        "Conceptos fundamentales de Bitcoin",
        "Seguridad y wallets",
        "Estrategias de inversión",
        "Análisis de mercado"
      ]
    },
    {
      icon: <Pickaxe className="w-12 h-12" />,
      title: "Minería de Bitcoin",
      description: "Comienza a minar Bitcoin con equipos de última generación. Te guiamos en cada paso del proceso de minería.",
      features: [
        "Hardware especializado",
        "Configuración y mantenimiento",
        "Monitoreo 24/7",
        "Retorno de inversión optimizado"
      ]
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Capacitaciones sobre Bitcoin y Minería",
      description: "Tenemos capacitacinoes y formaciones GRATUITAS sobre esta Tecnología Disruptiva. Gana conocimiento sobre Bitcoin y la Minería, se parte del 6% de la población mundial que entiende Bitcoin.",
      features: [
        "Capacitaciones y formaciones con profesionales en la minería de Bitcoin.",
        "Videos en YouTube para seguir aprendiendo.",
        "Eventos Elites por todo el mundo para estar al día sobre Bitcoin (Asia, Europa, LATAM).",
        "Cada 14 de Abril tenemos el evento de Gala desde Dubai y todos nuestros socios nos pueden acompañar.",
        "Siempre cuentas con equipos en varios idiomas para darte soporte cuando hay dudas."
      ]
    },
    {
      icon: <Newspaper className="w-12 h-12" />,
      title: "Noticias del mercado cripto",
      description: "Mantente actualizado con las últimas noticias y análisis del mercado de criptomonedas y Bitcoin.",
      features: [
        "Análisis diario del mercado",
        "Alertas de precio",
        "Tendencias y proyecciones",
        "Newsletter exclusivo"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7931a]/10 via-transparent to-transparent" />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(247, 147, 26, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)
            `
          }} />
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
                Nuestros Servicios
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Soluciones completas para tu entrada al mundo de Bitcoin y las criptomonedas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#f7931a]/10 to-[#d4af37]/10 border border-[#f7931a]/20 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Contáctanos y descubre cómo podemos ayudarte a alcanzar tus objetivos en el mundo cripto
            </p>
            <a
              href="https://wa.me/593987472745"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]"
            >
              Contactar por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface ServiceCardProps {
  service: {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
  };
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-2xl p-8 hover:border-[#f7931a]/50 transition-all duration-300"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7931a]/0 to-[#d4af37]/0 group-hover:from-[#f7931a]/5 group-hover:to-[#d4af37]/5 rounded-2xl transition-all duration-300" />
      
      <div className="relative space-y-6">
        {/* Icon */}
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#f7931a]/20 to-[#d4af37]/20 flex items-center justify-center text-[#f7931a] group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 pt-4 border-t border-[#f7931a]/10">
          {service.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 + i * 0.1 }}
              className="flex items-center gap-3 text-gray-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#f7931a]" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Decorative Corner */}
      <div className="absolute -top-1 -right-1 w-24 h-24 bg-gradient-to-br from-[#f7931a]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
