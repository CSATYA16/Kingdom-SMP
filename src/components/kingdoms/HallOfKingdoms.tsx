import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Crown, Lock, Shield, Trophy, Users, Clock, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getData } from '../../utils/storage';
import type { Kingdom } from '../../data/kingdoms';

const hallData = [
  { 
    rank: 1, 
    name: 'Waiting For First Kingdom', 
    leader: 'Unknown',
    power: '???',
    status: 'Unclaimed',
    stats: { members: '-', builds: '-', age: '-', achievements: '-' }
  },
  { 
    rank: 2, 
    name: 'Rising Kingdom', 
    leader: 'Unknown',
    power: '???',
    status: 'Unclaimed',
    stats: { members: '-', builds: '-', age: '-', achievements: '-' }
  },
  { 
    rank: 3, 
    name: 'Future Empire', 
    leader: 'Unknown',
    power: '???',
    status: 'Unclaimed',
    stats: { members: '-', builds: '-', age: '-', achievements: '-' }
  }
];

export const HallOfKingdoms = () => {
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);

  useEffect(() => {
    setKingdoms(getData<Kingdom[]>('kingdoms', []));
  }, []);

  // Map real kingdoms or use fallback
  const topKingdoms = kingdoms.slice(0, 3);
  const displayData = hallData.map((fallback, i) => {
    const k = topKingdoms[i];
    if (k) {
      return {
        ...fallback,
        name: k.name,
        leader: k.owner,
        power: (k.level * 100).toString(),
        status: k.status,
        stats: { members: k.members.length.toString(), builds: '0', age: '1d', achievements: '0' },
        isReal: true
      };
    }
    return { ...fallback, isReal: false };
  });

  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent-gold/10 via-accent-purple/5 to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white mb-4 leading-tight">
            HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400 drop-shadow-[0_0_15px_rgba(255,183,3,0.3)]">KINGDOMS</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-20 h-1 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(255,183,3,0.5)] mb-6"></motion.div>
          
          <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl text-center text-lg leading-relaxed">
            The greatest kingdoms will be remembered here.
          </motion.p>
          
          {/* Empty Launch State */}
          <motion.div variants={fadeUp} className="mt-8 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md max-w-lg w-full flex flex-col items-center gap-2">
            <Lock className="w-6 h-6 text-accent-purple mb-2" />
            <p className="text-white font-bold tracking-[0.1em] uppercase">
              History has not been written yet
            </p>
            <p className="text-gray-400 text-sm">
              The first kingdoms will claim this place.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="flex flex-col gap-6"
        >
          {displayData.map((item, index) => (
            <motion.div 
              key={item.rank}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="relative group bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden hover:border-accent-gold/40 transition-colors duration-500 hover:shadow-[0_0_40px_rgba(255,183,3,0.15)] flex flex-col md:flex-row items-start md:items-center gap-8"
            >
              {/* Background Shine on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

              {/* Rank & Emblem */}
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/5 w-16 text-center">
                  #{item.rank}
                </div>
                
                <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center shadow-inner relative group-hover:border-accent-gold/30 transition-colors duration-500 overflow-hidden">
                  {item.isReal ? (
                    <div className="absolute inset-0 bg-accent-gold/20 flex items-center justify-center">
                      <Crown className="w-8 h-8 text-accent-gold opacity-100 group-hover:scale-110 transition-all duration-500" />
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 rounded-2xl mix-blend-overlay"></div>
                      {index === 0 ? <Crown className="w-8 h-8 text-accent-gold opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" /> : <Shield className="w-8 h-8 text-gray-600 group-hover:text-gray-400 transition-colors duration-500" />}
                    </>
                  )}
                </div>
              </div>

              {/* Kingdom Info */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-heading font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-gold transition-all duration-300">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold tracking-widest text-accent-purple uppercase">Leader:</span>
                      <span className="text-sm text-gray-400">{item.leader}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-full border border-white/5">
                    <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Power</span>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-accent-gold" />
                      <span className="font-mono text-accent-gold font-bold">{item.power}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-white/5 pt-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Users className="w-3 h-3" />
                      <span className="text-[10px] font-bold tracking-wider uppercase">Members</span>
                    </div>
                    <span className="text-white font-mono">{item.stats.members}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Shield className="w-3 h-3" />
                      <span className="text-[10px] font-bold tracking-wider uppercase">Builds</span>
                    </div>
                    <span className="text-white font-mono">{item.stats.builds}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-bold tracking-wider uppercase">Age</span>
                    </div>
                    <span className="text-white font-mono">{item.stats.age}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Trophy className="w-3 h-3" />
                      <span className="text-[10px] font-bold tracking-wider uppercase">Legacy</span>
                    </div>
                    <span className="text-white font-mono">{item.stats.achievements}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
