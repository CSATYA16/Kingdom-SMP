import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import type { Rule } from '../../data/handbook';
import { ShieldAlert, Heart, Scale } from 'lucide-react';

interface ServerRulesProps {
  rules: Rule[];
}

export const ServerRules = ({ rules }: ServerRulesProps) => {
  const getCategoryStyles = (category: Rule['category']) => {
    switch (category) {
      case 'Community':
        return {
          icon: <Heart className="w-5 h-5 text-accent-pink" />,
          color: 'text-accent-pink',
          bg: 'bg-accent-pink/10 border-accent-pink/20',
        };
      case 'Fair Play':
        return {
          icon: <Scale className="w-5 h-5 text-accent-gold" />,
          color: 'text-accent-gold',
          bg: 'bg-accent-gold/10 border-accent-gold/20',
        };
      case 'Gameplay':
        return {
          icon: <ShieldAlert className="w-5 h-5 text-blue-400" />,
          color: 'text-blue-400',
          bg: 'bg-blue-400/10 border-blue-400/20',
        };
    }
  };

  return (
    <section id="rules" className="scroll-mt-32 mb-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-12">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-widest mb-4">
            Server <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold">Rules</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl">
            Our rules are designed to protect the community experience and ensure fair play for everyone.
          </motion.p>
        </div>

        {rules.length === 0 ? (
          <div className="py-12 text-center text-gray-500 border border-white/5 rounded-2xl bg-white/5">
            No rules matched your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rules.map((rule) => {
              const styles = getCategoryStyles(rule.category);
              return (
                <motion.div 
                  key={rule.id}
                  variants={fadeUp}
                  className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 group hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${styles.bg}`}>
                        {styles.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-wide">{rule.title}</h3>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${styles.bg} ${styles.color}`}>
                      {rule.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {rule.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
};
