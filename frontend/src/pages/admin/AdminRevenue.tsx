import React from 'react';
import { DollarSign, TrendingUp, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const AdminRevenue: React.FC = () => {
  const districtRevenueData = [
    { district: 'Jaipur Rural', volume: 184000, fee: 9200 },
    { district: 'Dausa', volume: 92000, fee: 4600 },
    { district: 'Alwar', volume: 76000, fee: 3800 },
    { district: 'Sikar', volume: 64000, fee: 3200 },
    { district: 'Tonk', volume: 48000, fee: 2400 },
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Fiscal Performance
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Platform Revenue & Financial Settlements</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Statewide Gross Transaction Value (GTV), 5% platform operations fee, and direct owner payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Total Statewide GTV</span>
          <div className="text-3xl font-black text-slate-900 mt-1">₹4,64,000</div>
          <span className="text-xs font-bold text-emerald-600">Across 5 Districts</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Farmer Cost Savings (vs Market)</span>
          <div className="text-3xl font-black text-emerald-700 mt-1">₹1,42,000</div>
          <span className="text-xs text-slate-500">Group rentals + CHC subsidized tariffs</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Platform Assurance Reserve (5%)</span>
          <div className="text-3xl font-black text-blue-600 mt-1">₹23,200</div>
          <span className="text-xs text-slate-500">Reinvested in fleet insurance</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">District-Wise Rental Volume & Commission</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districtRevenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="district" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                formatter={(val: any) => [`₹${val}`, 'Gross Volume']}
                contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="volume" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
