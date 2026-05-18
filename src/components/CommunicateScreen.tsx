import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, MessageCircle, Phone, Mail, 
  ChevronRight, ArrowLeft, Send, Mic, CheckCircle2, 
  MapPin, Clock, Search, Info, Plus, Bot, AlertCircle
} from 'lucide-react';
import { getUserContacts, logNotification, saveDeceasedRecord } from '../services/firestoreService';

interface CommunicateScreenProps {
  onNavigate?: (tab: string) => void;
}

export const CommunicateScreen: React.FC<CommunicateScreenProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['sms', 'whatsapp', 'voice']);
  const [customContacts, setCustomContacts] = useState<any[]>([]);
  const [twilioStatusMessage, setTwilioStatusMessage] = useState<string | null>(null);
  
  const handleAddCustomContact = (name: string, phone: string) => {
    const newContact = {
      id: 'custom_' + Date.now(),
      name: name || `Custom Recipient`,
      phone: phone,
      group: 'Custom'
    };
    setCustomContacts(prev => [...prev, newContact]);
    setSelectedContacts(prev => [...prev, newContact.id]);
  };
  
  // New AI and Form States
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [generatedVoiceUrl, setGeneratedVoiceUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [ceremonyInfo, setCeremonyInfo] = useState({
    deceasedName: '',
    dateOfPassing: '',
    ceremonyType: 'Cremation',
    ceremonyDate: '',
    ceremonyTime: '',
    venueAddress: '',
  });
  const [messageContent, setMessageContent] = useState('');

  const totalSteps = 5;

  const [dbContacts, setDbContacts] = useState<any[]>([]);
  const mockContacts = [
    { id: 'm1', name: 'Anil Kumar', group: 'Close Family' },
    { id: 'm2', name: 'Sita Rani', group: 'Close Family' },
    { id: 'm3', name: 'Rahul Sharma', group: 'Relatives' },
    { id: 'm4', name: 'Priya Verma', group: 'Friends' },
    { id: 'm5', name: 'Sanjay Gupta', group: 'Work' },
    { id: 'm6', name: 'Amit Singh', group: 'Work' },
  ];

  const allContacts = [...dbContacts, ...mockContacts, ...customContacts];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getUserContacts();
        if (data) setDbContacts(data);
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };
    fetchContacts();
  }, []);

  const handleGenerateText = async () => {
    setIsGeneratingText(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/communicate/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ceremonyInfo),
      });
      const data = await response.json();
      if (response.status === 403) {
        setErrorMsg("AI Model Access Issue: Please check your API key settings or use a billing-enabled key.");
      } else if (data.text) {
        setMessageContent(data.text);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to connect to AI service.");
    } finally {
      setIsGeneratingText(false);
    }
  };

  const useBrowserTTS = () => {
    if (!messageContent) return;
    const utterance = new SpeechSynthesisUtterance(messageContent);
    utterance.lang = 'hi-IN'; // Attempt Hindi voice if available
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleGenerateVoice = async () => {
    if (!messageContent) return;
    setIsGeneratingVoice(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/communicate/generate-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageContent }),
      });
      const data = await response.json();
      
      if (response.status === 403) {
        setErrorMsg("AI Voice Denied: Using your computer's voice as fallback.");
        useBrowserTTS();
      } else if (data.audio) {
        // Create an audio blob for playback
        const binary = atob(data.audio);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        setGeneratedVoiceUrl(url);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("AI Voice service error. Falling back to system voice.");
      useBrowserTTS();
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  const [sendingProgress, setSendingProgress] = useState<{[key: string]: 'pending' | 'sending' | 'sent' | 'failed'}>({});
  const [activeCallContact, setActiveCallContact] = useState<string | null>(null);

  const handleSend = async () => {
    setIsSending(true);
    setErrorMsg(null);
    setTwilioStatusMessage(null);
    
    const progress: {[key: string]: 'pending' | 'sending' | 'sent' | 'failed'} = {};
    selectedChannels.forEach(ch => progress[ch] = 'pending');
    setSendingProgress(progress);

    try {
      const activeContacts = allContacts.filter(c => selectedContacts.includes(c.id));
      
      // Update channels progress to sending
      selectedChannels.forEach(channel => {
        setSendingProgress(prev => ({ ...prev, [channel]: 'sending' }));
      });

      const response = await fetch('/api/communicate/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contacts: activeContacts,
          channels: selectedChannels,
          message: messageContent,
          audio: generatedVoiceUrl ? 'included' : 'none'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send messages');
      }

      if (data.success) {
        if (data.twilioConfigured) {
          setTwilioStatusMessage("Twilio calls initiated in real-time!");
        } else {
          setTwilioStatusMessage("Demo Mode: Configure Twilio credentials in your .env to receive real-time calls!");
        }

        // Sequential simulation for better UI feedback
        for (const channel of selectedChannels) {
          if (channel === 'voice') {
            const firstContact = activeContacts.find(c => c.phone);
            if (firstContact) {
              setActiveCallContact(`${firstContact.name} (${firstContact.phone})`);
              await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate ring/call
              setActiveCallContact(null);
            }
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          setSendingProgress(prev => ({ ...prev, [channel]: 'sent' }));
        }

        // Log to Firestore
        try {
          await logNotification({
            message: messageContent,
            channels: selectedChannels,
            contacts: selectedContacts,
          });
        } catch (dbErr) {
          console.error("Failed to log notification to Firestore:", dbErr);
        }
        
        // Wait a small moment and then set as sent
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsSent(true);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Failed to send notifications.");
      selectedChannels.forEach(channel => {
        setSendingProgress(prev => ({ ...prev, [channel]: 'failed' }));
      });
    } finally {
      setIsSending(false);
    }
  };

  const toggleContact = (id: number) => {
    setSelectedContacts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleChannel = (id: string) => {
    setSelectedChannels(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (isSent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
        <div className="bg-white rounded-[40px] p-12 shadow-2xl border border-gray-100 flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-100"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-text-main mb-4">Messages Sent Successfully</h1>
          <p className="text-lg text-text-muted mb-10 max-w-md">
            {selectedContacts.length} people have been notified across {selectedChannels.length} channels. 
            Confirmations will appear in your Action Center.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button 
              onClick={() => { 
                if (onNavigate) {
                  onNavigate('home');
                } else {
                  setStep(1); 
                  setIsSent(false); 
                }
              }}
              className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:bg-primary/90 transition-all active:scale-95"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={() => onNavigate?.('actions')}
              className="flex-1 py-4 bg-surface text-text-main font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              View Status <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-display font-bold text-text-main">Smart Communication</h1>
          <span className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-lg">Step {step} of {totalSteps}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            className="h-full bg-primary transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-gray-100 min-h-[500px] flex flex-col">
        <div className="flex-1">
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm"
            >
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{errorMsg}</span>
              <button onClick={() => setErrorMsg(null)} className="ml-auto text-red-400 hover:text-red-600 transition-colors">
                <Plus size={18} className="rotate-45" />
              </button>
            </motion.div>
          )}
          {step === 1 && (
            <Step1 
              contacts={allContacts} 
              selected={selectedContacts} 
              toggle={toggleContact} 
              onAddCustomContact={handleAddCustomContact}
            />
          )}
          {step === 2 && (
            <Step2 
              info={ceremonyInfo} 
              setInfo={(val) => setCeremonyInfo(prev => ({ ...prev, ...val }))} 
              message={messageContent}
              setMessage={setMessageContent}
              onGenerate={handleGenerateText}
              isGenerating={isGeneratingText}
            />
          )}
          {step === 3 && <Step3 selected={selectedChannels} toggle={toggleChannel} />}
          {step === 4 && (
            <Step4 
              onSkip={() => setStep(5)} 
              onGenerateVoice={handleGenerateVoice} 
              isGenerating={isGeneratingVoice} 
              voiceUrl={generatedVoiceUrl}
            />
          )}
          {step === 5 && (
            <Step5 
              count={selectedContacts.length} 
              channels={selectedChannels} 
              message={messageContent} 
              isSending={isSending}
              progress={sendingProgress}
              activeCall={activeCallContact}
              twilioStatus={twilioStatusMessage}
            />
          )}
        </div>


        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
          <button 
            disabled={step === 1 || isSending}
            onClick={() => setStep(step - 1)}
            className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
              (step === 1 || isSending) ? 'text-text-light cursor-not-allowed' : 'text-text-muted hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          <button 
            disabled={isSending}
            onClick={async () => {
              if (step === 2 && ceremonyInfo.deceasedName) {
                // Save record to Firestore
                try {
                  await saveDeceasedRecord({
                    deceasedName: ceremonyInfo.deceasedName,
                    dateOfPassing: ceremonyInfo.dateOfPassing,
                    religion: ceremonyInfo.ceremonyType, // Using ceremony type as initial religion hint
                    ceremonyInfo: {
                      type: ceremonyInfo.ceremonyType,
                      date: ceremonyInfo.ceremonyDate,
                      time: ceremonyInfo.ceremonyTime,
                      venue: ceremonyInfo.venueAddress
                    },
                    status: 'active'
                  });
                } catch (err) {
                  console.error("Failed to save record", err);
                }
              }

              if (step < 5) {
                setStep(step + 1);
              } else {
                handleSend();
              }
            }}
            className={`px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2 relative overflow-hidden`}
          >
            {isSending ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              <>
                {step === 5 ? 'Confirm & Send' : 'Save & Next'} 
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Step1 = ({ 
  contacts, 
  selected, 
  toggle,
  onAddCustomContact
}: { 
  contacts: any[], 
  selected: any[], 
  toggle: (id: any) => void,
  onAddCustomContact: (name: string, phone: string) => void
}) => {
  const [customName, setCustomName] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!customPhone.trim()) {
      setError('Phone number is required.');
      return;
    }
    const cleanPhone = customPhone.replace(/[\s\-()]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid phone number (at least 10 digits).');
      return;
    }
    setError('');
    onAddCustomContact(customName.trim() || `Custom (${customPhone.trim()})`, customPhone.trim());
    setCustomName('');
    setCustomPhone('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-bold text-text-main mb-2">Select Contacts</h2>
        <p className="text-sm text-text-muted">Choose recipients or enter their numbers directly to notify them.</p>
      </div>

      {/* Add Custom Contact Form */}
      <div className="bg-surface/50 border border-gray-100 rounded-3xl p-5 space-y-4 shadow-soft">
        <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
          <Plus size={16} className="text-primary" /> Directly Enter Phone Number
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">Phone Number</label>
            <input 
              type="tel"
              placeholder="+91 98765 43210"
              value={customPhone}
              onChange={(e) => setCustomPhone(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">Name (Optional)</label>
            <input 
              type="text"
              placeholder="e.g. My Phone"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>
        
        {error && <p className="text-xs font-bold text-red-500">{error}</p>}
        
        <button 
          type="button"
          onClick={handleAdd}
          className="w-full sm:w-auto px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-xs shadow-md hover:bg-primary/95 transition-all flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
        >
          <Plus size={14} /> Add & Select Recipient
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['All', 'Close Family', 'Relatives', 'Friends', 'Work', 'Community'].map(filter => (
          <button key={filter} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${filter === 'All' ? 'bg-primary text-white shadow-md' : 'bg-surface text-text-muted hover:bg-surface-hover'}`}>
            {filter}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={18} />
        <input 
          type="text" 
          placeholder="Search contacts..." 
          className="w-full bg-surface border-none rounded-xl p-4 pl-12 text-sm focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {contacts.map(c => (
          <label key={c.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-text-muted group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  {c.name.split(' ').map((n: string) => n[0]).join('')}
               </div>
               <div>
                  <div className="text-sm font-bold text-text-main flex items-center gap-1.5">
                    {c.name}
                    {c.group === 'Custom' && (
                      <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase">Custom</span>
                    )}
                  </div>
                  <div className="text-xs text-text-light font-medium">{c.phone || c.group}</div>
               </div>
            </div>
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-primary border-gray-200 rounded" 
              checked={selected.includes(c.id)} 
              onChange={() => toggle(c.id)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

const Step2 = ({ info, setInfo, message, setMessage, onGenerate, isGenerating }: { 
  info: any, 
  setInfo: (val: any) => void, 
  message: string, 
  setMessage: (val: string) => void,
  onGenerate: () => void,
  isGenerating: boolean
}) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-display font-bold text-text-main mb-2">Ceremony Information</h2>
      <p className="text-sm text-text-muted">Fill in the details to generate a respectful message.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-wider">Deceased Name</label>
        <input 
          value={info.deceasedName}
          onChange={(e) => setInfo({ deceasedName: e.target.value })}
          placeholder="Full Name"
          className="w-full bg-surface border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-wider">Date of Passing</label>
        <input 
          type="date"
          value={info.dateOfPassing}
          onChange={(e) => setInfo({ dateOfPassing: e.target.value })}
          className="w-full bg-surface border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-wider">Ceremony Type</label>
        <select 
          value={info.ceremonyType}
          onChange={(e) => setInfo({ ceremonyType: e.target.value })}
          className="w-full bg-surface border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
        >
          {['Cremation', 'Burial', 'Final Prayers'].map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-wider">Ceremony Date</label>
        <input 
          type="date"
          value={info.ceremonyDate}
          onChange={(e) => setInfo({ ceremonyDate: e.target.value })}
          className="w-full bg-surface border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-wider">Ceremony Time</label>
        <input 
          type="time"
          value={info.ceremonyTime}
          onChange={(e) => setInfo({ ceremonyTime: e.target.value })}
          className="w-full bg-surface border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-wider">Venue/Address</label>
        <input 
          value={info.venueAddress}
          onChange={(e) => setInfo({ venueAddress: e.target.value })}
          placeholder="Full Address"
          className="w-full bg-surface border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
        />
      </div>
    </div>

    <div className="flex justify-center pt-2">
      <button 
        onClick={onGenerate}
        disabled={isGenerating || !info.deceasedName}
        className="flex items-center gap-2 bg-accent/10 text-accent px-6 py-2 rounded-full text-xs font-bold hover:bg-accent/20 transition-all disabled:opacity-50"
      >
        <Bot size={16} /> {isGenerating ? 'Generating...' : 'Auto-Generate Content with AI'}
      </button>
    </div>

    <div className="space-y-3 pt-4">
        <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-wider">Message Content</label>
        <textarea 
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A personalized message will be generated here. You can edit it if needed."
          className="w-full bg-surface border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none leading-relaxed"
        />
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">Live Preview</span>
          <span className="text-[10px] font-bold text-text-light uppercase">{message.length} characters</span>
        </div>
    </div>
  </div>
);

const Step3 = ({ selected, toggle }: { selected: string[], toggle: (id: string) => void }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-display font-bold text-text-main mb-2">Communication Channels</h2>
      <p className="text-sm text-text-muted">Select how you want to reach your family and friends (email has been removed for direct messaging).</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { id: 'sms', name: 'SMS', icon: MessageCircle, desc: '98% open rate' },
        { id: 'whatsapp', name: 'WhatsApp', icon: Phone, desc: 'Rich media support' },
        { id: 'voice', name: 'Voice Call', icon: Mic, desc: 'Real-time call' }
      ].map((ch) => (
        <label key={ch.id} className={`p-4 border border-2 rounded-2xl cursor-pointer transition-all group relative ${selected.includes(ch.id) ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 hover:border-primary/30'}`}>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selected.includes(ch.id) ? 'bg-primary text-white' : 'bg-surface text-text-muted group-hover:text-primary'}`}>
               <ch.icon size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-text-main">{ch.name}</div>
              <div className="text-[10px] text-text-light font-medium">{ch.desc}</div>
            </div>
            <input 
              type="checkbox" 
              className="absolute top-3 right-3 w-4 h-4 accent-primary" 
              checked={selected.includes(ch.id)} 
              onChange={() => toggle(ch.id)}
            />
          </div>
        </label>
      ))}
    </div>

    <div className="bg-surface rounded-2xl p-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
         <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
            <Clock size={18} />
         </div>
         <h4 className="font-bold text-sm text-text-main">Scheduling Options</h4>
      </div>
      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
           <input type="radio" name="sched" className="w-4 h-4 accent-primary" defaultChecked />
           <span className="text-sm font-medium text-text-muted">Send Immediately</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
           <input type="radio" name="sched" className="w-4 h-4 accent-primary" />
           <span className="text-sm font-medium text-text-muted">Schedule for later</span>
        </label>
      </div>
      <div className="mt-4 p-3 bg-white/50 rounded-xl flex items-center gap-2 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
         <Info size={14} />
         We recommend sending between 8 AM – 8 PM
      </div>
    </div>
  </div>
);

const Step4 = ({ onSkip, onGenerateVoice, isGenerating, voiceUrl }: { 
  onSkip: () => void, 
  onGenerateVoice: () => void,
  isGenerating: boolean,
  voiceUrl: string | null
}) => (
  <div className="space-y-8 flex flex-col items-center justify-center h-full">
    <div className="text-center">
      <h2 className="text-xl font-display font-bold text-text-main mb-2">Voice Message</h2>
      <p className="text-sm text-text-muted">Add a personal voice recording or use AI text-to-speech.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
       <button className="flex flex-col items-center gap-4 p-8 border-2 border-gray-100 bg-white rounded-3xl transition-all hover:border-primary hover:shadow-lg group">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center text-text-light group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110 transition-all">
             <Mic size={32} />
          </div>
          <div className="text-center">
            <div className="font-bold text-text-muted group-hover:text-primary transition-colors mb-1">Record Voice</div>
            <div className="text-xs text-text-light">00:00</div>
          </div>
       </button>
       
       <button 
        onClick={onGenerateVoice}
        disabled={isGenerating}
        className={`flex flex-col items-center gap-4 p-8 border-2 rounded-3xl transition-all hover:shadow-lg group ${voiceUrl ? 'border-accent bg-accent/5' : 'border-gray-100 bg-white hover:border-accent'}`}
       >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${voiceUrl ? 'bg-accent text-white' : 'bg-surface text-text-light group-hover:bg-accent/10 group-hover:text-accent group-hover:scale-110'}`}>
             {isGenerating ? (
               <div className="w-8 h-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
             ) : (
               <Bot size={32} />
             )}
          </div>
          <div className="text-center">
            <div className="font-bold text-text-muted group-hover:text-accent transition-colors mb-1">
              {voiceUrl ? 'AI Voice Generated' : 'AI Voice'}
            </div>
            <div className="text-xs text-text-light">
              {isGenerating ? 'Synthesizing...' : 'Text-to-Speech'}
            </div>
          </div>
       </button>
    </div>

    {voiceUrl && (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-surface p-4 rounded-2xl flex items-center gap-4"
      >
        <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center">
           <Bot size={20} />
        </div>
        <audio src={voiceUrl} controls className="flex-1 h-8" />
      </motion.div>
    )}

    <button 
      onClick={() => onSkip?.()}
      className="text-sm text-text-light font-bold hover:text-primary transition-colors uppercase tracking-widest"
    >
      Skip this step
    </button>
  </div>
);

const Step5 = ({ 
  count, 
  channels, 
  message, 
  isSending, 
  progress, 
  activeCall,
  twilioStatus
}: { 
  count: number, 
  channels: string[], 
  message: string,
  isSending: boolean,
  progress: {[key: string]: 'pending' | 'sending' | 'sent' | 'failed'},
  activeCall: string | null,
  twilioStatus: string | null
}) => (
  <div className="space-y-6">
    {activeCall ? (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-primary rounded-3xl p-8 text-white text-center shadow-xl shadow-primary/20"
      >
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
           <Phone size={32} />
        </div>
        <div className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">On Call with</div>
        <div className="text-2xl font-display font-bold mb-4">{activeCall}</div>
        <div className="flex justify-center gap-1">
           {[1, 2, 3].map(i => (
             <motion.div 
               key={i}
               animate={{ height: [8, 24, 8] }}
               transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
               className="w-1 bg-white/40 rounded-full"
             />
           ))}
        </div>
      </motion.div>
    ) : (
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
           <CheckCircle2 size={32} />
        </div>
        <h2 className="text-2xl font-display font-bold text-text-main mb-1">Review & Confirm</h2>
        <p className="text-sm text-text-muted">Please review carefully before sending.</p>
      </div>
    )}

    {twilioStatus && (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-2xl text-center text-xs font-bold border ${
          twilioStatus.includes("Demo Mode") 
            ? "bg-amber-50 text-amber-800 border-amber-200" 
            : "bg-green-50 text-green-800 border-green-200"
        }`}
      >
        {twilioStatus}
      </motion.div>
    )}

    <div className="space-y-4">
      <div className="bg-surface rounded-2xl p-6">
         <div className="flex justify-between items-start mb-4">
            <div>
               <div className="text-xs font-bold text-text-light uppercase tracking-widest mb-1">Recipients</div>
               <div className="text-lg font-bold text-text-main">{count} People</div>
            </div>
            <div className="text-right">
               <div className="text-xs font-bold text-text-light uppercase tracking-widest mb-1">Estimated Cost</div>
               <div className="text-lg font-bold text-primary">₹{count * channels.length * 2.5}</div>
            </div>
         </div>
         <div className="flex flex-wrap gap-2 mb-6">
            {channels.map(ch => (
              <span 
                key={ch} 
                className={`px-3 py-1 rounded-md text-[10px] font-black border transition-all uppercase tracking-tighter flex items-center gap-1.5 ${
                  progress[ch] === 'sending' ? 'bg-primary/10 text-primary border-primary animate-pulse' :
                  progress[ch] === 'sent' ? 'bg-green-50 text-green-600 border-green-200' :
                  progress[ch] === 'failed' ? 'bg-red-50 text-red-600 border-red-200' :
                  'bg-white text-text-muted border-gray-100'
                }`}
              >
                {ch}
                {progress[ch] === 'sending' && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />}
                {progress[ch] === 'sent' && <CheckCircle2 size={10} />}
                {progress[ch] === 'failed' && <AlertCircle size={10} />}
              </span>
            ))}
            {channels.length === 0 && <span className="text-[10px] text-red-500 font-bold uppercase">No channels selected</span>}
         </div>
         <div className="bg-white rounded-xl p-4 border border-gray-100 italic text-sm text-text-muted leading-relaxed whitespace-pre-wrap">
            {message || "No message content provided."}
         </div>
      </div>

      <div className="p-4 bg-amber-50 text-amber-800 rounded-2xl flex items-start gap-4 border border-amber-100">
         <AlertCircle className="flex-shrink-0 mt-1" size={20} />
         <div>
            <div className="text-sm font-bold mb-1">Final Check</div>
            <p className="text-xs text-amber-700 leading-relaxed font-medium">
               You are about to notify {count} people across {channels.length} channels. This action cannot be undone once confirmed.
            </p>
          </div>
      </div>
    </div>
  </div>
);
