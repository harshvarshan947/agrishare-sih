import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, Tractor, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const OwnerRevenue: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const dailyData = [
    { label: '06:00 AM', amount: 800 },
    { label: '09:00 AM', amount: 1600 },
    { label: '12:00 PM', amount: 2400 },
    { label: '03:00 PM', amount: 1600 },
    { label: '06:00 PM', amount: 2100 },
  ];

  const weeklyData = [
    { label: 'Mon', amount: 4200 },
    { label: 'Tue', amount: 7600 },
    { label: 'Wed', amount: 6100 },
    { label: 'Thu', amount: 8500 },
    { label: 'Fri', amount: 5400 },
    { label: 'Sat', amount: 9800 },
    { label: 'Sun', amount: 11200 },
  ];

  const monthlyData = [
    { label: 'May', amount: 58000 },
    { label: 'Jun', amount: 72000 },
    { label: 'Jul', amount: 84000 },
    { label: 'Aug', amount: 91000 },
    { label: 'Sep', amount: 114000 },
  ];

  const equipmentWiseData = [
    { name: 'Mahindra 575 DI (Tractor)', revenue: 48500, color: '#16a34a' },
    { name: 'Shaktiman Rotavator', revenue: 26400, color: '#2563eb' },
    { name: 'New Holland 3630', revenue: 22100, color: '#f59e0b' },
    { name: 'Hydraulic Trolley', revenue: 17000, color: '#8b5cf6' },
  ];

  const chartData = timeframe === 'daily' ? dailyData : timeframe === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Financial Ledger & Analytics
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">Fleet Revenue & Earnings</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time payout monitoring, per-machine profitability, and seasonal rental cash flow.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          {(['daily', 'weekly', 'monthly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                timeframe === t ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Total Month-to-Date Revenue</span>
          <div className="text-3xl font-black text-slate-900 mt-1">₹1,14,000</div>
          <span className="text-xs font-bold text-emerald-600">+28% vs previous month</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Net Settled to Bank (Direct DBT)</span>
          <div className="text-3xl font-black text-emerald-700 mt-1">₹1,08,300</div>
          <span className="text-xs text-slate-500">Platform fee 5% deducted</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Recent Job Payout (Step 21)</span>
          <div className="text-3xl font-black text-amber-600 mt-1">₹8,500</div>
          <span className="text-xs text-emerald-700 font-semibold">Ramesh Kumar (8 Acres Wheat)</span>
        </div>
      </div>

      {/* Main Revenue Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            {timeframe === 'daily' ? 'Hourly' : timeframe === 'weekly' ? 'Weekly' : 'Monthly'} Revenue Performance
          </h3>
          <span className="text-xs font-bold text-emerald-700">₹ Currency in INR</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="label" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                formatter={(val: any) => [`₹${val}`, 'Gross Revenue']}
                contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="amount" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Machine-wise Revenue Breakdown (Requirement 6-7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Equipment-Wise Revenue Share</h3>
          <div className="space-y-3">
            {equipmentWiseData.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-slate-900">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">₹{item.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Settlement Account Details */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Direct Benefit Transfer (DBT) Settlement</h3>
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Bank Name:</span>
              <strong className="text-slate-800">State Bank of India (Bagru Branch)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Account Number:</span>
              <strong className="font-mono text-slate-800">XXXX-XXXX-4512</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">IFSC Code:</span>
              <strong className="font-mono text-slate-800">SBIN0031123</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payout Frequency:</span>
              <strong className="text-emerald-700">Same-Day Post Delivery OTP Verification</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
