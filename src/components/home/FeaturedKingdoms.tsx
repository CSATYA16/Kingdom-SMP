
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { staggerContainer, fadeUp } from "../../utils/animations";
import { cn } from "../../utils/cn";
import { useState, useEffect } from "react";
import { getData } from "../../utils/storage";
import type { Kingdom } from "../../data/kingdoms";

export const FeaturedKingdoms = () => {
  const navigate = useNavigate();
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);

  useEffect(() => {
    setKingdoms(getData<Kingdom[]>('kingdoms', []).slice(0, 3));
  }, []);

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          eyebrow="The Factions"
          title="FEATURED"
          gradientTitle="KINGDOMS"
          description="Join an established community or gather your friends to forge a new one."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {kingdoms.map((kingdom) => (
            <motion.div key={kingdom.id} variants={fadeUp}>
              <GlassCard className="p-8 h-full flex flex-col relative overflow-hidden group">
                
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full group-hover:bg-primary/40 transition-colors duration-500"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-4xl bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md overflow-hidden" style={{ background: kingdom.banner.startsWith('linear-gradient') ? kingdom.banner : 'none' }}>
                      {kingdom.banner.startsWith('data:') ? <img src={kingdom.banner} className="w-full h-full object-cover" /> : '👑'}
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border",
                      kingdom.status === "Recruiting" && "bg-green-500/10 text-green-400 border-green-500/20",
                      kingdom.status === "Invite Only" && "bg-orange-500/10 text-orange-400 border-orange-500/20",
                      kingdom.status === "Full" && "bg-red-500/10 text-red-400 border-red-500/20"
                    )}>
                      {kingdom.status}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold text-white mb-1">{kingdom.name}</h3>
                  <p className="text-primary-light text-sm font-medium mb-4">{kingdom.owner}</p>
                  
                  <p className="text-gray-400 leading-relaxed flex-grow mb-8">
                    {kingdom.description}
                  </p>
                  
                  <Button variant="secondary" className="w-full mt-auto group-hover:bg-white/20" onClick={() => navigate(`/kingdoms/${kingdom.id}`)}>
                    View Details
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Button variant="ghost" onClick={() => navigate('/kingdoms')}>View All Kingdoms &rarr;</Button>
        </div>
      </div>
    </section>
  );
};
