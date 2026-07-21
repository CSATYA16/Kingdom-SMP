import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Users, Calendar, Target, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { fadeUp } from '../utils/animations';
import { cn } from '../utils/cn';
import { getData } from '../utils/storage';
import type { Kingdom } from '../data/kingdoms';

export const KingdomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [kingdom, setKingdom] = useState<Kingdom | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kingdoms = getData<Kingdom[]>('kingdoms', []);
    const found = kingdoms.find(k => k.id === id);
    setKingdom(found || null);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="pt-32 min-h-screen flex items-center justify-center text-white">Loading...</div>;


  if (!kingdom) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl text-white font-heading font-bold mb-4">Kingdom Not Found</h2>
        <Link to="/kingdoms">
          <Button variant="secondary">Back to Kingdoms</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Banner */}
      <div className="relative h-[60vh] w-full" style={{ background: kingdom.banner.startsWith('linear-gradient') ? kingdom.banner : 'none' }}>
        {kingdom.banner.startsWith('data:') && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${kingdom.banner})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto max-w-6xl">
            <Link to="/kingdoms" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
              <ChevronLeft className="w-5 h-5" /> Back to Kingdoms
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl bg-black/30 w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md overflow-hidden" style={{ background: kingdom.banner.startsWith('linear-gradient') ? kingdom.banner : 'none' }}>
                    {kingdom.banner.startsWith('data:') ? <img src={kingdom.banner} className="w-full h-full object-cover" /> : '👑'}
                  </div>
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase border backdrop-blur-md",
                    kingdom.status === "Recruiting" && "bg-green-500/20 text-green-400 border-green-500/30",
                    kingdom.status === "Invite Only" && "bg-orange-500/20 text-orange-400 border-orange-500/30",
                    kingdom.status === "Full" && "bg-red-500/20 text-red-400 border-red-500/30"
                  )}>
                    {kingdom.status}
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tight">{kingdom.name}</h1>
                <p className="text-xl text-primary-light mt-2 font-medium">Led by {kingdom.owner}</p>
              </div>
              <Button size="lg" variant={kingdom.status === "Recruiting" ? "primary" : "secondary"} className="w-full md:w-auto">
                {kingdom.status === "Recruiting" ? "Apply to Join" : "View Requirements"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.section initial="hidden" animate="visible" variants={fadeUp}>
              <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="text-primary-light" /> About the Kingdom
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {kingdom.description}
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl font-heading font-bold text-white mb-6">Kingdom Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-48 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">Image 1</div>
                <div className="h-48 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">Image 2</div>
              </div>
            </motion.section>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <GlassCard className="p-6">
                <h3 className="text-xl font-heading font-bold text-white mb-6">Kingdom Stats</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary-light">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Members</p>
                      <p className="text-lg font-bold text-white">{kingdom.members.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-pink/20 flex items-center justify-center text-accent-pink">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Level</p>
                      <p className="text-lg font-bold text-white">{kingdom.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Founded</p>
                      <p className="text-lg font-bold text-white">{new Date(kingdom.createdDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
