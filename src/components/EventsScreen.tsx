import React, { useState } from 'react';
import { 
  ShieldCheck, Star, MapPin, Calendar, Clock, 
  MessageCircle, Phone, Globe, ChevronRight, CheckCircle2,
  Users, Award, Sparkles, ArrowLeft
} from 'lucide-react';
import { mockOrganizers } from '../data';

export const EventsScreen: React.FC = () => {
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState<'idle' | 'booking' | 'success'>('idle');

  const activeOrg = showDetail ? mockOrganizers.find(o => o.id === showDetail) : null;

  const handleBook = () => {
    setBookingStep('booking');
    setTimeout(() => {
      setBookingStep('success');
    }, 1500);
  };

  return (
    <div className="animate-fade-in-up">
      {/* Hero */}
      <section className="pt-12 pb-16 px-4 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              <Award size={14} /> Professional Ceremony Management
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-medium text-text-main mb-6 leading-tight">
               Let professionals handle everything <br /> while you focus on your family.
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
               End-to-end event management, coordination, and logistics by verified experts with decades of experience in Indian traditions.
            </p>
        </div>
      </section>

      {/* Filters (Basic for now) */}
      <div className="max-w-7xl mx-auto px-4 pt-12 flex justify-center gap-4">
         <select className="bg-surface rounded-xl px-6 py-3 text-sm font-bold text-text-muted border-none outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none cursor-pointer">
            <option>Location: Hyderabad</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
         </select>
         <select className="bg-surface rounded-xl px-6 py-3 text-sm font-bold text-text-muted border-none outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none cursor-pointer">
            <option>Tradition: All</option>
            <option>Hindu</option>
            <option>Muslim</option>
            <option>Christian</option>
         </select>
      </div>

      {/* Featured Organizers */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-text-main mb-10">Verified Event Partners</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {mockOrganizers.map((org) => (
             <div 
               key={org.id} 
               onClick={() => { setShowDetail(org.id); setBookingStep('idle'); }}
               className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6 sm:p-8 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all group cursor-pointer"
             >
                <div className="w-full md:w-32 h-32 bg-surface rounded-2xl flex-shrink-0 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-500">
                   {org.name.includes('Shanti') ? <ShieldCheck size={48} /> : <Calendar size={48} />}
                </div>
                <div className="flex-1">
                   <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="text-xl font-bold text-text-main">{org.name}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">
                         <Star size={12} fill="currentColor" /> {org.rating}
                      </div>
                   </div>
                   <p className="text-sm font-medium text-primary mb-4">{org.tagline}</p>
                   
                   <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                      <div className="flex items-center gap-1 text-xs text-text-light font-bold">
                        <MapPin size={14} className="text-primary" /> {org.city}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-light font-bold">
                        <Award size={14} className="text-primary" /> {org.experience}
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-2 mb-8">
                      {org.services.map(s => (
                        <span key={s} className="px-2 py-1 bg-surface text-[10px] font-black text-text-muted uppercase tracking-wider rounded-md">{s}</span>
                      ))}
                   </div>

                   <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-50">
                      <div>
                         <span className="text-[10px] font-black text-text-light uppercase tracking-widest block mb-0.5">Starting from</span>
                         <span className="text-xl font-display font-bold text-text-main">₹{org.startingFrom.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all active:scale-95">Book Now</button>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Detail Popup */}
      {showDetail !== null && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in transition-all">
          <div className="absolute inset-0 bg-text-main/40 backdrop-blur-md" onClick={() => { setShowDetail(null); setBookingStep('idle'); }}></div>
          <div className="bg-white rounded-t-[40px] sm:rounded-[40px] shadow-2xl relative w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
             {bookingStep === 'success' ? (
                <div className="p-16 text-center flex flex-col items-center justify-center min-h-[500px]">
                   <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 size={48} />
                   </div>
                   <h2 className="text-3xl font-display font-bold text-text-main mb-4">Management Booked</h2>
                   <p className="text-text-muted mb-10 max-w-sm">A dedicated coordinator from {activeOrg?.name} will call you within 15 minutes to take over all arrangements.</p>
                   
                   <div className="w-full bg-surface rounded-3xl p-6 text-left border border-gray-50 mb-10 max-w-md">
                      <div className="flex justify-between items-center mb-4">
                         <span className="text-xs font-bold text-text-light uppercase tracking-widest">Inquiry ID</span>
                         <span className="text-sm font-mono font-bold text-text-main">#EVENT-55291</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-text-light uppercase tracking-widest">Call Status</span>
                         <span className="text-sm font-bold text-primary">Priority Queue</span>
                      </div>
                   </div>

                   <button 
                     onClick={() => { setShowDetail(null); setBookingStep('idle'); }}
                     className="w-full max-w-md py-4 bg-primary text-white font-bold rounded-2xl shadow-lg"
                   >
                     Done
                   </button>
                </div>
             ) : (
                <>
                  <div className="h-64 sm:h-72 bg-primary/5 relative overflow-hidden flex items-center justify-center">
                     <Award size={120} className="text-primary opacity-10" />
                     <button 
                       onClick={() => setShowDetail(null)}
                       className="absolute top-6 right-6 bg-white/90 shadow-xl p-3 rounded-2xl z-10"
                     >
                        <ArrowLeft size={24} className="rotate-90 sm:rotate-0" />
                     </button>
                  </div>
                  <div className="p-8 sm:p-12 overflow-y-auto">
                     <div className="flex justify-between items-start mb-8">
                        <div>
                           <h2 className="text-3xl font-display font-bold text-text-main mb-2 tracking-tight">{activeOrg?.name}</h2>
                           <div className="flex items-center gap-3">
                              <Star size={20} className="text-amber-400" fill="currentColor" />
                              <span className="text-base font-bold text-text-main">{activeOrg?.rating}</span>
                              <span className="text-text-light">• {activeOrg?.reviews} Trust Reviews</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] font-black uppercase text-text-light tracking-widest mb-1">Starting from</div>
                           <div className="text-3xl font-display font-bold text-primary">₹{activeOrg?.startingFrom.toLocaleString()}</div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {[
                           { l: 'Experience', v: activeOrg?.experience },
                           { l: 'Location', v: activeOrg?.city },
                           { l: 'Avg Takeover', v: '15-20 Mins' },
                        ].map((item, idx) => (
                           <div key={idx} className="p-4 bg-surface rounded-2xl border border-gray-50">
                              <div className="text-[10px] font-black text-text-light uppercase tracking-widest mb-1">{item.l}</div>
                              <div className="text-sm font-bold text-text-main">{item.v}</div>
                           </div>
                        ))}
                     </div>

                     <div className="space-y-8">
                        <div>
                           <h4 className="font-bold text-text-main mb-4">Included Services</h4>
                           <div className="grid grid-cols-2 gap-3">
                              {activeOrg?.services.map(s => (
                                 <div key={s} className="flex items-center gap-2 text-sm text-text-muted">
                                    <CheckCircle2 size={16} className="text-green-500" /> {s}
                                 </div>
                              ))}
                           </div>
                        </div>

                        <button 
                          onClick={handleBook}
                          disabled={bookingStep === 'booking'}
                          className="w-full py-5 bg-primary text-white font-bold rounded-3xl shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 text-xl"
                        >
                           {bookingStep === 'booking' ? 'Processing...' : `Confirm Event Management — ₹${activeOrg?.startingFrom.toLocaleString()}`}
                        </button>
                     </div>
                  </div>
                </>
             )}
          </div>
        </div>
      )}

      {/* Why Choose Professional Management */}
      <section className="py-16 bg-[#FDFCFB] border-y border-orange-50">
         <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-display font-bold text-center mb-16">The Antima Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: 'Trained Coordinators', desc: 'Empathy-first staff who understand the sanctity of funeral rituals.', icon: Users },
                 { title: 'Fixed Fair Pricing', desc: 'Transparent costs with no hidden charges during your difficult time.', icon: ShieldCheck },
                 { title: 'Real-time Updates', desc: 'Track all arrangements via your dashboard in real-time.', icon: Clock }
               ].map((benefit, i) => (
                 <div key={i} className="text-center group">
                    <div className="w-16 h-16 bg-white shadow-soft rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary group-hover:-translate-y-2 transition-transform duration-500">
                       <benefit.icon size={28} />
                    </div>
                    <h3 className="font-bold text-text-main mb-3">{benefit.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{benefit.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};
