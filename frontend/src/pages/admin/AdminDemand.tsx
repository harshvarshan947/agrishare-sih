import React from 'react';
import { TrendingUp, MapPin, Tractor, Sparkles, Layers } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { DEMO_SEASONAL_DEMAND } from '../../services/mockData';

export const AdminDemand: React.FC = () => {
  const demandTrends = [
    { month: 'Jun', tractors: 65, harvesters: 12, seedDrills: 8 },
    { month: 'Jul', tractors: 88, harvesters: 25, seedDrills: 14 },
    { month: 'Aug', tractors: 110, harvesters: 40, seedDrills: 20 },
    { month: 'Sep', tractors: 148, harvesters: 94, seedDrills: 126 },
    { month: 'Oct (Proj)', tractors: 165, harvesters: 110, seedDrills: 140 },
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Statewide Demand Intelligence
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Equipment Demand Heatmaps & Trends</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Analyze unfulfilled farmer requests to guide new Custom Hiring Centre subsidies and machinery allocations.
        </p>
      </div>

      {/* Demand Growth Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Seasonal Machinery Demand Surge</h3>
          <span className="text-xs font-semibold text-emerald-700">Rabi Sowing Peak (+52% Seed Drills)</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={demandTrends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="tractors" stackId="1" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} />
              <Area type="monotone" dataKey="seedDrills" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              <Area type="monotone" dataKey="harvesters" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Seasonal Demand Breakdown (Requirement 13) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
            <span>Kharif Post-Harvest Demand</span>
            <span className="text-xs text-amber-600 font-bold">Active Sowing</span>
          </h4>
          <div className="space-y-2">
            {DEMO_SEASONAL_DEMAND.kharifDemand.map((d, i) => (
              <div key={i} className="flex justify-between p-3 rounded-2xl bg-slate-50 text-xs">
                <span className="font-bold text-slate-800">{d.equipment}</span>
                <span className="font-bold text-emerald-700">{d.requests} Requests ({d.growth})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
            <span>Rabi Sowing Demand</span>
            <span className="text-xs text-emerald-600 font-bold">Upcoming 30 Days</span>
          </h4>
          <div className="space-y-2">
            {DEMO_SEASONAL_DEMAND.rabiDemand.map((d, i) => (
              <div key={i} className="flex justify-between p-3 rounded-2xl bg-slate-50 text-xs">
                <span className="font-bold text-slate-800">{d.equipment}</span>
                <span className="font-bold text-emerald-700">{d.requests} Requests ({d.growth})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
