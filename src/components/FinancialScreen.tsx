import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wallet, FileText, Globe, HeartHandshake, ChevronRight, CheckCircle2, 
  MapPin, Clock, Info, ShieldCheck, Download, Plus, Search,
  TrendingUp, CreditCard, Landmark, AlertCircle, ArrowLeft
} from 'lucide-react';
import { mockSchemes } from '../data';

export const FinancialScreen: React.FC = () => {
  const [profileSetup, setProfileSetup] = useState(false);
  const [activeClaim, setActiveClaim] = useState<string | null>(null);

  const claimSteps = [
    { title: 'Identity Verification', status: 'completed', desc: 'Aadhar and PAN verified.' },
    { title: 'Document Submission', status: 'current', desc: 'Hospital death summary pending.' },
    { title: 'Nominee Verification', status: 'pending', desc: 'Bank field visit scheduled.' },
    { title: 'Final Approval', status: 'pending', desc: 'Bank manager sign-off.' }
  ];

  return (
    <div className="animate-fade-in-up max-w-7xl mx-auto px-4 py-8">
      {!profileSetup ? (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-soft border border-gray-100">
           <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Wallet size={32} />
              </div>
              <h1 className="text-3xl font-display font-bold text-text-main mb-3">Navigate Financial & Legal Processes</h1>
              <p className="text-text-muted">Set up your profile to receive a personalized assistance plan for claims and schemes.</p>
           </div>
           
           <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Your Role in the Family</label>
                    <select className="w-full bg-surface border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer appearance-none">
                       <option>Spouse</option>
                       <option>Child (Son/Daughter)</option>
                       <option>Parent</option>
                       <option>Sibling</option>
                       <option>Other Relative</option>
                    </select>
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Employment Type of Deceased</label>
                    <select className="w-full bg-surface border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer appearance-none">
                       <option>Private Sector</option>
                       <option>Government Employee</option>
                       <option>Self-Employed</option>
                       <option>Retired / Pensioner</option>
                    </select>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Age of Deceased</label>
                    <input type="number" placeholder="Years" className="w-full bg-surface border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none" />
                 </div>
                 <div className="space-y-1.5 flex flex-col justify-end pb-1">
                    <label className="flex items-center gap-3 cursor-pointer p-4 bg-surface rounded-xl hover:bg-surface-hover transition-colors">
                       <input type="checkbox" className="w-5 h-5 accent-primary" />
                       <span className="text-sm font-medium text-text-muted">Has Nominee Registered</span>
                    </label>
                 </div>
              </div>

              <button 
                onClick={() => setProfileSetup(true)}
                className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-xl hover:bg-primary/90 transition-all active:scale-95 text-lg mt-4"
              >
                Generate Assistance Plan
              </button>
           </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[70vh]">
          {/* Main Dashboard Area */}
          <div className="flex-1 space-y-8">
             <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-display font-bold text-text-main mb-1">Financial & Legal Dashboard</h1>
                  <p className="text-sm text-text-muted font-medium opacity-70">Personalized guidance based on your profile.</p>
                </div>
                {activeClaim && (
                  <button 
                    onClick={() => setActiveClaim(null)}
                    className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-4 py-2 rounded-xl"
                  >
                    <ArrowLeft size={16} /> Back to Overview
                  </button>
                )}
             </div>

             {activeClaim ? (
               <div className="space-y-8">
                  {/* Claim Tracker Section */}
                  <div className="bg-white p-8 lg:p-12 rounded-[40px] border border-gray-100 shadow-soft">
                     <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                           <TrendingUp size={28} />
                        </div>
                        <div>
                           <h2 className="text-2xl font-display font-bold text-text-main">{activeClaim} Tracker</h2>
                           <p className="text-text-muted text-sm">Follow these 4 steps to complete your claim.</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                        <div className="absolute top-[26px] left-8 right-8 h-[2px] bg-gray-100 hidden md:block"></div>
                        {claimSteps.map((step, i) => (
                           <div key={i} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 relative shadow-sm border-4 border-white ${
                                 step.status === 'completed' ? 'bg-green-500 text-white' :
                                 step.status === 'current' ? 'bg-primary text-white animate-pulse' :
                                 'bg-gray-100 text-text-light'
                              }`}>
                                 {step.status === 'completed' ? <CheckCircle2 size={24} /> : <span className="font-bold">{i + 1}</span>}
                              </div>
                              <div className="md:mt-4 md:text-center">
                                 <div className={`text-xs font-black uppercase tracking-widest leading-none mb-2 ${
                                    step.status === 'completed' ? 'text-green-600' :
                                    step.status === 'current' ? 'text-primary' :
                                    'text-text-light'
                                 }`}>
                                    {step.status.replace(/^./, str => str.toUpperCase())}
                                 </div>
                                 <div className="text-sm font-bold text-text-main mb-1">{step.title}</div>
                                 <div className="text-[10px] text-text-muted max-w-[120px] leading-relaxed">{step.desc}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Document Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-soft">
                        <h3 className="text-lg font-bold text-text-main mb-6 flex items-center gap-2">
                           <FileText size={20} className="text-primary" /> Required Documents
                        </h3>
                        <div className="space-y-3">
                           {[
                              { n: 'Original Death Certificate', s: 'Verified', v: true },
                              { n: 'Succession Certificate', s: 'Pending Upload', v: false },
                              { n: 'Nominee Identity Proof', s: 'Aadhar Verified', v: true },
                              { n: 'Bank Passbook Copy', s: 'Scan required', v: false },
                           ].map((doc, idx) => (
                              <div key={idx} className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-gray-50 hover:bg-surface-hover transition-colors">
                                 <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${doc.v ? 'bg-green-100 border-green-500 text-green-600' : 'bg-white border-gray-200'}`}>
                                       {doc.v && <CheckCircle2 size={12} />}
                                    </div>
                                    <span className={`text-sm font-medium ${doc.v ? 'text-text-main' : 'text-text-muted'}`}>{doc.n}</span>
                                 </div>
                                 <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${doc.v ? 'bg-green-600 text-white' : 'bg-amber-100 text-amber-700'}`}>{doc.s}</span>
                              </div>
                           ))}
                        </div>
                        <button className="w-full mt-6 py-4 border-2 border-dashed border-primary/20 text-primary font-bold rounded-2xl hover:bg-surface transition-all flex items-center justify-center gap-2 text-sm">
                           <Plus size={18} /> Upload More Documents
                        </button>
                     </div>

                     <div className="bg-surface/50 p-8 rounded-[40px] border border-gray-100 flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-primary mb-6">
                           <ShieldCheck size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-text-main mb-2">Legal Verification</h4>
                        <p className="text-sm text-text-muted mb-8 leading-relaxed">Your documents are being reviewed by our legal team to ensure a 100% claim success rate.</p>
                        <button className="px-8 py-3 bg-white text-primary font-bold rounded-xl shadow-sm hover:shadow-md transition-all text-xs border border-gray-100">
                           Contact Legal Expert
                        </button>
                     </div>
                  </div>
               </div>
             ) : (
               <>
                 {/* Overview Cards */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {[
                      { title: 'Pension Claims', status: 'Next appointment in 2 days', progress: 40, icon: Landmark, color: 'text-blue-600 bg-blue-50' },
                      { title: 'EPF Claim', status: 'Drafting your application', progress: 10, icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
                      { title: 'Insurance', status: 'Active coverage identified', progress: 60, icon: ShieldCheck, color: 'text-green-600 bg-green-50' },
                    ].map((card, i) => (
                      <div 
                        key={i} 
                        onClick={() => setActiveClaim(card.title)}
                        className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-soft hover:shadow-premium hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
                      >
                         <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm relative z-10`}>
                            <card.icon size={28} />
                         </div>
                         <h3 className="font-bold text-text-main text-2xl mb-1">{card.title}</h3>
                         <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-8">
                            {card.progress}% Completed
                         </p>
                         <div className="flex items-center gap-4 group-hover:gap-6 transition-all">
                            <div className="flex-1 h-1.5 bg-ivory rounded-full overflow-hidden">
                               <div className="h-full bg-primary transition-all rounded-full" style={{ width: `${card.progress}%` }}></div>
                            </div>
                            <span className="text-[10px] font-black text-text-light uppercase tracking-widest">Process</span>
                         </div>
                      </div>
                    ))}
                 </div>

                 {/* Personal Assistance Progress */}
                 <div className="bg-white p-8 lg:p-12 rounded-[40px] border border-gray-100 shadow-soft mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                       <div>
                          <h2 className="text-2xl font-display font-bold text-text-main mb-2">Your Assistance Progress</h2>
                          <p className="text-text-muted text-sm max-w-md">We are helping you navigate through legal documentation and financial claims with priority.</p>
                       </div>
                       <div className="flex items-center gap-4 px-6 py-3 bg-surface rounded-2xl border border-gray-50">
                          <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin-slow"></div>
                          <div className="text-left">
                             <div className="text-[10px] font-black uppercase text-text-light tracking-widest leading-none mb-1">Status</div>
                             <div className="text-sm font-bold text-primary">Active Analysis</div>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                       <div className="space-y-6">
                          {[
                            { label: 'Document Verification', val: 'Verified (8/12)', p: 66 },
                            { label: 'Government Eligibility', val: 'Matched (4 schemes)', p: 100 },
                            { label: 'Pending Notifications', val: '3 items need attention', p: 30 },
                          ].map((bar, i) => (
                            <div key={i} className="space-y-2">
                               <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                  <span className="text-text-muted">{bar.label}</span>
                                  <span className={bar.p === 100 ? 'text-green-600' : 'text-primary'}>{bar.val}</span>
                               </div>
                               <div className="h-3 bg-gray-50 rounded-full overflow-hidden">
                                  <div className={`h-full opacity-80 rounded-full transition-all duration-1000 ${bar.p === 100 ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${bar.p}%` }}></div>
                               </div>
                            </div>
                          ))}
                       </div>
                       
                       <div className="flex justify-center flex-col items-center p-8 bg-surface/50 rounded-[32px] border border-gray-50">
                          <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                               <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                               <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="502.6" strokeDashoffset={502.6 * (1 - 0.58)} strokeLinecap="round" className="text-primary transition-all duration-1000" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                               <span className="text-4xl font-display font-bold text-text-main">58%</span>
                               <span className="text-[10px] font-black text-text-light uppercase tracking-widest mt-1">Total Completion</span>
                            </div>
                          </div>
                          <p className="text-xs text-text-muted mt-6 font-medium text-center">Estimation based on current profile details provided.</p>
                       </div>
                    </div>
                 </div>

                 {/* Gov Schemes Section */}
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <h2 className="text-xl font-display font-bold text-text-main">Eligible Government Schemes</h2>
                       <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">View All <ChevronRight size={16} /></button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {mockSchemes.map((scheme) => (
                        <div key={scheme.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/20 transition-all">
                           <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                 <h4 className="font-bold text-text-main">{scheme.name}</h4>
                                 <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded">Likely Eligible</span>
                              </div>
                              <p className="text-xs text-text-muted font-bold mb-1">{scheme.dept}</p>
                              <p className="text-sm text-text-muted leading-relaxed">{scheme.eligibility}</p>
                           </div>
                           <div className="text-center md:text-right flex-shrink-0">
                              <div className="text-lg font-display font-bold text-primary mb-1">{scheme.benefits}</div>
                              <div className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-4">{scheme.docsCount} Documents Required</div>
                              <button className="px-6 py-2 bg-primary/5 text-primary font-bold rounded-xl hover:bg-primary/10 transition-all text-sm">View Steps</button>
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
               </>
             )}
          </div>

          {/* Sidebar Area - AI Assistant */}
          <div className="w-full lg:w-80 space-y-6">
             <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col h-[600px]">
                <div className="p-6 bg-primary text-white">
                   <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                         <HeartHandshake size={20} />
                      </div>
                      <h3 className="font-bold">Guidance Assistant</h3>
                   </div>
                   <p className="text-[10px] text-white/70 font-medium tracking-wide uppercase">Support Available 24/7</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface/30">
                   <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-text-muted leading-relaxed border border-gray-50">
                      Hello! I can help you with EPF claims, pension processes, or bank nominee transfers. What would you like to know?
                   </div>
                </div>
                <div className="p-4 border-t border-gray-100 bg-white">
                   <div className="flex flex-wrap gap-2 mb-4">
                      {["Claim EPF?", "Widow pension?", "Nominee transfer?"].map(chip => (
                        <button key={chip} className="px-3 py-1.5 bg-surface hover:bg-surface-hover text-[10px] font-bold text-text-muted rounded-full transition-colors">
                           {chip}
                        </button>
                      ))}
                   </div>
                   <div className="flex gap-2">
                      <input type="text" placeholder="Ask anything..." className="flex-1 bg-surface border-none rounded-xl p-3 text-xs focus:ring-1 focus:ring-primary outline-none" />
                      <button className="bg-primary text-white p-3 rounded-xl shadow-lg hover:bg-primary/90 transition-all active:scale-95">
                         <ChevronRight size={18} />
                      </button>
                   </div>
                </div>
             </div>

             <div className="bg-surface rounded-3xl p-6 border border-gray-100 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                      <Clock size={18} />
                   </div>
                   <h4 className="font-bold text-sm">Next Deadline</h4>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-indigo-50 shadow-sm relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                   <div className="text-[10px] font-black text-text-light uppercase tracking-widest mb-1">Death Certificate</div>
                   <div className="font-bold text-text-main text-sm mb-1">Municipality Approval</div>
                   <div className="text-[10px] font-bold text-indigo-600">Expected by June 20th</div>
                </div>
                <button className="w-full text-center text-xs font-bold text-primary hover:underline">View full calendar</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
