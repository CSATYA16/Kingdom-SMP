
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, MessageSquare, BookOpen, Gamepad2, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { serverConfig } from '../../config/server';
import { socialsConfig } from '../../config/socials';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal = ({ isOpen, onClose }: JoinModalProps) => {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleCopyIP = () => {
    navigator.clipboard.writeText(serverConfig.serverIP);
    addToast({
      title: 'IP Copied!',
      description: 'Server IP has been copied to your clipboard.',
      type: 'success'
    });
  };

  const handleReadHandbook = () => {
    onClose();
    navigate('/handbook');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-black/80 border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden backdrop-blur-xl pointer-events-auto"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-primary-dark/20 to-transparent">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-3xl font-heading font-black text-white">
                  JOIN KINGDOM SMP
                </h2>
                <p className="text-gray-400 mt-2">Follow these steps to start your adventure.</p>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="space-y-8">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary-light flex items-center justify-center font-bold font-heading border border-primary/30">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        Copy Server IP
                        <CheckCircle2 className="w-5 h-5 text-green-400 opacity-0 transition-opacity" />
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm">Add this IP to your Minecraft multiplayer server list. We currently support {serverConfig.minecraftVersion}.</p>
                      <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10">
                        <code className="text-primary-light font-mono px-3 flex-1">{serverConfig.serverIP}</code>
                        <Button size="sm" onClick={handleCopyIP} className="gap-2">
                          <Copy className="w-4 h-4" /> Copy
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary-light flex items-center justify-center font-bold font-heading border border-primary/30">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Join Discord</h3>
                      <p className="text-gray-400 mb-4 text-sm">Connect with the community, get whitelisted (if applicable), and stay updated.</p>
                      <Button size="sm" variant="secondary" className="gap-2" onClick={() => window.open(socialsConfig.discord, '_blank')}>
                        <MessageSquare className="w-4 h-4 text-[#5865F2]" /> Open Discord
                      </Button>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary-light flex items-center justify-center font-bold font-heading border border-primary/30">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Read Handbook</h3>
                      <p className="text-gray-400 mb-4 text-sm">Familiarize yourself with our rules, commands, and economy before playing.</p>
                      <Button size="sm" variant="outline" className="gap-2" onClick={handleReadHandbook}>
                        <BookOpen className="w-4 h-4" /> View Handbook
                      </Button>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold font-heading border border-green-500/30">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Start Playing!</h3>
                      <p className="text-gray-400 text-sm">You are all set. Log in and carve out your kingdom in the world.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
