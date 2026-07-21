import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { useRef } from 'react';

const milestones = [
  { id: 1, title: 'World Generated', desc: 'The first chapter begins.' },
  { id: 2, title: 'Season I Launch', desc: 'Players enter the world.' },
  { id: 3, title: 'Kingdom Formation', desc: 'Communities start growing.' },
  { id: 4, title: 'Future Updates', desc: 'The world continues evolving.' },
];

const ProgressNode = ({
  milestone,
  index,
  scrollYProgress
}: {
  milestone: any;
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  // Map segments of scroll to each node (0.2, 0.45, 0.7, 0.95)
  const start = index * 0.25;
  const end = start + 0.2;
  const range = [start, end];

  const scale = useTransform(scrollYProgress, range, [1, 1.25]);
  const nodeColor = useTransform(scrollYProgress, range, ["#1f2937", "#facc15"]); // gray-800 to yellow-400
  const glow = useTransform(scrollYProgress, range, [
    "0px 0px 0px rgba(255,200,60,0)",
    "0px 0px 20px rgba(255,200,60,0.5)"
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center flex-1 relative z-10 w-full"
    >
      <motion.div
        className="w-8 h-8 rounded-full border-4 border-[#030303] mb-6 flex items-center justify-center relative shadow-lg"
        style={{
          scale: scale,
          backgroundColor: nodeColor,
          boxShadow: glow
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="w-2 h-2 rounded-full bg-[#030303]"></div>
      </motion.div>
      
      <div className="text-center px-4">
        <h3 className="text-base md:text-lg font-heading font-black text-white mb-2 tracking-widest uppercase">
          {milestone.title}
        </h3>
        <p className="text-gray-400 text-sm">
          {milestone.desc}
        </p>
      </div>
    </motion.div>
  );
};

export const WorldProgress = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-32 bg-[#0a0a0a] border-t border-white/5 overflow-hidden flex flex-col items-center">
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center mb-24"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white mb-4">
            WORLD <span className="text-accent-purple drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">PROGRESS</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-purple/50 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></motion.div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative w-full pb-16 md:pb-0" ref={containerRef}>
          
          {/* Desktop Horizontal Line */}
          <div className="hidden md:block absolute top-[16px] left-0 w-full h-1 bg-white/5 rounded-full -translate-y-1/2"></div>
          
          <motion.div 
            className="hidden md:block absolute top-[16px] left-0 w-full h-1 bg-gradient-to-r from-accent-purple to-accent-gold rounded-full shadow-[0_0_15px_rgba(255,183,3,0.4)] -translate-y-1/2"
            style={{ scaleX: lineScaleX, transformOrigin: "left" }}
          />

          {/* Mobile Vertical Line */}
          <div className="md:hidden absolute top-0 left-[16px] w-1 h-full bg-white/5 rounded-full -translate-x-1/2"></div>
          
          <motion.div 
            className="md:hidden absolute top-0 left-[16px] w-1 h-full bg-gradient-to-b from-accent-purple to-accent-gold rounded-full shadow-[0_0_15px_rgba(255,183,3,0.4)] -translate-x-1/2"
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
          />

          <div className="flex flex-col md:flex-row items-start justify-center gap-16 md:gap-4 relative z-10">
            {milestones.map((milestone, index) => (
              <ProgressNode 
                key={milestone.id}
                milestone={milestone}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};
