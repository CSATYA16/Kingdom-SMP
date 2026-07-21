import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

interface TiltCardProps {
  src: string;
  title?: string;
  className?: string;
}

export const TiltCard = ({ src, title, className }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-black/50 shadow-2xl perspective-[1000px]",
        className
      )}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" 
        style={{ transform: "translateZ(30px)" }}
      />
      
      <div 
        className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ transformStyle: "preserve-3d" }}
      >
        {isVideo ? (
          <video 
            src={src} 
            autoPlay
            muted
            loop
            playsInline 
            preload="metadata"
            className="w-full h-full object-cover" 
          />
        ) : (
          <img 
            src={src} 
            alt={title || "Showcase"} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10" />

      {title && (
        <div 
          className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20"
          style={{ transform: "translateZ(40px)" }}
        >
          <h3 className="text-2xl font-heading font-bold text-white mb-2">{title}</h3>
          <div className="w-8 h-1 bg-primary-light rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
        </div>
      )}
    </motion.div>
  );
};
