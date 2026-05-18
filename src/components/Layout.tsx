import React, { useState } from 'react';
import { 
  Bell, Globe, User, Home, BookOpen, MessageCircle, 
  ShoppingBag, Calendar, Wallet, Phone, Menu, X, ChevronRight, AlertCircle, Heart, ShieldCheck,
  LifeBuoy, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
  user: {
    name: string;
    email: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onLogout, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigationTabs: { id: string; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'ritual', label: 'AI Ritual Guide' },
    { id: 'hospital', label: 'Hospital & Emergency' },
    { id: 'communicate', label: 'Communicate' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'events', label: 'Events' },
    { id: 'financial', label: 'Financial Aid' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer shrink-0" 
            onClick={() => setActiveTab('home')}
          >
             <div className="relative w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-10 h-10">
                   <path d="M50 10 C30 40 45 70 50 90 C55 70 70 40 50 10Z" fill="#D4AF37" />
                   <circle cx="50" cy="90" r="8" fill="#8B4513" />
                </svg>
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-display font-bold text-[#8B4513] leading-none tracking-tight">अंतिमा</span>
                <span className="text-[10px] font-bold text-[#8B4513]/40 uppercase tracking-[0.3em] leading-none mt-1">Antima</span>
             </div>
          </motion.div>

          {/* Center Navigation Tabs */}
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <div className="flex items-center space-x-2">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all relative shrink-0 ${
                    activeTab === tab.id 
                      ? 'text-[#2563EB] bg-blue-50' 
                      : 'text-slate-500 hover:text-[#2563EB] hover:bg-slate-50'
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section Icons */}
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-primary transition-colors">
              <Globe size={22} strokeWidth={1.5} />
            </button>
            <button className="text-slate-400 hover:text-primary transition-colors relative">
              <Bell size={22} strokeWidth={1.5} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                activeTab === 'account' ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-slate-100 text-slate-400 hover:bg-slate-50'
              }`}
            >
              <User size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div className="lg:hidden flex items-center ml-4">
            <button 
              className="p-2 text-slate-500 bg-slate-50 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              <div className="flex items-center gap-4 px-4 py-6 border-b border-gray-50 mb-4 bg-primary/5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                   <ShieldCheck size={48} className="text-primary" />
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg rounded-full flex items-center justify-center text-xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">Your Support Space</div>
                  <div className="text-sm font-bold text-text-main">{user.name}</div>
                  <div className="text-xs text-text-muted truncate max-w-[180px]">{user.email}</div>
                </div>
              </div>
              {navigationTabs.map((tab) => {
                const Icon = {
                  ritual: BookOpen,
                  communicate: MessageCircle,
                  marketplace: ShoppingBag,
                  events: Calendar,
                  financial: Wallet,
                }[tab.id] || Home;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 w-full px-4 py-4 rounded-xl text-base font-bold transition-all ${
                      activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:bg-surface'
                    }`}
                  >
                    <Icon size={22} className={activeTab === tab.id ? 'text-white' : 'text-text-light'} />
                    <span className="uppercase tracking-widest text-xs">{tab.label}</span>
                  </button>
                );
              })}
              <button 
                onClick={() => { setActiveTab('account'); setIsMenuOpen(false); }}
                className={`flex items-center gap-4 w-full px-4 py-4 rounded-xl text-base font-bold transition-all ${
                  activeTab === 'account' ? 'bg-primary text-white shadow-lg' : 'text-text-muted border border-primary/10'
                }`}
              >
                <User size={22} className={activeTab === 'account' ? 'text-white' : 'text-primary'} />
                <span className="uppercase tracking-widest text-xs">My Account</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const MobileNav: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: string; label: string; icon: any; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ritual', label: 'Rituals', icon: BookOpen },
    { id: 'communicate', label: 'Alerts', icon: MessageCircle },
    { id: 'marketplace', label: 'Shop', icon: ShoppingBag },
    { id: 'financial', label: 'Money', icon: Wallet },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-40">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 p-2 min-w-[60px] transition-colors relative ${
              activeTab === tab.id ? 'text-primary' : 'text-text-light'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-medium">{tab.label}</span>
            {tab.badge && (
              <span className="absolute top-1 right-2 w-4 h-4 bg-red-600 text-white text-[8px] flex items-center justify-center rounded-full border-2 border-white font-black">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

interface EmergencyFABProps {
  onNavigate: (tab: string) => void;
}

export const EmergencyFAB: React.FC<EmergencyFABProps> = ({ onNavigate }) => {
  return (
    <div className="fixed bottom-10 right-10 z-[60]">
      <motion.button 
        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.3)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('hospital')}
        className="px-8 py-5 bg-[#2563EB] rounded-full shadow-2xl flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs border-2 border-white/20"
      >
         <Phone size={20} className="stroke-white animate-pulse" />
         Emergency
      </motion.button>
    </div>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-white border-t border-gray-200 pt-12 pb-24 lg:pb-12 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                   <path d="M50 10 C30 40 45 70 50 90 C55 70 70 40 50 10Z" fill="#D4AF37" />
                   <circle cx="50" cy="90" r="8" fill="#8B4513" />
                </svg>
            </div>
            <span className="text-xl font-display font-bold text-[#8B4513]">Antima</span>
          </div>
          <p className="text-text-muted max-w-sm mb-6">
            Supporting Indian families with compassion and care. We guide you through rituals, logistics, and legalities during your most difficult moments.
          </p>
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full w-fit">
            <ShieldCheck size={16} />
            Trusted by 10,000+ Indian families
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-text-main mb-4">Resources</h4>
          <ul className="space-y-2 text-text-muted text-sm">
            <li><a href="#" className="hover:text-primary">Ritual Guide</a></li>
            <li><a href="#" className="hover:text-primary">Grief Support</a></li>
            <li><a href="#" className="hover:text-primary">Govt Schemes</a></li>
            <li><a href="#" className="hover:text-primary">Marketplace</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-text-main mb-4">Contact</h4>
          <ul className="space-y-2 text-text-muted text-sm">
            <li><a href="#" className="hover:text-primary">Support Center</a></li>
            <li><a href="#" className="hover:text-primary">Vendor Inquiry</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-light">
        <p>© 2026 Antima Care Technologies. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Made with care in Hyderabad, India</span>
        </div>
      </div>
    </div>
  </footer>
);
