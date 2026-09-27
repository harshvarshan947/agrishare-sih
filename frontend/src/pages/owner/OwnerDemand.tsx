import React from 'react';
import { TrendingUp, AlertCircle, MapPin, Tractor, Sparkles, DollarSign, Calendar } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { DEMO_SEASONAL_DEMAND } from '../../services/mockData';

export const OwnerDemand: React.FC = () => {
  const demandByEquipment = [
    { name: 'Tractor (47-55 HP)', requests: 42, avgPrice: 850, potential: 35700 },
    { name: 'Rotavator (6-7 Ft)', requests: 28, avgPrice: 650, potential: 18200 },
    { name: 'Combine Harvester', requests: 21, avgPrice: 2100, potential: 44100 },
    { name: 'Laser Leveller', requests: 18, avgPrice: 950, potential: 17100 },
    { name: 'Zero Till Drill', requests: 16, avgPrice: 550, potential: 8800 },
    { name: 'Hydraulic Trolley', requests: 14, avgPrice: 380, potential: 5320 },
  ];

  const locationHotspots = [
    { village: 'Bagru Rural', demandCount: 28, topImplement: 'Tractor + Rotavator', avgRate: '₹850/hr' },
    { village: 'Chomu Tehsil', demandCount: 22, topImplement: 'Combine Harvester', avgRate: '₹2,100/hr' },
    { village: 'Bassi Cluster', demandCount: 19, topImplement: 'Zero Till Seed Drill', avgRate: '₹550/hr' },
    { village: 'Dausa Bypass', demandCount: 17, topImplement: 'Laser Land Leveller', avgRate: '₹950/hr' },
    { village: 'Jobner Mandi', demandCount: 14, topImplement: 'Power Sprayer & Trolley', avgRate: '₹400/hr' },
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Market Intelligence & High Demand Radar
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Equipment Demand Monitoring</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Identify localized machinery deficits, unfulfilled farmer requests, and seasonal demand spikes across Rajasthan clusters.
        </p>
      </div>

      {/* High Demand Warning Alert Banner (Requirement 6-6) */}
      <div className="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-6 text-amber-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="p-3.5 bg-amber-500 text-white rounded-2xl shrink-0 shadow-md">
            <TrendingUp className="w-7 h-7 animate-bounce" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md">
              Real-time High Demand Alert
            </span>
            <h2 className="text-xl font-black text-slate-900">
              High demand detected for Tractor + Rotavator within 15 km
            </h2>
            <div className="grid grid-cols-3 gap-4 pt-2 text-xs">
              <div>
                <span className="text-slate-500 block">Demand Count:</span>
                <strong className="text-lg font-black text-slate-900">42 Unfulfilled</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Average Rental Price:</span>
                <strong className="text-lg font-black text-emerald-700">₹850 / hour</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Potential Revenue:</span>
                <strong className="text-lg font-black text-amber-700">₹35,700+</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demand Chart (Requirement 13) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Cluster Request Volume</span>
            <h3 className="text-lg font-bold text-slate-900">Most Demanded Machinery in Current Season</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">Total 139 Active Farmer Requests</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demandByEquipment} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} angle={-10} textAnchor="end" />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                formatter={(val: any, name: any) => [val, 'Farmer Requests Logged']}
                contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="requests" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Location-wise Hotspots Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900">High-Demand Village Clusters</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Village / Location</th>
                <th className="p-3">Logged Requests</th>
                <th className="p-3">Top Demanded Implement</th>
                <th className="p-3">Avg Rental Rate</th>
                <th className="p-3">Opportunity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {locationHotspots.map((loc, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{loc.village}</span>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{loc.demandCount} farmers</td>
                  <td className="p-3 text-slate-800 font-medium">{loc.topImplement}</td>
                  <td className="p-3 font-bold text-emerald-700">{loc.avgRate}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      High Margin
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
