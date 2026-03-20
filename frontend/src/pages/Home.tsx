import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { CurrencyBitcoinCircleIcon } from '../components/icons/CurrencyBitcoinCircleIcon';
import { Shield, TrendingUp, Award, CheckCircle, ChevronDown, MessageCircle, CalendarDays, ChevronRight } from 'lucide-react';
import { blogPublicService } from '../services/blogPublicService';
import type { BlogPost } from '../types/blog';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const benefitsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: benefitsProgress } = useScroll({
    target: benefitsRef,
    offset: ['start end', 'end start'],
  });
  const benefitsImageOpacity = useTransform(benefitsProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0]);
  const benefitsImageScale = useTransform(benefitsProgress, [0, 0.5, 1], [1.08, 1.02, 1]);
  const curtainTopY = useTransform(benefitsProgress, [0.08, 0.42], ['0%', '-102%']);
  const curtainBottomY = useTransform(benefitsProgress, [0.08, 0.42], ['0%', '102%']);
  const benefitsVeilOpacity = useTransform(benefitsProgress, [0.08, 0.4, 0.92], [0.9, 0.35, 0.86]);

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const response = await blogPublicService.list();
        setRecentPosts(response.items.slice(0, 3));
      } finally {
        setIsNewsLoading(false);
      }
    };

    void loadRecentPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Layer 1: Dark Tech Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]" />
        
        {/* Layer 2: Blockchain Network Animation */}
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(247, 147, 26, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)
            `
          }} />
          <BlockchainNetwork />
        </motion.div>

        {/* Layer 3: Floating Bitcoin Symbols */}
        <motion.div style={{ y: y2 }} className="absolute inset-0">
          <FloatingBitcoins />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 h-full flex items-center justify-center"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 md:space-y-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-[#f7931a] via-[#d4af37] to-[#ffeb3b] bg-clip-text text-transparent">
                  HablemosCripto
                </span>
                <br />
                <span className="text-white">y minemos Bitcoin</span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
                Educación en activos digitales y minería de Bitcoin.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <a
                  href="https://wa.me/593987472745"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]"
                >
                  <span className="relative z-10 flex items-center gap-2 font-semibold">
                    <MessageCircle className="w-5 h-5" />
                    ¿Quieres minar y tener Bitcoin?
                  </span>
                </a>
                
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-[#f7931a] text-[#f7931a] rounded-lg hover:bg-[#f7931a]/10 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Contáctanos por WhatsApp
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2 text-[#f7931a]"
          >
            <span className="text-sm">Scroll</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* What is Bitcoin Section */}
      <ScrollSection
        icon={<CurrencyBitcoinCircleIcon className="w-16 h-16" />}
        title="¿Qué es Bitcoin?"
        description="Bitcoin es un nuevo tipo de dinero digital respaldado en blokchain, Opera desde 2009 de manera descentralizada (sin intermediarios) y permite hacer transacciones entre personas 24/7 a nivel mundial, en segundos y con costos muy bajos."
        features={[
          "Descentralizado y sin intermediarios",
          "Suministro limitado a 21 millones",
          "Transacciones seguras y transparentes",
          "Activo digital global",
          "Gobiernos, Bancos y Fondos de inversión ya lo tienen y lo usan."
        ]}
      />

      {/* Bitcoin Mining Section */}
      <ScrollSection
        icon={
          <img
            src="/images/antminer.jpeg"
            alt="Equipo Antminer para minería de Bitcoin"
            className="h-80 w-80 md:h-96 md:w-96 rounded-full object-cover object-center shadow-[0_0_35px_rgba(247,147,26,0.35)]"
          />
        }
        iconVariant="image"
        title="Minería de Bitcoin"
        description="La minería de Bitcoin es el proceso mediante el cual se crean nuevos bitcoins y se verifican las transacciones en la red. Los mineros utilizan hardware especializado para resolver complejos problemas matemáticos que aseguran la red. Solo se podrán minar (encontrar) 21 millones de BTC."
        features={[
          "Miles de mineros (Computadores ASIC) por todo el mundo aseguran la red de BTC.",
          "Es la red computacional más grande del mundo.",
          "La fuerza computacional Bitcoin se mide en Hashrate (Potencia).",
          "Tener mineros de Bitcoin puede generar BTC si lo haces con profesionales."
        ]}
        reverse
      />

      {/* Recent News Section */}
      <section className="relative overflow-hidden bg-black py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0b0b] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,147,26,0.12),transparent_45%)]" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#f7931a]">Noticias recientes</p>
              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Lo último del blog y el mercado
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Revisa las publicaciones más recientes sobre Bitcoin, minería y actualidad cripto.
              </p>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 self-start rounded-lg border border-[#f7931a]/40 px-6 py-3 font-semibold text-[#f7b45f] transition hover:border-[#f7931a] hover:bg-[#f7931a]/10"
            >
              Ver más
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {isNewsLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
                >
                  <div className="aspect-[4/3] animate-pulse bg-white/5" />
                  <div className="space-y-4 p-6">
                    <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
                    <div className="h-7 w-4/5 animate-pulse rounded bg-white/5" />
                    <div className="h-16 animate-pulse rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {recentPosts.map((post, index) => (
                <RecentNewsCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-14 text-center">
              <h3 className="text-2xl font-semibold text-white">Aún no hay noticias publicadas</h3>
              <p className="mt-3 text-gray-400">
                La sección se actualizará en cuanto publiquemos nuevas entradas en el blog.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="relative z-20 min-h-[130vh] overflow-hidden bg-black">
        <div className="sticky top-0 h-screen pointer-events-none overflow-hidden">
          <motion.img
            style={{ scale: benefitsImageScale, opacity: benefitsImageOpacity }}
            src="/images/reveal.jpg"
            alt="Visual de minería y estrategia Bitcoin"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black/88"
            style={{ opacity: benefitsVeilOpacity }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,147,26,0.16),transparent_58%)]" />
          <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-black" style={{ y: curtainTopY }} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-black" style={{ y: curtainBottomY }} />
          <div className="absolute inset-0 border-y border-white/5" />
        </div>

        <div className="relative z-20 pt-[20vh] md:pt-[22vh] pb-16 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                ¿Por qué elegirnos?
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Somos líderes en educación y minería de Bitcoin
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BenefitCard
                icon={<Shield className="w-12 h-12" />}
                title="Regulación en Estados Unidos"
                description="Operamos bajo regulación estadounidense para minería de Bitcoin"
                delay={0.2}
              />
              <BenefitCard
                icon={<Award className="w-12 h-12" />}
                title="Regulación El Salvador"
                description="Regulación por el Banco Central de El Salvador"
                delay={0.4}
              />
              <BenefitCard
                icon={<TrendingUp className="w-12 h-12" />}
                title="Top 20 Global"
                description="Entre los 20 principales mineros del mundo validados por Blockchain"
                delay={0.6}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7931a]/10 via-[#d4af37]/10 to-[#f7931a]/10" />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(247, 147, 26, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(247, 147, 26, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Comienza tu viaje en el mundo cripto
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Únete a miles de personas que ya están minando Bitcoin y construyendo su futuro financiero
            </p>
            <a
              href="https://wa.me/593987472745"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f7931a] to-[#d4af37] text-black rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar ahora
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function BlockchainNetwork() {
  return (
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(247, 147, 26, 0.1)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <g opacity="0.3">
        <circle cx="20%" cy="30%" r="4" fill="#f7931a" />
        <circle cx="80%" cy="20%" r="3" fill="#d4af37" />
        <circle cx="50%" cy="60%" r="5" fill="#f7931a" />
        <circle cx="30%" cy="80%" r="3" fill="#d4af37" />
        <circle cx="70%" cy="70%" r="4" fill="#f7931a" />
        <line x1="20%" y1="30%" x2="50%" y2="60%" stroke="#f7931a" strokeWidth="1" />
        <line x1="80%" y1="20%" x2="50%" y2="60%" stroke="#d4af37" strokeWidth="1" />
        <line x1="50%" y1="60%" x2="30%" y2="80%" stroke="#f7931a" strokeWidth="1" />
        <line x1="50%" y1="60%" x2="70%" y2="70%" stroke="#d4af37" strokeWidth="1" />
      </g>
    </svg>
  );
}

function FloatingBitcoins() {
  const positions = [
    { x: '10%', y: '20%', delay: 0 },
    { x: '85%', y: '15%', delay: 2 },
    { x: '75%', y: '80%', delay: 4 },
    { x: '15%', y: '70%', delay: 1.5 },
    { x: '50%', y: '40%', delay: 3 },
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: pos.x, top: pos.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            delay: pos.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <CurrencyBitcoinCircleIcon className="w-8 h-8 md:w-12 md:h-12 opacity-20" />
        </motion.div>
      ))}
    </>
  );
}

interface RecentNewsCardProps {
  post: BlogPost;
  index: number;
}

function RecentNewsCard({ post, index }: RecentNewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] transition hover:border-[#f7931a]/35 hover:shadow-[0_0_40px_rgba(247,147,26,0.08)]"
      >
        <div className="aspect-[4/3] overflow-hidden bg-black">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(247,147,26,0.18),transparent_55%)] px-6 text-center text-xs uppercase tracking-[0.3em] text-gray-500">
              Noticias HablemosCripto
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#f7931a]">
            <CalendarDays className="h-4 w-4" />
            {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Próximamente'}
          </div>

          <h3 className="text-2xl font-semibold text-white transition group-hover:text-[#f7b45f]">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-300">
            {post.excerpt || 'Lee esta publicación para conocer más detalles del mercado y de Bitcoin.'}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f7b45f]">
            Leer noticia
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface ScrollSectionProps {
  icon: React.ReactNode;
  iconVariant?: 'default' | 'image';
  title: string;
  description: string;
  features: string[];
  reverse?: boolean;
}

function ScrollSection({ icon, iconVariant = 'default', title, description, features, reverse }: ScrollSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          {/* Icon with Rotation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex justify-center ${reverse ? 'lg:order-2' : ''}`}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f7931a]/20 to-[#d4af37]/20 blur-2xl scale-150"
              />
              <div className={`relative ${iconVariant === 'image' ? 'p-0 bg-transparent border-0' : 'bg-gradient-to-br from-[#f7931a]/10 to-[#d4af37]/10 p-12 rounded-full border border-[#f7931a]/20'}`}>
                <div className="text-[#f7931a]">
                  {icon}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={reverse ? 'lg:order-1' : ''}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {description}
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-[#f7931a] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function BenefitCard({ icon, title, description, delay }: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="group relative bg-black/55 backdrop-blur-md border border-white/15 rounded-xl p-8 hover:border-[#f7931a]/55 transition-all duration-300"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7931a]/0 to-[#d4af37]/0 group-hover:from-[#f7931a]/5 group-hover:to-[#d4af37]/5 rounded-xl transition-all duration-300" />
      
      <div className="relative space-y-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#f7931a]/10 to-[#d4af37]/10 flex items-center justify-center text-[#f7931a] group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#f7931a]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
