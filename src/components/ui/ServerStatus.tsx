import { useState } from 'react';
import { Copy, Users } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { serverConfig } from '../../config/server';
import { serverStatus } from '../../data/serverStatus';
import { useToast } from '../../context/ToastContext';

export const ServerStatus = () => {
  const { addToast } = useToast();
  // We'd fetch real data here later
  const [onlinePlayers] = useState(127);
  const [isOnline] = useState(true);

  const handleCopyIP = () => {
    navigator.clipboard.writeText(serverConfig.serverIP);
    addToast({
      title: 'IP Copied!',
      description: 'Server IP has been copied to your clipboard.',
      type: 'success'
    });
  };

  return (
    <GlassCard className="p-6 overflow-hidden relative group">
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 blur-[50px] rounded-full group-hover:bg-green-500/20 transition-colors duration-500"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Status & IP */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className={`font-semibold tracking-wider uppercase text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <span className="text-gray-500 text-sm">|</span>
            <span className="text-gray-400 text-sm">Version {serverConfig.minecraftVersion}</span>
          </div>
          
          <h3 className="text-3xl font-mono font-bold text-white tracking-tight mb-2">
            {serverConfig.serverIP}
          </h3>
        </div>

        {/* Middle: Player count */}
        <div className="flex-1 flex flex-col items-center md:items-start border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0 md:px-8">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Players Online</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{onlinePlayers}</span>
            <span className="text-gray-500">/ {serverStatus.maxPlayers}</span>
          </div>
          {/* Mock progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
              style={{ width: `${(onlinePlayers / serverStatus.maxPlayers) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end w-full md:w-auto">
          <Button variant="primary" className="w-full md:w-auto gap-2" onClick={handleCopyIP}>
            <Copy className="w-4 h-4" /> COPY IP TO JOIN
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
