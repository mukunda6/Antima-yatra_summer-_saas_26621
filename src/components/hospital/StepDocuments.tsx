import React, { useState } from 'react';
import { FileText, CheckCircle2, Circle, Download, Upload, Info, AlertCircle } from 'lucide-react';
import { DocumentItem } from './HospitalTypes';

export const StepDocuments: React.FC<{ onNext: () => void }> = () => {
  const [docs, setDocs] = useState<DocumentItem[]>([
    { id: '1', name: 'Death Certificate', description: 'Issued by hospital or municipal authority.', isCompleted: false, isRequired: true },
    { id: '2', name: 'Aadhaar Card', description: 'Original ID of the deceased person.', isCompleted: true, isRequired: true },
    { id: '3', name: 'Hospital Discharge Summary', description: 'Final medical report from attending doctor.', isCompleted: false, isRequired: true },
    { id: '4', name: 'Insurance Documents', description: 'Policy details for claim initiation.', isCompleted: false, isRequired: false },
    { id: '5', name: 'Government ID', description: 'Pan Card or Voter ID as secondary proof.', isCompleted: false, isRequired: false },
    { id: '6', name: 'Cremation/Burial Permission', description: 'LOK-Sewa or local authority permit.', isCompleted: false, isRequired: true },
  ]);

  const toggleDoc = (id: string) => {
    setDocs(docs.map(doc => doc.id === id ? { ...doc, isCompleted: !doc.isCompleted } : doc));
  };

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF1F4] text-[#6E8FB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white">
          <FileText size={14} /> Documentation Guidance
        </div>
        <h2 className="text-3xl font-display font-medium text-[#2D3748] mb-4">Required Documents</h2>
        <p className="text-lg text-[#2D3748]/60 font-medium leading-relaxed">
          Managing formalities involves specific paperwork. Our checklist helps you track what's collected and what's pending.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {docs.map(doc => (
            <div 
              key={doc.id}
              onClick={() => toggleDoc(doc.id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group ${
                doc.isCompleted 
                  ? 'bg-white border-[#6E8FB6]/20 shadow-soft' 
                  : 'bg-[#F7F8FA] border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  doc.isCompleted ? 'bg-[#6E8FB6] text-white' : 'bg-white text-gray-300'
                }`}>
                  {doc.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${doc.isCompleted ? 'text-[#2D3748]' : 'text-gray-500'}`}>
                      {doc.name}
                    </span>
                    {doc.isRequired && (
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#D9A86C] bg-[#D9A86C]/10 px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-medium mt-1">{doc.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 bg-white rounded-lg text-gray-400 hover:text-[#6E8FB6] shadow-sm">
                    <Download size={14} />
                 </button>
                 <button className="p-2 bg-white rounded-lg text-gray-400 hover:text-[#6E8FB6] shadow-sm">
                    <Upload size={14} />
                 </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
           <div className="bg-[#6E8FB6]/5 p-8 rounded-[40px] border border-[#6E8FB6]/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-[#6E8FB6]/10">
                 <Info size={120} />
              </div>
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6E8FB6] shadow-sm mb-6">
                    <Info size={24} />
                 </div>
                 <h3 className="text-xl font-display font-medium text-[#2D3748] mb-4">Guidance Notes</h3>
                 <div className="space-y-4">
                    <p className="text-sm text-[#2D3748]/60 leading-relaxed font-bold">
                       • Ensure you have at least 5 photocopies of the Aadhaar card.
                    </p>
                    <p className="text-sm text-[#2D3748]/60 leading-relaxed font-bold">
                       • The discharge summary must be signed and stamped by the hospital.
                    </p>
                    <p className="text-sm text-[#2D3748]/60 leading-relaxed font-bold">
                       • Digital death confirmation is accepted for preliminary bookings.
                    </p>
                 </div>
                 <button className="mt-8 bg-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#2D3748] shadow-sm">
                    View FAQ
                 </button>
              </div>
           </div>

           <div className="bg-[#D9A86C]/5 p-8 rounded-[40px] border border-[#D9A86C]/10 flex items-start gap-6">
              <AlertCircle size={24} className="text-[#D9A86C] flex-shrink-0" />
              <div>
                 <h4 className="text-sm font-bold text-[#2D3748] mb-1">Missing Documents?</h4>
                 <p className="text-xs text-[#2D3748]/60 font-medium">If you are missing any required document, contact our support team to help you coordinate with the authorities.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
