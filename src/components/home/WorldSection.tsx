
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { fadeUp } from "../../utils/animations";
import { Map, ExternalLink } from "lucide-react";
import { Button } from "../ui/Button";

export const WorldSection = () => {
  return (
    <section className="py-24 relative z-10 bg-black/50 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="relative group rounded-3xl overflow-hidden border border-white/10 aspect-square md:aspect-video lg:aspect-square bg-gray-900 shadow-2xl"
            >
              {/* Abstract Map Placeholder Background */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform duration-500">
                  <Map className="w-10 h-10 text-primary-light" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-white mb-2">Live World Map</h3>
                <p className="text-gray-400 mb-8 max-w-sm">
                  Interactive real-time map currently initializing. Prepare to explore the Kingdom.
                </p>
                <Button variant="secondary" className="group/btn">
                  Open Map <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Button>
              </div>

              {/* Decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeader
              align="left"
              eyebrow="The World"
              title="A CANVAS FOR"
              gradientTitle="YOUR LEGACY."
              description="Explore a massive carefully designed world built for creativity and exploration. Discover unique biomes, gather resources, and find the perfect location for your kingdom's capital."
              className="mb-0"
            />
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-10 grid grid-cols-2 gap-6"
            >
              <div>
                <h4 className="text-3xl font-bold text-white mb-1 font-heading">25k</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">World Border</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1 font-heading">1.21</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Minecraft Version</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
