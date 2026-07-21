import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../../data/handbook';

interface FAQProps {
  faqs: FAQItem[];
}

export const FAQ = ({ faqs }: FAQProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="scroll-mt-32 mb-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-12">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-widest mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold">Questions</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl">
            Find answers to common questions about joining, playing, and thriving in Kingdom SMP.
          </motion.p>
        </div>

        {faqs.length === 0 ? (
          <div className="py-12 text-center text-gray-500 border border-white/5 rounded-2xl bg-white/5">
            No FAQ matched your search.
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-3xl">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              
              return (
                <motion.div 
                  key={faq.id}
                  variants={fadeUp}
                  className={`bg-[#0a0a0a] border rounded-2xl overflow-hidden transition-colors duration-300 ${
                    isOpen ? 'border-accent-purple/30 bg-white/5' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <button 
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  >
                    <h3 className="text-white font-bold text-lg">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="shrink-0 ml-4 text-accent-gold"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="w-full h-px bg-white/5 mb-4"></div>
                          <p className="text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
};
