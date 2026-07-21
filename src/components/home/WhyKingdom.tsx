
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { fadeUp, staggerContainer } from "../../utils/animations";
import { Heart, Coins, Calendar, Globe, ShieldCheck, Clock } from "lucide-react";


const features = [
  {
    title: "Community Driven",
    description: "Decisions are made collectively, ensuring the server evolves in a direction everyone enjoys.",
    icon: <Heart className="w-6 h-6 text-accent-pink" />
  },
  {
    title: "Player Economy",
    description: "A robust diamond-based economy driven entirely by player shops and trading districts.",
    icon: <Coins className="w-6 h-6 text-accent-gold" />
  },
  {
    title: "Weekly Events",
    description: "From build competitions to server-wide boss fights, there's always something happening.",
    icon: <Calendar className="w-6 h-6 text-primary-light" />
  },
  {
    title: "Massive World",
    description: "A 25k x 25k custom-generated world filled with unique terrain and endless possibilities.",
    icon: <Globe className="w-6 h-6 text-green-400" />
  },
  {
    title: "Dedicated Staff",
    description: "Active, mature moderation team ensuring a fair, lag-free, and enjoyable experience.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Long-Term Seasons",
    description: "We don't reset every few months. Build massive projects knowing they will stand the test of time.",
    icon: <Clock className="w-6 h-6 text-purple-400" />
  }
];

export const WhyKingdom = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-dark/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeader
          eyebrow="The Experience"
          title="MORE THAN A SERVER."
          gradientTitle="A PLACE TO BUILD YOUR LEGACY."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeUp} className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-heading font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
