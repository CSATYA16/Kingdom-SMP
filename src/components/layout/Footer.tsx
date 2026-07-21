import { Link } from "react-router-dom";
import { MessageSquare as Discord, Camera as InstagramIcon, Video as YoutubeIcon } from "lucide-react";
import { socialsConfig } from "../../config/socials";
import { serverConfig } from "../../config/server";
export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👑</span>
              <span className="font-heading font-bold text-xl tracking-wider text-white">KINGDOM</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium Minecraft survival community focused on creativity, collaboration and long-term gameplay.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href={socialsConfig.discord} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Discord size={20} /></a>
              <a href={socialsConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><InstagramIcon size={20} /></a>
              <a href={socialsConfig.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><YoutubeIcon size={20} /></a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Kingdoms', 'World', 'Gallery', 'Handbook'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-6">Community</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><Link to="/handbook" className="hover:text-white transition-colors">Rules</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Server */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-6">Server</h4>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-white font-medium text-sm">Online Now</span>
              </div>
              <p className="text-primary-light font-mono text-sm tracking-wider">
                {serverConfig.serverIP}
              </p>
            </div>
          </div>
          
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Kingdom SMP. Not an official Minecraft product.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
