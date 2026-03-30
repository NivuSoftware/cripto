import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Target, Eye, Heart, Users } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../components/ui/carousel';

const teamMembers = [
  {
    id: 1,
    name: 'Diego C Jacome',
    image: '/images/diego.png',
  },
  {
    id: 2,
    name: 'Jacqueline Betancourt',
    image: '/images/jaqui.png',
  },
  {
    id: 3,
    name: 'Jordi Cornellà',
    image: '/images/jordi.png',
  },
  {
    id: 4,
    name: 'Jéssica Calderón',
    image: '/images/jess.png',
  },
  {
    id: 5,
    name: 'Peter Hash',
    image: '/images/peter.png',
  },
  {
    id: 6,
    name: 'Albert Castaño',
    image: '/images/albertt.png',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7931a]/10 via-transparent to-transparent" />
          <BlockchainNodes />
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
                Sobre Nosotros
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Liderando la revolución de la educación en criptomonedas y minería de Bitcoin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <StorySection
        icon={<Users className="w-16 h-16" />}
        title="Nuestra Historia"
        description="¡Hablemos Cripto! nació de la visión de democratizar el acceso a Bitcoin y las criptomonedas. Comenzamos como un grupo de entusiastas apasionados por la tecnología blockchain y nos hemos convertido en líderes en educación y minería de Bitcoin en América Latina y Europa."
        year="2015"
      />

      <StorySection
        icon={<Target className="w-16 h-16" />}
        title="Nuestra Misión"
        description="Empoderar a personas y empresarios para que tomen el control de su futuro financiero a través de la educación en criptomonedas y acceso a minería de Bitcoin de clase mundial. Creemos que todos merecen la oportunidad de participar en la revolución financiera digital."
        reverse
      />

      <StorySection
        icon={<Eye className="w-16 h-16" />}
        title="Nuestra Visión"
        description="Ser la plataforma educativa y de minería de Bitcoin más confiable de América Latina y Europa, reconocida por nuestra excelencia, transparencia y compromiso con el éxito de nuestros estudiantes y socios. Visualizamos un futuro donde Bitcoin es accesible para todos."
      />

      <StorySection
        icon={<Heart className="w-16 h-16" />}
        title="Impacto en Educación Cripto"
        description="Hemos capacitado a miles de personas en el mundo de las criptomonedas, transformando vidas y creando oportunidades. Nuestros programas educativos han ayudado a emprendedores, profesionales y entusiastas a comprender y aprovechar el poder de Bitcoin y la tecnología blockchain."
        reverse
      />

      <TeamSection />
      <TeamCarouselSection />

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="55 000 +" label="Miembros mineros globales" />
            <StatCard number="65 000 +" label="Equipos ASIC MINERIA" />
            <StatCard number="230 millones" label="en Equipos de Minería" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f7931a]/5 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nuestros Valores
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard title="Transparencia" description="TRabajamos con filosofía Blockchain: No confíes, Verifica." />
            <ValueCard title="Excelencia" description="Educamos y generamos desde EL EJEMPLO." />
            <ValueCard title="Innovación" description="Adaptamos tecnología financiera que sea monetizable." />
            <ValueCard title="Comunidad" description="Educar a miles de personas en este cambio financiero digital." />
          </div>
        </div>
      </section>
    </div>
  );
}

function BlockchainNodes() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="node-gradient">
          <stop offset="0%" stopColor="#f7931a" />
          <stop offset="100%" stopColor="#d4af37" />
        </radialGradient>
      </defs>
      {[...Array(20)].map((_, i) => {
        const x = (i * 123 + 100) % 100;
        const y = (i * 456 + 200) % 100;
        return (
          <motion.circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r="2"
            fill="url(#node-gradient)"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        );
      })}
    </svg>
  );
}

interface StorySectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  reverse?: boolean;
  year?: string;
}

function StorySection({ icon, title, description, reverse, year }: StorySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className={`flex justify-center ${reverse ? 'lg:order-2' : ''}`}
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f7931a]/30 to-[#d4af37]/30 blur-3xl"
              />
              <div className="relative bg-gradient-to-br from-[#f7931a]/10 to-[#d4af37]/10 p-12 rounded-2xl border border-[#f7931a]/20">
                <div className="text-[#f7931a]">
                  {icon}
                </div>
                {year && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black px-4 py-2 rounded-lg font-bold text-sm">
                    {year}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`space-y-6 ${reverse ? 'lg:order-1' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {title}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f7931a]/5 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <span className="inline-flex rounded-full border border-[#f7931a]/30 bg-[#f7931a]/10 px-4 py-1 text-sm font-semibold tracking-[0.3em] text-[#f7931a]">
              TEAM
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              El equipo detrás de ¡Hablemos Cripto!
            </h2>
            <p className="text-lg leading-relaxed text-gray-300 max-w-xl">
              Contamos con un equipo comprometido con la educación, la estrategia y el crecimiento dentro del ecosistema Bitcoin. Trabajamos para acompañar a nuestra comunidad con experiencia, cercanía y visión de largo plazo. <strong>Educamos desde EL RESULTADO. </strong>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-[#f7931a]/25 to-[#d4af37]/20 blur-2xl" />
            <div className="relative h-[320px] w-full overflow-hidden rounded-[2rem] border border-[#f7931a]/30 bg-[radial-gradient(circle_at_top,rgba(247,147,26,0.18),transparent_45%),linear-gradient(135deg,#111_0%,#050505_100%)] md:h-[420px]">
              <img
                src="/images/team.jpeg"
                alt="Equipo de Hablemos Cripto"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TeamCarouselSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const autoSlide = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 2800);

    return () => window.clearInterval(autoSlide);
  }, [carouselApi]);

  return (
    <section ref={ref} className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f7931a]/5 to-transparent" />

      <div className="flex flex-col relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <h3 className="text-center mt-4 text-3xl md:text-4xl font-bold text-white">
            Conoce a nuestro equipo!
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-[#f7931a]/25 to-[#d4af37]/20 blur-2xl" />
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#f7931a]/30 bg-[radial-gradient(circle_at_top,rgba(247,147,26,0.16),transparent_45%),linear-gradient(135deg,#111_0%,#050505_100%)] px-6 pb-16 pt-7 md:px-8 md:pt-8">
            <Carousel
              setApi={setCarouselApi}
              opts={{ align: 'start', loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {teamMembers.map((member) => (
                  <CarouselItem key={member.id} className="basis-[84%] sm:basis-1/2 xl:basis-1/3">
                    <TeamMemberCard name={member.name} image={member.image} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 top-auto bottom-4 -translate-y-0 border-[#f7931a]/40 bg-black/80 text-[#f7931a] hover:bg-[#f7931a]/10" />
              <CarouselNext className="right-3 top-auto bottom-4 -translate-y-0 border-[#f7931a]/40 bg-black/80 text-[#f7931a] hover:bg-[#f7931a]/10" />
            </Carousel>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface TeamMemberCardProps {
  name: string;
  image: string;
}

function TeamMemberCard({ name, image }: TeamMemberCardProps) {
  return (
    <article className="group h-full rounded-2xl border border-[#f7931a]/20 bg-black/45 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#f7931a]/55">
      <div className="mb-4 aspect-[4/5] w-full overflow-hidden rounded-xl border border-[#f7931a]/25 bg-gradient-to-br from-[#f7931a]/10 to-[#d4af37]/10">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h4 className="text-lg font-semibold text-white">
        {name}
      </h4>
    </article>
  );
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-xl p-8 text-center group hover:border-[#f7931a]/50 transition-all duration-300"
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#f7931a] to-[#d4af37] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <div className="text-gray-400 text-lg">
        {label}
      </div>
    </motion.div>
  );
}

interface ValueCardProps {
  title: string;
  description: string;
}

function ValueCard({ title, description }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-[#0a0a0a] to-black border border-[#f7931a]/20 rounded-xl p-6 text-center group hover:border-[#f7931a]/50 transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-[#f7931a] mb-2 group-hover:scale-105 transition-transform duration-300">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">
        {description}
      </p>
    </motion.div>
  );
}
