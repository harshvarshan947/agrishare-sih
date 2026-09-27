import React, { useState, useEffect } from 'react';
import { FileQuestion, Plus, CheckCircle2, Tractor, Calendar, MapPin } from 'lucide-react';
import { api } from '../../services/api';
import { EquipmentRequest, EquipmentCategory } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const FarmerRequests: React.FC = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<EquipmentRequest[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // New Request Form State
  const [equipmentType, setEquipmentType] = useState<EquipmentCategory>('Tractor');
  const [crop, setCrop] = useState('Wheat (Rabi)');
  const [farmArea, setFarmArea] = useState(8);
  const [requiredDate, setRequiredDate] = useState('2026-10-05');
  const [budgetMax, setBudgetMax] = useState(900);
  const [driverRequired, setDriverRequired] = useState(true);
  const [fuelRequired, setFuelRequired] = useState(false);

  useEffect(() => {
    api.getEquipmentRequests().then(setRequests);
  }, []);

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const newReq = await api.createEquipmentRequest({
      farmerId: currentUser?.id || 'farmer-1',
      farmerName: currentUser?.name || 'Ramesh Kumar',
      farmerPhone: currentUser?.phone || '+91 98290 12345',
      equipmentType,
      crop,
      farmArea,
      requiredDate,
      village: currentUser?.village || 'Bagru',
      district: currentUser?.district || 'Jaipur',
      budgetMax,
      driverRequired,
      fuelRequired,
    });

    setRequests([newReq, ...requests]);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Custom Machinery Sourcing
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">Smart Equipment Requests</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Can't find the exact machine you need? Post a request. Equipment owners in your cluster will be notified instantly.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Equipment Request</span>
        </button>
      </div>

      {/* Request Form Drawer / Modal */}
      {isFormOpen && (
        <form onSubmit={handleCreateRequest} className="bg-white rounded-3xl p-6 border border-emerald-300 shadow-md space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            Submit Village Machinery Demand
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Equipment Needed</label>
              <select
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value as EquipmentCategory)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              >
                <option value="Tractor">Tractor</option>
                <option value="Rotavator">Rotavator</option>
                <option value="Combine Harvester">Combine Harvester</option>
                <option value="Seed Drill">Zero Till Seed Drill</option>
                <option value="Laser Land Leveller">Laser Land Leveller</option>
                <option value="Cultivator">Cultivator</option>
                <option value="Sprayer">Sprayer</option>
                <option value="Thresher">Thresher</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Crop Type</label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Farm Area (Acres)</label>
              <input
                type="number"
                min="1"
                value={farmArea}
                onChange={(e) => setFarmArea(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Required Date</label>
              <input
                type="date"
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6 pt-2 text-xs">
            <label className="flex items-center space-x-2 font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={driverRequired}
                onChange={(e) => setDriverRequired(e.target.checked)}
                className="accent-emerald-600 w-4 h-4 rounded"
              />
              <span>Need Driver / Operator</span>
            </label>

            <label className="flex items-center space-x-2 font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={fuelRequired}
                onChange={(e) => setFuelRequired(e.target.checked)}
                className="accent-emerald-600 w-4 h-4 rounded"
              />
              <span>Fuel to be included</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
            >
              Broadcast Request to Owners
            </button>
          </div>
        </form>
      )}

      {/* Requests Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-400">#{req.id}</span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  req.status === 'MATCHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {req.status === 'MATCHED' ? '✓ 4 Hubs Matched' : 'Broadcasting to Hubs'}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <Tractor className="w-4 h-4 text-emerald-600" />
                <span>{req.equipmentType}</span>
              </h3>

              <div className="space-y-1 text-xs text-slate-600 mt-2">
                <div>🌾 Crop: <strong>{req.crop}</strong> ({req.farmArea} Acres)</div>
                <div>📅 Target Date: <strong>{req.requiredDate}</strong></div>
                <div>📍 Location: <strong>{req.village}, {req.district}</strong></div>
                <div>💰 Max Budget: <strong>₹{req.budgetMax}/hr</strong></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {req.driverRequired ? 'Driver Requested' : 'Self-run'}
              </span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                {req.matchedEquipmentCount} Machines Nearby
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
