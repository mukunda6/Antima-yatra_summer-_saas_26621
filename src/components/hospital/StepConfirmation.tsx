import React from 'react';
import { HospitalData } from './HospitalTypes';
import { Heart, Stethoscope, Phone, Calendar, User } from 'lucide-react';

interface Props {
  data: HospitalData;
  setData: (data: HospitalData) => void;
  onNext: () => void;
}

export const StepConfirmation: React.FC<Props> = ({ data, setData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF1F4] text-[#6E8FB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white">
          <Heart size={14} /> Compassionate Guidance
        </div>
        <h2 className="text-3xl font-display font-medium text-[#2D3748] mb-4">Immediate Next Steps</h2>
        <p className="text-lg text-[#2D3748]/60 font-medium leading-relaxed">
          We understand this is a difficult time. We are here to help guide your family through the next steps with respect and care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {/* Hospital Details */}
        <div className="space-y-8">
          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black text-[#2D3748]/40 uppercase tracking-widest mb-3 pl-1">
              <Stethoscope size={12} className="text-[#6E8FB6]" />
              Hospital Name
            </label>
            <input
              type="text"
              name="hospitalName"
              value={data.hospitalName}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="w-full bg-[#F7F8FA] border-none rounded-2xl p-5 text-[#2D3748] font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-[#6E8FB6]/20 transition-all"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black text-[#2D3748]/40 uppercase tracking-widest mb-3 pl-1">
              <User size={12} className="text-[#6E8FB6]" />
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={data.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              className="w-full bg-[#F7F8FA] border-none rounded-2xl p-5 text-[#2D3748] font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-[#6E8FB6]/20 transition-all"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black text-[#2D3748]/40 uppercase tracking-widest mb-3 pl-1">
              <Calendar size={12} className="text-[#6E8FB6]" />
              Date & Time (Approx)
            </label>
            <input
              type="datetime-local"
              name="dateTime"
              value={data.dateTime}
              onChange={handleChange}
              className="w-full bg-[#F7F8FA] border-none rounded-2xl p-5 text-[#2D3748] font-medium focus:ring-2 focus:ring-[#6E8FB6]/20 transition-all"
            />
          </div>
        </div>

        {/* Secondary Details */}
        <div className="space-y-8">
          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black text-[#2D3748]/40 uppercase tracking-widest mb-3 pl-1">
              Cause Category (Optional)
            </label>
            <select
              name="causeCategory"
              value={data.causeCategory}
              onChange={handleChange}
              className="w-full bg-[#F7F8FA] border-none rounded-2xl p-5 text-[#2D3748] font-medium focus:ring-2 focus:ring-[#6E8FB6]/20 transition-all appearance-none"
            >
              <option value="">Select category</option>
              <option value="natural">Natural Causes</option>
              <option value="accident">Accidental</option>
              <option value="other">Other / Medical Condition</option>
            </select>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black text-[#2D3748]/40 uppercase tracking-widest mb-3 pl-1">
              Attending Doctor
            </label>
            <input
              type="text"
              name="attendingDoctor"
              value={data.attendingDoctor}
              onChange={handleChange}
              placeholder="Doctor's name if known"
              className="w-full bg-[#F7F8FA] border-none rounded-2xl p-5 text-[#2D3748] font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-[#6E8FB6]/20 transition-all"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black text-[#2D3748]/40 uppercase tracking-widest mb-3 pl-1">
              <Phone size={12} className="text-[#6E8FB6]" />
              Hospital Contact
            </label>
            <input
              type="tel"
              name="hospitalContact"
              value={data.hospitalContact}
              onChange={handleChange}
              placeholder="Hospital phone number"
              className="w-full bg-[#F7F8FA] border-none rounded-2xl p-5 text-[#2D3748] font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-[#6E8FB6]/20 transition-all"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-[#6E8FB6]/5 p-8 rounded-[32px] border border-[#6E8FB6]/10">
          <p className="text-[#2D3748]/80 font-medium leading-relaxed italic text-center">
             "We are here to help guide your family through the next steps. Every detail matters, and we will move at your pace."
          </p>
      </div>
    </div>
  );
};
