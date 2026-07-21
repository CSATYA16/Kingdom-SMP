import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Users, Map, Flag, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

const creationSteps = [
  { id: 1, title: 'Gather Players', icon: <Users className="w-6 h-6" /> },
  { id: 2, title: 'Choose Location', icon: <Map className="w-6 h-6" /> },
  { id: 3, title: 'Build Identity', icon: <Flag className="w-6 h-6" /> },
  { id: 4, title: 'Grow Community', icon: <TrendingUp className="w-6 h-6" /> },
];

const CreationStepItem = ({ 
  step, 
  index, 
  scrollYProgress 
}: { 
  step: any; 
  index: number; 
  scrollYProgress: MotionValue<number>; 
}) => {
  const stepRanges = [
    [0, 0.15],
    [0.25, 0.4],
    [0.55, 0.7],
    [0.8, 1]
  ];
  const range = stepRanges[index] || [0, 1];

  const stepScale = useTransform(scrollYProgress, range, [1, 1.25]);
  const iconColor = useTransform(scrollYProgress, range, ["#9ca3af", "#facc15"]); // gray-400 to yellow-400
  const boxGlow = useTransform(scrollYProgress, range, [
    "0px 0px 0px rgba(255,200,60,0)", 
    "0px 0px 35px rgba(255,200,60,0.7)"
  ]);
  const borderColor = useTransform(scrollYProgress, range, [
    "rgba(255,255,255,0.1)", 
    "rgba(255,200,60,1)"
  ]);
  const innerGlowOpacity = useTransform(scrollYProgress, range, [0, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="flex flex-row md:flex-col items-center flex-1 w-full relative group"
    >
      {/* Step Node */}
      <motion.div 
        className="w-20 h-20 shrink-0 rounded-full bg-[#0a0a0a] flex items-center justify-center md:mb-8 relative z-10"
        style={{
          scale: stepScale,
          boxShadow: boxGlow,
          borderColor: borderColor,
          borderWidth: 2,
          borderStyle: "solid"
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        {/* Inner Glow (Active State) */}
        <motion.div 
          className="absolute inset-0 bg-accent-gold/20 rounded-full"
          style={{ opacity: innerGlowOpacity }}
        ></motion.div>
        
        <motion.div 
          style={{ color: iconColor }}
          className="relative z-10"
        >
          {step.icon}
        </motion.div>

        {/* Step Number Badge */}
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent-purple flex items-center justify-center border-2 border-[#030303] shadow-md z-20">
          <span className="text-white text-xs font-black">{step.id}</span>
        </div>
      </motion.div>

      {/* Step Details */}
      <div className="ml-8 md:ml-0 flex flex-col items-start md:items-center">
        <h3 className="text-lg md:text-xl font-heading font-bold text-white tracking-widest text-left md:text-center transition-all duration-300 bg-[#030303] md:px-4 py-1 rounded-full">
          {step.title}
        </h3>
      </div>
    </motion.div>
  );
};

export const KingdomCreation = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden flex flex-col items-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-accent-purple/20 to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white mb-4">
            CREATE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">KINGDOM</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-purple/50 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] mb-24"></motion.div>

          {/* Timeline Container */}
          <div className="relative w-full" ref={containerRef}>
            
            {/* Desktop Horizontal Background Line */}
            <div className="hidden md:block absolute top-[40px] left-0 w-full h-1 bg-white/5 rounded-full -translate-y-1/2"></div>
            
            {/* Desktop Horizontal Animated Golden Progress Line */}
            <motion.div 
              className="hidden md:block absolute top-[40px] left-0 w-full h-1 bg-gradient-to-r from-accent-purple to-accent-gold rounded-full shadow-[0_0_15px_rgba(255,183,3,0.3)] -translate-y-1/2"
              style={{
                scaleX: lineScaleX,
                transformOrigin: "left"
              }}
            />

            {/* Mobile Vertical Background Line */}
            <div className="md:hidden absolute top-0 left-[40px] w-1 h-full bg-white/5 rounded-full -translate-x-1/2 z-0"></div>
            
            {/* Mobile Vertical Animated Golden Progress Line */}
            <motion.div 
              className="md:hidden absolute top-0 left-[40px] w-1 h-full bg-gradient-to-b from-accent-purple to-accent-gold rounded-full shadow-[0_0_15px_rgba(255,183,3,0.3)] -translate-x-1/2 z-0"
              style={{
                scaleY: lineScaleY,
                transformOrigin: "top"
              }}
            />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-16 md:gap-4 relative z-10">
              {creationSteps.map((step, index) => (
                <CreationStepItem 
                  key={step.id} 
                  step={step} 
                  index={index} 
                  scrollYProgress={scrollYProgress} 
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
