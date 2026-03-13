import { motion } from 'framer-motion';

export function TechGridBackground() {
  return (
    <div className="absolute inset-0 opacity-5">
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(247, 147, 26, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(247, 147, 26, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} 
      />
    </div>
  );
}

export function GradientGlow({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(247, 147, 26, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)
          `
        }} 
      />
    </div>
  );
}

export function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#f7931a]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
