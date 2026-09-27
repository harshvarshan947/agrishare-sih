import React, { useState, useEffect } from 'react';
import { Tractor, Search, ShieldCheck, CheckCircle2, Pause, Edit, Wrench, MapPin } from 'lucide-react';
import { api } from '../../services/api';
import { Equipment } from '../../types';

export const AdminEquipment: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  useEffect(() => {
    api.getEquipmentList().then(setEquipment);
  }, []);

  const filtered = equipment.filter((eq) => {
    if (categoryFilter !== 'ALL' && eq.category !== categoryFilter) return false;
    if (search && !eq.name.toLowerCase().includes(search.toLowerCase()) && !eq.village.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Statewide Machinery Assets
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Equipment Fleet & Custom Hiring Hubs</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Monitor all 20+ tractors, rotavators, and combine harvesters registered under government and private hubs.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search equipment, brand, or village..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Total: <strong className="text-slate-900">{filtered.length} Machines</strong>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-4">Machine</th>
                <th className="p-4">Hub / Owner</th>
                <th className="p-4">Location</th>
                <th className="p-4">Rental Rates</th>
                <th className="p-4">Health %</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((eq) => (
                <tr key={eq.id} className="hover:bg-slate-50/60">
                  <td className="p-4 flex items-center space-x-3">
                    <img src={eq.images[0]} alt={eq.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{eq.name}</div>
                      <div className="text-[11px] text-slate-400">{eq.category} • {eq.year}</div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{eq.ownerName}</div>
                    <div className="text-[10px] text-slate-400">{eq.ownerPhone}</div>
                  </td>

                  <td className="p-4 text-slate-600">
                    {eq.village}, {eq.district}
                  </td>

                  <td className="p-4 font-bold text-slate-900">
                    ₹{eq.pricePerHour}/hr • ₹{eq.pricePerAcre}/ac
                  </td>

                  <td className="p-4">
                    <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {eq.healthPercentage}%
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                      {eq.availabilityStatus}
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
