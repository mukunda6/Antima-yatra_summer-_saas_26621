import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { HospitalStep, HOSPITAL_STEPS, HospitalData } from './HospitalTypes';
import { StepConfirmation } from './StepConfirmation';
import { StepCommunication } from './StepCommunication';
import { StepDocuments } from './StepDocuments';
import { StepTransportation } from './StepTransportation';
import { StepMortuary } from './StepMortuary';
import { StepPreparation } from './StepPreparation';
import { StepEmergency } from './StepEmergency';
import { SupportDashboard } from './SupportDashboard';

export const HospitalScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<HospitalStep>('confirmation');
  const [data, setData] = useState<HospitalData>({
    hospitalName: '',
    patientName: '',
    dateTime: '',
    causeCategory: '',
    attendingDoctor: '',
    hospitalContact: '',
  });

  const currentStepIndex = HOSPITAL_STEPS.findIndex(s => s.id === currentStep);
  
  const handleNext = () => {
    if (currentStepIndex < HOSPITAL_STEPS.length - 1) {
      setCurrentStep(HOSPITAL_STEPS[currentStepIndex + 1].id);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(HOSPITAL_STEPS[currentStepIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-8 md:px-12 md:py-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-[10px] font-black text-[#6E8FB6] uppercase tracking-[0.3em] mb-3">
              Hospital & Emergency Coordination
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-[#2D3748] tracking-tight">
              {HOSPITAL_STEPS[currentStepIndex].title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-[#EEF1F4] px-6 py-4 rounded-2xl">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#6E8FB6] shadow-sm">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#2D3748]/40 uppercase tracking-widest">Progress</div>
              <div className="text-sm font-bold text-[#2D3748]">
                Step {currentStepIndex + 1} of {HOSPITAL_STEPS.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Path */}
      <div className="max-w-[1200px] mx-auto px-6 mt-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 pb-4">
          {HOSPITAL_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = idx < currentStepIndex;
            
            return (
              <React.Fragment key={step.id}>
                <button 
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-3 whitespace-nowrap px-5 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white shadow-premium border border-gray-50 text-[#2D3748]' 
                      : isCompleted
                      ? 'text-[#6E8FB6]'
                      : 'text-gray-400 opacity-60'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-[#6E8FB6] text-white' : 'bg-gray-100'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">{step.title}</span>
                </button>
                {idx < HOSPITAL_STEPS.length - 1 && (
                  <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1200px] mx-auto px-6 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[40px] shadow-soft border border-gray-50 overflow-hidden"
          >
            <div className="p-8 md:p-16">
              {currentStep === 'confirmation' && <StepConfirmation data={data} setData={setData} onNext={handleNext} />}
              {currentStep === 'communication' && <StepCommunication onNext={handleNext} />}
              {currentStep === 'documents' && <StepDocuments onNext={handleNext} />}
              {currentStep === 'transportation' && <StepTransportation onNext={handleNext} />}
              {currentStep === 'mortuary' && <StepMortuary onNext={handleNext} />}
              {currentStep === 'ceremony' && <StepPreparation onNext={handleNext} />}
              {currentStep === 'emergency' && <StepEmergency onNext={handleNext} />}
              {currentStep === 'dashboard' && <SupportDashboard />}
            </div>

            {/* Bottom Actions */}
            <div className="px-8 py-6 md:px-16 md:py-10 bg-[#F7F8FA] border-t border-gray-100 flex items-center justify-between">
              <button 
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-opacity ${
                  currentStepIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-[#6E8FB6]'
                }`}
              >
                <ChevronLeft size={16} />
                Back
              </button>

              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 font-bold text-[#6E8FB6] text-xs uppercase tracking-widest hover:opacity-80">
                  <HelpCircle size={16} />
                  Get Assistance
                </button>
                {currentStep !== 'dashboard' && (
                  <button 
                    onClick={handleNext}
                    className="bg-[#2D3748] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Informational Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-[#EEF1F4] p-8 rounded-[32px] flex items-start gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6E8FB6] shadow-sm flex-shrink-0">
                 <ShieldAlert size={24} />
              </div>
              <div>
                 <h3 className="text-lg font-display font-medium text-[#2D3748] mb-2">Emergency Assistance</h3>
                 <p className="text-sm text-[#2D3748]/60 leading-relaxed font-medium">
                    Our 24/7 dedicated care team is available to help you naviate hospital formalities and coordinate support.
                 </p>
                 <button className="mt-4 text-xs font-black text-[#6E8FB6] uppercase tracking-widest">Speak to a coordinator</button>
              </div>
           </div>
           
           <div className="bg-[#F1F3F5] p-8 rounded-[32px] flex items-start gap-6 border-2 border-white">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#D9A86C] shadow-sm flex-shrink-0">
                 <Clock size={24} />
              </div>
              <div>
                 <h3 className="text-lg font-display font-medium text-[#2D3748] mb-2">Real-time Updates</h3>
                 <p className="text-sm text-[#2D3748]/60 leading-relaxed font-medium">
                    Track body release status, document approvals and transportation arrival times in one central space.
                 </p>
                 <button className="mt-4 text-xs font-black text-[#6E8FB6] uppercase tracking-widest">View full dashboard</button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};
