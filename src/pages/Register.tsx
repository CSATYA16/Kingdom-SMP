import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User as UserIcon, ArrowRight, Gamepad2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getData, saveData } from '../utils/storage';
import type { User } from '../data/users';
import { useToast } from '../context/ToastContext';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [minecraftUsername, setMinecraftUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const users = getData<User[]>('users', []);
      
      // Check if username already exists
      const exists = users.some(u => 
        u.username.toLowerCase() === username.toLowerCase() || 
        u.minecraftUsername.toLowerCase() === minecraftUsername.toLowerCase()
      );
      
      if (exists) {
        addToast({ title: 'Username already taken', type: 'error' });
        setError('Username or Minecraft username already exists.');
        setIsLoading(false);
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        username,
        email,
        minecraftUsername,
        uuid: crypto.randomUUID(),
        avatar: `https://minotar.net/helm/${minecraftUsername}/100.png`,
        role: "PLAYER",
        kingdom: null,
        joinedAt: new Date().toISOString(),
        applicationStatus: "NOT_SUBMITTED",
        minecraftWhitelisted: false,
        password,
        discordUsername,
        status: "ACTIVE"
      };
      
      saveData('users', [...users, newUser]);
      addToast({ title: 'Account Created Successfully!', type: 'success' });
      navigate('/login');
      
    } catch (err) {
      setError('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/10 via-accent-gold/5 to-transparent blur-[100px] pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50" />
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase mb-2">
              JOIN KINGDOM
            </h2>
            <p className="text-accent-gold tracking-widest font-medium uppercase text-sm mb-4">Create Account</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-500" />
                </div>
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all"
                  placeholder="Username"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Gamepad2 size={18} className="text-gray-500" />
                </div>
                <input 
                  type="text"
                  required
                  value={minecraftUsername}
                  onChange={(e) => setMinecraftUsername(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all"
                  placeholder="Minecraft Username"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all"
                  placeholder="Email Address"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all"
                  placeholder="Password"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold text-lg leading-none">#</span>
                </div>
                <input 
                  type="text"
                  value={discordUsername}
                  onChange={(e) => setDiscordUsername(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all"
                  placeholder="Discord Username (Optional)"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full justify-center group bg-gradient-to-r from-accent-gold to-yellow-500 text-black border-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-pulse">CREATING...</span>
                ) : (
                  <>
                    CREATE ACCOUNT 
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
            
            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-4">Already have an account?</p>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="w-full justify-center border-white/20 hover:bg-white/5 hover:border-white/40"
              >
                LOGIN
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
