import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Users, Crown, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getData } from '../../utils/storage';
import type { Kingdom } from '../../data/kingdoms';

const KingdomCard = ({ kingdom }: { kingdom: any }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      className="relative group rounded-2xl overflow-hidden border border-[rgba(255,215,100,0.15)] bg-[rgba(255,255,255,0.04)] shadow-2xl aspect-[4/5] md:aspect-[3/4] flex flex-col justify-end transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,215,100,0.15)]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a] overflow-hidden" style={{ background: kingdom.banner?.startsWith('linear-gradient') ? kingdom.banner : 'none' }}>
        {!imgError && kingdom.banner?.startsWith('data:') ? (
          <img 
            src={kingdom.banner} 
            alt={kingdom.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 ease-in-out"
          />
        ) : !kingdom.banner?.startsWith('linear-gradient') && (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black opacity-80 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-700">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
             <Shield className="w-16 h-16 text-white/10" />
          </div>
        )}
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
      
      {/* Glow on Hover */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-inset ring-accent-gold/40 shadow-[inset_0_0_30px_rgba(255,215,100,0.2)] rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-30 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        
        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="bg-black/50 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
            <Crown className="w-3 h-3 text-accent-gold" />
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-300">{kingdom.owner || kingdom.founder}</span>
          </div>
          <div className="bg-black/50 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
            <Users className="w-3 h-3 text-accent-purple" />
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-300">{kingdom.members?.length || kingdom.members} Members</span>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-heading font-black text-white drop-shadow-lg mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-gold transition-all duration-300">
          {kingdom.name}
        </h3>
        
        <div className="h-0 md:group-hover:h-16 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {kingdom.description || kingdom.desc}
          </p>
        </div>

        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mt-2">
          <div className="w-1/3 h-full bg-accent-gold/50 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out shadow-[0_0_10px_rgba(255,215,100,0.5)]"></div>
        </div>
      </div>
    </motion.div>
  );
};

export const KingdomShowcase = () => {
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);

  useEffect(() => {
    setKingdoms(getData<Kingdom[]>('kingdoms', []));
  }, []);

  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/10 to-transparent blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white mb-4 leading-tight uppercase">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Kingdoms</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-20 h-1 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(255,183,3,0.5)] mb-6"></motion.div>
          
          <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl text-center text-lg leading-relaxed">
            Every group creates its own story, builds, and legacy.
          </motion.p>
          
          {/* Empty Launch State */}
          {kingdoms.length === 0 && (
            <motion.div variants={fadeUp} className="mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <p className="text-accent-gold text-sm tracking-[0.15em] font-bold uppercase">
                No kingdoms have risen yet... Be the first to create history.
              </p>
            </motion.div>
          )}
        </motion.div>

        {kingdoms.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {kingdoms.map((kingdom) => (
              <KingdomCard key={kingdom.id} kingdom={kingdom} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
