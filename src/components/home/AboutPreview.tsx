
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { staggerContainer, fadeUp } from "../../utils/animations";
import { Palette, Users, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Creativity",
    description: "Build massive projects without limits. Our world is a canvas for your grandest architectural visions.",
    icon: <Palette className="w-6 h-6 text-accent-pink" />
  },
  {
    title: "Community",
    description: "Join a mature, collaborative group of players who value teamwork, respect, and shared experiences.",
    icon: <Users className="w-6 h-6 text-primary-light" />
  },
  {
    title: "Progress",
    description: "Experience a long-term economy and meaningful progression that rewards dedication and skill.",
    icon: <TrendingUp className="w-6 h-6 text-accent-gold" />
  }
];

export const AboutPreview = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          eyebrow="The Vision"
          title="BUILT FOR"
          gradientTitle="LONG TERM PLAYERS"
          description="A survival experience focused on creativity, collaboration and meaningful progression."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeUp}>
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
