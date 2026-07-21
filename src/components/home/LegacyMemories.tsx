import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Lock } from 'lucide-react';

const futureMemories = [
  { id: 1, title: 'The First Sunrise', desc: 'The beginning of everything.' },
  { id: 2, title: 'First Kingdom Built', desc: 'Waiting for history.' },
  { id: 3, title: 'First Alliance', desc: 'Stories coming soon.' },
  { id: 4, title: 'Legendary Moments', desc: 'Reserved for memories.' }
];

const MemoryCard = ({ memory, index }: { memory: any, index: number }) => {
  const isLarge = index === 0 || index === 3;
  
  return (
    <motion.div 
      variants={fadeUp}
      className={`relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 backdrop-blur-xl ${
        isLarge ? 'md:col-span-2 aspect-video' : 'col-span-1 aspect-square md:aspect-[4/3]'
      }`}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/10 transition-all duration-700 z-10 pointer-events-none mix-blend-overlay"></div>
      
      {/* Glowing borders on hover */}
      <div className="absolute inset-0 border-2 border-accent-gold/0 group-hover:border-accent-gold/30 rounded-2xl transition-all duration-700 z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(255,183,3,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,183,3,0.15)]"></div>

      {/* Blurred background (Placeholder for future media) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-black opacity-80 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center">
        {/* Subtle noise/texture can be added here if needed, keeping it minimal */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Coming Soon Badge / Lock Icon */}
      <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-2">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <Lock className="w-3.5 h-3.5 text-accent-gold" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-gold">Locked</span>
        </div>
      </div>
      
      {/* Cinematic overlay vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-2xl md:text-3xl font-heading font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-2">
          {memory.title}
        </h3>
        <p className="text-gray-400 font-medium tracking-wide drop-shadow-md text-sm md:text-base opacity-70 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {memory.desc}
        </p>
        <div className="w-12 h-1 bg-accent-purple/50 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
      </div>
    </motion.div>
  );
};

export const LegacyMemories = () => {
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent-purple/10 via-accent-gold/5 to-transparent blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-widest text-white text-center mb-4">
            FUTURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">MEMORIES</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-20 h-1 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(255,183,3,0.5)]"></motion.div>
          
          <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl text-center mt-6 tracking-[0.1em] font-medium leading-relaxed">
            The history books are empty. These empty frames await the stories, battles, and legendary moments you will create.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {futureMemories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
