import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  Users, 
  FileText, 
  Calendar,
  AlertCircle,
  ArrowUpRight,
  LayoutDashboard
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export const SupportDashboard: React.FC = () => {
  const stats = [
    { name: 'Docs', value: 3, total: 5, color: '#6E8FB6' },
    { name: 'Family', value: 8, total: 12, color: '#D4AF37' },
    { name: 'Rituals', value: 1, total: 6, color: '#2563EB' },
  ];

  const progressItems = [
    { icon: FileText, title: 'Medical Formalities', count: '3 of 5 completed', status: 'In-progress' },
    { icon: Users, title: 'Family Notified', count: '14 members notified', status: 'Complete' },
    { icon: Truck, title: 'Hearse Coordination', count: 'Arriving in 15 mins', status: 'Active' },
    { icon: Calendar, title: 'Ceremony Schedule', count: 'Pending selection', status: 'Action Required', color: 'amber' },
  ];

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF1F4] text-[#6E8FB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white">
          <LayoutDashboard size={14} /> Support Overview
        </div>
        <h2 className="text-3xl font-display font-medium text-[#2D3748] mb-4">Coordination Dashboard</h2>
        <p className="text-lg text-[#2D3748]/60 font-medium leading-relaxed">
          Monitor your progress across all administrative and ceremonial tasks. One central space for complete peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="md:col-span-2 bg-[#F7F8FA] p-8 rounded-[40px] border border-transparent shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black text-[#2D3748]/40 uppercase tracking-widest">Progress Breakdown</h3>
              <div className="text-[10px] font-black text-[#6E8FB6] uppercase tracking-widest flex items-center gap-2">
                 Real-time Sync <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
           </div>
           
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#2D3748', fontSize: 10, fontWeight: 900 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#F1F5F9' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                    {stats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
           
           <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl flex flex-col items-center">
                   <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.name}</div>
                   <div className="text-xl font-display font-medium text-[#2D3748]">{Math.round((stat.value / stat.total) * 100)}%</div>
                </div>
              ))}
           </div>
        </div>

        {/* Pending Actions */}
        <div className="space-y-6">
           <div className="bg-[#6E8FB6] p-8 rounded-[40px] text-white h-full flex flex-col justify-between">
              <div>
                 <h3 className="text-xs font-black opacity-40 uppercase tracking-widest mb-6">Upcoming Task</h3>
                 <h4 className="text-2xl font-display font-medium mb-4 leading-tight">Review Mortuary Release Checklist</h4>
                 <p className="text-sm opacity-60 font-medium">Verify you have the hospital RMO signature and at least 3 photocopies of the ID.</p>
              </div>
              <button className="mt-12 bg-white text-[#2D3748] w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                 Take Action <ArrowUpRight size={14} />
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {progressItems.map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm flex flex-col justify-between">
             <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  item.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                }`}>
                   <item.icon size={24} />
                </div>
                <h3 className="text-sm font-bold text-[#2D3748] mb-1">{item.title}</h3>
                <p className="text-xs text-[#2D3748]/50 font-medium">{item.count}</p>
             </div>
             <div className={`mt-6 inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-widest ${
               item.color === 'amber' ? 'text-amber-600' : 'text-[#6E8FB6]'
             }`}>
                {item.status === 'Complete' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                {item.status}
             </div>
          </div>
        ))}
      </div>

      <div className="bg-[#F7F8FA] p-8 rounded-[40px] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-premium relative">
               <AlertCircle size={28} className="text-[#D9A86C]" />
               <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
               <div className="text-lg font-display font-medium text-[#2D3748]">Verify Local Compliance</div>
               <div className="text-sm text-[#2D3748]/50 font-medium">New regulation update for cremation centers in your area.</div>
            </div>
         </div>
         <button className="bg-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#2D3748] shadow-sm hover:shadow-md transition-all">
            Review Update
         </button>
      </div>
    </div>
  );
};
