import React from 'react';
import { UserCheck, ShieldCheck, MapPin, Phone, Star, CheckCircle2, Truck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DriverProfile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
          Driver Credentials
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Driver Profile & Commercial DL</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-20 h-20 rounded-3xl overflow-hidden bg-amber-500 text-white font-bold flex items-center justify-center text-2xl shadow-md">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              currentUser?.name[0]
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-slate-900">{currentUser?.name || 'Rajesh Gurjar'}</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Commercial Operator</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {currentUser?.village || 'Bagru'}, {currentUser?.district || 'Jaipur'}, Rajasthan
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                {currentUser?.phone || '+91 97850 11111'}
              </span>
            </div>
          </div>
        </div>

        {/* License & Verification */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
          <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
            Commercial Heavy Machinery License (Simulated)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">License Number</span>
              <strong className="font-mono text-slate-900">{currentUser?.dlNumber || 'RJ-14-DL-2018-994321'}</strong>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Endorsements</span>
              <strong className="text-slate-900">Tractor, Harvester, Heavy Articulated</strong>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Experience</span>
              <strong className="text-slate-900">7 Years Safe Operation</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
