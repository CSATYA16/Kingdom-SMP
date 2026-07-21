import { motion } from 'framer-motion';
import type { CategoryType } from '../../data/gallery';
import { fadeUp } from '../../utils/animations';

interface GalleryFilterProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

const categories: CategoryType[] = ['All', 'Screenshots', 'Videos', 'Memories', 'Season I'];

export const GalleryFilter = ({ activeCategory, onSelectCategory }: GalleryFilterProps) => {
  return (
    <motion.div 
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className="flex flex-wrap items-center justify-center gap-3 mb-12"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`relative px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs md:text-sm transition-all duration-300 ${
            activeCategory === category 
              ? 'text-black' 
              : 'text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10'
          }`}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-gradient-to-r from-accent-gold to-yellow-400 rounded-full shadow-[0_0_15px_rgba(255,183,3,0.4)]"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </motion.div>
  );
};
