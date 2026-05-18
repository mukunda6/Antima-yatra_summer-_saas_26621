import React from 'react';
import { Truck, Navigation, Phone, ShieldCheck, MapPin, Star, ArrowRight, Users } from 'lucide-react';
import { TransportService } from './HospitalTypes';

export const StepTransportation: React.FC<{ onNext: () => void }> = () => {
  const services: TransportService[] = [
    { id: '1', type: 'hearse', name: 'Premium Hearse Van', price: '₹4,500', eta: '15 mins', status: 'available' },
    { id: '2', type: 'ambulance', name: 'Emergency Ambulance', price: '₹3,200', eta: '8 mins', status: 'available' },
    { id: '3', type: 'family', name: 'Family Support Car (XL)', price: '₹1,200', eta: '12 mins', status: 'available' },
    { id: '4', type: 'intercity', name: 'Intercity Transport', price: 'Estimation', eta: 'Book Now', status: 'available' },
  ];

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF1F4] text-[#6E8FB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white">
          <Truck size={14} /> Transportation Services
        </div>
        <h2 className="text-3xl font-display font-medium text-[#2D3748] mb-4">Book Transportation</h2>
        <p className="text-lg text-[#2D3748]/60 font-medium leading-relaxed">
          Respectful transportation for the deceased and supportive vehicles for the family. Verified drivers with empathetic conduct.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-[#2D3748]/40 uppercase tracking-widest pl-1">Available Services</h3>
          {services.map(service => (
            <div key={service.id} className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-premium transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    service.type === 'ambulance' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#2D3748]">{service.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-[#6E8FB6]">
                      <Star size={10} fill="currentColor" /> Certified Supportive
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-display font-bold text-[#2D3748]">{service.price}</div>
                  <div className="text-[10px] font-black text-green-500 uppercase tracking-widest">{service.eta}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-4">
                <button className="flex-1 bg-[#2D3748] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
                   Book Service <ArrowRight size={14} />
                </button>
                <button className="p-4 border border-gray-100 rounded-xl text-[#2D3748] hover:bg-gray-50 transition-all">
                  <Phone size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
           <div className="bg-[#EEF1F4] rounded-[40px] p-8 h-full relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-black text-[#2D3748]/40 uppercase tracking-widest">Live Tracking</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-[9px] font-black text-[#6E8FB6] uppercase tracking-widest shadow-sm">
                    <span className="w-1.5 h-1.5 bg-[#6E8FB6] rounded-full animate-pulse"></span> Service Active
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full border-2 border-[#6E8FB6] bg-white flex items-center justify-center">
                           <div className="w-2 h-2 rounded-full bg-[#6E8FB6]"></div>
                        </div>
                        <div className="w-0.5 h-12 bg-gray-200 dashed"></div>
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                      </div>
                      <div className="space-y-8 flex-1">
                         <div>
                            <div className="text-sm font-bold text-[#2D3748]">Pickup Point</div>
                            <div className="text-xs text-[#2D3748]/50 font-medium">St. Joseph Hospital, Main Gate</div>
                         </div>
                         <div>
                            <div className="text-sm font-bold text-[#2D3748]">Destination</div>
                            <div className="text-xs text-[#2D3748]/50 font-medium italic">Pending ceremony selection...</div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-12 bg-white rounded-3xl p-6 shadow-sm border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl border-2 border-white flex items-center justify-center">
                     <Users size={20} className="text-[#6E8FB6]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Coordinator</div>
                    <div className="text-sm font-bold text-[#2D3748]">Vikram Singh</div>
                  </div>
                  <button className="ml-auto w-10 h-10 bg-[#6E8FB6] text-white rounded-xl flex items-center justify-center shadow-md">
                     <Phone size={16} />
                  </button>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-[#6E8FB6]/5 p-6 rounded-3xl border border-[#6E8FB6]/10">
         <ShieldCheck size={24} className="text-[#6E8FB6]" />
         <p className="text-sm text-[#2D3748]/70 font-medium">
            All our transport partners go through a specialized "Empathy Certification" program to ensure they handle every situation with the highest degree of respect.
         </p>
      </div>
    </div>
  );
};
