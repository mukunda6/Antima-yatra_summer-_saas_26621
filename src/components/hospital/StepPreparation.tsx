import React from 'react';
import { Heart, ArrowRight, MessageCircle, ShoppingBag, MapPin, Phone } from 'lucide-react';

export const StepPreparation: React.FC<{ onNext: () => void }> = () => {
  const nextActions = [
    {
      id: 'ritual',
      icon: Heart,
      title: 'Start Ritual Guidance',
      desc: 'Get step-by-step traditions for the ceremony.',
      color: 'blue'
    },
    {
      id: 'market',
      icon: ShoppingBag,
      title: 'Book Funeral Services',
      desc: 'Samagri kits, priests, and flower arrangements.',
      color: 'amber'
    },
    {
      id: 'comms',
      icon: MessageCircle,
      title: 'Notify Relatives',
      desc: 'Send respectful invites and ceremony timing.',
      color: 'blue'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF1F4] text-[#6E8FB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white">
          <Heart size={14} /> Future Support
        </div>
        <h2 className="text-3xl font-display font-medium text-[#2D3748] mb-4">Ceremony Preparation</h2>
        <p className="text-lg text-[#2D3748]/60 font-medium leading-relaxed">
          As you move from hospital coordination to honoring the life of your loved one, our other modules are ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {nextActions.map(action => (
          <button 
            key={action.id}
            className="group bg-white border border-gray-100 p-8 rounded-[40px] text-left shadow-sm hover:shadow-premium hover:border-[#6E8FB6]/20 transition-all flex flex-col h-full"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${
               action.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
            }`}>
               <action.icon size={28} />
            </div>
            <h3 className="text-xl font-display font-medium text-[#2D3748] mb-4">{action.title}</h3>
            <p className="text-sm text-[#2D3748]/50 font-medium leading-relaxed mb-10 flex-1">
              {action.desc}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black text-[#6E8FB6] uppercase tracking-widest">
               Launch Module <ArrowRight size={14} />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-[#F7F8FA] p-10 rounded-[40px] border border-gray-50 flex flex-col md:flex-row gap-12">
         <div className="md:w-1/3">
            <h3 className="text-lg font-display font-medium text-[#2D3748] mb-4">Immediate Contacts</h3>
            <p className="text-sm text-[#2D3748]/50 font-medium leading-relaxed">
              Verified service providers in your immediate vicinity.
            </p>
         </div>
         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Pandit ji - Vaikunth', cat: 'Ceremony Priest', contact: '+91 98765 43210' },
              { name: 'Shanti Flowers', cat: 'Floral Arrangements', contact: '+91 88765 54321' },
              { name: 'Antim Safar Hearse', cat: 'Emergency Transport', contact: '+91 77654 32109' },
              { name: 'Mukti Dham', cat: 'Cremation Venue', contact: '+91 66543 21098' }
            ].map((contact, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between">
                 <div>
                    <div className="text-sm font-bold text-[#2D3748]">{contact.name}</div>
                    <div className="text-[10px] font-bold text-[#6E8FB6] uppercase tracking-widest mt-1">{contact.cat}</div>
                 </div>
                 <button className="w-10 h-10 bg-[#EEF1F4] text-[#2D3748] rounded-xl flex items-center justify-center hover:bg-[#6E8FB6] hover:text-white transition-all">
                    <Phone size={16} />
                 </button>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
