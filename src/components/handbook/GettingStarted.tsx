import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Users, BookOpen, Pickaxe, Camera, ArrowDown, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Join Community',
    desc: 'Connect with players before entering the world.',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Read Rules',
    desc: 'Understand how Kingdom SMP works.',
  },
  {
    icon: <Pickaxe className="w-6 h-6" />,
    title: 'Start Survival',
    desc: 'Find land, gather resources, begin your journey.',
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'Create Memories',
    desc: 'Build projects and shape the server story.',
  }
];

const journey = ['NEW PLAYER', 'SURVIVOR', 'KINGDOM MEMBER', 'KINGDOM FOUNDER'];

export const GettingStarted = () => {
  return (
    <section id="getting-started" className="scroll-mt-32 mb-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-widest mb-12">
          Getting <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold">Started</span>
        </motion.h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-8 left-12 right-12 h-px bg-white/10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-gold to-accent-purple blur-sm opacity-50"></div>
          </div>
          
          {/* Mobile Connecting Line */}
          <div className="md:hidden absolute top-8 bottom-8 left-8 w-px bg-white/10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-accent-purple via-accent-gold to-accent-purple blur-sm opacity-50"></div>
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              className="relative flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-4 group"
            >
              <div className="w-16 h-16 shrink-0 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center text-gray-400 group-hover:text-accent-gold group-hover:border-accent-gold/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(255,183,3,0.3)] transition-all duration-500 relative z-10">
                {step.icon}
              </div>
              <div className="pt-2 md:pt-0">
                <div className="text-accent-gold font-bold text-xs tracking-widest uppercase mb-1">Step 0{index + 1}</div>
                <h3 className="text-xl font-heading font-black text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Progress System */}
        <motion.div variants={fadeUp} className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-accent-gold/10 transition-colors duration-700"></div>
          
          <h3 className="text-2xl font-heading font-black text-white uppercase tracking-widest mb-2 relative z-10">The Community Journey</h3>
          <p className="text-gray-400 mb-8 max-w-2xl relative z-10">
            Kingdom SMP is about growing together. As you play, you will naturally progress through different stages of the community, shaping the world along the way.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            {journey.map((stage, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center w-full">
                <div className="w-full md:w-auto flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-center font-bold tracking-widest text-sm uppercase text-gray-300 shadow-lg backdrop-blur-sm">
                  {stage}
                </div>
                {idx < journey.length - 1 && (
                  <div className="py-4 md:py-0 md:px-4 text-gray-600">
                    <ArrowDown className="w-5 h-5 md:hidden" />
                    <ArrowRight className="w-5 h-5 hidden md:block" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
