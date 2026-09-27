import React from 'react';
import { DollarSign, CheckCircle2, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const DriverEarnings: React.FC = () => {
  const weeklyEarnings = [
    { day: 'Mon', amount: 900, jobs: 1 },
    { day: 'Tue', amount: 1800, jobs: 2 },
    { day: 'Wed', amount: 1350, jobs: 1 },
    { day: 'Thu', amount: 2250, jobs: 2 },
    { day: 'Fri', amount: 1500, jobs: 2 },
    { day: 'Sat', amount: 2700, jobs: 3 },
    { day: 'Sun', amount: 3150, jobs: 3 },
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
          Driver Ledger
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Driver Operator Earnings</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Track verified hourly and acreage operator payments, overtime bonuses, and instant UPI payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Today's Earnings</span>
          <div className="text-2xl font-black text-slate-900 mt-1">₹1,800</div>
          <span className="text-[10px] text-emerald-700 font-semibold">2 jobs completed</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">This Week</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">₹13,650</div>
          <span className="text-[10px] text-slate-500">14 field assignments</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">This Month</span>
          <div className="text-2xl font-black text-slate-900 mt-1">₹42,300</div>
          <span className="text-[10px] text-slate-500">Peak Rabi sowing season</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">UPI Settlement</span>
          <div className="text-sm font-bold text-slate-900 mt-1">rajesh.driver@upi</div>
          <span className="text-[10px] text-emerald-700 font-bold">✓ Instant DBT Active</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Weekly Operator Payout Graph</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyEarnings}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                formatter={(val: any) => [`₹${val}`, 'Daily Operator Payout']}
                contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="amount" fill="#d97706" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
