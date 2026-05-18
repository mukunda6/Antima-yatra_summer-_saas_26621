import React from 'react';
import { Users, Send, MapPin, Navigation, MessageCircle, Phone, Share2 } from 'lucide-react';

export const StepCommunication: React.FC<{ onNext: () => void }> = () => {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF1F4] text-[#6E8FB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white">
          <Users size={14} /> Family & Community
        </div>
        <h2 className="text-3xl font-display font-medium text-[#2D3748] mb-4">Communication Support</h2>
        <p className="text-lg text-[#2D3748]/60 font-medium leading-relaxed">
          Keeping family members informed and coordinating arrival is crucial. Use these tools to share status and locations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
           <h3 className="text-xs font-black text-[#2D3748]/40 uppercase tracking-widest pl-1">Emergency Contacts</h3>
           <div className="space-y-4">
              {[
                { name: 'Rahul Sharma', relation: 'Son', status: 'Informed' },
                { name: 'Priya Verma', relation: 'Daughter', status: 'Pending' },
                { name: 'Arun Gupta', relation: 'Brother', status: 'Contacted' }
              ].map((contact, idx) => (
                <div key={idx} className="bg-[#F7F8FA] p-6 rounded-2xl flex items-center justify-between border border-transparent hover:border-[#6E8FB6]/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#6E8FB6]">
                       <Users size={18} />
                    </div>
                    <div>
                      <div className="text-[#2D3748] font-bold">{contact.name}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{contact.relation}</div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    contact.status === 'Informed' ? 'bg-green-50 text-green-600' : 
                    contact.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {contact.status}
                  </div>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-[#6E8FB6]/40 hover:text-[#6E8FB6] transition-all">
                + Add Member
              </button>
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-xs font-black text-[#2D3748]/40 uppercase tracking-widest pl-1">Quick Actions</h3>
           <div className="grid grid-cols-1 gap-4">
              <button className="bg-white border border-gray-100 p-6 rounded-3xl flex items-center gap-6 shadow-sm hover:shadow-premium transition-all text-left">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                   <div className="text-sm font-bold text-[#2D3748]">WhatsApp Update</div>
                   <div className="text-xs text-[#2D3748]/50 font-medium mt-1">Send immediate status update to family group.</div>
                </div>
                <Send size={16} className="ml-auto text-gray-300" />
              </button>

              <button className="bg-white border border-gray-100 p-6 rounded-3xl flex items-center gap-6 shadow-sm hover:shadow-premium transition-all text-left">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                   <div className="text-sm font-bold text-[#2D3748]">Share Hospital Location</div>
                   <div className="text-xs text-[#2D3748]/50 font-medium mt-1">Send live directions and arrival point to contacts.</div>
                </div>
                <Share2 size={16} className="ml-auto text-gray-300" />
              </button>

              <button className="bg-white border border-gray-100 p-6 rounded-3xl flex items-center gap-6 shadow-sm hover:shadow-premium transition-all text-left">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                  <Navigation size={24} />
                </div>
                <div>
                   <div className="text-sm font-bold text-[#2D3748]">Coordinate Arrival</div>
                   <div className="text-xs text-[#2D3748]/50 font-medium mt-1">See which family members are near the hospital.</div>
                </div>
                <Users size={16} className="ml-auto text-gray-300" />
              </button>
           </div>
        </div>
      </div>

      <div className="bg-[#EEF1F4] p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6E8FB6]">
               <Phone size={24} />
            </div>
            <div>
               <div className="text-sm font-bold text-[#2D3748]">Direct Communication</div>
               <div className="text-xs text-[#2D3748]/50 font-medium mt-1">Unified messaging for all ceremony updates.</div>
            </div>
         </div>
         <button className="bg-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#2D3748] shadow-sm hover:shadow-md transition-all">
            Open Chat Module
         </button>
      </div>
    </div>
  );
};
