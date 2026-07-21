import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Copy, Check, Terminal } from 'lucide-react';
import type { Command } from '../../data/handbook';

interface CommandsSectionProps {
  commands: Command[];
}

export const CommandsSection = ({ commands }: CommandsSectionProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, commandText: string) => {
    navigator.clipboard.writeText(commandText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="commands" className="scroll-mt-32 mb-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-12">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-widest mb-4">
            Server <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold">Commands</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl">
            A comprehensive list of useful commands to help you navigate and interact with the Kingdom SMP world.
          </motion.p>
        </div>

        {commands.length === 0 ? (
          <div className="py-12 text-center text-gray-500 border border-white/5 rounded-2xl bg-white/5">
            No commands matched your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {commands.map((cmd) => (
              <motion.div 
                key={cmd.id}
                variants={fadeUp}
                className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300 flex flex-col h-full"
              >
                {/* Command Header */}
                <div className="bg-[#111] px-6 py-4 flex items-center justify-between border-b border-white/5 relative">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-gray-500" />
                    <code className="text-accent-gold font-mono text-lg font-bold">
                      {cmd.command}
                    </code>
                  </div>
                  <button 
                    onClick={() => handleCopy(cmd.id, cmd.command)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors relative"
                    aria-label="Copy command"
                  >
                    <AnimatePresence mode="wait">
                      {copiedId === cmd.id ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-4 h-4 text-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Copy className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
                
                {/* Command Body */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Description</h4>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {cmd.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 mt-auto flex items-center gap-3">
                    <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">Status</span>
                    <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                      cmd.status === 'Season I' 
                        ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' 
                        : 'bg-white/5 text-gray-400 border border-white/10'
                    }`}>
                      {cmd.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};
