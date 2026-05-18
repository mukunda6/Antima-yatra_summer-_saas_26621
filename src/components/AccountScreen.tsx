import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Shield, Bell, 
  CreditCard, ExternalLink, ChevronRight, LogOut, 
  Camera, CheckCircle2, AlertTriangle, Clock, 
  HelpCircle, LifeBuoy, Info, Globe, Moon, Lock, Settings,
  BookOpen, MessageCircle, ShoppingBag, Calendar, Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AccountScreenProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);

  const preferences = [
    { label: "Language", value: "English & Local Traditions", icon: Globe },
    { label: "Alerts & Notifications", value: "Gentle Reminders Active", icon: Bell },
  ];

  const support = [
    { label: "Guides & Assistance", icon: BookOpen, desc: "Ritual and legal documentation" },
    { label: "Contact Antima Support", icon: LifeBuoy, desc: "Compassionate support available 24/7" },
    { label: "Frequently Asked Questions", icon: Info, desc: "Common guidance and help" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:py-16 animate-fade-in-up">
      {/* Compassionate Header */}
      <div className="mb-12 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-display font-medium text-text-main mb-4 tracking-tight">Your Support Space</h1>
        <p className="text-text-muted text-lg font-medium leading-relaxed max-w-2xl">
          Antima is designed to support families respectfully and privately during difficult moments. Manage your account and preferences here.
        </p>
      </div>

      <div className="space-y-12">
        {/* Profile Section */}
        <section className="bg-white rounded-[48px] p-10 lg:p-14 shadow-premium border border-gray-100/50 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-linear-to-br from-primary/5 to-primary/10 border-8 border-white shadow-xl rounded-[48px] flex items-center justify-center text-primary text-5xl font-display font-medium">
              {user.name.charAt(0)}
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-gray-50 text-primary hover:bg-surface transition-all"
            >
              <Camera size={20} />
            </motion.button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-4 border border-primary/10">
              <CheckCircle2 size={14} /> Verified Family Account
            </div>
            <h2 className="text-3xl font-display font-bold text-text-main mb-2">{user.name}</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-text-muted mb-8 font-medium">
              <div className="flex items-center gap-2"><Mail size={16} className="text-primary/40" /> {user.email}</div>
              <div className="w-1 h-1 bg-gray-300 rounded-full hidden md:block"></div>
              <div className="flex items-center gap-2"><Phone size={16} className="text-primary/40" /> +91 Verified</div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
               <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => setIsEditing(!isEditing)}
                 className="px-8 py-3.5 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-lg hover:bg-primary-light transition-all flex items-center gap-3"
               >
                 {isEditing ? 'Save Profile' : 'Edit Information'}
               </motion.button>
               <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLogout}
                className="px-8 py-3.5 border-2 border-primary/5 bg-white text-text-muted hover:bg-red-50 hover:text-red-500 hover:border-red-100 font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all flex items-center gap-3"
              >
                <LogOut size={18} /> Sign Out
              </motion.button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Support Preferences */}
          <section className="bg-white rounded-[40px] p-10 shadow-premium border border-gray-100 flex flex-col">
            <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-10">Support Preferences</h3>
            <div className="space-y-8 flex-1">
              {preferences.map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center text-text-light group-hover:text-primary transition-colors border border-gray-50">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] text-text-light font-black uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="text-base font-bold text-text-main group-hover:text-primary transition-colors">{item.value}</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-200 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </section>

          {/* Privacy & Trust */}
          <section className="bg-white rounded-[40px] p-10 shadow-premium border border-gray-100">
            <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-10">Privacy & Protection</h3>
            <div className="p-8 bg-ivory border border-gray-100/50 rounded-3xl space-y-6">
              <div className="flex items-center gap-4 text-emerald-600 font-bold">
                <Shield size={24} className="opacity-80" />
                <span className="text-sm">Your Data is Securely Protected</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed font-normal">
                Your family information is securely protected and privately managed by Antima. We respect your privacy and emotional well-being at all times.
              </p>
              <div className="pt-4 border-t border-gray-200/50 flex flex-wrap gap-4">
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Download Privacy Policy</button>
              </div>
            </div>
          </section>
        </div>

        {/* Support & Help Section */}
        <section className="bg-white rounded-[48px] p-10 lg:p-14 shadow-premium border border-gray-100">
           <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-12">Guides & Assistance</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {support.map((item, i) => (
                <div key={i} className="flex flex-col group cursor-pointer">
                  <div className="w-14 h-14 bg-ivory text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-gray-50">
                     <item.icon size={24} />
                  </div>
                  <div className="text-left">
                     <div className="text-lg font-bold text-text-main mb-2">
                       {item.label}
                     </div>
                     <p className="text-sm text-text-muted font-medium mb-6">{item.desc}</p>
                     <div className="mt-auto flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[9px] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2">
                       Visit Center <ChevronRight size={12} />
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* Minimal Footer */}
        <div className="pt-12 text-center text-[10px] font-bold text-text-light uppercase tracking-[0.2em] leading-relaxed">
          Antima Care Technologies • Supporting Indian Families with Dignity
        </div>
      </div>
    </div>
  );
};
