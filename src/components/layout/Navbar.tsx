
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";
import { useJoinModal } from "../../context/JoinModalContext";
import { useAuth } from "../../context/AuthContext";
import { serverConfig } from "../../config/server";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Kingdoms", path: "/kingdoms" },
  { name: "World", path: "/world" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Handbook", path: "/handbook" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openJoinModal } = useJoinModal();
  const { isAuthenticated, user, logout, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-white/10 py-4 shadow-lg"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">👑</span>
            <span className="font-heading font-bold text-xl tracking-wider text-white">KINGDOM</span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-light"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity" onClick={openJoinModal}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-gray-300 font-mono tracking-wider">{serverConfig.serverIP}</span>
            </div>
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <Link to={(user.applicationStatus === 'APPROVED' || user.role === 'OWNER' || user.role === 'ADMIN') ? "/dashboard" : "/application"} className="flex items-center gap-3 group">
                  <span className="text-xs font-bold tracking-widest text-gray-300 group-hover:text-white transition-colors hidden lg:block uppercase">
                    {(user.applicationStatus === 'APPROVED' || user.role === 'OWNER' || user.role === 'ADMIN') ? 'Dashboard' : 'Application'}
                  </span>
                  <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-lg border border-white/20 group-hover:border-accent-gold transition-colors" />
                </Link>
                {user.role === 'OWNER' || user.role === 'ADMIN' ? (
                  <Link to="/admin">
                    <Button size="sm" variant="outline">ADMIN</Button>
                  </Link>
                ) : null}
                <button 
                  onClick={() => logout()}
                  className="text-xs font-bold tracking-widest text-red-400 hover:text-red-300 transition-colors uppercase ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="outline">LOGIN</Button>
              </Link>
            )}
            <Button size="sm" onClick={openJoinModal}>JOIN</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-3xl flex flex-col pt-24 pb-6 px-6 h-screen overflow-y-auto"
          >
            <div className="flex flex-col space-y-6 flex-grow justify-center pb-20 text-center">
              {links.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  key={link.name}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-3xl font-heading font-black tracking-widest uppercase transition-colors block",
                      location.pathname === link.path ? "text-accent-gold" : "text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="mt-auto border-t border-white/10 pt-8 flex flex-col gap-6"
            >
              <div 
                className="flex items-center gap-3 justify-center cursor-pointer group"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openJoinModal();
                }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-gray-300 font-mono tracking-wider group-hover:text-white transition-colors">
                  {serverConfig.serverIP}
                </span>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-accent-gold to-yellow-400 text-black font-black tracking-widest text-lg py-4 border-none shadow-[0_0_20px_rgba(255,183,3,0.3)] hover:shadow-[0_0_30px_rgba(255,183,3,0.5)]" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openJoinModal();
                }}
              >
                JOIN KINGDOM
              </Button>
              {isAuthenticated && user ? (
                <div className="flex flex-col gap-4 mt-4">
                  <Link to={(user.applicationStatus === 'APPROVED' || user.role === 'OWNER' || user.role === 'ADMIN') ? "/dashboard" : "/application"} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-white/20 uppercase">
                      {(user.applicationStatus === 'APPROVED' || user.role === 'OWNER' || user.role === 'ADMIN') ? 'Dashboard' : 'Application'}
                    </Button>
                  </Link>
                  {(user.role === 'OWNER' || user.role === 'ADMIN') && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-accent-gold/50 text-accent-gold hover:bg-accent-gold/10">ADMIN PANEL</Button>
                    </Link>
                  )}
                  <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    LOGOUT
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mt-2">
                  <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:text-white hover:border-white/50">
                    LOGIN TO ACCOUNT
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
