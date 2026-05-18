import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface SelectionStepProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext?: () => void;
  isValid?: boolean;
  nextLabel?: string;
  showNext?: boolean;
  backLabel?: string;
  setupLabel?: string;
}

export const SelectionStep: React.FC<SelectionStepProps> = ({ 
  title, 
  subtitle, 
  children, 
  onBack, 
  onNext, 
  isValid = true, 
  nextLabel = "Continue",
  showNext = true,
  backLabel = "Back to previous",
  setupLabel = "Guidance Setup"
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-[48px] p-10 lg:p-14 shadow-premium border border-gray-100"
    >
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-4">{setupLabel}</div>
          <h2 className="text-3xl font-display font-medium text-text-main mb-4 tracking-tight">{title}</h2>
          <p className="text-text-muted text-base font-medium opacity-80">{subtitle}</p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black text-text-light uppercase tracking-widest hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} /> {backLabel}
        </button>
      </div>

      <div className="mb-12">
        {children}
      </div>

      {showNext && (
        <div className="flex justify-end pt-8 border-t border-gray-50">
          <motion.button 
            whileHover={isValid ? { scale: 1.05 } : {}}
            whileTap={isValid ? { scale: 0.95 } : {}}
            disabled={!isValid}
            onClick={onNext}
            className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 ${
              isValid ? 'bg-primary text-white shadow-premium hover:bg-primary-light' : 'bg-gray-100 text-text-light cursor-not-allowed'
            }`}
          >
            {nextLabel} <ChevronRight size={18} />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};
