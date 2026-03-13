import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "¿Qué es Bitcoin?",
      answer: "Bitcoin es la primera criptomoneda descentralizada del mundo, creada en 2009 por Satoshi Nakamoto. Es un sistema de dinero digital que opera sin necesidad de bancos centrales o intermediarios. Bitcoin utiliza tecnología blockchain para garantizar transacciones seguras, transparentes y verificables. Su suministro está limitado a 21 millones de unidades, lo que lo convierte en un activo escaso y valioso."
    },
    {
      question: "¿Qué es minería de Bitcoin?",
      answer: "La minería de Bitcoin es el proceso mediante el cual se verifican y registran nuevas transacciones en la blockchain. Los mineros utilizan hardware especializado para resolver complejos problemas matemáticos. Como recompensa por este trabajo, reciben nuevos bitcoins y comisiones de transacción. Es fundamental para mantener la seguridad y descentralización de la red Bitcoin."
    },
    {
      question: "¿Cómo puedo empezar?",
      answer: "Comenzar es muy sencillo. Primero, contáctanos por WhatsApp o a través de nuestro formulario de contacto. Evaluaremos tus objetivos y necesidades. Luego, te recomendaremos el curso o servicio más adecuado para ti. Si estás interesado en minería, te guiaremos en la selección de equipos y configuración. Ofrecemos acompañamiento completo desde el primer día."
    },
    {
      question: "¿Necesito inversión inicial?",
      answer: "Depende del servicio que elijas. Nuestros cursos educativos tienen costos accesibles con diferentes planes de pago. Para minería de Bitcoin, se requiere una inversión en hardware y electricidad, pero te ayudamos a calcular el retorno de inversión esperado. Ofrecemos diferentes opciones para que puedas comenzar según tu presupuesto. También proporcionamos asesoría financiera para maximizar tu inversión."
    },
    {
      question: "¿Puedo aprender desde cero?",
      answer: "¡Absolutamente! Nuestros cursos están diseñados específicamente para personas sin conocimientos previos en criptomonedas. Comenzamos con los conceptos básicos y avanzamos gradualmente. Utilizamos ejemplos prácticos y un lenguaje claro. Nuestros instructores tienen amplia experiencia enseñando a principiantes. Miles de estudiantes han comenzado desde cero y ahora operan exitosamente en el mundo cripto."
    },
    {
      question: "¿Es seguro invertir en Bitcoin?",
      answer: "Como cualquier inversión, Bitcoin tiene riesgos y oportunidades. Bitcoin ha demostrado ser resiliente durante más de una década. Nosotros te enseñamos cómo invertir de manera informada y segura, utilizando las mejores prácticas de seguridad. También cubrimos estrategias de gestión de riesgo y diversificación. La educación es clave para minimizar riesgos y maximizar oportunidades."
    },
    {
      question: "¿Qué resultados puedo esperar?",
      answer: "Los resultados varían según tu dedicación y estrategia. En educación, obtendrás conocimientos sólidos sobre Bitcoin y criptomonedas en 4-8 semanas. En minería, el retorno de inversión depende de factores como costo de electricidad y precio de Bitcoin. Nuestros estudiantes reportan mayor confianza para invertir y muchos generan ingresos pasivos. Proporcionamos proyecciones realistas basadas en datos del mercado."
    },
    {
      question: "¿Ofrecen soporte después del curso?",
      answer: "Sí, ofrecemos soporte continuo a todos nuestros estudiantes. Tendrás acceso a nuestra comunidad privada donde puedes hacer preguntas. Organizamos sesiones de actualización sobre tendencias del mercado. También tienes acceso a materiales educativos actualizados. Nuestro equipo está disponible para consultas técnicas y asesoramiento. El aprendizaje continúa después del curso formal."
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
              radial-gradient(circle at 30% 40%, rgba(247, 147, 26, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#f7931a]/20 to-[#d4af37]/20 border border-[#f7931a]/30 mb-4">
              <HelpCircle className="w-10 h-10 text-[#f7931a]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-[#f7931a] via-[#d4af37] to-[#ffeb3b] bg-clip-text text-transparent">
                Preguntas Frecuentes
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre Bitcoin, minería y nuestros servicios
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions? */}
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
              ¿Aún tienes preguntas?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte. Contáctanos y resolveremos todas tus dudas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/593987472745"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]"
              >
                Contactar por WhatsApp
              </a>
              <a
                href="/contact"
                className="inline-block px-8 py-4 border-2 border-[#f7931a] text-[#f7931a] rounded-lg hover:bg-[#f7931a]/10 transition-all duration-300 font-semibold"
              >
                Formulario de Contacto
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-xl p-6 text-left hover:border-[#f7931a]/50 transition-all duration-300 group"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#f7931a] transition-colors duration-300">
            {question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-6 h-6 text-[#f7931a]" />
          </motion.div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pt-2">
          <p className="text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
