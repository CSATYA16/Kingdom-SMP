import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Flame, Trophy, Clock } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { getData } from '../utils/storage';
import type { SMPEvent } from '../data/events';
import { Link } from 'react-router-dom';

export const Events = () => {
  const [events, setEvents] = useState<SMPEvent[]>([]);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    setEvents(getData<SMPEvent[]>('events', []));
  }, []);

  const liveEvents = events.filter(e => e.status === 'LIVE');
  const upcomingEvents = events.filter(e => e.status === 'UPCOMING').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completedEvents = events.filter(e => e.status === 'COMPLETED').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-accent-gold/30 selection:text-accent-gold">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-gold/10 via-[#050505] to-[#050505] blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-bold tracking-widest uppercase mb-6 border border-accent-gold/20">
              <Calendar size={12} /> Kingdom SMP Events
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-widest uppercase mb-6"
          >
            Community <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">Events</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Join build competitions, kingdom wars, and community milestones. 
            Forge your legacy in Kingdom SMP.
          </motion.p>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {events.length === 0 ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center py-20 bg-black/40 border border-white/10 rounded-3xl">
              <Calendar size={48} className="mx-auto text-gray-600 mb-6" />
              <h2 className="text-2xl font-heading font-black tracking-widest text-white uppercase mb-2">No Events Yet</h2>
              <p className="text-gray-400">Season I events are coming soon.</p>
            </motion.div>
          ) : (
            <div className="space-y-24">
              
              {/* LIVE EVENTS */}
              {liveEvents.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20">
                      <Flame size={24} className="animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading font-black tracking-widest text-white uppercase">Live Now</h2>
                      <p className="text-gray-400 text-sm">Events currently happening on the server</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {liveEvents.map(evt => (
                      <EventCard key={evt.id} event={evt} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* UPCOMING EVENTS */}
              {upcomingEvents.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-accent-gold/10 text-accent-gold flex items-center justify-center border border-accent-gold/20">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading font-black tracking-widest text-white uppercase">Upcoming</h2>
                      <p className="text-gray-400 text-sm">Mark your calendars for these events</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map(evt => (
                      <EventCard key={evt.id} event={evt} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* COMPLETED EVENTS */}
              {completedEvents.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-gray-500/10 text-gray-400 flex items-center justify-center border border-gray-500/20">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading font-black tracking-widest text-white uppercase">Completed</h2>
                      <p className="text-gray-400 text-sm">Past community milestones and competitions</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {completedEvents.map(evt => (
                      <EventCard key={evt.id} event={evt} />
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

const EventCard = ({ event }: { event: SMPEvent }) => {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group hover:border-white/20 transition-all"
    >
      <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#111] to-black">
        {event.banner && (
          <img 
            src={event.banner} 
            alt={event.title} 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700" 
          />
        )}
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border backdrop-blur-md ${
            event.status === 'LIVE' ? 'bg-red-500/20 text-red-500 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]' :
            event.status === 'UPCOMING' ? 'bg-accent-gold/20 text-accent-gold border-accent-gold/30' :
            'bg-gray-500/20 text-gray-400 border-gray-500/30'
          }`}>
            {event.status}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/10">
            {event.type}
          </span>
        </div>
      </div>
      
      <div className="p-6 md:p-8 relative">
        <h3 className="text-xl font-heading font-black text-white uppercase tracking-widest mb-2 group-hover:text-accent-gold transition-colors">
          {event.title}
        </h3>
        <p className="text-xs text-accent-gold uppercase tracking-widest mb-4 font-bold">
          {new Date(event.date).toLocaleString()}
        </p>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
          {event.description}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-bold uppercase tracking-widest">
            <Users size={16} />
            {event.participants?.length || 0} Joined
          </div>
          {event.status !== 'COMPLETED' && (
            <Link 
              to="/dashboard"
              className="text-xs font-bold tracking-widest uppercase text-white hover:text-accent-gold transition-colors flex items-center gap-2"
            >
              Join <span className="text-accent-gold">→</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};
