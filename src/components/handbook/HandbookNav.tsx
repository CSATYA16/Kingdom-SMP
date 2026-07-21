import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'rules', label: 'Rules' },
  { id: 'kingdoms', label: 'Kingdoms' },
  { id: 'economy', label: 'Economy' },
  { id: 'commands', label: 'Commands' },
  { id: 'faq', label: 'FAQ' },
];

export const HandbookNav = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    const handleScroll = () => {
      // Find the current section in view
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Mobile Top Navigation */}
      <div className="lg:hidden sticky top-20 z-40 bg-[#030303]/90 backdrop-blur-xl border-b border-white/5 py-4 px-6 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-bold tracking-widest uppercase whitespace-nowrap transition-colors duration-300 ${
                activeSection === item.id ? 'text-accent-gold' : 'text-gray-500 hover:text-white'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="mobileActiveIndicator"
                  className="h-0.5 mt-1 bg-gradient-to-r from-accent-gold to-yellow-400"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block sticky top-32 w-64 shrink-0">
        <div className="flex flex-col gap-6">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">CONTENTS</h3>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-4 group ${
                activeSection === item.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`w-1 transition-all duration-300 rounded-r-full ${
                activeSection === item.id 
                  ? 'h-6 bg-gradient-to-b from-accent-purple to-accent-gold shadow-[0_0_10px_rgba(255,183,3,0.5)]' 
                  : 'h-0 group-hover:h-4 bg-white/20'
              }`} />
              <span className={activeSection === item.id ? 'translate-x-2 transition-transform' : 'transition-transform group-hover:translate-x-1'}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
