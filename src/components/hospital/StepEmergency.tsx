import React from 'react';
import { ShieldAlert, Phone, Bot, Users, Heart, AlertCircle, Clock } from 'lucide-react';

export const StepEmergency: React.FC<{ onNext: () => void }> = () => {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D9A86C]/10 text-[#D9A86C] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#D9A86C]/20">
          <ShieldAlert size={14} /> 24/7 Priority Support
        </div>
        <h2 className="text-3xl font-display font-medium text-[#2D3748] mb-4">Emergency Assistance</h2>
        <p className="text-lg text-[#2D3748]/60 font-medium leading-relaxed">
          In moments of sudden need or confusion, we provide priority coordination and legal support to ensure you are never alone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#2D3748] p-10 rounded-[40px] text-white space-y-10 shadow-2xl shadow-gray-200">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#6E8FB6] rounded-2xl flex items-center justify-center">
                 <Phone size={32} />
              </div>
              <div>
                 <div className="text-[10px] font-black text-[#6E8FB6] uppercase tracking-[0.3em] mb-1">Emergency Helpline</div>
                 <div className="text-3xl font-display font-medium">1800-ANTIMA</div>
              </div>
           </div>

           <div className="space-y-6">
              {[
                { icon: Users, label: 'Dedicated Coordinator', val: 'Assigned within 5 mins' },
                { icon: Clock, label: 'Response Time', val: 'Immediate Callback' },
                { icon: Heart, label: 'Grief Counselor', val: 'Available 24/7' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <item.icon size={18} className="text-[#6E8FB6]" />
                      <span className="text-sm font-medium opacity-60">{item.label}</span>
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest text-[#6E8FB6]">{item.val}</span>
                </div>
              ))}
           </div>

           <button className="w-full bg-[#6E8FB6] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#6E8FB6]/20 transition-all active:scale-[0.98]">
              Connect Now
           </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
           {[
             {
               icon: Bot,
               title: 'AI Support Ritual Agent',
               desc: 'Instant answers to immediate hospital formalities and document requirements.',
               action: 'Start Chat'
             },
             {
               icon: AlertCircle,
               title: 'Priority Transportation',
               desc: 'Jump the queue for immediate hearse or ambulance dispatch.',
               action: 'Request SOS'
             },
             {
               icon: Users,
               title: 'Grief Support Circle',
               desc: 'Anonymized compassionate listener community for immediate calm.',
               action: 'Join Circle'
             }
           ].map((item, idx) => (
             <div key={idx} className="bg-white border border-gray-100 p-8 rounded-[32px] flex items-center gap-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-[#F7F8FA] rounded-2xl flex items-center justify-center text-[#6E8FB6] flex-shrink-0">
                  <item.icon size={28} />
                </div>
                <div className="flex-1">
                   <h3 className="text-lg font-display font-medium text-[#2D3748] mb-2">{item.title}</h3>
                   <p className="text-sm text-[#2D3748]/50 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <button className="px-6 py-3 bg-[#EEF1F4] text-[#2D3748] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#6E8FB6] hover:text-white transition-all">
                  {item.action}
                </button>
             </div>
           ))}
        </div>
      </div>

      <div className="p-8 bg-[#D9A86C]/5 rounded-[32px] border border-[#D9A86C]/10 text-center">
         <p className="text-[#2D3748]/60 font-medium leading-relaxed italic">
            "Your wellbeing is our priority. If you feel overwhelmed, please reach out. We are here to carry the burden of coordination for you."
         </p>
      </div>
    </div>
  );
};
