import { MessageSquare } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { socialsConfig } from '../../config/socials';

export const DiscordCard = () => {
  return (
    <GlassCard className="p-8 h-full flex flex-col relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#5865F2]/20 blur-[50px] rounded-full group-hover:bg-[#5865F2]/30 transition-colors duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl bg-[#5865F2]/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-[#5865F2]/20 backdrop-blur-md">
            <MessageSquare className="w-8 h-8 text-[#5865F2]" />
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-white">Join the Community</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-gray-400 text-sm">342 Members Online</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 leading-relaxed flex-grow mb-8">
          Our Discord server is the heart of Kingdom SMP. Chat with other players, participate in events, report issues, and stay updated on the latest server news.
        </p>
        
        <Button 
          variant="secondary" 
          className="w-full mt-auto bg-[#5865F2]/10 text-white border-[#5865F2]/30 hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 gap-2"
          onClick={() => window.open(socialsConfig.discord, '_blank')}
        >
          <MessageSquare className="w-4 h-4" /> CONNECT DISCORD
        </Button>
      </div>
    </GlassCard>
  );
};
