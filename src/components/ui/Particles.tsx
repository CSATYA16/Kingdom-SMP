import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate static particles that will float up
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100, // start below screen
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * 20, // stagger starts
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white/10"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: `-10%`,
          }}
          animate={{
            y: ['0vh', '-120vh'],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
