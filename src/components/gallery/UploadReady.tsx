import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Image as ImageIcon, Video, Calendar, Castle } from 'lucide-react';

const futureFeatures = [
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: 'Screenshots',
    desc: 'Capture the beauty of your builds and landscapes.',
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Videos',
    desc: 'Cinematic timelapses and documentary clips.',
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Events',
    desc: 'Highlights from server-wide events and tournaments.',
  },
  {
    icon: <Castle className="w-6 h-6" />,
    title: 'Community Builds',
    desc: 'The evolution of spawn and market districts.',
  }
];

export const UploadReady = () => {
  return (
    <section className="relative py-24 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent-purple/30 to-transparent blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          {/* Left Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white mb-6 uppercase">
              Your Moments <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold">
                Belong Here.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Every build, adventure, and achievement becomes part of the Kingdom SMP archive. As Season I unfolds, this space will grow into a living museum of our world.
            </motion.p>
            <motion.div variants={fadeUp} className="h-1 w-24 bg-gradient-to-r from-accent-purple to-transparent rounded-full mx-auto lg:mx-0"></motion.div>
          </div>

          {/* Right Features Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {futureFeatures.map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                className="bg-[#030303] border border-white/10 rounded-2xl p-6 group hover:border-accent-purple/30 hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-purple mb-4 group-hover:scale-110 group-hover:bg-accent-purple/10 transition-all duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-white font-bold tracking-wider mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};
