import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, HelpCircle, Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "María González",
      role: "Emprendedora",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 5,
      text: "HablemosCripto cambió mi vida. Ahora comprendo Bitcoin y estoy generando ingresos pasivos con la minería. El equipo es increíblemente profesional y siempre dispuesto a ayudar."
    },
    {
      name: "Carlos Ramírez",
      role: "Inversor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 5,
      text: "Los cursos son excelentes. Aprendí desde cero y ahora manejo mi portafolio de criptomonedas con confianza. La inversión en educación valió totalmente la pena."
    },
    {
      name: "Ana Martínez",
      role: "Profesional en Tecnología",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 5,
      text: "La minería de Bitcoin con HablemosCripto ha superado mis expectativas. El retorno de inversión ha sido excelente y el soporte técnico es de primera clase."
    },
    {
      name: "Luis Fernández",
      role: "Empresario",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rating: 5,
      text: "Excelente plataforma educativa. Los instructores conocen profundamente el tema y te guían paso a paso. Recomiendo HablemosCripto al 100%."
    },
    {
      name: "Sandra López",
      role: "Estudiante",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      rating: 5,
      text: "Comencé sin saber nada de criptomonedas. Ahora entiendo la tecnología blockchain y estoy invirtiendo de manera inteligente. Gracias por la educación de calidad."
    },
    {
      name: "Roberto Silva",
      role: "Trader",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      rating: 5,
      text: "La comunidad de HablemosCripto es increíble. Siempre hay alguien dispuesto a ayudar y compartir conocimientos. Una experiencia educativa de primer nivel."
    }
  ];

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
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
                Testimonios y Preguntas
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Lo que dice nuestra comunidad y las respuestas clave para empezar con claridad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Testimonial Carousel */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Testimonial Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-2xl p-8 md:p-12 relative overflow-hidden"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 text-[#f7931a]/10">
                    <Quote className="w-24 h-24" />
                  </div>

                  <div className="relative z-10">
                    {/* Profile */}
                    <div className="flex items-center gap-6 mb-8">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#f7931a]/50"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {testimonials[currentIndex].name}
                        </h3>
                        <p className="text-gray-400">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-[#f7931a] text-[#f7931a]" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-[#f7931a]/10 border border-[#f7931a]/20 flex items-center justify-center text-[#f7931a] hover:bg-[#f7931a]/20 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-[#f7931a]/10 border border-[#f7931a]/20 flex items-center justify-center text-[#f7931a] hover:bg-[#f7931a]/20 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-[#f7931a] w-8'
                        : 'bg-[#f7931a]/30 hover:bg-[#f7931a]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center justify-center rounded-full border border-[#f7931a]/25 bg-[#f7931a]/10 p-4 text-[#f7931a]">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-gray-300 text-lg">
              Resolvemos las dudas más comunes sobre Bitcoin, minería y cómo comenzar con nosotros.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
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
              Únete a nuestra comunidad
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Sé parte de miles de personas que ya están transformando su futuro financiero
            </p>
            <a
              href="https://wa.me/593987472745"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]"
            >
              Comenzar Ahora
            </a>
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
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl border border-[#f7931a]/20 bg-gradient-to-br from-[#0a0a0a] to-black p-6 text-left transition-all duration-300 group hover:border-[#f7931a]/50"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#f7931a] transition-colors duration-300">
            {question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 text-[#f7931a]"
          >
            <ChevronDown className="w-6 h-6" />
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
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
