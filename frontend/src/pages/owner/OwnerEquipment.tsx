import React, { useState, useEffect } from 'react';
import { Tractor, Plus, Edit, Pause, Play, Trash2, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { api } from '../../services/api';
import { Equipment, EquipmentCategory } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const OwnerEquipment: React.FC = () => {
  const { currentUser } = useAuth();
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<EquipmentCategory>('Tractor');
  const [brand, setBrand] = useState('Mahindra');
  const [model, setModel] = useState('575 DI');
  const [year, setYear] = useState(2023);
  const [pricePerHour, setPricePerHour] = useState(800);
  const [pricePerAcre, setPricePerAcre] = useState(950);
  const [driverAvailable, setDriverAvailable] = useState(true);
  const [driverRate, setDriverRate] = useState(150);
  const [fuelIncluded, setFuelIncluded] = useState(false);
  const [fuelPolicy, setFuelPolicy] = useState('Fuel provided by farmer or ₹120/hr extra');
  const [description, setDescription] = useState('Heavy duty farm implement in top condition.');

  useEffect(() => {
    api.getEquipmentList().then((list) => {
      setEquipmentList(list.filter((e) => e.ownerId === 'owner-1'));
    });
  }, []);

  const handleToggleStatus = async (eq: Equipment) => {
    const newStatus = eq.availabilityStatus === 'AVAILABLE' ? 'PAUSED' : 'AVAILABLE';
    const updated = await api.updateEquipment(eq.id, { availabilityStatus: newStatus });
    setEquipmentList(equipmentList.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleAddEquipment = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEq = await api.addEquipment({
      name,
      category,
      brand,
      model,
      year,
      pricePerHour,
      pricePerAcre,
      driverAvailable,
      driverRatePerHour: driverRate,
      fuelIncluded,
      fuelPolicy,
      description,
      ownerId: 'owner-1',
      ownerName: currentUser?.name || 'Vikram Singh Shekhawat',
      ownerPhone: currentUser?.phone || '+91 94140 11223',
      village: 'Bagru',
      district: 'Jaipur',
    });

    setEquipmentList([newEq, ...equipmentList]);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Fleet Inventory
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">Manage Your Machinery Fleet</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Add new tractors, adjust hourly/acre rental prices, manage availability, and pause machinery during maintenance.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Machinery</span>
        </button>
      </div>

      {/* Add Equipment Form Drawer (Requirement 6-1) */}
      {isAddOpen && (
        <form onSubmit={handleAddEquipment} className="bg-white rounded-3xl p-6 border border-emerald-300 shadow-md space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            List New Equipment on AgriShare
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Equipment Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Deere 5310 4WD"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EquipmentCategory)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              >
                <option value="Tractor">Tractor</option>
                <option value="Rotavator">Rotavator</option>
                <option value="Combine Harvester">Combine Harvester</option>
                <option value="Laser Land Leveller">Laser Land Leveller</option>
                <option value="Seed Drill">Zero Till Seed Drill</option>
                <option value="Cultivator">Cultivator</option>
                <option value="Sprayer">Sprayer</option>
                <option value="Tractor Trolley">Tractor Trolley</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Brand & Model</label>
              <input
                type="text"
                value={`${brand} ${model}`}
                onChange={(e) => {
                  setBrand(e.target.value.split(' ')[0]);
                  setModel(e.target.value.split(' ').slice(1).join(' '));
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Manufacturing Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price per Hour (₹)</label>
              <input
                type="number"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Price per Acre (₹)</label>
              <input
                type="number"
                value={pricePerAcre}
                onChange={(e) => setPricePerAcre(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Driver Rate per Hour (₹)</label>
              <input
                type="number"
                value={driverRate}
                onChange={(e) => setDriverRate(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description & Implements Included</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
            />
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
              className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
            >
              Save & List Equipment
            </button>
          </div>
        </form>
      )}

      {/* Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentList.map((eq) => {
          const isPaused = eq.availabilityStatus === 'PAUSED';

          return (
            <div
              key={eq.id}
              className={`bg-white rounded-3xl overflow-hidden border shadow-xs flex flex-col justify-between transition-all ${
                isPaused ? 'border-slate-300 opacity-75' : 'border-slate-200 hover:shadow-lg'
              }`}
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img src={eq.images[0]} alt={eq.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    isPaused ? 'bg-amber-600' : 'bg-slate-900/80'
                  }`}>
                    {isPaused ? 'PAUSED / OFF-DUTY' : eq.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    ₹{eq.pricePerHour}/hr • ₹{eq.pricePerAcre}/ac
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{eq.name}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      📍 {eq.village}, {eq.district}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Health Score</span>
                      <div className="font-black text-emerald-700">{eq.healthPercentage}% Certified</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Operating Hours</span>
                      <div className="font-black text-slate-800">{eq.operatingHours} hrs</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-5 pt-0 flex gap-2 text-xs font-bold">
                <button
                  onClick={() => handleToggleStatus(eq)}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-colors ${
                    isPaused
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                  }`}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    const newPrice = prompt('Enter new hourly rental price (₹):', eq.pricePerHour.toString());
                    if (newPrice && !isNaN(Number(newPrice))) {
                      api.updateEquipment(eq.id, { pricePerHour: Number(newPrice) }).then((u) => {
                        setEquipmentList(equipmentList.map((e) => (e.id === u.id ? u : e)));
                      });
                    }
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                  title="Update Pricing"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
