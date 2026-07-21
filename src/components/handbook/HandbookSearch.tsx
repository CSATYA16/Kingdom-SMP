import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

interface HandbookSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HandbookSearch = ({ searchQuery, setSearchQuery }: HandbookSearchProps) => {
  return (
    <motion.div 
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto -mt-6 relative z-30 px-6"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-gold to-accent-purple rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-full flex items-center px-6 py-4 shadow-2xl backdrop-blur-xl">
          <Search className="w-5 h-5 text-gray-400 mr-4" />
          <input 
            type="text" 
            placeholder="Search the handbook..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full text-lg placeholder-gray-500"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="ml-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
