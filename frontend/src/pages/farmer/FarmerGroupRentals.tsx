import React, { useState, useEffect } from 'react';
import { Users, Sparkles, Tractor, CheckCircle2, TrendingDown, ArrowRight, Plus } from 'lucide-react';
import { api } from '../../services/api';
import { GroupRental, EquipmentCategory } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const FarmerGroupRentals: React.FC = () => {
  const { currentUser } = useAuth();
  const [groupRentals, setGroupRentals] = useState<GroupRental[]>([]);
  const [joinedSuccess, setJoinedSuccess] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New Group State
  const [title, setTitle] = useState('Bagru Mustard Laser Levelling Cluster');
  const [category, setCategory] = useState<EquipmentCategory>('Laser Land Leveller');
  const [targetAcres, setTargetAcres] = useState(15);
  const [myAcres, setMyAcres] = useState(4);
  const [targetDate, setTargetDate] = useState('2026-10-06');

  useEffect(() => {
    api.getGroupRentals().then(setGroupRentals);
  }, []);

  const handleJoin = async (groupId: string) => {
    if (!currentUser) return;
    const updated = await api.joinGroupRental(groupId, {
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      acres: 4,
    });
    setGroupRentals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    setJoinedSuccess(groupId);
    setTimeout(() => setJoinedSuccess(null), 3500);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGrp = await api.createGroupRental({
      title,
      equipmentCategory: category,
      village: currentUser?.village || 'Bagru',
      district: currentUser?.district || 'Jaipur',
      targetDate,
      targetAreaAcres: targetAcres,
      currentAreaAcres: myAcres,
      estimatedCostPerAcreOriginal: 1200,
      discountedCostPerAcre: 850,
    });

    setGroupRentals([newGrp, ...groupRentals]);
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Machinery Pooling (Save 25% to 35%)</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">Group Rental Pooling</h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            When neighboring farmers combine contiguous fields, equipment owners reduce transit loss and offer wholesale per-acre rates.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(!isCreateOpen)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Village Pool</span>
        </button>
      </div>

      {/* Creation Modal / Form */}
      {isCreateOpen && (
        <form onSubmit={handleCreate} className="bg-white rounded-3xl p-6 border border-emerald-300 shadow-md space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
            Initiate Neighborhood Equipment Pool
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Pool Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Equipment Category</label>
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
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Combined Acres</label>
              <input
                type="number"
                min="6"
                value={targetAcres}
                onChange={(e) => setTargetAcres(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">My Initial Acres</label>
              <input
                type="number"
                min="1"
                value={myAcres}
                onChange={(e) => setMyAcres(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              Publish Village Pool
            </button>
          </div>
        </form>
      )}

      {/* Group Rentals Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupRentals.map((grp) => {
          const isFull = grp.currentAreaAcres >= grp.targetAreaAcres;
          const isMember = grp.members.some((m) => m.farmerId === currentUser?.id);
          const percent = Math.min(100, Math.round((grp.currentAreaAcres / grp.targetAreaAcres) * 100));

          return (
            <div
              key={grp.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Save {grp.savingsPercentage}%
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isFull ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isFull ? 'Confirmed & Locked' : `${grp.targetAreaAcres - grp.currentAreaAcres} Acres Needed`}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{grp.title}</h3>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Pooled: {grp.currentAreaAcres} Acres</span>
                    <span>Target: {grp.targetAreaAcres} Acres</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                {/* Price Breakdown Comparison (Requirement 14) */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-500">
                    <span>Individual Single Rental:</span>
                    <span className="line-through text-slate-400">₹{grp.estimatedCostPerAcreOriginal}/acre</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Group Discounted Rate:</span>
                    <span className="text-emerald-700 text-sm font-black">₹{grp.discountedCostPerAcre}/acre</span>
                  </div>
                  <div className="text-[10px] text-emerald-800 font-semibold pt-1 border-t border-slate-200">
                    Estimated savings: ₹{grp.estimatedCostPerAcreOriginal - grp.discountedCostPerAcre} per acre!
                  </div>
                </div>

                {/* Members list preview */}
                <div className="text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-800 text-[11px] uppercase">
                    Joined Farmers ({grp.members.length}):
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {grp.members.map((m, idx) => (
                      <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                        {m.farmerName} ({m.acres} ac)
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div>
                {joinedSuccess === grp.id ? (
                  <div className="py-2.5 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Joined Successfully! Group Updated.</span>
                  </div>
                ) : isMember ? (
                  <div className="py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-xs text-center border border-emerald-200">
                    ✓ You are a Member in this Pool
                  </div>
                ) : isFull ? (
                  <button disabled className="w-full py-2.5 bg-slate-100 text-slate-400 font-bold rounded-xl text-xs">
                    Pool Target Reached
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(grp.id)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Join Group with 4 Acres</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
