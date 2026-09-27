import React, { useState, useEffect } from 'react';
import { Truck, Plus, Phone, Star, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { User } from '../../types';

export const OwnerDrivers: React.FC = () => {
  const [drivers, setDrivers] = useState<User[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Driver state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('Bagru');
  const [dlNumber, setDlNumber] = useState('RJ-14-2023-009988');

  useEffect(() => {
    api.getUsers().then((list) => {
      setDrivers(list.filter((u) => u.role === 'DRIVER'));
    });
  }, []);

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    const newDrv: User = {
      id: `driver-${Date.now()}`,
      name,
      phone,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@agrishare.in`,
      role: 'DRIVER',
      village,
      district: 'Jaipur',
      state: 'Rajasthan',
      verificationStatus: 'VERIFIED',
      dlNumber,
      totalRentals: 0,
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    };
    setDrivers([...drivers, newDrv]);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Driver & Operator Roster
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">Certified Equipment Operators</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Manage your certified machinery operators, assign field jobs, track driver ratings, and verify driving licences.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add Operator / Driver</span>
        </button>
      </div>

      {/* Add Driver Form */}
      {isAddOpen && (
        <form onSubmit={handleAddDriver} className="bg-white rounded-3xl p-6 border border-emerald-300 shadow-md space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
            Register New Machine Driver
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Driver Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mukesh Gurjar"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 97850 99999"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Village</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Commercial DL Number</label>
              <input
                type="text"
                value={dlNumber}
                onChange={(e) => setDlNumber(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              Save Driver
            </button>
          </div>
        </form>
      )}

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((drv) => (
          <div
            key={drv.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-3.5">
                <img
                  src={drv.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'}
                  alt={drv.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{drv.name}</h3>
                  <div className="text-xs text-slate-500">
                    📍 {drv.village}, {drv.district}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{drv.rating ?? 4.9} ★</span>
                    <span className="text-slate-400 font-normal">({drv.totalRentals ?? 35} jobs)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Commercial DL:</span>
                  <span className="font-mono font-bold text-slate-800">{drv.dlNumber || 'RJ-14-DL-VERIFIED'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Verification:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Operator
                  </span>
                </div>
              </div>
            </div>

            <a
              href={`tel:${drv.phone}`}
              className="w-full py-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call ({drv.phone})</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
