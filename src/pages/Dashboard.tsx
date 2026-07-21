import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, Shield, Server, Trophy, Image as ImageIcon, Map, 
  Clock, Swords, Hammer, Bell, Copy, Check, UploadCloud, 
  Settings as SettingsIcon, AlertTriangle, User as UserIcon,
  Info, Trash2
} from 'lucide-react';
import { getData, saveData, logActivity } from '../utils/storage';
import { useToast } from '../context/ToastContext';
import { compressImage } from '../utils/image';
import type { User } from '../data/users';
import type { Kingdom } from '../data/kingdoms';
import type { SMPEvent } from '../data/events';

export const Dashboard = () => {
  const { user, refreshUser } = useAuth();
  const { addToast } = useToast();
  
  // Refresh user data on dashboard mount to sync any admin changes
  useEffect(() => {
    refreshUser();
  }, []);
  
  const [copiedIP, setCopiedIP] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Data States
  const [serverCfg, setServerCfg] = useState({ serverIP: '', minecraftVersion: '' });
  const [socialsCfg, setSocialsCfg] = useState({ discord: '' });
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);
  const [myMedia, setMyMedia] = useState<any[]>([]);
  const [events, setEvents] = useState<SMPEvent[]>([]);
  
  // Modals & States
  const [createKingdomOpen, setCreateKingdomOpen] = useState(false);
  const [kingdomForm, setKingdomForm] = useState({ name: '', description: '', banner: '', theme: 'Royal', invites: '' });
  
  // Forms
  const [profileForm, setProfileForm] = useState({ displayName: '', discordUsername: '' });
  const [mediaUrl, setMediaUrl] = useState('');

  useEffect(() => {
    if (user) {
      setProfileForm({ 
        displayName: user.minecraftUsername, 
        discordUsername: '' 
      });
    }
    
    // Load from local storage
    const sc = getData<any>('serverConfig', {});
    const soc = getData<any>('socialsConfig', {});
    setServerCfg({ serverIP: sc.serverIP || '', minecraftVersion: sc.minecraftVersion || '' });
    setSocialsCfg({ discord: soc.discord || '' });
    setAnnouncements(getData<any[]>('announcements', []));
    setKingdoms(getData<Kingdom[]>('kingdoms', []));
    setEvents(getData<SMPEvent[]>('events', []));
    
    const allMedia = getData<any[]>('media', []);
    if (user) {
      setMyMedia(allMedia.filter(m => m.uploaderId === user.id));
    }
  }, [user]);

  if (!user) return null; // Fallback, protected route handles redirect

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleCopyIP = () => {
    navigator.clipboard.writeText(serverCfg.serverIP);
    setCopiedIP(true);
    addToast({ title: 'Server IP Copied', type: 'success' });
    setTimeout(() => setCopiedIP(false), 2000);
  };

  const handleSaveProfile = () => {
    // We update the MOCK_USERS array in local storage for this specific user ID
    const users = getData<User[]>('users', []);
    let updatedUser = { ...user };
    const updated = users.map(u => {
      if (u.id === user.id) {
        updatedUser = { ...u, minecraftUsername: profileForm.displayName };
        return updatedUser;
      }
      return u;
    });
    saveData('users', updated);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    refreshUser();
    addToast({ title: 'Profile Settings Saved', type: 'success' });
  };

  const handleMediaFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleJoinEvent = (eventId: string) => {
    const allEvents = getData<SMPEvent[]>('events', []);
    const updatedEvents = allEvents.map(evt => {
      if (evt.id === eventId) {
        // Check if already joined
        if (!evt.participants.find(p => p.userId === user.id)) {
          evt.participants.push({
            userId: user.id,
            username: user.minecraftUsername,
            joinedAt: new Date().toISOString()
          });
        }
      }
      return evt;
    });
    setEvents(updatedEvents);
    saveData('events', updatedEvents);
    logActivity(`Joined event ${eventId}`, user.minecraftUsername);
    addToast({ title: 'Event Joined!', type: 'success' });
  };

  const handleMediaDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleMediaFile(e.dataTransfer.files[0]);
    }
  };

  const submitMedia = () => {
    if (!mediaUrl) {
      addToast({ title: 'Please select a file first', type: 'error' });
      return;
    }
    const media = getData<any[]>('media', []);
    const newMedia = {
      id: Date.now().toString(),
      title: `${user.minecraftUsername}'s Upload`,
      description: 'Uploaded from Dashboard',
      category: 'Memories',
      type: 'image',
      url: mediaUrl,
      status: 'Pending',
      uploaderId: user.id,
      uploaderName: user.minecraftUsername,
      createdAt: new Date().toISOString()
    };
    const updated = [newMedia, ...media];
    saveData('media', updated);
    setMyMedia(updated.filter(m => m.uploaderId === user.id));
    addToast({ title: 'Memory submitted for approval', type: 'success' });
    setMediaUrl('');
  };

  const handleMarkAllAsRead = () => {
    const allAnnouncements = getData<any[]>('announcements', []);
    const updated = allAnnouncements.map(notif => {
      const readBy = notif.readBy || [];
      if (!readBy.includes(user.id)) {
        return { ...notif, readBy: [...readBy, user.id] };
      }
      return notif;
    });
    setAnnouncements(updated);
    saveData('announcements', updated);
  };
  const handleDeleteMedia = (id: string) => {
    if (window.confirm("Delete this memory permanently?")) {
      const allMedia = getData<any[]>('media', []);
      const updated = allMedia.filter(m => m.id !== id || m.uploaderId !== user.id);
      saveData('media', updated);
      setMyMedia(updated.filter(m => m.uploaderId === user.id));
      addToast({ title: 'Memory deleted', type: 'success' });
    }
  };

  const handleKingdomBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const compressed = await compressImage(e.target.files[0]);
        setKingdomForm({ ...kingdomForm, banner: compressed });
      } catch (err) {
        addToast({ title: 'Image compression failed', type: 'error' });
      }
    }
  };

  const handleCreateKingdom = () => {
    if (!kingdomForm.name) {
      addToast({ title: 'Kingdom Name is required', type: 'error' });
      return;
    }
    
    // Premium gradient fallback if no banner
    const bannerData = kingdomForm.banner || 'linear-gradient(135deg, #FFB703 0%, #7B2CBF 100%)';
    
    const newKingdom: Kingdom = {
      id: `k-${Date.now()}`,
      name: kingdomForm.name,
      description: kingdomForm.description,
      owner: user.minecraftUsername,
      members: [{ username: user.minecraftUsername, role: 'KINGDOM_OWNER', joinedAt: new Date().toISOString() }],
      banner: bannerData,
      createdDate: new Date().toISOString(),
      status: 'Invite Only',
      level: 1
    };
    
    const updatedKingdoms = [newKingdom, ...kingdoms];
    setKingdoms(updatedKingdoms);
    saveData('kingdoms', updatedKingdoms);
    
    logActivity(`Created Kingdom (${kingdomForm.name})`, user.minecraftUsername);
    
    // Update user's kingdom if they don't have one (or even if they do, if they want to switch?)
    // Requirement: Owner can create unlimited, but we only store one `kingdom` string on the user object for now.
    if (!user.kingdom) {
      const users = getData<User[]>('users', []);
      const updatedUsers = users.map(u => u.id === user.id ? { ...u, kingdom: newKingdom.name } : u);
      saveData('users', updatedUsers);
    }
    
    addToast({ title: 'Kingdom Created!', type: 'success' });
    setCreateKingdomOpen(false);
    setKingdomForm({ name: '', description: '', banner: '', theme: 'Royal', invites: '' });
  };


  const unreadCount = announcements.filter(n => !(n.readBy || []).includes(user.id)).length;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/20 via-transparent to-transparent blur-[120px] pointer-events-none -z-10" />
      
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-8"
        >
          {/* Header & Notifications */}
          <div className="flex justify-end relative z-20">
            <div className="relative" key="notif-wrapper">
                  <button 
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-gold transition-colors group relative"
                  >
                    <Bell size={18} className="group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
                    {unreadCount > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />}
                  </button>
              
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/10 bg-white/5">
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center justify-between">
                        Notifications
                        {unreadCount > 0 && (
                          <span className="text-xs bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded">{unreadCount} New</span>
                        )}
                      </h4>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {announcements.length > 0 ? announcements.map((notif, i) => {
                        const isRead = (notif.readBy || []).includes(user.id);
                        return (
                        <div key={i} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 ${!isRead ? 'bg-white/5' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notif.type === 'Maintenance' ? 'bg-red-500/20 text-red-400' :
                            notif.type === 'Events' ? 'bg-accent-gold/20 text-accent-gold' :
                            'bg-accent-purple/20 text-accent-purple'
                          }`}>
                            {notif.type === 'Maintenance' ? <AlertTriangle size={14} /> :
                             notif.type === 'Events' ? <Swords size={14} /> : <Info size={14} />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h5 className="text-sm font-bold text-white mb-0.5 flex items-center gap-2">
                                {notif.title}
                                {!isRead && <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>}
                              </h5>
                              <span className="text-[10px] text-gray-500 font-mono">{notif.time || notif.date}</span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed mb-1 line-clamp-2">{notif.message}</p>
                          </div>
                        </div>
                        )
                      }) : (
                        <div className="p-8 text-center text-xs text-gray-500 font-bold uppercase tracking-widest">
                          No notifications
                        </div>
                      )}
                    </div>
                    <div className="p-3 text-center border-t border-white/10 bg-white/5">
                      <button 
                        onClick={handleMarkAllAsRead}
                        className="text-xs text-gray-400 hover:text-white uppercase tracking-widest transition-colors font-bold"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Player Profile Header */}
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-gold to-accent-purple opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent-gold/5 blur-[80px] pointer-events-none group-hover:bg-accent-gold/10 transition-colors" />
            
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-white/10 flex-shrink-0 bg-black/50 p-2 shadow-2xl relative group-hover:border-accent-gold/50 transition-colors">
              <img 
                src={user.avatar} 
                alt={user.minecraftUsername}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
            
            <div className="flex-grow text-center md:text-left z-10">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-4xl font-heading font-black tracking-widest text-white uppercase drop-shadow-lg">
                  {user.minecraftUsername}
                </h1>
                <div className="px-2 py-1 rounded bg-green-500/20 border border-green-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-green-400 font-bold tracking-widest uppercase">Active</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm mt-5">
                <div className="flex items-center gap-2 text-gray-300 bg-black/50 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                  <Shield size={16} className={user.role === 'OWNER' || user.role === 'ADMIN' ? 'text-accent-gold' : 'text-gray-400'} />
                  <span className="font-bold tracking-wide">{user.role}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-black/50 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                  <Map size={16} className="text-accent-purple" />
                  <span className="font-medium">{user.kingdom || "No Kingdom"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 bg-black/50 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                  <Calendar size={16} />
                  <span className="text-xs">Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="space-y-8 lg:col-span-2">
              
              {/* Stats Grid */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Playtime", value: "124h", icon: <Clock size={20} /> },
                  { label: "Builds", value: "12", icon: <Hammer size={20} /> },
                  { label: "Events", value: "3", icon: <Swords size={20} /> },
                  { label: "Achieved", value: "45%", icon: <Trophy size={20} /> },
                ].map((stat, i) => (
                  <div key={i} className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-accent-gold/30 hover:bg-white/5 transition-all cursor-default overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-accent-gold/50 transition-colors" />
                    <div className="text-gray-500 mb-3 group-hover:text-accent-gold group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300">{stat.icon}</div>
                    <div className="text-3xl font-heading font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-gray-400 transition-all">{stat.value}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-2 font-bold">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* My Memories */}
              <motion.div variants={fadeUp} className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl group hover:border-white/20 transition-colors">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                  <h2 className="text-2xl font-heading font-black tracking-widest text-white uppercase flex items-center gap-3">
                    <ImageIcon className="text-accent-purple" />
                    My Memories
                  </h2>
                  {mediaUrl && (
                    <button onClick={submitMedia} className="px-6 py-2 bg-accent-gold text-black rounded-lg font-black tracking-widest text-xs uppercase hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(255,183,3,0.3)]">
                      Submit Media
                    </button>
                  )}
                </div>
                
                <label 
                  className={`h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all cursor-pointer overflow-hidden relative ${
                    dragActive ? 'border-accent-gold bg-accent-gold/10 scale-[1.02]' : 'border-white/10 bg-black/40 hover:border-white/30 hover:bg-white/5'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleMediaDrop}
                >
                  <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => { if (e.target.files?.[0]) handleMediaFile(e.target.files[0]); }} />
                  
                  {mediaUrl ? (
                    <img src={mediaUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-50 transition-opacity" />
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                        <UploadCloud size={24} className={dragActive ? 'text-accent-gold' : 'text-gray-400'} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">Upload Memory</h3>
                      <p className="text-xs text-gray-400 text-center max-w-sm mb-4">
                        Drag & drop screenshots or clips. Max 50MB.
                      </p>
                      <span className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10 text-sm font-bold tracking-widest uppercase">
                        Browse Files
                      </span>
                    </>
                  )}
                </label>

                {myMedia.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">Uploaded Memories</h3>
                    {myMedia.map((m) => (
                      <div key={m.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl group hover:border-white/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-black/50 rounded flex items-center justify-center border border-white/10 overflow-hidden">
                            {m.url ? (
                              m.type === 'video' ? <video src={m.url} className="w-full h-full object-cover" /> : <img src={m.url} className="w-full h-full object-cover" alt="" />
                            ) : <ImageIcon size={16} className="text-gray-500" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{m.title}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Uploaded {new Date(m.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded border ${
                            m.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                            m.status === 'Approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}>
                            {m.status}
                          </span>
                          <button onClick={() => handleDeleteMedia(m.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
              
              {/* Account Settings Form */}
              <motion.div variants={fadeUp} className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <SettingsIcon size={120} />
                </div>
                <h2 className="text-xl font-heading font-black tracking-widest text-white uppercase mb-8 flex items-center gap-3 relative z-10">
                  <UserIcon className="text-gray-400" />
                  Profile Settings
                </h2>
                
                <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Minecraft Username</label>
                      <input 
                        type="text" 
                        defaultValue={user.minecraftUsername}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent-gold/50 outline-none transition-colors opacity-50 cursor-not-allowed"
                        disabled
                      />
                      <p className="text-[10px] text-gray-500 mt-2">To change your primary username, please contact support.</p>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Display Name</label>
                      <input 
                        type="text" 
                        value={profileForm.displayName}
                        onChange={(e) => setProfileForm({...profileForm, displayName: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent-gold/50 outline-none transition-colors" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Discord Username (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="username#0000"
                        value={profileForm.discordUsername}
                        onChange={(e) => setProfileForm({...profileForm, discordUsername: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent-gold/50 outline-none transition-colors" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button type="submit" className="px-8 py-3 bg-accent-gold text-black rounded-xl font-black tracking-widest text-sm uppercase hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(255,183,3,0.2)]">
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>

            </div>

            {/* Right Column */}
            <div className="space-y-8">
              
              {/* Server Access / Application Status */}
              {(user.applicationStatus === 'APPROVED' || user.role === 'OWNER' || user.role === 'ADMIN') ? (
                <motion.div variants={fadeUp} className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl border border-accent-gold/20 p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 pointer-events-none">
                  <Server size={120} />
                </div>
                
                <h2 className="text-xl font-heading font-black tracking-widest text-accent-gold uppercase mb-8 relative z-10 flex items-center gap-3">
                  Server Access
                </h2>
                
                <div className="space-y-6 relative z-10">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Connect IP</label>
                    <div className="bg-black/80 border border-white/10 rounded-xl p-4 text-white font-mono flex justify-between items-center group/copy shadow-inner">
                      <span className="tracking-wider">{serverCfg.serverIP}</span>
                      <button 
                        onClick={handleCopyIP}
                        className="text-gray-400 hover:text-accent-gold transition-colors flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
                      >
                        {copiedIP ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        <span className="text-[10px] font-bold uppercase tracking-wider">{copiedIP ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 block">Version</label>
                      <div className="text-white font-mono text-sm">
                        {serverCfg.minecraftVersion}
                      </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 block">Status</label>
                      <div className="text-green-400 font-mono text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                        ONLINE
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(socialsCfg.discord);
                      addToast({ title: 'Discord Link Copied', type: 'success' });
                    }}
                    className="flex items-center justify-center gap-3 w-full bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 text-white py-4 rounded-xl transition-all mt-4 text-sm font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(88,101,242,0.2)]"
                  >
                    COPY DISCORD INVITE
                  </button>
                </div>
                </motion.div>
              ) : (
                <motion.div variants={fadeUp} className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50" />
                  
                  {user.applicationStatus === 'PENDING' ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
                        <Clock size={32} className="animate-pulse" />
                      </div>
                      <h2 className="text-xl font-heading font-black tracking-widest text-white uppercase">
                        Application Pending
                      </h2>
                      <p className="text-sm text-gray-400">
                        Your application is being reviewed by our admin team. Check back later!
                      </p>
                    </div>
                  ) : user.applicationStatus === 'REJECTED' ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                        <AlertTriangle size={32} />
                      </div>
                      <h2 className="text-xl font-heading font-black tracking-widest text-white uppercase">
                        Application Not Accepted
                      </h2>
                      <p className="text-sm text-gray-400 mb-4">
                        Your application was reviewed but not accepted at this time.
                      </p>
                      <Link to="/application" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold tracking-widest text-xs uppercase border border-white/10 transition-colors">
                        Re-Apply Now
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-accent-gold/10 text-accent-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-gold/20">
                        <Shield size={32} />
                      </div>
                      <h2 className="text-xl font-heading font-black tracking-widest text-white uppercase">
                        Server Access Locked
                      </h2>
                      <p className="text-sm text-gray-400 mb-4">
                        Submit a whitelist application to gain access to the SMP.
                      </p>
                      <Link to="/application" className="inline-block px-8 py-3 bg-gradient-to-r from-accent-gold to-yellow-500 text-black rounded-xl font-black tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(255,183,3,0.3)] hover:shadow-[0_0_25px_rgba(255,183,3,0.5)] transition-all">
                        Apply Now
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {(user.applicationStatus === 'APPROVED' || user.role === 'OWNER' || user.role === 'ADMIN') && (
                <>
                  {/* My Kingdom */}
                  <motion.div variants={fadeUp} className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 blur-[50px] pointer-events-none" />
                <h2 className="text-xl font-heading font-black tracking-widest text-white uppercase mb-6 flex items-center gap-3 relative z-10">
                  <Map size={20} className="text-accent-purple" />
                  My Kingdom
                </h2>
                
                {user.kingdom ? (
                  <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-xl p-6 text-center relative z-10">
                    <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-widest">{user.kingdom}</h3>
                    <p className="text-xs text-gray-400 tracking-widest uppercase font-bold mb-4">Member</p>
                    {user.role === 'OWNER' && (
                      <button onClick={() => setCreateKingdomOpen(true)} className="w-full px-4 py-2 mt-2 bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold text-xs font-black uppercase tracking-widest transition-colors rounded-lg border border-accent-gold/30">
                        + Create Another Kingdom
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center border-dashed relative z-10">
                    <Shield size={32} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Your Kingdom Awaits</h3>
                    <p className="text-gray-400 mb-6 text-sm">You haven't joined a kingdom yet. Forge your own destiny.</p>
                    <div className="flex flex-col gap-3">
                      <button onClick={() => setCreateKingdomOpen(true)} className="w-full px-4 py-3 bg-accent-gold hover:bg-yellow-400 text-black text-xs font-black uppercase tracking-widest transition-colors rounded-lg">
                        Create Kingdom
                      </button>
                      <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-widest transition-colors rounded-lg border border-white/10">
                        Join Kingdom
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Kingdom Events */}
              <motion.div variants={fadeUp} className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden">
                <h2 className="text-xl font-heading font-black tracking-widest text-white uppercase mb-6 flex items-center gap-3 relative z-10">
                  <Calendar size={20} className="text-accent-gold" />
                  Kingdom Events
                </h2>
                
                <div className="space-y-4">
                  {events.filter(e => e.status === 'LIVE' || e.status === 'UPCOMING').length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-white/10 rounded-xl">
                      <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No upcoming events</p>
                    </div>
                  ) : (
                    events
                      .filter(e => e.status === 'LIVE' || e.status === 'UPCOMING')
                      .sort((a, b) => (a.status === 'LIVE' ? -1 : (b.status === 'LIVE' ? 1 : 0))) // LIVE first
                      .map(evt => {
                        const isJoined = evt.participants.some(p => p.userId === user.id);
                        return (
                          <div key={evt.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col group hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-bold text-white uppercase tracking-widest">{evt.title}</h4>
                              <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${
                                evt.status === 'LIVE' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                              }`}>
                                {evt.status}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">
                              {new Date(evt.date).toLocaleString()} • {evt.type}
                            </p>
                            <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/10">
                              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                                {evt.participants.length} Joining
                              </span>
                              {isJoined ? (
                                <span className="text-[10px] font-bold tracking-widest uppercase text-green-400 flex items-center gap-1">
                                  <Check size={12} /> Joined
                                </span>
                              ) : (
                                <button 
                                  onClick={() => handleJoinEvent(evt.id)}
                                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                                >
                                  Join Event
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </motion.div>
              </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Create Kingdom Modal */}
      <AnimatePresence>
        {createKingdomOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-lg w-full relative my-8"
            >
              <button 
                onClick={() => setCreateKingdomOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
              
              <h2 className="text-2xl font-heading font-black tracking-widest text-white uppercase mb-6 flex items-center gap-3">
                <Shield className="text-accent-gold" />
                Found Kingdom
              </h2>
              
              <form className="space-y-5" onSubmit={e => { e.preventDefault(); handleCreateKingdom(); }}>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Kingdom Name</label>
                  <input 
                    type="text" 
                    required
                    value={kingdomForm.name}
                    onChange={e => setKingdomForm({...kingdomForm, name: e.target.value})}
                    placeholder="E.g., Aethelgard"
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none" 
                  />
                </div>
                
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Description</label>
                  <textarea 
                    rows={3}
                    value={kingdomForm.description}
                    onChange={e => setKingdomForm({...kingdomForm, description: e.target.value})}
                    placeholder="Describe your kingdom's vision..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none resize-none" 
                  ></textarea>
                </div>
                
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Kingdom Banner (Optional)</label>
                  <div className="flex items-center gap-4">
                    <label className="flex-grow h-12 border border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/5 hover:border-white/40 transition-colors">
                      <input type="file" accept="image/*" className="hidden" onChange={handleKingdomBanner} />
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        {kingdomForm.banner ? 'Banner Selected' : 'Upload Image'}
                      </span>
                    </label>
                    {kingdomForm.banner && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                        <img src={kingdomForm.banner} className="w-full h-full object-cover" alt="Banner preview" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">If skipped, a premium gradient will be generated.</p>
                </div>
                
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Invite Members (Usernames)</label>
                  <input 
                    type="text" 
                    value={kingdomForm.invites}
                    onChange={e => setKingdomForm({...kingdomForm, invites: e.target.value})}
                    placeholder="steve, alex, notch..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none" 
                  />
                </div>
                
                <div className="pt-4 mt-2 border-t border-white/10">
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-accent-gold to-yellow-500 text-black rounded-xl font-black tracking-widest text-sm uppercase hover:shadow-[0_0_20px_rgba(255,183,3,0.3)] transition-all">
                    Forge Kingdom
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
