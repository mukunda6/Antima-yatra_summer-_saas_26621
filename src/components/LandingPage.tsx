import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Globe, ArrowRight, User, MousePointer2, MessageCircle, ShoppingBag, Calendar } from 'lucide-react';

interface LandingPageProps {
  onStart: (mode?: 'login' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="max-w-[1600px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-10 h-10">
                 <path d="M50 10 C30 40 45 70 50 90 C55 70 70 40 50 10Z" fill="#D4AF37" />
                 <circle cx="50" cy="90" r="8" fill="#8B4513" />
              </svg>
           </div>
           <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-[#8B4513] leading-none tracking-tight">अंतिमा</span>
              <span className="text-[10px] font-bold text-[#8B4513]/40 uppercase tracking-[0.3em] leading-none mt-1">Antima</span>
           </div>
        </div>
        
        <div className="hidden md:flex items-center gap-12 font-bold text-slate-500 uppercase tracking-widest text-[11px]">
          <a href="#" className="hover:text-primary transition-colors">AI Ritual Guide</a>
          <a href="#" className="hover:text-primary transition-colors">Marketplace</a>
          <a href="#" className="hover:text-primary transition-colors">Family Support</a>
        </div>

        <div className="flex items-center gap-6">
           <button onClick={() => onStart('login')} className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Login</button>
           <button 
            onClick={() => onStart('signup')}
            className="px-8 py-3.5 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-full shadow-xl hover:bg-primary-dark transition-all transform hover:-translate-y-0.5"
           >
            Get Started
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-20 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-8"
          >
             <h1 className="text-4xl lg:text-7xl font-display font-medium text-[#0F172A] leading-tight tracking-tight">
                We're here to help you <br />
                through this.
             </h1>
             <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed opacity-80">
                Compassionate support for Indian families — rituals, logistics, communication, and government guidance.
             </p>
             <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => onStart('signup')}
                  className="px-10 py-4 bg-[#2563EB] text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-[#1D4ED8] transition-all transform hover:-translate-y-1"
                >
                  Get Started
                </button>
                <button className="px-10 py-4 border border-[#DC2626] text-[#DC2626] font-bold rounded-xl hover:bg-red-50 transition-all">
                  Emergency Help
                </button>
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-1/2 relative flex justify-center"
          >
            <div className="relative z-10 w-full max-w-xl aspect-[4/3] flex items-center justify-center">
                <img 
                  src="/src/assets/images/regenerated_image_1779057677370.jpg" 
                  alt="Antima Compassionate Support" 
                  className="w-full h-full object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-[120px] -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-slate-50/50 py-32 px-6 lg:px-20 border-y border-slate-50">
        <div className="max-w-[1600px] mx-auto">
           <div className="text-center mb-24 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl lg:text-5xl font-display font-medium text-slate-800 tracking-tight">Trust in difficult moments.</h2>
              <p className="text-lg text-slate-400 font-medium">Comprehensive support systems built with cultural sensitivity and technical precision.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {[
                { title: 'AI Ritual Guidance', desc: 'Step-by-step ceremony support', icon: ShieldCheck },
                { title: 'Smart Communication', desc: 'Notify family & friends with care', icon: MessageCircle },
                { title: 'Funeral Marketplace', desc: 'Book verified local services', icon: ShoppingBag },
                { title: 'Event Management', desc: 'Professional coordination', icon: Calendar }
              ].map((feat, i) => (
                <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-soft hover:shadow-premium transition-all hover:-translate-y-2 group">
                   <div className="w-20 h-20 bg-blue-50 border border-blue-100/50 rounded-3xl flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform">
                      <feat.icon size={36} className="text-primary" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-800 mb-2">{feat.title}</h3>
                   <p className="text-slate-400 font-medium leading-relaxed">{feat.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
      
      <footer className="py-20 px-6 lg:px-20 text-center border-t border-slate-50">
         <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
            <div className="flex items-center gap-3">
              <Heart size={24} className="text-primary fill-primary/10" />
              <span className="text-xl font-display font-black text-primary tracking-tighter">antima</span>
            </div>
            <div className="flex flex-wrap justify-center gap-10 font-bold text-[11px] text-slate-400 uppercase tracking-[0.2em]">
               <a href="#" className="hover:text-primary">About</a>
               <a href="#" className="hover:text-primary">Contact</a>
               <a href="#" className="hover:text-primary">Privacy</a>
               <a href="#" className="hover:text-primary">Terms</a>
            </div>
            <p className="text-slate-300 font-medium text-sm">© 2026 Antima Care. Compassion in every line of code.</p>
         </div>
      </footer>
    </div>
  );
};
