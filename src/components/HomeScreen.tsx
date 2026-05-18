import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ShieldCheck, MessageCircle, Heart, Star, Activity, 
  Users, Loader2, BookOpen, ShoppingBag, Calendar, Wallet, Globe, Languages, ArrowRight,
  Phone, X, Plus
} from 'lucide-react';
import { sendMessage, ChatMessage } from '../services/aiService';
import { getUserRecords } from '../services/firestoreService';

export const HomeScreen: React.FC<{ setScreen: (s: string) => void }> = ({ setScreen }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getUserRecords();
        if (data) setRecords(data);
      } catch (err) {
        console.error("Failed to fetch records", err);
      }
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Telugu' | 'Tamil' | 'Kannada' | 'Bengali'>('English');

  const translations: Record<string, any> = {
      English: {
      heroTitle: "Honoring lives with dignity and care.",
      heroDesc: "Compassionate, expert-verified ceremonial guidance for Indian families. Navigating rituals, logistics, and legal claims with respect.",
      getStarted: "Access Protocol",
      assistance: "24/7 Verified Support",
      ritualTitle: "Ceremonial Protocol",
      ritualDesc: "Expert-verified ritual workflows",
      marketTitle: "Support Marketplace",
      marketDesc: "Book verified local funeral services",
      eventTitle: "Ceremony Managers",
      eventDesc: "Verified coordinators for rituals",
      financeTitle: "Financial Navigation",
      financeDesc: "Legal claims & government aid",
      communicateTitle: "Family Coordination",
      communicateDesc: "Secure updates for relatives",
      griefTitle: "Grief Recovery",
      griefDesc: "Compassionate personal counseling",
    },
    Hindi: {
      heroTitle: "हम इस कठिन समय में आपके साथ हैं।",
      heroDesc: "भारतीय परिवारों के लिए दयालु सहायता — अनुष्ठान, रसद, संचार और सरकारी मार्गदर्शन।",
      getStarted: "शुरू करें",
      assistance: "24/7 सहायता",
      ritualTitle: "AI अनुष्ठान मार्गदर्शिका",
      ritualDesc: "चरण-दर-चरण समारोह सहायता",
      marketTitle: "फ्यूनरल मार्किटप्लेस",
      marketDesc: "सत्यापित स्थानीय सेवाएं बुक करें",
      eventTitle: "इवेंट मैनेजमेंट",
      eventDesc: "पेशेवर समन्वयक",
      financeTitle: "वित्तीय सहायता",
      financeDesc: "दावे और सरकारी योजनाएं",
      communicateTitle: "आपातकालीन सूचनाएं",
      communicateDesc: "परिवार और दोस्तों को सूचित करें",
      griefTitle: "दुख सहायता",
      griefDesc: "पेशेवर परामर्श",
    }
  };

  const t = translations[language] || translations.English;

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim() || isLoading) return;

    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', parts: [{ text: messageToSend }] }];
    setChatHistory(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage(messageToSend, chatHistory, `Inquiry from home dashboard. User language: ${language}`);
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    } catch (error: any) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: `System Notice: ${error.message || "Disconnected"}` }] }]);
    } finally {
      setIsLoading(false);
    }
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const features = [
    { 
      id: 'hospital',
      title: 'Hospital Support', 
      desc: 'Formality & release coordination', 
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      id: 'ritual',
      title: 'AI Ritual Guidance', 
      desc: 'Step-by-step ceremony support', 
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      id: 'communicate',
      title: 'Smart Communication', 
      desc: 'Notify family & friends with care', 
      icon: MessageCircle,
      color: 'bg-red-50 text-red-600'
    },
    { 
      id: 'marketplace',
      title: 'Funeral Marketplace', 
      desc: 'Book verified local services', 
      icon: ShoppingBag,
      color: 'bg-green-50 text-green-600'
    },
    { 
      id: 'events',
      title: 'Event Management', 
      desc: 'Professional coordination', 
      icon: Calendar,
      color: 'bg-amber-50 text-orange-600'
    }
  ];

  const BetterCarousel = () => (
    <div className="relative z-10 max-w-2xl">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
           <ShieldCheck size={14} /> Sacred space for Indian families
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-medium text-text-main leading-tight tracking-tight">
          Honoring lives with <br />
          <span className="italic text-primary-dark font-normal">absolute dignity.</span>
        </h1>
        <p className="text-text-muted leading-relaxed text-sm md:text-base max-w-lg font-medium opacity-70">
          Expert-verified ceremonial guidance and local support for your most difficult moments.
        </p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-4 mt-12"
      >
        <button 
          onClick={() => setScreen('ritual')}
          className="px-14 py-7 bg-primary text-white font-black uppercase tracking-[0.25em] rounded-[32px] shadow-premium hover:bg-primary-dark transition-all active:scale-95 text-xs"
        >
          Get Started
        </button>
        <button 
          onClick={() => setScreen('marketplace')}
          className="px-10 py-7 border-2 border-primary/10 text-text-muted font-black uppercase tracking-[0.25em] rounded-[32px] hover:bg-surface transition-all active:scale-95 flex items-center gap-3 text-xs"
        >
          Browse Services
        </button>
      </motion.div>
    </div>
  );

  const [activeNotification, setActiveNotification] = useState(true);

  return (
    <div className="animate-fade-in-up px-6 lg:px-20 py-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col xl:flex-row gap-12">
        {/* Main Content Area */}
        <div className="flex-1 space-y-24">
          
          {/* Dashboard Hero */}
          <section className="bg-white rounded-[40px] p-10 lg:p-14 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 border border-slate-100 shadow-premium">
            <div className="flex-1 space-y-8 relative z-10">
               <h1 className="text-3xl lg:text-4xl font-display font-medium text-[#0F172A] leading-tight tracking-tight">
                  We're here to help you <br />
                  <span className="text-[#2563EB] italic">through this.</span>
               </h1>
               <p className="text-base text-slate-500 font-medium max-w-md leading-relaxed opacity-80">
                  Compassionate support for Indian families — rituals, logistics, communication, and government guidance.
               </p>
               <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    onClick={() => setScreen('ritual')}
                    className="px-8 py-3.5 bg-[#2563EB] text-white font-bold rounded-xl shadow-md shadow-blue-100 hover:bg-[#1D4ED8] transition-all transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </button>
                  <button 
                    onClick={() => setScreen('hospital')}
                    className="px-8 py-3.5 border border-[#2563EB] text-[#2563EB] font-bold rounded-xl hover:bg-blue-50 transition-all font-mono text-xs uppercase tracking-widest"
                  >
                    Emergency Help
                  </button>
               </div>
            </div>
            <div className="w-full md:w-[45%] relative z-10 flex justify-center">
               <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-50 blur-[100px] opacity-40 rounded-full"></div>
                  <img 
                    src="/assets/images/regenerated_image_1779057677370.jpg" 
                    alt="Antima Compassionate Support" 
                    className="relative z-10 w-full object-contain rounded-3xl"
                    referrerPolicy="no-referrer"
                  />
               </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          </section>

          {/* Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {features.map((feat, idx) => (
                <motion.div
                  key={feat.id}
                  whileHover={{ y: -5, borderColor: '#BFDBFE' }}
                  onClick={() => setScreen(feat.id)}
                  className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-soft transition-all cursor-pointer group flex flex-col items-start gap-6"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100/50`}>
                    <feat.icon size={28} className="text-[#2563EB]/70" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#0F172A] leading-tight">{feat.title}</h3>
                    <p className="text-slate-400 font-medium text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[#2563EB] text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    Continue Support <ChevronRight size={14} />
                  </div>
                </motion.div>
             ))}
          </div>
        </div>

        {/* Right Sidebar Section (30%) */}
        <div className="w-full xl:w-[400px] space-y-10">
          
          {/* Ritual Agent Card */}
          <div className="bg-white rounded-[40px] border border-slate-50 shadow-premium overflow-hidden flex flex-col h-[650px]">
             <div className="p-8 border-b border-slate-50 flex items-center gap-5 bg-slate-50/30">
                <div className="relative">
                   <div className="w-14 h-14 flex items-center justify-center overflow-hidden border-2 border-primary/20 rounded-full">
                      <img 
                        src="/assets/images/regenerated_image_1779057677370.jpg" 
                        alt="Antima Ritual Agent" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                   </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">Antima Ritual Agent</h4>
                  <p className="text-[11px] font-black text-green-500 uppercase tracking-widest mt-0.5">Online 24/7</p>
                </div>
             </div>

             <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-6 bg-slate-50/10">
                <div className="bg-slate-100/50 p-6 rounded-[28px] rounded-tl-none max-w-[90%] text-sm text-slate-600 font-medium leading-relaxed">
                   I am deeply sorry for your loss. I am here to guide you. What should we focus on first?
                </div>
                
                {chatHistory.length === 0 && (
                   <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm space-y-4">
                      <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Immediate steps for Hindu traditions:</h5>
                      <ul className="space-y-3">
                         {["Contact a verified funeral van", "Arrange a freezer box (if needed)", "Preparing the Antyeshti materials"].map(step => (
                            <li key={step} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                               <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                               {step}
                            </li>
                         ))}
                      </ul>
                   </div>
                )}

                {chatHistory.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`p-5 rounded-[24px] text-sm max-w-[85%] font-semibold leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'self-end ml-auto bg-primary text-white rounded-tr-none' 
                        : 'self-start bg-slate-100/50 text-slate-600 rounded-tl-none'
                    }`}
                  >
                    {msg.parts[0].text}
                  </div>
                ))}

                {isLoading && (
                   <div className="flex gap-2 p-4 bg-slate-50 w-20 rounded-full justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                   </div>
                )}
             </div>

             <div className="p-8 border-t border-slate-100 space-y-6">
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                   {["Items needed?", "Day 1 rituals", "Cremation"].map(chip => (
                      <button 
                        key={chip}
                        onClick={() => handleSendMessage(chip)}
                        className="px-6 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 hover:border-primary hover:text-primary transition-all whitespace-nowrap"
                      >
                         {chip}
                      </button>
                   ))}
                </div>
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                  className="relative"
                >
                   <input 
                     type="text" 
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     placeholder="Type your message..." 
                     className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 ring-primary/20 outline-none font-medium"
                   />
                   <button 
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="absolute right-2 top-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-primary-dark transition-all disabled:opacity-30 disabled:hover:bg-primary"
                   >
                      <ArrowRight size={20} />
                   </button>
                </form>
             </div>
          </div>

          {/* Progress Card */}
          <AnimatePresence>
             {activeNotification && (
                <motion.div 
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-orange-50/50 rounded-[32px] p-8 border border-orange-100/50 shadow-sm relative group overflow-hidden"
                >
                   <div className="flex justify-between items-start mb-6">
                      <div className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">Action Required</div>
                      <div className="text-[10px] font-black text-slate-400">May 16, 2025</div>
                   </div>
                   <h5 className="text-xl font-bold text-slate-800 mb-2">Death Certificate Progress</h5>
                   <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">
                      Your application for the medical death certificate needs the hospital discharge summary.
                   </p>
                   <button className="text-[11px] font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                      View and Upload <ChevronRight size={16} />
                   </button>
                   <button 
                    onClick={() => setActiveNotification(false)}
                    className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-slate-500"
                   >
                      <X size={16} />
                   </button>
                </motion.div>
             )}
          </AnimatePresence>

          {/* Persistent Records Area */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium p-8">
             <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-slate-800">Your Records</h4>
                <button 
                 onClick={() => setScreen('communicate')} // Take them to message flow which has record info
                 className="w-8 h-8 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center hover:bg-blue-100 transition-all"
                >
                   <Plus size={18} />
                </button>
             </div>
             
             {records.length === 0 ? (
               <div className="text-center py-6">
                  <p className="text-sm text-slate-400 font-medium">No active records found.</p>
               </div>
             ) : (
               <div className="space-y-4">
                  {records.map(rec => (
                    <div key={rec.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                       <div>
                          <div className="text-sm font-bold text-slate-800">{rec.deceasedName}</div>
                          <div className="text-[10px] items-center flex gap-2 text-slate-400 font-black uppercase tracking-widest mt-1">
                             <Calendar size={12} /> {rec.dateOfPassing}
                          </div>
                       </div>
                       <div className="px-3 py-1 bg-white text-[10px] font-black text-[#2563EB] border border-primary/10 rounded-lg uppercase tracking-tighter shadow-sm">
                          {rec.status || 'Active'}
                       </div>
                    </div>
                  ))}
               </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};
