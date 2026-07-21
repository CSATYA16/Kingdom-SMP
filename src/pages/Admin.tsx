import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Image as ImageIcon, Settings, 
  UploadCloud, Search, Shield, Activity,
  Bell, FileText, CheckCircle, XCircle, Server, Menu, X, Trash2, Calendar
} from 'lucide-react';
import type { User } from '../data/users';
import type { Role } from '../data/roles';
import { getData, saveData, logActivity } from '../utils/storage';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { compressImage } from '../utils/image';
import type { Kingdom, KingdomMember } from '../data/kingdoms';
import type { SMPEvent, EventType, EventStatus } from '../data/events';

type AdminTab = 'OVERVIEW' | 'APPLICATIONS' | 'PLAYERS' | 'KINGDOMS' | 'EVENTS' | 'MEDIA' | 'ANNOUNCEMENTS' | 'SETTINGS' | 'ACTIVITY';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('OVERVIEW');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const tabs = [
    { id: 'OVERVIEW', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'APPLICATIONS', label: 'Applications', icon: <FileText size={18} /> },
    { id: 'PLAYERS', label: 'Players', icon: <Users size={18} /> },
    { id: 'KINGDOMS', label: 'Kingdoms', icon: <Shield size={18} /> },
    { id: 'EVENTS', label: 'Events', icon: <Calendar size={18} /> },
    { id: 'MEDIA', label: 'Media Manager', icon: <ImageIcon size={18} /> },
    { id: 'ANNOUNCEMENTS', label: 'Announcements', icon: <Bell size={18} /> },
    { id: 'SETTINGS', label: 'Settings', icon: <Settings size={18} /> },
    { id: 'ACTIVITY', label: 'Activity Logs', icon: <FileText size={18} /> }
  ] as const;

  return (
    <div className="min-h-screen pt-24 pb-0 flex flex-col md:flex-row relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-gold/10 via-transparent to-transparent blur-[100px] pointer-events-none -z-10" />

      <div className="md:hidden flex items-center justify-between p-6 bg-black/60 border-b border-white/10">
        <h2 className="text-xl font-heading font-black tracking-widest text-white uppercase">Admin Panel</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 bg-black/60 backdrop-blur-xl border-r border-white/10 md:min-h-[calc(100vh-6rem)] p-6 z-20 absolute md:static top-0 left-0 h-full`}>
        <div className="mb-8 hidden md:block">
          <h2 className="text-xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400 uppercase">
            Admin Panel
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Kingdom System</p>
        </div>

        <nav className="flex flex-col gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap text-sm font-bold tracking-widest uppercase ${
                activeTab === item.id 
                  ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-grow p-6 md:p-10 overflow-x-hidden relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            variants={fadeUp}
            transition={{ duration: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            {activeTab === 'OVERVIEW' && <AdminOverview />}
            {activeTab === 'APPLICATIONS' && <AdminApplications />}
            {activeTab === 'PLAYERS' && <AdminPlayers />}
            {activeTab === 'KINGDOMS' && <AdminKingdoms />}
            {activeTab === 'EVENTS' && <AdminEvents />}
            {activeTab === 'MEDIA' && <AdminMedia />}
            {activeTab === 'ANNOUNCEMENTS' && <AdminAnnouncements />}
            {activeTab === 'SETTINGS' && <AdminSettings />}
            {activeTab === 'ACTIVITY' && <AdminActivityLogs />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                SUBCOMPONENTS                               */
/* -------------------------------------------------------------------------- */

const AdminOverview = () => {
  const [stats, setStats] = useState({ players: 0, kingdoms: 0, media: 0 });

  useEffect(() => {
    const users = getData<User[]>('users', []);
    const approvedUsers = users.filter(u => u.applicationStatus === 'APPROVED' || u.role === 'OWNER' || u.role === 'ADMIN');
    const media = getData<any[]>('media', []);
    const kingdoms = new Set(users.map(u => u.kingdom).filter(k => k)).size;
    setStats({ players: approvedUsers.length, kingdoms, media: media.length });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase">Overview</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Total Players", value: stats.players, icon: <Users size={24} /> },
          { label: "Online Now", value: "42", icon: <Activity size={24} /> },
          { label: "Total Kingdoms", value: stats.kingdoms, icon: <Shield size={24} /> },
          { label: "Uploaded Memories", value: stats.media, icon: <ImageIcon size={24} /> },
          { label: "Server Status", value: "ONLINE", icon: <Server size={24} />, color: "text-green-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-accent-gold/30 transition-colors">
            <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-accent-gold/10 transition-colors">
              {stat.icon}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">{stat.label}</div>
            <div className={`text-4xl font-heading font-black ${stat.color || 'text-white'}`}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [reviewMessage, setReviewMessage] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    setApplications(getData<any[]>('applications', []));
  }, []);

  const handleApprove = (app: any) => {
    // Update Application
    const updatedApps = applications.map(a => a.id === app.id ? { ...a, status: 'APPROVED', reviewedAt: new Date().toISOString() } : a);
    setApplications(updatedApps);
    saveData('applications', updatedApps);
    
    // Update User
    const users = getData<User[]>('users', []);
    const updatedUsers = users.map(u => u.id === app.userId ? { ...u, applicationStatus: 'APPROVED', minecraftWhitelisted: true } : u);
    saveData('users', updatedUsers);
    
    // Create Notification
    const announcements = getData<any[]>('announcements', []);
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Application Approved!',
      message: 'Your Kingdom SMP application was approved. Welcome to the server!',
      type: 'Events',
      date: new Date().toISOString()
    };
    saveData('announcements', [newNotif, ...announcements]);
    
    logActivity(`Approved application for ${app.username}`, 'Admin');
    addToast({ title: 'Application Approved', type: 'success' });
  };

  const handleReject = () => {
    if (!selectedApp || !reviewMessage.trim()) {
      addToast({ title: 'Please provide a reason', type: 'error' });
      return;
    }
    
    // Update Application
    const updatedApps = applications.map(a => 
      a.id === selectedApp.id ? { ...a, status: 'REJECTED', reviewMessage, reviewedAt: new Date().toISOString() } : a
    );
    setApplications(updatedApps);
    saveData('applications', updatedApps);
    
    // Update User
    const users = getData<User[]>('users', []);
    const updatedUsers = users.map(u => u.id === selectedApp.userId ? { ...u, applicationStatus: 'REJECTED' } : u);
    saveData('users', updatedUsers);
    
    // Create Notification
    const announcements = getData<any[]>('announcements', []);
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Application Update',
      message: 'Your application needs changes. Please review the feedback and apply again.',
      type: 'Maintenance',
      date: new Date().toISOString()
    };
    saveData('announcements', [newNotif, ...announcements]);
    
    logActivity(`Rejected application for ${selectedApp.username}`, 'Admin');
    addToast({ title: 'Application Rejected', type: 'success' });
    setRejectModalOpen(false);
    setSelectedApp(null);
    setReviewMessage('');
  };

  const filteredApps = applications.filter(a => filter === 'ALL' || a.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase">Whitelist Applications</h3>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors ${
              filter === f 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      
      {filteredApps.length === 0 ? (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-12 rounded-2xl text-center">
          <FileText size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest">No applications found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <div key={app.id} className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col h-full group hover:border-white/20 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-widest">{app.username}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Submitted {new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded border ${
                  app.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                  app.status === 'APPROVED' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {app.status}
                </span>
              </div>
              
              <div className="flex-grow space-y-4 mb-6">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Age</span>
                  <p className="text-sm text-gray-300">{app.answers.age || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Type</span>
                  <p className="text-sm text-gray-300">{app.answers.playerType} - Previous SMP: {app.answers.previousSMP}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Experience</span>
                  <p className="text-sm text-gray-300 line-clamp-3">{app.answers.experience}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Reason</span>
                  <p className="text-sm text-gray-300 line-clamp-3">{app.answers.reason}</p>
                </div>
                
                {app.reviewMessage && (
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg mt-4">
                    <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold block mb-1">Rejection Note</span>
                    <p className="text-sm text-red-300 italic">"{app.reviewMessage}"</p>
                  </div>
                )}
              </div>
              
              {app.status === 'PENDING' && (
                <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-white/10">
                  <button 
                    onClick={() => handleApprove(app)}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => { setSelectedApp(app); setRejectModalOpen(true); }}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-xl font-heading font-black tracking-widest text-white uppercase mb-4">Reject Application</h3>
            <p className="text-gray-400 text-sm mb-6">Provide a reason for rejecting <strong className="text-white">{selectedApp.username}</strong>'s application.</p>
            
            <textarea 
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="e.g. Please provide more information about your previous SMP experience."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-accent-gold/50 outline-none mb-6 h-32 resize-none"
            />
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => { setRejectModalOpen(false); setSelectedApp(null); setReviewMessage(''); }}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold tracking-widest text-xs uppercase transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold tracking-widest text-xs uppercase hover:bg-red-600 transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const AdminPlayers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<User | null>(null);
  const { addToast } = useToast();
  const { user: currentUser, refreshUser } = useAuth();

  useEffect(() => {
    setUsers(getData<User[]>('users', []));
  }, []);

  const handleRoleChange = (id: string, newRole: string) => {
    const updated = users.map(u => u.id === id ? { ...u, role: newRole as Role } : u);
    setUsers(updated);
    saveData('users', updated);
    
    // If admin changed their own role, update currentUser in local storage and refresh
    if (currentUser?.id === id) {
      const updatedSelf = updated.find(u => u.id === id);
      if (updatedSelf) {
        localStorage.setItem('currentUser', JSON.stringify(updatedSelf));
        refreshUser();
      }
    }
    
    addToast({ title: 'Role Updated', type: 'success' });
  };

  const handleRemove = () => {
    if (confirmRemove) {
      const updated = users.filter(u => u.id !== confirmRemove.id);
      setUsers(updated);
      saveData('users', updated);
      setConfirmRemove(null);
      addToast({ title: 'Player Removed', type: 'success' });
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase">Player Management</h3>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search players..." 
            className="bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent-gold/50 w-full sm:w-64 transition-colors font-bold tracking-wide"
          />
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-gray-400 font-bold">
              <th className="p-4">Username</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Kingdom</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="p-4 flex items-center gap-3">
                  <img src={user.avatar} alt="" className="w-10 h-10 rounded-lg bg-white/10" />
                  <span className="font-bold tracking-wide text-white">{user.minecraftUsername}</span>
                </td>
                <td className="p-4">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border outline-none appearance-none cursor-pointer ${
                      user.role === 'OWNER' ? 'bg-accent-gold/10 border-accent-gold/20 text-accent-gold' :
                      user.role === 'ADMIN' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                      'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    <option value="OWNER">OWNER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MODERATOR">MODERATOR</option>
                    <option value="PLAYER">PLAYER</option>
                  </select>
                </td>
                <td className="p-4 text-gray-400 text-sm font-medium">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-gray-300 text-sm font-medium">
                  {user.kingdom || '-'}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Online</span>
                  </div>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => setSelectedUser(user)} className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase border border-white/10 hover:border-white/30 rounded-lg transition-colors text-white">View</button>
                  <button onClick={() => setConfirmRemove(user)} className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase border border-white/10 hover:border-red-500 hover:text-red-400 rounded-lg transition-colors text-white">Remove</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="p-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Users size={48} className="mb-4 opacity-50" />
                    <p className="text-sm font-bold tracking-widest uppercase">No players found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Player Profile Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-accent-gold/20 to-transparent opacity-50 pointer-events-none" />
              
              <div className="flex flex-col items-center text-center relative z-10 mt-4">
                <img src={selectedUser.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl border-2 border-white/10 mb-4" />
                <h2 className="text-2xl font-heading font-black tracking-widest text-white uppercase">{selectedUser.minecraftUsername}</h2>
                <p className="text-xs text-gray-500 font-mono mt-1">UUID: e8d4a9-placeholder-b2c1</p>
                
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold tracking-widest uppercase text-white">{selectedUser.role}</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold tracking-widest uppercase text-accent-purple">{selectedUser.kingdom || 'No Kingdom'}</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-4 relative z-10">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Joined</span>
                  <span className="text-sm text-white font-medium">{new Date(selectedUser.joinedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Playtime</span>
                  <span className="text-sm text-white font-medium">124h 32m</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Memories Uploaded</span>
                  <span className="text-sm text-white font-medium">14</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Remove Confirmation Modal */}
      <AnimatePresence>
        {confirmRemove && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-red-500/30 rounded-2xl p-8 max-w-sm w-full text-center"
            >
              <h2 className="text-xl font-heading font-black tracking-widest text-white uppercase mb-2">Remove Player?</h2>
              <p className="text-sm text-gray-400 mb-6">Are you sure you want to remove <strong className="text-white">{confirmRemove.minecraftUsername}</strong>? This action cannot be undone.</p>
              <div className="flex gap-4">
                <button onClick={() => setConfirmRemove(null)} className="flex-1 py-3 border border-white/10 rounded-xl text-white font-bold tracking-widest text-xs uppercase hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleRemove} className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold tracking-widest text-xs uppercase transition-colors">Remove</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminKingdoms = () => {
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);
  const [editingKingdom, setEditingKingdom] = useState<Kingdom | null>(null);
  const [editForm, setEditForm] = useState<{name: string, description: string, status: Kingdom['status'], membersText: string, banner: string}>({
    name: '', description: '', status: 'Recruiting', membersText: '', banner: ''
  });
  const { addToast } = useToast();

  useEffect(() => {
    setKingdoms(getData<Kingdom[]>('kingdoms', []));
  }, []);

  const openEdit = (kingdom: Kingdom) => {
    setEditingKingdom(kingdom);
    setEditForm({
      name: kingdom.name,
      description: kingdom.description,
      status: kingdom.status,
      membersText: kingdom.members.map(m => m.username).join(', '),
      banner: kingdom.banner
    });
  };

  const handleEditBanner = async (file: File) => {
    if (!file) return;
    const base64 = await compressImage(file);
    setEditForm({ ...editForm, banner: base64 });
  };

  const saveEdit = () => {
    if (!editingKingdom) return;
    if (!editForm.name) {
      addToast({ title: 'Name is required', type: 'error' });
      return;
    }
    
    // Parse members
    const memberNames = editForm.membersText.split(',').map(s => s.trim()).filter(s => s);
    const updatedMembers: KingdomMember[] = memberNames.map(name => {
      const existing = editingKingdom.members.find(m => m.username.toLowerCase() === name.toLowerCase());
      return existing || { username: name, role: 'MEMBER', joinedAt: new Date().toISOString() };
    });

    const updated = kingdoms.map(k => k.id === editingKingdom.id ? {
      ...k,
      name: editForm.name,
      description: editForm.description,
      status: editForm.status,
      banner: editForm.banner,
      members: updatedMembers
    } : k);

    setKingdoms(updated);
    saveData('kingdoms', updated);
    logActivity(`Edited Kingdom (${editForm.name})`, 'Admin');
    addToast({ title: 'Kingdom Updated', type: 'success' });
    setEditingKingdom(null);
  };

  const handleDelete = (id: string, name: string) => {
    const updated = kingdoms.filter(k => k.id !== id);
    setKingdoms(updated);
    saveData('kingdoms', updated);
    logActivity(`Deleted Kingdom (${name})`, 'Admin');
    addToast({ title: 'Kingdom Deleted', type: 'success' });
  };

  const handleStatusChange = (id: string, status: Kingdom['status'], name: string) => {
    const updated = kingdoms.map(k => k.id === id ? { ...k, status } : k);
    setKingdoms(updated);
    saveData('kingdoms', updated);
    logActivity(`Updated Kingdom Status (${name} -> ${status})`, 'Admin');
    addToast({ title: 'Status Updated', type: 'success' });
  };

  const totalMembers = kingdoms.reduce((acc, k) => acc + k.members.length, 0);

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase">Kingdom Manager</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">Total Kingdoms</div>
          <div className="text-4xl font-heading font-black text-white">{kingdoms.length}</div>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">Active Kingdoms</div>
          <div className="text-4xl font-heading font-black text-white">{kingdoms.length}</div>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">Total Members</div>
          <div className="text-4xl font-heading font-black text-white">{totalMembers}</div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-gray-400 font-bold">
              <th className="p-4">Kingdom Name</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Members</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kingdoms.length > 0 ? kingdoms.map((kingdom) => (
              <tr key={kingdom.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ background: kingdom.banner.startsWith('linear-gradient') ? kingdom.banner : 'none' }}>
                    {kingdom.banner.startsWith('data:') && <img src={kingdom.banner} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <span className="font-bold tracking-wide text-white">{kingdom.name}</span>
                </td>
                <td className="p-4 text-gray-300 text-sm font-medium">
                  {kingdom.owner}
                </td>
                <td className="p-4 text-gray-400 text-sm font-medium">
                  {kingdom.members.length}
                </td>
                <td className="p-4">
                  <select 
                    value={kingdom.status} 
                    onChange={(e) => handleStatusChange(kingdom.id, e.target.value as Kingdom['status'], kingdom.name)}
                    className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border outline-none appearance-none cursor-pointer bg-white/5 border-white/10 text-gray-300"
                  >
                    <option value="Recruiting">Recruiting</option>
                    <option value="Invite Only">Invite Only</option>
                    <option value="Full">Full</option>
                  </select>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => openEdit(kingdom)} className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase border border-white/10 hover:border-accent-gold hover:text-accent-gold rounded-lg transition-colors text-white">Edit</button>
                  <button onClick={() => handleDelete(kingdom.id, kingdom.name)} className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase border border-white/10 hover:border-red-500 hover:text-red-400 rounded-lg transition-colors text-white">Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Shield size={48} className="mb-4 opacity-50" />
                    <p className="text-sm font-bold tracking-widest uppercase">No kingdoms exist</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Kingdom Modal */}
      <AnimatePresence>
        {editingKingdom && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setEditingKingdom(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-heading font-black tracking-widest text-white uppercase mb-6">Edit Kingdom</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Kingdom Name</label>
                  <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none" />
                </div>
                
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Description</label>
                  <textarea rows={3} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none resize-none"></textarea>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Status</label>
                  <select value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value as Kingdom['status']})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none appearance-none">
                    <option value="Recruiting">Recruiting</option>
                    <option value="Invite Only">Invite Only</option>
                    <option value="Full">Full</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Members (Comma-separated usernames)</label>
                  <textarea rows={2} value={editForm.membersText} onChange={e => setEditForm({...editForm, membersText: e.target.value})} placeholder="Steve, Alex, Notch" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none resize-none"></textarea>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Banner Image</label>
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-xl border border-white/10 overflow-hidden shrink-0" style={{ background: editForm.banner.startsWith('linear-gradient') ? editForm.banner : 'none' }}>
                      {editForm.banner.startsWith('data:') && <img src={editForm.banner} alt="Banner" className="w-full h-full object-cover" />}
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleEditBanner(e.target.files[0])} className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:tracking-widest file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors" />
                  </div>
                </div>

                <button onClick={saveEdit} className="w-full py-3 mt-4 bg-accent-gold hover:bg-yellow-400 text-black font-black tracking-widest text-xs uppercase rounded-xl transition-colors">
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminMedia = () => {
  const [dragActive, setDragActive] = useState(false);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'Gallery', type: 'image', url: '' });
  const { addToast } = useToast();

  useEffect(() => {
    setMediaList(getData<any[]>('media', []));
  }, []);

  const handleFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm({ ...form, url: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const publishMedia = () => {
    if (!form.title || !form.url) {
      addToast({ title: 'Title and Media required', type: 'error' });
      return;
    }
    const newMedia = { ...form, id: Date.now().toString(), status: 'Approved', uploaderId: 'admin', uploaderName: 'Admin', createdAt: new Date().toISOString() };
    const updated = [newMedia, ...mediaList];
    setMediaList(updated);
    saveData('media', updated);
    addToast({ title: 'Media Published', type: 'success' });
    setForm({ title: '', description: '', category: 'Gallery', type: 'image', url: '' });
  };

  const handleStatus = (id: string, status: string) => {
    const updated = mediaList.map(m => m.id === id ? { ...m, status } : m);
    setMediaList(updated);
    saveData('media', updated);
    addToast({ title: `Media ${status.toLowerCase()}`, type: 'success' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Admin delete this memory?")) {
      const itemToDelete = mediaList.find(m => m.id === id);
      if (itemToDelete) {
        const updated = mediaList.filter(m => m.id !== id);
        setMediaList(updated);
        saveData('media', updated);
        logActivity(`Admin deleted memory "${itemToDelete.title}" uploaded by ${itemToDelete.uploaderName || itemToDelete.uploader}`, 'Admin');
        addToast({ title: 'Memory deleted', type: 'success' });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase">Media Manager</h3>
        <button onClick={publishMedia} className="px-6 py-2.5 bg-gradient-to-r from-accent-gold to-yellow-500 text-black font-black tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(255,183,3,0.3)] transition-all uppercase">
          Publish Media
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Upload Details</h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Upload Location</label>
                <select 
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none appearance-none font-medium"
                >
                  <option>Homepage</option>
                  <option>Gallery</option>
                  <option>World</option>
                  <option>Memories</option>
                  <option>Events</option>
                  <option>Founder</option>
                  <option>Mascot</option>
                </select>
              </div>
              
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Media Type</label>
                <div className="flex gap-2">
                  <button onClick={() => setForm({ ...form, type: 'image' })} className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors ${form.type === 'image' ? 'bg-accent-gold/10 border border-accent-gold/30 text-accent-gold' : 'bg-white/5 border border-white/10 text-white'}`}>Image</button>
                  <button onClick={() => setForm({ ...form, type: 'video' })} className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors ${form.type === 'video' ? 'bg-accent-gold/10 border border-accent-gold/30 text-accent-gold' : 'bg-white/5 border border-white/10 text-white'}`}>Video</button>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Enter title..." className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none" />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Enter description..." className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-gold/50 outline-none resize-none"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <label 
            className={`h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer overflow-hidden relative ${
              dragActive ? 'border-accent-gold bg-accent-gold/5 scale-[1.01]' : 'border-white/20 bg-black/20 hover:border-white/40 hover:bg-black/40'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
            
            {form.url ? (
              <img src={form.url} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                  <UploadCloud size={28} className={dragActive ? 'text-accent-gold' : 'text-gray-400'} />
                </div>
                <h3 className="text-xl font-black text-white mb-2 tracking-widest uppercase">Drag & Drop Media</h3>
                <p className="text-sm text-gray-400 max-w-sm text-center mb-6 font-medium">
                  Upload high quality images or videos. MP4, WebM, PNG, JPG supported.
                </p>
                <span className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/10 text-xs font-black tracking-widest uppercase">
                  Browse Files
                </span>
              </>
            )}
          </label>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center justify-between">
              Moderation Queue
              <span className="text-[10px] bg-accent-purple/20 text-accent-purple px-2 py-1 rounded">{mediaList.filter(m => m.status === 'Pending').length} PENDING</span>
            </h4>
            
            <div className="space-y-3">
              {mediaList.length > 0 ? mediaList.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black/50 rounded flex items-center justify-center border border-white/10 overflow-hidden">
                      {item.url ? <img src={item.url} className="w-full h-full object-cover" alt="" /> : <ImageIcon size={16} className="text-gray-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Uploaded by {item.uploaderName || item.uploader || item.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded border ${
                      item.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                      item.status === 'Approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                      {item.status}
                    </span>
                    {item.status === 'Pending' && (
                      <>
                        <button onClick={() => handleStatus(item.id, 'Approved')} className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 transition-colors">
                          <CheckCircle size={16} />
                        </button>
                        <button onClick={() => handleStatus(item.id, 'Rejected')} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 transition-colors">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-gray-500/10 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg border border-gray-500/30 hover:border-red-500/30 transition-colors ml-2">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="py-8 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">No media found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', message: '', type: 'News' });
  const { addToast } = useToast();

  useEffect(() => {
    setAnnouncements(getData<any[]>('announcements', []));
  }, []);

  const handleBroadcast = () => {
    if (!form.title || !form.message) {
      addToast({ title: 'Title and Message are required', type: 'error' });
      return;
    }
    const newAnnouncement = { 
      ...form, 
      id: Date.now().toString(), 
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };
    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    saveData('announcements', updated);
    addToast({ title: 'Announcement Broadcasted', type: 'success' });
    setForm({ title: '', message: '', type: 'News' });
  };

  const handleDelete = (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    saveData('announcements', updated);
    addToast({ title: 'Announcement Deleted', type: 'success' });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase">Announcements Manager</h3>
        <button onClick={handleBroadcast} className="px-6 py-2.5 bg-accent-gold text-black font-black tracking-widest text-xs rounded-xl hover:bg-yellow-400 transition-colors uppercase">
          Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl h-fit">
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Announcement Type</label>
              <div className="flex flex-wrap gap-3">
                {['News', 'Events', 'Updates', 'Maintenance'].map((type) => (
                  <button 
                    key={type} 
                    type="button" 
                    onClick={() => setForm({ ...form, type })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase border transition-colors ${
                      form.type === type ? 'bg-accent-purple/20 border-accent-purple/50 text-accent-purple' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="E.g., Season I Officially Launching!" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent-gold/50 outline-none transition-colors" />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Message Body</label>
              <textarea rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Detailed message..." className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent-gold/50 outline-none resize-none transition-colors"></textarea>
            </div>
          </form>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Recent Broadcasts</h4>
          <div className="space-y-4">
            {announcements.length > 0 ? announcements.map(ann => (
              <div key={ann.id} className="p-4 bg-white/5 border border-white/10 rounded-xl relative group">
                <button onClick={() => handleDelete(ann.id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
                <span className="text-[10px] font-bold tracking-widest uppercase text-accent-purple mb-1 block">{ann.type}</span>
                <h5 className="font-bold text-white text-sm">{ann.title}</h5>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{ann.message}</p>
                <div className="mt-3 text-[10px] font-mono text-gray-500">{ann.date} {ann.time}</div>
              </div>
            )) : (
              <div className="py-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">No announcements yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  const [config, setConfig] = useState({ serverName: '', serverIP: '', minecraftVersion: '', season: '', discord: '' });
  const { addToast } = useToast();

  useEffect(() => {
    const sc = getData<any>('serverConfig', {});
    const soc = getData<any>('socialsConfig', {});
    setConfig({
      serverName: sc.serverName || '',
      serverIP: sc.serverIP || '',
      minecraftVersion: sc.minecraftVersion || '',
      season: sc.season || '',
      discord: soc.discord || ''
    });
  }, []);

  const handleSave = () => {
    saveData('serverConfig', { 
      serverName: config.serverName, 
      serverIP: config.serverIP, 
      minecraftVersion: config.minecraftVersion, 
      season: config.season 
    });
    saveData('socialsConfig', { discord: config.discord });
    addToast({ title: 'Settings saved', type: 'success' });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase">Server Settings</h3>
        <button onClick={handleSave} className="px-6 py-2.5 bg-accent-gold text-black font-black tracking-widest text-xs rounded-xl hover:bg-yellow-400 transition-colors uppercase">
          Save Configuration
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl max-w-3xl">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Server Name</label>
              <input type="text" value={config.serverName} onChange={e => setConfig({ ...config, serverName: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white font-medium outline-none focus:border-accent-gold/50 transition-colors" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Server IP</label>
              <input type="text" value={config.serverIP} onChange={e => setConfig({ ...config, serverIP: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white font-mono outline-none focus:border-accent-gold/50 transition-colors" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Minecraft Version</label>
              <input type="text" value={config.minecraftVersion} onChange={e => setConfig({ ...config, minecraftVersion: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white font-mono outline-none focus:border-accent-gold/50 transition-colors" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Season / Status</label>
              <input type="text" value={config.season} onChange={e => setConfig({ ...config, season: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white font-medium outline-none focus:border-accent-gold/50 transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Discord Invite URL</label>
              <input type="text" value={config.discord} onChange={e => setConfig({ ...config, discord: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white font-mono outline-none focus:border-accent-gold/50 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminActivityLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    setLogs(getData<any[]>('activityLogs', []));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase">Activity Logs</h3>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              <th className="p-4">Action</th>
              <th className="p-4">User / Admin</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? logs.map((log, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 text-sm text-white font-medium">{log.action}</td>
                <td className="p-4 text-xs font-mono text-gray-400">{log.user}</td>
                <td className="p-4 text-xs font-bold tracking-widest uppercase text-gray-500">{log.date}</td>
                <td className="p-4 text-xs font-mono text-gray-500">{log.time}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="p-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <FileText size={48} className="mb-4 opacity-50" />
                    <p className="text-sm font-bold tracking-widest uppercase">No activity logs found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminEvents = () => {
  const [events, setEvents] = useState<SMPEvent[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewingParticipants, setViewingParticipants] = useState<SMPEvent | null>(null);
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    type: 'COMMUNITY' as EventType,
    date: '',
    banner: ''
  });

  useEffect(() => {
    setEvents(getData<SMPEvent[]>('events', []));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast({ title: 'Image must be less than 5MB', type: 'error' });
        return;
      }
      try {
        const compressed = await compressImage(file);
        setFormData(prev => ({ ...prev, banner: compressed }));
      } catch (err) {
        addToast({ title: 'Failed to process image', type: 'error' });
      }
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.type) {
      addToast({ title: 'Please fill out all required fields', type: 'error' });
      return;
    }

    const newEvents = [...events];
    const currentUser = getData<User>('currentUser');

    if (isEditing) {
      const idx = newEvents.findIndex(e => e.id === formData.id);
      if (idx !== -1) {
        newEvents[idx] = { ...newEvents[idx], ...formData };
        logActivity(`Updated event: ${formData.title}`, currentUser.username);
        addToast({ title: 'Event updated successfully', type: 'success' });
      }
    } else {
      const newEvent: SMPEvent = {
        id: `evt-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        date: formData.date,
        banner: formData.banner,
        status: 'UPCOMING',
        createdBy: currentUser.id,
        participants: [],
        discordEventId: null,
        minecraftEventId: null
      };
      newEvents.unshift(newEvent);
      logActivity(`Created event: ${formData.title}`, currentUser.username);
      
      const announcements = getData<any[]>('announcements', []);
      saveData('announcements', [{
        id: `notif-${Date.now()}`,
        title: 'New Event Announced!',
        message: `${newEvent.title} has been scheduled for ${new Date(newEvent.date).toLocaleDateString()}.`,
        type: 'Events',
        date: new Date().toISOString()
      }, ...announcements]);
      
      addToast({ title: 'Event created successfully', type: 'success' });
    }

    setEvents(newEvents);
    saveData('events', newEvents);
    setIsCreating(false);
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    const eventToDelete = events.find(e => e.id === id);
    if (!eventToDelete) return;
    
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updated = events.filter(e => e.id !== id);
      setEvents(updated);
      saveData('events', updated);
      const currentUser = getData<User>('currentUser');
      logActivity(`Deleted event: ${eventToDelete.title}`, currentUser.username);
      addToast({ title: 'Event deleted', type: 'success' });
    }
  };

  const handleStatusChange = (id: string, newStatus: EventStatus) => {
    const updated = events.map(e => {
      if (e.id === id) {
        const currentUser = getData<User>('currentUser');
        logActivity(`Changed event ${e.title} status to ${newStatus}`, currentUser.username);
        
        // Announcements
        if (newStatus === 'LIVE') {
          const announcements = getData<any[]>('announcements', []);
          saveData('announcements', [{
            id: `notif-${Date.now()}`,
            title: 'Event Live!',
            message: `${e.title} has started! Join now!`,
            type: 'Events',
            date: new Date().toISOString()
          }, ...announcements]);
        } else if (newStatus === 'COMPLETED') {
          const announcements = getData<any[]>('announcements', []);
          saveData('announcements', [{
            id: `notif-${Date.now()}`,
            title: 'Event Completed',
            message: `${e.title} has ended. Thanks for participating!`,
            type: 'Events',
            date: new Date().toISOString()
          }, ...announcements]);
        }
        
        return { ...e, status: newStatus };
      }
      return e;
    });
    setEvents(updated);
    saveData('events', updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase">Event Manager</h3>
        <button 
          onClick={() => {
            setFormData({ id: '', title: '', description: '', type: 'COMMUNITY', date: '', banner: '' });
            setIsCreating(true);
            setIsEditing(false);
          }}
          className="px-6 py-2 bg-gradient-to-r from-accent-gold to-yellow-500 text-black rounded-xl font-black tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(255,183,3,0.3)] hover:shadow-[0_0_25px_rgba(255,183,3,0.5)] transition-all flex items-center gap-2"
        >
          <Calendar size={14} />
          Create Event
        </button>
      </div>

      {(isCreating || isEditing) ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
          <h4 className="text-lg font-bold text-white uppercase tracking-widest mb-6">{isEditing ? 'Edit Event' : 'New Event'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Event Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent-gold/50 outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent-gold/50 outline-none transition-colors h-24 resize-none" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as EventType})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent-gold/50 outline-none transition-colors"
                  >
                    <option value="BUILD">Build</option>
                    <option value="COMMUNITY">Community</option>
                    <option value="KINGDOM">Kingdom</option>
                    <option value="COMPETITION">Competition</option>
                    <option value="ANNOUNCEMENT">Announcement</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Date & Time</label>
                  <input 
                    type="datetime-local" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent-gold/50 outline-none transition-colors" 
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Event Banner (Optional)</label>
              <div className="w-full h-48 bg-black/50 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-accent-gold/50 transition-colors">
                {formData.banner ? (
                  <>
                    <img src={formData.banner} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-bold uppercase tracking-widest">Change Image</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 group-hover:text-accent-gold transition-colors">
                    <UploadCloud size={32} className="mx-auto mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest">Upload Banner</span>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/jpeg,image/png,image/webp" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Max size: 5MB. 16:9 ratio recommended.</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button 
              onClick={() => { setIsCreating(false); setIsEditing(false); }}
              className="px-6 py-3 bg-white/5 text-white rounded-xl font-bold tracking-widest text-xs uppercase hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-8 py-3 bg-accent-gold text-black rounded-xl font-black tracking-widest text-xs uppercase hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(255,183,3,0.2)]"
            >
              Save Event
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full bg-black/40 border border-white/10 p-12 rounded-2xl text-center">
              <Calendar size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 font-bold uppercase tracking-widest">No events created</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-all relative">
                <div className="h-32 bg-gradient-to-r from-accent-purple/20 to-accent-gold/20 relative">
                  {event.banner && <img src={event.banner} alt="Banner" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded border backdrop-blur-sm ${
                      event.status === 'UPCOMING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      event.status === 'LIVE' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded bg-black/60 text-white backdrop-blur-sm border border-white/10">
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex-grow relative z-10">
                  <h4 className="text-lg font-bold text-white uppercase tracking-widest mb-1">{event.title}</h4>
                  <p className="text-[10px] text-accent-gold uppercase tracking-widest mb-3 font-bold">
                    {new Date(event.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-4">{event.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-bold">
                    <Users size={12} />
                    {event.participants?.length || 0} Participants
                  </div>
                </div>
                
                <div className="p-4 border-t border-white/10 bg-black/20 flex justify-between items-center relative z-10">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setFormData({
                          id: event.id, title: event.title, description: event.description, 
                          type: event.type, date: event.date, banner: event.banner
                        });
                        setIsEditing(true);
                      }}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Settings size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-red-500/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      onClick={() => setViewingParticipants(event)}
                      className="p-2 text-blue-500/70 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                      title="View Participants"
                    >
                      <Users size={16} />
                    </button>
                  </div>
                  
                  {event.status === 'UPCOMING' && (
                    <button 
                      onClick={() => handleStatusChange(event.id, 'LIVE')}
                      className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      Start Event
                    </button>
                  )}
                  {event.status === 'LIVE' && (
                    <button 
                      onClick={() => handleStatusChange(event.id, 'COMPLETED')}
                      className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded-lg hover:bg-gray-500/30 transition-colors"
                    >
                      End Event
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Participants Modal */}
      {viewingParticipants && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl flex flex-col max-h-[80vh]"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-heading font-black tracking-widest text-white uppercase">Event Participants</h3>
              <button onClick={() => setViewingParticipants(null)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4 text-sm text-gray-400">
              <span className="font-bold text-white">{viewingParticipants.title}</span> - {viewingParticipants.participants?.length || 0} joined
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {(!viewingParticipants.participants || viewingParticipants.participants.length === 0) ? (
                <div className="text-center py-8 text-gray-500 font-bold uppercase tracking-widest text-xs">
                  No participants yet
                </div>
              ) : (
                viewingParticipants.participants.map((p, i) => (
                  <div key={p.userId} className="flex justify-between items-center p-3 bg-black/40 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-4">{i + 1}.</span>
                      <span className="text-sm font-bold text-white uppercase tracking-widest">{p.username}</span>
                    </div>
                    <span className="text-[10px] text-gray-500">{new Date(p.joinedAt).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
