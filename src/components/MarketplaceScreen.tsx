import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Filter, Phone, Star, ShieldCheck, 
  ChevronRight, ArrowLeft, ShoppingCart, Info, Clock, AlertCircle, Heart, Loader2, Users,
  CreditCard, X 
} from 'lucide-react';
import { marketplaceCategories, mockProducts } from '../data';

export const MarketplaceScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState<'idle' | 'booking' | 'success'>('idle');
  const [filters, setFilters] = useState({
    religion: 'All',
    location: 'Hyderabad',
    priceRange: 'All',
    verifiedOnly: false
  });

  const filteredProducts = mockProducts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesReligion = filters.religion === 'All' || p.religion === 'All' || p.religion === filters.religion;
    const matchesVerified = !filters.verifiedOnly || p.isVerified;
    
    let matchesPrice = true;
    if (filters.priceRange === 'Under ₹1,000') matchesPrice = p.price < 1000;
    else if (filters.priceRange === '₹1,000 - ₹5,000') matchesPrice = p.price >= 1000 && p.price <= 5000;
    else if (filters.priceRange === '₹5,000+') matchesPrice = p.price > 5000;

    return matchesCategory && matchesSearch && matchesReligion && matchesVerified && matchesPrice;
  });

  const product = showDetail ? mockProducts.find(p => p.id === showDetail) : null;

  const handleBook = () => {
    setBookingStep('booking');
    setTimeout(() => {
      setBookingStep('success');
    }, 1500);
  };

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
           <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-2">
                 <ShieldCheck size={14} /> Expert Verified Platform
              </div>
              <h1 className="text-5xl font-display font-medium text-text-main tracking-tight leading-[1] mb-2">
                Essential funeral <br />
                <span className="italic text-primary-dark">services & kits.</span>
              </h1>
              <p className="text-text-muted text-lg font-medium opacity-80 max-w-lg">
                Verified high-quality resources to help you organize with dignity and speed. Trusted by over 500+ families this month.
              </p>
           </div>
           
           <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
              <div className="relative group flex-1 lg:w-96">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-light group-focus-within:text-primary transition-colors" size={20} />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search funeral vans, priests, kits..." 
                   className="w-full bg-white border border-gray-100 rounded-[32px] p-6 pl-16 text-base font-medium focus:ring-8 ring-primary/5 outline-none shadow-premium transition-all"
                 />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-10 py-6 rounded-[32px] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-premium ${
                  showFilters ? 'bg-primary text-white scale-95' : 'bg-white text-text-muted hover:bg-surface border border-gray-50'
                }`}
              >
                 <Filter size={20} /> {showFilters ? 'Hide Filters' : 'Adjust Filters'}
              </button>
           </div>
        </div>

        {/* Filters and Categories */}
        <div className="space-y-8 mb-16">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar flex-1">
              {['All', ...marketplaceCategories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                    ? 'bg-primary text-white shadow-premium' 
                    : 'bg-white text-text-muted border border-gray-100 hover:border-primary/40 shadow-soft'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-10 bg-white border border-gray-100 rounded-[40px] shadow-premium mb-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-light px-1 flex items-center gap-2">
                       <CreditCard size={12} /> Price Range
                    </label>
                    <select 
                      value={filters.priceRange}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                      className="w-full bg-ivory p-5 rounded-2xl text-sm font-bold outline-none cursor-pointer text-text-main border border-transparent hover:border-primary/20 transition-all focus:bg-white"
                    >
                      <option value="All">Any Price</option>
                      <option>Under ₹1,000</option>
                      <option>₹1,000 - ₹5,000</option>
                      <option>₹5,000+</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-light px-1 flex items-center gap-2">
                       <MapPin size={12} /> Religions
                    </label>
                    <select 
                      value={filters.religion}
                      onChange={(e) => setFilters(prev => ({ ...prev, religion: e.target.value }))}
                      className="w-full bg-ivory p-5 rounded-2xl text-sm font-bold outline-none cursor-pointer text-text-main border border-transparent hover:border-primary/20 transition-all focus:bg-white"
                    >
                      <option value="All">Any Religion</option>
                      {['Hindu', 'Muslim', 'Christian', 'Sikh'].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div className="md:col-span-2 flex flex-col justify-end">
                    <div className="flex items-center justify-between p-5 bg-ivory rounded-2xl border border-transparent select-none group cursor-pointer hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                           <ShieldCheck size={20} />
                        </div>
                        <div>
                           <div className="text-xs font-bold text-text-main">Verified Partners</div>
                           <div className="text-[10px] font-medium text-text-light">Only show top-rated vendors</div>
                        </div>
                      </div>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={filters.verifiedOnly}
                          onChange={(e) => setFilters(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
                          className="peer sr-only"
                          id="verified-only-toggle" 
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-primary transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                      </div>
                    </div>
                  </div>

                  {(searchQuery || selectedCategory !== 'All' || filters.religion !== 'All' || filters.priceRange !== 'All' || filters.verifiedOnly) && (
                     <div className="md:col-span-4 flex justify-center pt-2">
                        <button 
                           onClick={() => {
                             setSearchQuery('');
                             setSelectedCategory('All');
                             setFilters({ religion: 'All', location: 'Hyderabad', priceRange: 'All', verifiedOnly: false });
                           }}
                           className="text-[10px] font-black uppercase tracking-widest text-text-light hover:text-primary transition-colors flex items-center gap-2"
                        >
                           <X size={14} /> Reset all filters
                        </button>
                     </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Urgent Service Banner */}
        <div className="bg-coral-50 border border-coral-100 rounded-[40px] p-8 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-premium">
           <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-coral-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-coral-100 animate-red-pulse">
                 <AlertCircle size={32} />
              </div>
              <div className="space-y-1">
                 <h3 className="text-2xl font-display font-bold text-coral-600">Emergency support required?</h3>
                 <p className="text-base text-text-muted font-medium opacity-80">Immediate transport, body preservation and ritual kits delivered within 45 mins - 24/7 service.</p>
              </div>
           </div>
           <button className="whitespace-nowrap px-12 py-5 bg-coral-600 text-white font-black uppercase tracking-widest text-[12px] rounded-2xl shadow-xl hover:bg-coral-500 transition-all active:scale-95 flex items-center gap-3">
              <Phone size={20} /> Request Concierge
           </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div 
                key={p.id} 
                className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-soft group hover:shadow-premium hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                onClick={() => setShowDetail(p.id)}
              >
                <div className="h-64 bg-surface relative overflow-hidden">
                  <div className="absolute top-6 left-6 z-10 flex gap-2">
                     <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] backdrop-blur shadow-premium ${p.badge === 'Emergency' ? 'bg-coral-600 text-white' : 'bg-primary text-white'}`}>
                        {p.badge === 'Emergency' ? 'Priority Service' : 'Verified Vendor'}
                     </span>
                  </div>
                  <div className="w-full h-full flex items-center justify-center text-gray-200 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100">
                     {p.category === 'Funeral Van' && <Phone size={96} strokeWidth={1} />}
                     {p.category === 'Freezer Box' && <Clock size={96} strokeWidth={1} />}
                     {p.category === 'Flowers' && <Heart size={96} strokeWidth={1} />}
                     {p.category === 'Ritual Kits' && <ShoppingCart size={96} strokeWidth={1} />}
                     {p.category === 'Priests' && <Users size={96} strokeWidth={1} />}
                     {p.category === 'Body Carriers' && <ShieldCheck size={96} strokeWidth={1} />}
                     {!['Funeral Van', 'Freezer Box', 'Flowers', 'Ritual Kits', 'Priests', 'Body Carriers'].includes(p.category) && <ShoppingCart size={96} strokeWidth={1} />}
                  </div>
                </div>
                <div className="p-8">
                   <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                         <div className="text-[10px] font-black uppercase tracking-widest text-primary-dark">{p.category}</div>
                         <h4 className="text-2xl font-display font-bold text-text-main line-clamp-1">{p.name}</h4>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-xl text-xs font-black">
                         <Star size={14} fill="currentColor" /> {p.rating}
                      </div>
                   </div>
                   
                   <p className="text-sm text-text-muted font-medium mb-8 opacity-70 leading-relaxed">{p.desc}</p>
                   
                   <div className="flex items-center gap-3 p-4 bg-ivory rounded-2xl mb-8 border border-gray-50">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xs font-black text-primary border border-gray-50 shadow-sm">{p.vendor[0]}</div>
                      <div>
                        <div className="text-xs font-bold text-text-main flex items-center gap-2">
                           {p.vendor} {p.isVerified && <ShieldCheck size={14} className="text-primary" />}
                        </div>
                        <div className="text-[10px] font-black text-green-600 uppercase tracking-widest">Active Now</div>
                      </div>
                      <span className="ml-auto text-[10px] font-bold text-text-light opacity-60">Hyderabad</span>
                   </div>
  
                   <div className="flex items-center justify-between pt-2">
                      <div className="space-y-0.5">
                         <div className="text-[10px] font-black uppercase tracking-widest text-text-light opacity-50">Starting From</div>
                         <div className="text-3xl font-display font-medium text-text-main tracking-tight">₹{p.price.toLocaleString()}</div>
                      </div>
                      <button className="h-16 w-16 bg-primary text-white rounded-2xl shadow-xl hover:bg-primary-dark transition-all active:scale-90 flex items-center justify-center">
                         <ShoppingCart size={24} />
                      </button>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-display font-bold text-text-main mb-2">No services found</h3>
              <p className="text-text-muted text-sm max-w-xs mx-auto">Try adjusting your filters or search query to find relevant funeral services.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setFilters({ religion: 'All', location: 'Hyderabad', priceRange: 'All', verifiedOnly: false });
                }}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail Popup */}
      <AnimatePresence>
        {showDetail !== null && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-text-main/60 backdrop-blur-md" 
              onClick={() => { setShowDetail(null); setBookingStep('idle'); }}
            ></motion.div>
            
            <motion.div 
               initial={{ opacity: 0, y: 100, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 100, scale: 0.95 }}
               className="bg-white rounded-t-[40px] sm:rounded-[40px] shadow-2xl relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
               {bookingStep === 'success' ? (
                 <div className="p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                    <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce-slow shadow-sm">
                       <ShieldCheck size={48} />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-text-main mb-4">Booking Confirmed</h2>
                    <p className="text-text-muted mb-10 max-w-sm">We've notified {product?.vendor}. They will contact you within 10 minutes to coordinate.</p>
                    
                    <div className="w-full bg-surface rounded-3xl p-6 text-left border border-gray-50 mb-10">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-text-light uppercase tracking-widest">Order ID</span>
                          <span className="text-sm font-mono font-bold text-text-main">#ANT-928374</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-text-light uppercase tracking-widest">Estimated Arrival</span>
                          <span className="text-sm font-bold text-primary">25 - 40 Mins</span>
                       </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                       <button 
                         onClick={() => { setShowDetail(null); setBookingStep('idle'); }}
                         className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:bg-primary/90 transition-all active:scale-95"
                       >
                         Done
                       </button>
                       <button 
                         className="flex-1 py-4 border-2 border-primary/20 text-primary font-bold rounded-2xl hover:bg-surface transition-all active:scale-95 flex items-center justify-center gap-2"
                         onClick={() => { setShowDetail(null); setBookingStep('idle'); window.dispatchEvent(new CustomEvent('navigate-to-actions')); }}
                       >
                         View in Status <ChevronRight size={18} />
                       </button>
                    </div>
                 </div>
               ) : (
                 <>
                   <div className="h-64 sm:h-80 bg-surface relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                         {product?.name.includes('Van') && <Phone size={120} opacity={0.1} />}
                         {product?.name.includes('Freezer') && <Clock size={120} opacity={0.1} />}
                      </div>
                      <button 
                        onClick={() => setShowDetail(null)}
                        className="absolute top-6 right-6 bg-white/90 backdrop-blur shadow-xl p-3 rounded-2xl z-10 hover:scale-110 transition-transform"
                      >
                         <ArrowLeft size={24} className="rotate-90 sm:rotate-0" />
                      </button>
                      <div className="absolute bottom-6 left-6 flex gap-2">
                         <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-bold text-primary shadow-sm flex items-center gap-2">
                            <ShieldCheck size={14} /> Verified Vendor
                         </span>
                      </div>
                   </div>
                   
                   <div className="p-8 sm:p-10 overflow-y-auto no-scrollbar">
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <h2 className="text-3xl font-display font-bold text-text-main mb-2 tracking-tight">{product?.name}</h2>
                            <div className="flex items-center gap-3">
                               <div className="flex text-amber-400">
                                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i <= Math.floor(product?.rating || 0) ? "currentColor" : "none"} />)}
                               </div>
                               <span className="text-sm font-bold text-text-light">({product?.rating} • {product?.reviews} Reviews)</span>
                            </div>
                         </div>
                         <div className="text-3xl font-display font-bold text-primary">₹{product?.price.toLocaleString()}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-10">
                         <div className="p-5 bg-surface/50 border border-gray-50 rounded-3xl">
                            <div className="text-[10px] font-black text-text-light uppercase tracking-widest mb-2">Delivery/Wait Time</div>
                            <div className="text-base font-bold text-text-main flex items-center gap-2">
                              <Clock size={18} className="text-primary" /> 30 - 45 mins
                            </div>
                         </div>
                         <div className="p-5 bg-surface/50 border border-gray-50 rounded-3xl">
                            <div className="text-[10px] font-black text-text-light uppercase tracking-widest mb-2">Availability</div>
                            <div className="text-base font-bold text-text-main flex items-center gap-2">
                              <ShieldCheck size={18} className="text-green-500" /> Instant Book
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <div>
                            <h4 className="font-bold text-text-main mb-3 flex items-center gap-2">
                               <Info size={18} className="text-primary" /> Service Description
                            </h4>
                            {(product as any)?.culturalNote && (
                              <div className="mb-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 items-start">
                                <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-800 font-medium font-sans leading-relaxed">
                                  <strong>Cultural Note:</strong> {(product as any).culturalNote}
                                </p>
                              </div>
                            )}
                            <p className="text-sm text-text-muted leading-relaxed opacity-80">
                               {product?.desc}. Professional service provided by {product?.vendor}. All staff are trained in compassionate care. Includes priority coordination and 24/7 support.
                            </p>
                         </div>
                         
                         <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center text-lg font-black text-primary border border-gray-100">
                                  {product?.vendor[0]}
                               </div>
                               <div>
                                  <div className="font-bold text-text-main">{product?.vendor}</div>
                                  <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Active Now</div>
                               </div>
                            </div>
                            <button className="p-3 bg-surface hover:bg-gray-100 rounded-2xl transition-colors">
                               <Phone size={20} className="text-primary" />
                            </button>
                         </div>

                         <button 
                           onClick={handleBook}
                           disabled={bookingStep === 'booking'}
                           className="w-full py-5 bg-primary text-white font-bold rounded-[24px] shadow-2xl hover:bg-primary/90 transition-all active:scale-95 text-xl flex items-center justify-center gap-3"
                         >
                            {bookingStep === 'booking' ? (
                               <>
                                  <Loader2 size={24} className="animate-spin" /> Processing...
                               </>
                            ) : (
                               <>Book Now & Pay ₹{product?.price.toLocaleString()}</>
                            )}
                         </button>
                      </div>
                   </div>
                 </>
               )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
