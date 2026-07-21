import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User as UserIcon, Calendar, BookOpen, MessageSquare, ShieldCheck, ArrowRight, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { getData, saveData } from '../utils/storage';
import { useToast } from '../context/ToastContext';
import type { Application as ApplicationData, ApplicationAnswers } from '../data/applications';
import type { User } from '../data/users';

export const Application = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState<ApplicationAnswers>({
    minecraftUsername: user?.minecraftUsername || '',
    age: '',
    experience: '',
    reason: '',
    playerType: 'Builder',
    previousSMP: 'No'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [existingApp, setExistingApp] = useState<ApplicationData | null>(null);

  useEffect(() => {
    if (!user) return;
    
    // Check if user already submitted an application
    const applications = getData<ApplicationData[]>('applications', []);
    const userApp = applications.find(a => a.userId === user.id);
    
    if (userApp) {
      setExistingApp(userApp);
    }
  }, [user]);

  // If approved, shouldn't even be here normally, but just in case
  if (user?.applicationStatus === 'APPROVED' || user?.role === 'OWNER' || user?.role === 'ADMIN') {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    
    // Save application
    const applications = getData<ApplicationData[]>('applications', []);
    const newApp: ApplicationData = {
      id: `app-${Date.now()}`,
      userId: user.id,
      username: user.minecraftUsername,
      answers: formData,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    
    // If they were rejected before, replace their old application
    const updatedApps = applications.filter(a => a.userId !== user.id);
    saveData('applications', [newApp, ...updatedApps]);
    
    // Update user status
    const users = getData<User[]>('users', []);
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, applicationStatus: 'PENDING' as const } : u
    );
    saveData('users', updatedUsers);
    
    // Update current user session to reflect PENDING
    const updatedUser = { ...user, applicationStatus: 'PENDING' as const };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // The AuthContext will restore on refresh, but we might need to force a context update or just reload/redirect
    addToast({ title: 'Application submitted successfully!', type: 'success' });
    
    // Delay slightly for effect
    setTimeout(() => {
      window.location.href = '/dashboard'; // Hard navigate to force context refresh
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-gold/10 via-accent-purple/5 to-transparent blur-[100px] pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase mb-2">
              JOIN KINGDOM SMP
            </h2>
            <p className="text-accent-gold tracking-widest font-medium uppercase text-sm mb-6">Whitelist Application</p>
            
            {existingApp?.status === 'REJECTED' && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm max-w-md mx-auto text-left mb-6">
                <div className="flex items-center gap-2 font-bold mb-2 uppercase tracking-widest">
                  <AlertTriangle size={16} />
                  Application Not Accepted
                </div>
                <p className="mb-2">Your previous application was reviewed but not accepted at this time.</p>
                {existingApp.reviewMessage && (
                  <div className="bg-black/50 p-3 rounded-lg border border-red-500/20 italic">
                    Note: "{existingApp.reviewMessage}"
                  </div>
                )}
                <p className="mt-3 font-bold">You may submit a new application below.</p>
              </div>
            )}
            
            {(user?.applicationStatus === 'PENDING' || (existingApp && existingApp.status === 'PENDING')) && (
               <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 p-6 rounded-xl text-center">
                 <Clock className="mx-auto mb-4 w-12 h-12 opacity-50" />
                 <h3 className="font-heading font-black text-xl uppercase tracking-widest mb-2">Application Under Review</h3>
                 <p className="text-sm opacity-80">Our admins are currently reviewing your application. You will be notified once a decision has been made.</p>
                 <Button onClick={() => navigate('/dashboard')} className="mt-6 w-full justify-center border-yellow-500/30 hover:bg-yellow-500/10" variant="outline">
                   Return to Dashboard
                 </Button>
               </div>
            )}
          </div>

          {(user?.applicationStatus === 'NOT_SUBMITTED' || user?.applicationStatus === 'REJECTED') && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                
                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Minecraft Username *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon size={18} className="text-gray-500" />
                    </div>
                    <input 
                      type="text"
                      name="minecraftUsername"
                      required
                      value={formData.minecraftUsername}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all"
                      placeholder="e.g. SteveTheMiner"
                    />
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Age (Optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-500" />
                    </div>
                    <input 
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all"
                      placeholder="e.g. 21"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Minecraft Experience *</label>
                  <div className="relative">
                    <div className="absolute top-3 left-4 pointer-events-none">
                      <BookOpen size={18} className="text-gray-500" />
                    </div>
                    <textarea 
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all resize-none"
                      placeholder="How long have you been playing? What are you good at?"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Why do you want to join? *</label>
                  <div className="relative">
                    <div className="absolute top-3 left-4 pointer-events-none">
                      <MessageSquare size={18} className="text-gray-500" />
                    </div>
                    <textarea 
                      name="reason"
                      required
                      value={formData.reason}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all resize-none"
                      placeholder="Tell us why Kingdom SMP is the right server for you..."
                    />
                  </div>
                </div>
                
                {/* Player Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">What type of player are you?</label>
                    <select 
                      name="playerType"
                      value={formData.playerType}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all appearance-none"
                    >
                      <option value="Builder">Builder</option>
                      <option value="Explorer">Explorer</option>
                      <option value="Redstone">Redstone</option>
                      <option value="Farmer">Farmer</option>
                      <option value="Trader">Trader</option>
                    </select>
                  </div>
                  
                  {/* Previous SMP */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Have you played SMP before?</label>
                    <select 
                      name="previousSMP"
                      value={formData.previousSMP}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all appearance-none"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full justify-center group bg-gradient-to-r from-accent-gold to-yellow-500 text-black border-none py-4 text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-pulse flex items-center gap-2"><ShieldCheck size={18} /> SUBMITTING...</span>
                  ) : (
                    <>
                      SUBMIT APPLICATION
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
                  <ShieldCheck size={14} /> 
                  All applications are manually reviewed by admins.
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
