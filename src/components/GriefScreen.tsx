import React from 'react';
import { Heart, Users, MessageCircle, Phone, ArrowRight, Star } from 'lucide-react';

export const GriefScreen: React.FC = () => {
  return (
    <div className="animate-fade-in-up px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display font-bold text-text-main mb-4">Grief & Healing Support</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">You don't have to walk this path alone. Connect with professionals and communities who understand your journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Private Counseling",
            desc: "One-on-one sessions with certified grief counselors specializing in Indian family dynamics.",
            icon: Users,
            color: "bg-blue-50 text-blue-600"
          },
          {
            title: "Support Groups",
            desc: "Weekly moderated video calls with others who have experienced similar losses.",
            icon: MessageCircle,
            color: "bg-purple-50 text-purple-600"
          },
          {
            title: "Healing Rituals",
            desc: "Guided meditations and daily practices to help process loss through traditional wisdom.",
            icon: Heart,
            color: "bg-pink-50 text-pink-600"
          }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-soft hover:shadow-xl transition-all group">
            <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
              <item.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">{item.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-8 opacity-80">{item.desc}</p>
            <button className="w-full py-3 rounded-xl border-2 border-gray-100 text-xs font-bold text-text-muted hover:bg-surface hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-2">
              Learn More <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-primary/5 rounded-[40px] p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-bold text-primary shadow-sm">
            <Star size={14} fill="currentColor" />
            <span>24/7 Helpline Available</span>
          </div>
          <h2 className="text-3xl font-display font-medium text-text-main leading-tight">Need someone to talk to right now?</h2>
          <p className="text-text-muted text-lg">Our compassionate listeners are available 24/7 for immediate emotional support. It's completely confidential and free.</p>
          <button className="flex items-center gap-4 bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-primary/90 transition-all active:scale-95">
            <Phone size={20} /> Call Helpline Now
          </button>
        </div>
        <div className="w-full lg:w-[40%] aspect-square bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=800" 
            alt="Support" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
        </div>
      </div>
    </div>
  );
};
