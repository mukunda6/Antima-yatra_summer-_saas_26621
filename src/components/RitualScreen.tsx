import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ArrowLeft, Send, List, CheckCircle2, 
  MapPin, Clock, Download, Bot, Sparkles, Moon, Cross, Sun, Loader2,
  Heart, ShieldCheck, HeartHandshake, AlertCircle, Phone, Globe, User, Headphones, 
  Info, Play, BadgeCheck, Stethoscope, Users, Star, Search, Filter, MessageCircle
} from 'lucide-react';
import { religions, regions, experts } from '../data';
import { sendMessage, ChatMessage } from '../services/aiService';
import { SelectionStep } from './ritual/SelectionStep';
import { RitualStage, SelectionState, GuidanceMode, LANGUAGES, CEREMONY_JOURNEYS } from './ritual/RitualTypes';

export const RitualScreen: React.FC = () => {
  const [stage, setStage] = useState<RitualStage>('onboarding');
  const [selections, setSelections] = useState<SelectionState>({
    religion: null,
    region: null,
    state: null,
    community: '',
    language: 'English',
    mode: null,
    ceremony: null
  });
  
  const [activeTab, setActiveTab] = useState<'timeline' | 'checklist' | 'assistant' | 'experts'>('timeline');
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  // AI Chat State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const translations: Record<string, any> = {
    English: {
      onboardingTitle: "Ritual guidance with absolute dignity.",
      onboardingDesc: "Antima provides AI-assisted ceremonial workflows built upon verified religious consultation.",
      beginBtn: "Begin Ritual Guidance",
      religionTitle: "Select Religious Tradition",
      regionTitle: "Ceremony Region",
      langTitle: "Preferred Language",
      modeTitle: "Guidance Mode",
      ceremonyTitle: "Service Selection",
      journeyTitle: "Full Ceremony Journey",
      journeyDesc: "End-to-end guidance from immediate arrangements to 13th day rituals.",
      specificTitle: "Specific Ritual Guidance",
      specificDesc: "Deep dive into a specific ceremony or milestone occurring today.",
      timeline: "Timeline",
      checklist: "Checklist",
      assistant: "AI Guide",
      experts: "Experts",
      expertTitle: "Verified Religious Experts",
      backBtn: "Back to previous",
      continueBtn: "Continue",
      setupLabel: "Guidance Setup",
    },
    Hindi: {
      onboardingTitle: "पूर्ण गरिमा के साथ अनुष्ठान मार्गदर्शन।",
      onboardingDesc: "अंतिमा सत्यापित धार्मिक परामर्श पर निर्मित एआई-सहायता प्राप्त औपचारिक वर्कफ़्लो प्रदान करती है।",
      beginBtn: "अनुष्ठान मार्गदर्शन शुरू करें",
      religionTitle: "धार्मिक परंपरा चुनें",
      regionTitle: "समारोह क्षेत्र",
      langTitle: "पसंदीदा भाषा",
      modeTitle: "मार्गदर्शन मोड",
      ceremonyTitle: "सेवा चयन",
      journeyTitle: "पूर्ण समारोह यात्रा",
      journeyDesc: "तत्काल व्यवस्था से लेकर 13वें दिन के अनुष्ठान तक शुरू से अंत तक मार्गदर्शन।",
      specificTitle: "विशिष्ट अनुष्ठान मार्गदर्शन",
      specificDesc: "आज होने वाले किसी विशेष समारोह या मील का पत्थर का विस्तृत विवरण।",
      timeline: "समयरेखा",
      checklist: "चेकलिस्ट",
      assistant: "एआई गाइड",
      experts: "विशेषज्ञ",
      expertTitle: "सत्यापित धार्मिक विशेषज्ञ",
      backBtn: "पिछला",
      continueBtn: "जारी रखें",
      setupLabel: "मार्गदर्शन सेटअप",
    },
    Telugu: {
      onboardingTitle: "సంపూర్ణ గౌరవంతో ఆచార మార్గదర్శకత్వం.",
      onboardingDesc: "అంతిమ ధృవీకరించబడిన మతపరమైన సంప్రదింపులపై నిర్మించిన AI-సహాయక ఉత్సవ వర్క్ ఫ్లోలను అందిస్తుంది.",
      beginBtn: "ఆచార మార్గదర్శకత్వాన్ని ప్రారంభించండి",
      religionTitle: "మతపరమైన సంప్రదాయాన్ని ఎంచుకోండి",
      regionTitle: "వేడుక ప్రాంతం",
      langTitle: "ప్రాధాన్య భాష",
      modeTitle: "మార్గదర్శక మోడ్",
      ceremonyTitle: "సేవ ఎంపిక",
      journeyTitle: "పూర్తి వేడుక ప్రయాణం",
      journeyDesc: "తక్షణ ఏర్పాట్ల నుండి 13 వ రోజు ఆచారాల వరకు పూర్తి మార్గదర్శకత్వం.",
      specificTitle: "నిర్దిష్ట ఆచార మార్గదర్శకత్వం",
      specificDesc: "ఈ రోజు జరిగే ఒక నిర్దిష్ట వేడుక లేదా మైలురాయి గురించి లోతైన సమాచారం.",
      timeline: "టైమ్ లైన్",
      checklist: "చెక్ లిస్ట్",
      assistant: "AI గైడ్",
      experts: "నిపుణులు",
      expertTitle: "ధృవీకరించబడిన మత నిపుణులు",
      backBtn: "వెనుకకు",
      continueBtn: "కొనసాగించండి",
      setupLabel: "మార్గదర్శక సెటప్",
    },
    Marathi: {
        onboardingTitle: "पूर्ण सन्मानाने विधी मार्गदर्शक.",
        onboardingDesc: "अंतिमा तुम्हाला धार्मिक माहितीवर आधारित विधींसाठी मदत करते.",
        beginBtn: "विधी मार्गदर्शक सुरू करा",
        religionTitle: "धार्मिक परंपरा निवडा",
        regionTitle: "प्रदेश निवडा",
        langTitle: "पसंतीची भाषा",
        modeTitle: "मार्गदर्शन मोड",
        ceremonyTitle: "विधी निवड",
        journeyTitle: "पूर्ण विधी प्रवास",
        journeyDesc: "सुरुवातीपासून १३ व्या दिवसापर्यंत संपूर्ण मार्गदर्शन.",
        specificTitle: "विशिष्ट विधी मार्गदर्शन",
        specificDesc: "एका विशिष्ट विधीबद्दल माहिती.",
        timeline: "कालक्रम",
        checklist: "तपासणी सूची",
        assistant: "AI मार्गदर्शक",
        experts: "तज्ज्ञ",
        expertTitle: "प्रमाणित धार्मिक तज्ज्ञ",
        backBtn: "मागे",
        continueBtn: "पुढे",
        setupLabel: "मार्गदर्शन सेटअप",
    }
  };

  const t = translations[selections.language] || translations.English;

  const updateSelection = (key: keyof SelectionState, value: any) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const toggleChecklistItem = (item: string) => {
    setCompletedItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const currentReligionData = useMemo(() => 
    religions.find(r => r.id === selections.religion), 
  [selections.religion]);

  const currentJourneys = useMemo(() => 
    CEREMONY_JOURNEYS[selections.religion || 'hindu'] || [], 
  [selections.religion]);

  const handleNext = () => {
    const order: RitualStage[] = ['onboarding', 'religion', 'region', 'community', 'language', 'mode', 'ceremony', 'dashboard'];
    const currentIndex = order.indexOf(stage);
    
    if (stage === 'mode' && selections.mode === 'journey') {
        setStage('dashboard');
        return;
    }
    
    if (currentIndex < order.length - 1) {
      setStage(order[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const order: RitualStage[] = ['onboarding', 'religion', 'region', 'community', 'language', 'mode', 'ceremony', 'dashboard'];
    const currentIndex = order.indexOf(stage);
    
    if (stage === 'dashboard' && selections.mode === 'journey') {
        setStage('mode');
        return;
    }

    if (currentIndex > 0) {
      setStage(order[currentIndex - 1]);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lotus': return <Sparkles size={24} />;
      case 'Moon': return <Moon size={24} />;
      case 'Cross': return <Cross size={24} />;
      case 'Khanda': return <Sun size={24} />;
      case 'Hand': return <Users size={24} />;
      case 'Wheel': return <Bot size={24} />;
      default: return <Sparkles size={24} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-16">
      <AnimatePresence mode="wait">
        {stage === 'onboarding' && (
          <OnboardingStep onNext={handleNext} t={t} currentLang={selections.language} setLang={(l) => updateSelection('language', l)} />
        )}

        {stage === 'religion' && (
          <SelectionStep 
            title={t.religionTitle}
            subtitle="Choose the tradition to receive culturally respectful and expert-verified ceremonial guidance."
            onBack={handleBack}
            onNext={handleNext}
            isValid={!!selections.religion}
            backLabel={t.backBtn}
            nextLabel={t.continueBtn}
            setupLabel={t.setupLabel}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {religions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => updateSelection('religion', r.id)}
                  className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group relative overflow-hidden ${
                    selections.religion === r.id 
                      ? 'border-primary bg-primary/5 text-primary scale-105 shadow-soft' 
                      : 'border-gray-50 bg-white hover:border-primary/20 text-text-muted hover:bg-ivory'
                  }`}
                >
                  <div className={`p-4 rounded-2xl transition-all ${
                    selections.religion === r.id ? 'bg-primary text-white' : 'bg-ivory text-primary'
                  }`}>
                    {getIcon(r.icon)}
                  </div>
                  <div className="text-center">
                    <span className="block font-black text-[10px] uppercase tracking-[0.1em]">{r.name}</span>
                  </div>
                  {selections.religion === r.id && (
                    <motion.div layoutId="activeRel" className="absolute top-3 right-3 text-primary">
                        <CheckCircle2 size={16} />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </SelectionStep>
        )}

        {stage === 'region' && (
          <SelectionStep 
            title={t.regionTitle}
            subtitle="Ritual customs vary significantly by state and local traditions. Select your region."
            onBack={handleBack}
            onNext={handleNext}
            isValid={!!selections.state}
            backLabel={t.backBtn}
            nextLabel={t.continueBtn}
            setupLabel={t.setupLabel}
          >
            <div className="space-y-10">
                {regions.map((group) => (
                    <div key={group.id} className="space-y-4">
                        <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] ml-2 opacity-60">{group.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {group.states.map((state) => (
                                <button
                                    key={state}
                                    onClick={() => {
                                        updateSelection('region', group.id);
                                        updateSelection('state', state);
                                    }}
                                    className={`px-6 py-4 rounded-2xl border-2 transition-all font-bold text-xs uppercase tracking-widest ${
                                        selections.state === state 
                                            ? 'border-primary bg-primary text-white' 
                                            : 'border-gray-50 bg-white hover:bg-ivory text-text-muted'
                                    }`}
                                >
                                    {state}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
          </SelectionStep>
        )}

        {stage === 'community' && (
          <SelectionStep 
            title="Community Context"
            subtitle="Ceremonial customs may vary by community, family lineage, or specific regional sects."
            onBack={handleBack}
            onNext={handleNext}
            nextLabel={selections.community ? t.continueBtn : "Skip step"}
            backLabel={t.backBtn}
            setupLabel={t.setupLabel}
          >
            <div className="space-y-10">
                <div className="p-10 bg-ivory border border-gray-100 rounded-[40px] shadow-inner">
                    <label className="block text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-6">Enter Community/Tradition (Optional)</label>
                    <div className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                        <input 
                            type="text"
                            value={selections.community}
                            onChange={(e) => updateSelection('community', e.target.value)}
                            placeholder="e.g. Brahmin, Sunni, Catholic, Lingayat..."
                            className="w-full bg-white border-2 border-transparent focus:border-primary/20 rounded-2xl p-6 pl-16 text-lg font-medium outline-none transition-all shadow-premium"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
                    {['Brahmin', 'Reddy', 'Vysya', 'Smartha'].map(t => (
                        <button key={t} onClick={() => updateSelection('community', t)} className="p-4 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary/40">
                            {t}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-4 p-6 bg-blue-50/30 rounded-2xl border border-blue-100/50">
                    <Info size={20} className="text-primary flex-shrink-0" />
                    <p className="text-[11px] font-bold text-primary/70 uppercase tracking-widest leading-relaxed">
                        Traditions are unique to each family. Skip this if you prefer general {selections.religion} guidance.
                    </p>
                </div>
            </div>
          </SelectionStep>
        )}

        {stage === 'language' && (
          <SelectionStep 
            title={t.langTitle}
            subtitle="Antima provides multilingual guidance and expert consultation in your native tongue."
            onBack={handleBack}
            onNext={handleNext}
            isValid={!!selections.language}
            backLabel={t.backBtn}
            nextLabel={t.continueBtn}
            setupLabel={t.setupLabel}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => updateSelection('language', lang)}
                  className={`p-8 rounded-[32px] border-2 transition-all flex items-center justify-between group h-24 ${
                    selections.language === lang 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-gray-50 bg-white hover:border-primary/20 text-text-muted hover:bg-ivory'
                  }`}
                >
                  <span className="font-bold text-base tracking-tight">{lang}</span>
                  <div className={`p-3 rounded-xl transition-all ${
                    selections.language === lang ? 'bg-primary text-white' : 'bg-ivory text-text-light'
                  }`}>
                    <Globe size={18} />
                  </div>
                </button>
              ))}
            </div>
          </SelectionStep>
        )}

        {stage === 'mode' && (
          <SelectionStep 
            title={t.modeTitle}
            subtitle="Choose between a complete ceremonial journey or guidance for a specific milestone."
            onBack={handleBack}
            onNext={handleNext}
            isValid={!!selections.mode}
            backLabel={t.backBtn}
            nextLabel={t.continueBtn}
            setupLabel={t.setupLabel}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                    id: 'journey' as GuidanceMode, 
                    title: t.journeyTitle, 
                    desc: t.journeyDesc,
                    icon: List
                },
                { 
                    id: 'specific' as GuidanceMode, 
                    title: t.specificTitle, 
                    desc: t.specificDesc,
                    icon: Sparkles
                }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => updateSelection('mode', m.id)}
                  className={`p-12 rounded-[48px] border-2 text-left transition-all relative overflow-hidden group ${
                    selections.mode === m.id 
                      ? 'border-primary bg-primary/5 text-primary shadow-premium' 
                      : 'border-gray-50 bg-white hover:border-primary/30 text-text-muted'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 transition-all ${
                    selections.mode === m.id ? 'bg-primary text-white' : 'bg-ivory text-primary'
                  }`}>
                    <m.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-text-main mb-3">{m.title}</h3>
                  <p className="text-sm font-medium leading-relaxed opacity-70">{m.desc}</p>
                </button>
              ))}
            </div>
          </SelectionStep>
        )}

        {stage === 'ceremony' && (
          <SelectionStep 
            title={t.ceremonyTitle}
            subtitle="Select the specific ceremonial milestone for which you need verified guidance."
            onBack={handleBack}
            onNext={handleNext}
            isValid={!!selections.ceremony}
            backLabel={t.backBtn}
            nextLabel={t.continueBtn}
            setupLabel={t.setupLabel}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentJourneys.map((type) => (
                <button
                  key={type}
                  onClick={() => updateSelection('ceremony', type)}
                  className={`p-8 rounded-[32px] border-2 transition-all text-left flex items-center justify-between group ${
                    selections.ceremony === type 
                      ? 'border-primary bg-primary/5 text-primary scale-[1.02] shadow-premium' 
                      : 'border-gray-50 bg-white hover:border-primary/20 text-text-muted'
                  }`}
                >
                  <span className="font-bold text-base tracking-tight">{type}</span>
                  <div className={`p-3 rounded-full transition-all ${
                    selections.ceremony === type ? 'bg-primary text-white' : 'bg-ivory text-text-light'
                  }`}>
                    <ChevronRight size={18} />
                  </div>
                </button>
              ))}
            </div>
          </SelectionStep>
        )}

        {stage === 'dashboard' && (
          <GuidanceDashboard 
            selections={selections}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            completedItems={completedItems}
            toggleItem={toggleChecklistItem}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const OnboardingStep = ({ onNext, t, currentLang, setLang }: { onNext: () => void, t: any, currentLang: string, setLang: (l: string) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-[40px] p-8 lg:p-16 shadow-premium border border-gray-100 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
    
    <div className="absolute top-8 right-8 flex gap-2">
       {['English', 'Hindi', 'Telugu', 'Marathi'].map(l => (
          <button 
            key={l} 
            onClick={() => setLang(l)}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${currentLang === l ? 'bg-primary text-white shadow-sm' : 'bg-ivory text-text-light hover:text-primary'}`}
          >
             {l === 'English' ? 'EN' : l === 'Hindi' ? 'HI' : l === 'Telugu' ? 'TE' : 'MR'}
          </button>
       ))}
    </div>

    <div className="mb-10">
      <div className="w-20 h-20 bg-ivory text-primary rounded-3xl flex items-center justify-center mx-auto shadow-inner">
        <HeartHandshake size={40} />
      </div>
    </div>

    <div className="max-w-3xl mx-auto space-y-8">
      <div className="inline-flex items-center gap-2 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full border border-primary/10">
        <BadgeCheck size={14} /> Expert Verified Guidance
      </div>
      
      <h1 className="text-3xl lg:text-5xl font-display font-medium text-text-main leading-tight tracking-tight">
        {t.onboardingTitle}
      </h1>
      
      <p className="text-text-muted text-sm lg:text-base leading-relaxed font-medium max-w-lg mx-auto opacity-70">
        {t.onboardingDesc}
      </p>
    </div>
    
    <div className="mt-12">
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="px-12 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-primary-dark transition-all text-[11px] flex items-center gap-3"
      >
        {t.beginBtn} <ChevronRight size={16} />
      </motion.button>
    </div>

    <div className="p-6 bg-ivory/50 rounded-3xl mt-12 border border-gray-100 flex gap-4 items-start text-left max-w-xl mx-auto">
      <Info size={18} className="text-primary flex-shrink-0 mt-0.5" />
      <p className="text-[9px] text-text-light font-bold leading-relaxed uppercase tracking-widest opacity-80">
        Antima is a supportive companion. All ritual guidance is based on verified protocols but should be cross-verified with family elders for tradition-specific nuances.
      </p>
    </div>
  </motion.div>
);

const GuidanceDashboard = ({ selections, activeTab, setActiveTab, chatHistory, setChatHistory, isLoading, setIsLoading, completedItems, toggleItem, t }: any) => {
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const context = `You are Antima AI, a compassionate ceremonial guide. Selections: ${JSON.stringify(selections)}. Language: ${selections.language}. Explain verified rituals only in ${selections.language}.`;
    
    setChatHistory((prev: any) => [...prev, { role: 'user', parts: [{ text }] }]);
    setIsLoading(true);
    
    try {
      const resp = await sendMessage(text, chatHistory, context);
      setChatHistory((prev: any) => [...prev, { role: 'model', parts: [{ text: resp }] }]);
    } catch (e) {
      setChatHistory((prev: any) => [...prev, { role: 'model', parts: [{ text: "Error accessing protocols. Please try again." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-premium border border-gray-100 overflow-hidden min-h-[75vh] flex flex-col relative">
      <div className="bg-ivory/80 backdrop-blur-xl border-b border-gray-100 px-8 py-8 sticky top-0 z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <span className="text-[9px] font-black text-primary bg-white px-3 py-1.5 rounded-full uppercase tracking-widest border border-primary/10">
                    {selections.religion} • {selections.state}
                </span>
                <span className="text-[9px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-100 flex items-center gap-1">
                    <BadgeCheck size={12} /> Expert Verified 
                </span>
            </div>
            <h2 className="text-2xl font-display font-medium text-text-main tracking-tight">
                {selections.mode === 'journey' ? t.journeyTitle : selections.ceremony} Protocol
            </h2>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-soft border border-gray-50 overflow-x-auto no-scrollbar max-w-full">
            {[
              { id: 'timeline', label: t.timeline, icon: Clock },
              { id: 'checklist', label: t.checklist, icon: List },
              { id: 'assistant', label: t.assistant, icon: Bot },
              { id: 'experts', label: t.experts, icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-primary text-white shadow-soft' : 'text-text-light hover:text-text-muted hover:bg-ivory'
                }`}
              >
                <tab.icon size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'timeline' && <TimelineTab selections={selections} />}
        {activeTab === 'checklist' && <ChecklistTab completedItems={completedItems} toggleItem={toggleItem} />}
        {activeTab === 'assistant' && <ChatTab history={chatHistory} onSend={handleSendMessage} isLoading={isLoading} />}
        {activeTab === 'experts' && <ExpertsTab selections={selections} t={t} />}
      </div>

      <div className="bg-ivory/50 border-t border-gray-100 px-12 py-8">
        <div className="flex items-start gap-4 max-w-4xl mx-auto">
           <AlertCircle size={20} className="text-primary/40 flex-shrink-0 mt-1" />
           <p className="text-[10px] text-text-light font-bold leading-relaxed uppercase tracking-widest">
             Antima provides verified guidance protocol only. Traditions may vary by family customs. Consult with local religious leaders or elders for final ceremonies.
           </p>
        </div>
      </div>
    </div>
  );
};

const TimelineTab = ({ selections }: { selections: SelectionState }) => {
    const isJourney = selections.mode === 'journey';
    const religion = selections.religion;

    let steps = [];

    if (religion === 'hindu') {
        steps = [
            { id: 1, title: 'Prana Tyaga', time: 'Immediate', desc: 'Preparation of the body and initial prayers with family.', status: 'completed' },
            { id: 2, title: 'Antyesti Preparation', time: 'T-2 Hours', desc: 'Siddha preparation, ceremonial bath, and flower arrangements.', status: 'active' },
            { id: 3, title: 'Agnisanskara', time: 'Milestone', desc: 'The sacred cremation ceremony at the designated grounds.', status: 'pending' },
        ];

        if (isJourney) {
            steps.push(
                { id: 4, title: 'Asthi Sanchayana', time: 'Day 3', desc: 'Collection of mortal remains for the subsequent immersion.', status: 'pending' },
                { id: 5, title: 'Asthi Visarjan', time: 'Day 3-10', desc: 'Sacred immersion of ashes in a holy river.', status: 'pending' },
                { id: 6, title: '10th Day Ritual', time: 'Day 10', desc: 'Pinda Pradaan and Tarpan rituals for the departed soul.', status: 'pending' },
                { id: 7, title: '13th Day Ceremony', time: 'Day 13', desc: 'Terahvin ceremony marking the end of the mourning period.', status: 'pending' }
            );
        }
    } else if (religion === 'muslim') {
        steps = [
            { id: 1, title: 'Ghusl', time: 'Immediate', desc: 'The ritual bath performed by family members or experts.', status: 'completed' },
            { id: 2, title: 'Kafan', time: 'T-1 Hour', desc: 'The shrouding of the body in white cloth.', status: 'active' },
            { id: 3, title: 'Janazah', time: 'Milestone', desc: 'The funeral prayer performed in congregation.', status: 'pending' },
        ];
        if (isJourney) {
            steps.push(
                { id: 4, title: 'Burial (Tadfin)', time: 'Milestone', desc: 'Lowering the body into the grave with prayers.', status: 'pending' },
                { id: 5, title: 'Post-Burial Prayer', time: 'Day 3/40', desc: 'Community prayers and Ziyarat rituals.', status: 'pending' }
            );
        }
    } else if (religion === 'christian') {
        steps = [
            { id: 1, title: 'Vigil Service', time: 'Day 1', desc: 'Prayer service held at home or funeral home.', status: 'completed' },
            { id: 2, title: 'Funeral Mass', time: 'Day 2', desc: 'The religious service held at the church.', status: 'active' },
            { id: 3, title: 'Committal', time: 'Milestone', desc: 'The burial service at the cemetery.', status: 'pending' },
        ];
        if (isJourney) {
            steps.push(
                { id: 4, title: 'Memorial Service', time: 'Month 1', desc: 'Prayer meeting held in memory of the departed.', status: 'pending' }
            );
        }
    } else {
        // Default generic steps
        steps = [
            { id: 1, title: 'Initial Rites', time: 'Immediate', desc: 'Primary arrangements and gathering of family.', status: 'completed' },
            { id: 2, title: 'Ceremonial Preparation', time: 'Preparation', desc: 'Gathering of materials and expert consultation.', status: 'active' },
            { id: 3, title: 'Main Service', time: 'Service', desc: 'Performing the primary ceremonial rites.', status: 'pending' }
        ];
    }

    return (
        <div className="p-16 max-w-4xl mx-auto space-y-16">
            <div className="relative pl-10 border-l-2 border-gray-100 ml-6 space-y-20">
                {steps.map((step) => (
                    <div key={step.id} className="relative">
                        <div className={`absolute left-[-56px] top-0 w-12 h-12 rounded-[20px] border-4 border-white flex items-center justify-center text-xs font-black shadow-premium transition-all ${
                            step.status === 'completed' ? 'bg-green-500 text-white' : 
                            step.status === 'active' ? 'bg-primary text-white animate-pulse' : 
                            'bg-ivory text-text-light'
                        }`}>
                            {step.status === 'completed' ? <CheckCircle2 size={20} /> : step.id}
                        </div>
                        <div className={`p-10 rounded-[48px] border-2 transition-all ${
                            step.status === 'active' ? 'bg-white border-primary shadow-premium scale-105' : 
                            'bg-white border-gray-50'
                        }`}>
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">
                                <div>
                                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3">{step.time}</div>
                                    <h3 className="text-2xl font-display font-medium text-text-main">{step.title}</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-5 py-2.5 bg-ivory text-primary font-black uppercase tracking-widest text-[9px] rounded-xl border border-primary/5">Details</button>
                                    <button className="px-5 py-2.5 bg-primary/5 text-primary font-black uppercase tracking-widest text-[9px] rounded-xl border border-primary/10 flex items-center gap-2">
                                        <Play size={10} fill="currentColor" /> Audio Guide
                                    </button>
                                </div>
                            </div>
                            <p className="text-text-muted font-medium leading-relaxed text-base">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChecklistTab = ({ completedItems, toggleItem }: { completedItems: string[], toggleItem: (item: string) => void }) => {
    const sections = [
        { title: 'Immediate Actions', items: ['Hospital Discharge Summary', 'Municipality Form 4', 'Police NOC (If needed)', 'Informing Relatives'] },
        { title: 'Ceremonial Materials', items: ['Sacred Water (Gangajal)', 'White Shroud (Kafan)', 'Wooden Log / Ghee', 'Flower Garlands'] },
        { title: 'Logistics', items: ['Crematorium Booking', 'Hearse Van Coordination', 'Priest Consultation', 'Obituary Services'] }
    ];

    return (
        <div className="p-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            {sections.map((section, idx) => (
                <div key={idx} className="space-y-8">
                    <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.3em] mb-6">{section.title}</h4>
                    <div className="space-y-4">
                        {section.items.map((item, i) => {
                            const isDone = completedItems.includes(item);
                            return (
                                <div 
                                    key={i} 
                                    onClick={() => toggleItem(item)}
                                    className={`p-7 border rounded-[32px] flex items-center justify-between shadow-soft transition-all group cursor-pointer ${
                                        isDone ? 'bg-green-50/30 border-green-200' : 'bg-white border-gray-50 hover:shadow-premium hover:border-primary/20'
                                    }`}
                                >
                                    <span className={`font-bold text-sm ${isDone ? 'text-green-800 line-through' : 'text-text-main'}`}>{item}</span>
                                    <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                                        isDone ? 'bg-green-500 border-green-500 text-white' : 'border-gray-100 group-hover:border-primary'
                                    }`}>
                                        <CheckCircle2 size={16} className={isDone ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 text-primary'} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const ChatTab = ({ history, onSend, isLoading }: any) => {
    const [input, setInput] = useState('');
    return (
        <div className="flex flex-col h-[65vh]">
            <div className="flex-1 overflow-y-auto p-12 space-y-10 no-scrollbar">
                {history.length === 0 && (
                    <div className="text-center py-20 space-y-8">
                        <div className="w-24 h-24 bg-primary/5 text-primary rounded-[40px] flex items-center justify-center mx-auto shadow-inner">
                            <Bot size={48} />
                        </div>
                        <div className="max-w-md mx-auto">
                            <h3 className="text-2xl font-display font-medium text-text-main mb-4">Supportive Protocol Guidance</h3>
                            <p className="text-base text-text-light font-medium leading-relaxed opacity-60">
                                Ask about meaning of rituals, material details, or chronological steps verified by our expert panel.
                            </p>
                        </div>
                    </div>
                )}
                {history.map((msg: any, i: number) => (
                    <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : 'max-w-[85%]'}`}>
                        {msg.role === 'model' && (
                            <div className="w-12 h-12 bg-primary/10 rounded-[18px] flex items-center justify-center text-primary flex-shrink-0 shadow-soft">
                                <Heart size={24} />
                            </div>
                        )}
                        <div className={`p-8 rounded-[40px] text-base leading-relaxed shadow-soft border border-gray-50 ${
                            msg.role === 'user' 
                                ? 'bg-primary text-white rounded-tr-none' 
                                : 'bg-ivory text-text-main rounded-tl-none'
                        }`}>
                            {msg.parts[0].text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-6 max-w-[85%] animate-pulse">
                        <div className="w-12 h-12 bg-primary/10 rounded-[18px] flex items-center justify-center text-primary flex-shrink-0">
                            <Loader2 className="animate-spin" />
                        </div>
                        <div className="bg-ivory p-8 rounded-[40px] rounded-tl-none font-black text-[10px] text-primary uppercase tracking-widest flex items-center gap-3">
                            Verifying Ceremony Protocol...
                        </div>
                    </div>
                )}
            </div>
            <div className="p-10 border-t border-gray-50 bg-white">
                <form onSubmit={(e) => {e.preventDefault(); onSend(input); setInput('');}} className="flex gap-6">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about verified rituals..."
                        className="flex-1 bg-ivory border-none rounded-[28px] p-7 text-lg font-medium outline-none focus:ring-4 ring-primary/5 shadow-inner"
                    />
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className="bg-primary text-white w-20 h-20 rounded-[28px] shadow-premium flex items-center justify-center hover:bg-primary-light"
                    >
                        <Send size={32} />
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

const ExpertsTab = ({ selections, t }: { selections: SelectionState, t: any }) => {
    const filteredExperts = experts.filter(e => e.religion === selections.religion || e.religion === 'all');

    return (
        <div className="p-16 max-w-6xl mx-auto space-y-16">
            <div className="space-y-6">
                <h3 className="text-3xl font-display font-medium text-text-main">{t.expertTitle}</h3>
                <p className="text-lg text-text-muted font-medium opacity-60">Consult with advisors specialized in {selections.religion} traditions for the {selections.state} region.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredExperts.map((expert) => (
                    <motion.div 
                        key={expert.id}
                        whileHover={{ y: -10 }}
                        className="bg-white p-10 rounded-[56px] border border-gray-50 shadow-premium flex flex-col group"
                    >
                        <div className="relative mb-10">
                            <img src={expert.image} className="w-32 h-32 rounded-[40px] object-cover mx-auto shadow-premium grayscale group-hover:grayscale-0 transition-all duration-500" alt={expert.name} />
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-soft text-amber-500 font-bold text-xs flex items-center gap-1">
                                <Star size={14} fill="currentColor" /> {expert.rating}
                            </div>
                        </div>

                        <div className="text-center mb-10 flex-1">
                            <h4 className="text-2xl font-display font-bold text-text-main mb-2 tracking-tight">{expert.name}</h4>
                            <div className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-6">{expert.specialty}</div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest opacity-60">
                                    <Globe size={14} /> {expert.languages.join(', ')}
                                </div>
                                <div className="flex items-center justify-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest opacity-60">
                                    <Clock size={14} /> {expert.experience} Experience
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-5 bg-ivory text-primary font-black uppercase tracking-widest text-[10px] rounded-2xl border border-primary/5 hover:bg-primary hover:text-white transition-all shadow-soft flex items-center justify-center gap-3">
                            <Phone size={14} /> Book Consultation
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="p-12 bg-ivory border-2 border-dashed border-gray-200 rounded-[56px] text-center space-y-6">
                <div className="w-20 h-20 bg-primary/5 text-primary rounded-[32px] flex items-center justify-center mx-auto">
                    <Headphones size={32} />
                </div>
                <h4 className="text-2xl font-display font-medium text-text-main">Can't find the right expert?</h4>
                <p className="text-text-muted font-medium max-w-md mx-auto">Our cultural concierge team is available 24/7 to connect you with specialized priests, scholars, or advisors.</p>
                <button className="px-10 py-5 bg-white text-primary font-black uppercase tracking-widest text-xs rounded-2xl shadow-premium border border-primary/10">Request Custom Expert</button>
            </div>
        </div>
    );
};
