import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

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
                Testimonios
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Lo que dicen nuestros estudiantes y socios sobre HablemosCripto
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

      {/* All Testimonials Grid */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            Todos los Testimonios
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
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

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    image: string;
    rating: number;
    text: string;
  };
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-xl p-6 group hover:border-[#f7931a]/50 transition-all duration-300"
    >
      {/* Profile */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#f7931a]/30"
        />
        <div>
          <h4 className="text-white font-semibold">
            {testimonial.name}
          </h4>
          <p className="text-gray-400 text-sm">
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#f7931a] text-[#f7931a]" />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-300 text-sm leading-relaxed">
        "{testimonial.text}"
      </p>
    </motion.div>
  );
}
