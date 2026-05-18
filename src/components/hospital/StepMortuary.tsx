import React from 'react';
import { Info, HelpCircle, FileCheck, Clock, Users, ShieldAlert } from 'lucide-react';

export const StepMortuary: React.FC<{ onNext: () => void }> = () => {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF1F4] text-[#6E8FB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white">
          <Info size={14} /> Process Guidance
        </div>
        <h2 className="text-3xl font-display font-medium text-[#2D3748] mb-4">Body Release & Mortuary</h2>
        <p className="text-lg text-[#2D3748]/60 font-medium leading-relaxed">
          Understanding the hospital release process can help reduce anxiety. We coordinate with mortuary staff to ensure a smooth transition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           {
             icon: Clock,
             title: 'Expected Timing',
             desc: 'Standard release takes 2-4 hours after death confirmation, depending on hospital administrative load.',
             color: 'blue'
           },
           {
             icon: FileCheck,
             title: 'Required Signatures',
             desc: 'Next of kin must sign the release register in the presence of the ward coordinator or RMO.',
             color: 'amber'
           },
           {
             icon: Users,
             title: 'Staff Assistance',
             desc: 'Our Antima coordinators are available on-ground to guide you through the mortuary counter.',
             color: 'blue'
           }
         ].map((item, idx) => (
           <div key={idx} className="bg-[#F7F8FA] p-8 rounded-[32px] border border-transparent hover:border-[#6E8FB6]/20 transition-all">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
              }`}>
                 <item.icon size={24} />
              </div>
              <h3 className="text-lg font-display font-medium text-[#2D3748] mb-3">{item.title}</h3>
              <p className="text-sm text-[#2D3748]/50 font-medium leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-soft">
        <div className="bg-[#EEF1F4] px-10 py-6 border-b border-gray-100">
           <h3 className="text-sm font-black text-[#2D3748] uppercase tracking-widest">Procedural FAQ</h3>
        </div>
        <div className="p-10 space-y-8">
           {[
             { q: 'What is the "No Objection Certificate" for?', a: 'Required if death occurred at home or under specific medical conditions to confirm no legal issues.' },
             { q: 'Can we use our own transportation?', a: 'Yes, but hospitals require verified registration for any vehicle entering the mortuary release area.' },
             { q: 'How long can the body be kept in the mortuary?', a: 'Standard hospital policy is 24-48 hours. Long-term storage requires specific medical preservation.' }
           ].map((faq, idx) => (
             <div key={idx} className="group">
                <div className="flex items-start gap-4 mb-3">
                  <div className="text-[#6E8FB6] mt-1"><HelpCircle size={18} /></div>
                  <div className="text-base font-bold text-[#2D3748]">{faq.q}</div>
                </div>
                <div className="pl-9 text-sm text-[#2D3748]/60 leading-relaxed font-medium">
                  {faq.a}
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 bg-[#D9A86C]/5 p-8 rounded-[32px] border border-[#D9A86C]/10">
         <div className="w-16 h-16 bg-[#D9A86C] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#D9A86C]/10 flex-shrink-0">
            <ShieldAlert size={32} />
         </div>
         <div className="flex-1">
            <h4 className="text-lg font-display font-medium text-[#2D3748] mb-1">Facing difficulties with hospital staff?</h4>
            <p className="text-sm text-[#2D3748]/60 font-medium">If you encounter any administrative hurdles or insensitive conduct, our senior ombudsman can intervene immediately.</p>
         </div>
         <button className="bg-[#2D3748] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
            SOS Intervention
         </button>
      </div>
    </div>
  );
};
