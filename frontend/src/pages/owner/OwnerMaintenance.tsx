import React, { useState, useEffect } from 'react';
import { Wrench, AlertTriangle, CheckCircle2, Tractor, Calendar, Plus, Clock } from 'lucide-react';
import { api } from '../../services/api';
import { Equipment } from '../../types';

export const OwnerMaintenance: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    api.getEquipmentList().then((list) => {
      setEquipment(list.filter((e) => e.ownerId === 'owner-1'));
    });
  }, []);

  const handleLogService = async (eq: Equipment) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = await api.updateEquipment(eq.id, {
      lastServiceDate: today,
      healthPercentage: 99,
      operatingHours: Math.max(0, eq.operatingHours - 50),
    });
    setEquipment(equipment.map((e) => (e.id === updated.id ? updated : e)));
    alert(`Service logged for ${eq.name}! Health reset to 99%.`);
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Preventative Maintenance Log
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Equipment Health & Service Schedule</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Track operating engine hours, hydraulic fluid life, and blade wear to prevent on-field breakdowns.
        </p>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((eq) => {
          const isDueSoon = eq.healthPercentage < 94;

          return (
            <div
              key={eq.id}
              className={`bg-white rounded-3xl p-6 border shadow-xs space-y-4 flex flex-col justify-between ${
                isDueSoon ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-400">{eq.category}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isDueSoon ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {eq.healthPercentage}% Health
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">{eq.name}</h3>

                {/* Progress bar */}
                <div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isDueSoon ? 'bg-amber-500' : 'bg-emerald-600'}`}
                      style={{ width: `${eq.healthPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Operating Hours:</span>
                    <strong className="text-slate-800">{eq.operatingHours} hrs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Last Service Date:</span>
                    <strong className="text-slate-800">{eq.lastServiceDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Next Service Due:</span>
                    <strong className="text-amber-700">{eq.nextServiceDue}</strong>
                  </div>
                </div>

                {isDueSoon && (
                  <div className="bg-amber-50 text-amber-900 p-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Hydraulic oil & filter inspection recommended before peak Rabi sowing.</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleLogService(eq)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Serviced & Certified</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
