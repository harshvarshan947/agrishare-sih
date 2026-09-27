import React from 'react';
import { UserCheck, ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle2, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const FarmerProfile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Farmer Identity & Verification
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Farmer Profile & KYC Status</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Manage your verified identity, farm holdings, and government registry synchronization.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-20 h-20 rounded-3xl overflow-hidden bg-emerald-600 text-white font-bold flex items-center justify-center text-2xl shadow-md">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              currentUser?.name[0]
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-slate-900">{currentUser?.name || 'Ramesh Kumar'}</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>KYC Verified Farmer</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {currentUser?.village || 'Bagru'}, {currentUser?.district || 'Jaipur'}, Rajasthan
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                {currentUser?.phone || '+91 98290 12345'}
              </span>
            </div>
          </div>
        </div>

        {/* SIH Simulated KYC Status Section (Requirement 16) */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Simulated Aadhaar & Government Verification</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              SIH Mock Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Aadhaar Identification</span>
                <span className="text-emerald-600 font-bold text-[10px]">✓ Verified</span>
              </div>
              <div className="font-mono text-sm font-bold text-slate-800">
                {currentUser?.aadhaarMasked || 'XXXX-XXXX-8921'}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">PAN Identification</span>
                <span className="text-emerald-600 font-bold text-[10px]">✓ Verified</span>
              </div>
              <div className="font-mono text-sm font-bold text-slate-800">
                {currentUser?.panMasked || 'ABCDE1234F'}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Prototype safety notice: Dummy identifiers displayed for Smart India Hackathon evaluation.</span>
          </div>
        </div>

        {/* Agricultural Holdings Details */}
        <div className="space-y-3 text-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Farm Holding & Soil Details
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
              <span className="text-slate-500 font-semibold text-[10px] uppercase">Land Holding</span>
              <div className="text-lg font-black text-slate-900 mt-0.5">8 Acres</div>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
              <span className="text-slate-500 font-semibold text-[10px] uppercase">Soil Profile</span>
              <div className="text-lg font-black text-slate-900 mt-0.5">Sandy Loam</div>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
              <span className="text-slate-500 font-semibold text-[10px] uppercase">Current Season</span>
              <div className="text-lg font-black text-slate-900 mt-0.5">Rabi 2026</div>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
              <span className="text-slate-500 font-semibold text-[10px] uppercase">Primary Crops</span>
              <div className="text-lg font-black text-slate-900 mt-0.5">Wheat / Sarson</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
