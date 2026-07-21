import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    setIsResetMode(true);
    setError('');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const targetUserIndex = users.findIndex((u: any) => 
        (u.username.toLowerCase() === username.toLowerCase() || 
         (u.minecraftUsername && u.minecraftUsername.toLowerCase() === username.toLowerCase())) && 
         u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (targetUserIndex !== -1) {
        users[targetUserIndex].password = password;
        localStorage.setItem('users', JSON.stringify(users));
        addToast({ title: 'Password Reset Successful! You can now login.', type: 'success' });
        setIsResetMode(false);
        setPassword('');
      } else {
        setError('No account found with that username and email combination.');
      }
    } catch (err) {
      setError('An error occurred during password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Mock login utilizing username and password
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6 relative">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/10 via-accent-gold/5 to-transparent blur-[100px] pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50" />
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase mb-2">
              KINGDOM SMP
            </h2>
            <p className="text-accent-gold tracking-widest font-medium uppercase text-sm mb-4">
              {isResetMode ? 'Reset Password' : 'Welcome Back'}
            </p>
            
            {!isResetMode && (
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-white/5 py-2 px-4 rounded-lg border border-white/5">
                <ShieldCheck size={14} className="text-accent-purple" />
                <span>Server access requires a Kingdom SMP account</span>
              </div>
            )}
            
            {isResetMode && (
              <p className="text-gray-400 text-sm">
                Enter your username and email to verify your identity and set a new password.
              </p>
            )}
          </div>

          <form onSubmit={isResetMode ? handleResetPassword : handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Minecraft Username */}
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
                  placeholder="Minecraft Username or Account Username"
                />
              </div>

              {/* Email */}
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

              {/* Password */}
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
                  placeholder={isResetMode ? "New Password" : "Password"}
                />
              </div>
            </div>

            {!isResetMode && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-4 h-4 border border-white/20 rounded bg-black/50 group-hover:border-accent-gold/50 transition-colors">
                    <input type="checkbox" className="opacity-0 absolute w-full h-full cursor-pointer" />
                    {/* Custom checkmark indicator would go here */}
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>
                
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-accent-gold hover:text-yellow-400 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full justify-center group bg-gradient-to-r from-accent-gold to-yellow-500 text-black border-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-pulse">{isResetMode ? 'RESETTING...' : 'AUTHENTICATING...'}</span>
                ) : (
                  <>
                    {isResetMode ? 'RESET PASSWORD' : 'LOGIN'} 
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
            
            {isResetMode && (
              <div className="text-center mt-4">
                <button 
                  type="button" 
                  onClick={() => setIsResetMode(false)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Back to Login
                </button>
              </div>
            )}
            
            {!isResetMode && (
              <div className="text-center mt-6 pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-4">Don't have a Kingdom SMP account?</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/register')}
                  className="w-full justify-center border-white/20 hover:bg-white/5 hover:border-white/40"
                >
                  CREATE ACCOUNT
                </Button>
              </div>
            )}
          </form>
        </div>
        
        {/* FUTURE BACKEND: Connect standard OAuth providers or Firebase here */}
      </motion.div>
    </div>
  );
};
