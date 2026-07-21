import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ParallaxImageProps {
  src: string;
  className?: string;
  speed?: number; // How much the image moves relative to scroll. Higher = faster
}

export const ParallaxImage = ({ src, className, speed = 0.5 }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const yOffset = useTransform(y, (value) => `calc(${value} * ${speed})`);

  return (
    <div ref={ref} className={cn("relative overflow-hidden w-full h-full", className)}>
      <motion.div
        className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${src})`,
          y: yOffset
        }}
      />
    </div>
  );
};
