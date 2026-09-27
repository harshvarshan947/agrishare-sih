import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  MapPin,
  Tractor,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import { api } from '../../services/api';
import { calculateMatchScore, rankEquipment, MatchResult } from '../../services/matchingService';
import { Equipment } from '../../types';

export const FarmerSearch: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Search parameters
  const [equipmentType, setEquipmentType] = useState<string>(searchParams.get('category') || 'Tractor');
  const [farmAreaAcres, setFarmAreaAcres] = useState<number>(Number(searchParams.get('area')) || 8);
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(15);
  const [maxBudgetPerHour, setMaxBudgetPerHour] = useState<number>(1000);
  const [driverRequired, setDriverRequired] = useState<boolean>(true);
  const [fuelRequired, setFuelRequired] = useState<boolean>(false);
  const [crop, setCrop] = useState<string>('Wheat (Rabi)');

  const [allEquipment, setAllEquipment] = useState<Equipment[]>([]);
  const [rankedResults, setRankedResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEquipmentList().then((list) => {
      setAllEquipment(list);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (allEquipment.length > 0) {
      const results = rankEquipment(allEquipment, {
        equipmentType,
        farmAreaAcres,
        maxDistanceKm,
        maxBudgetPerHour,
        driverRequired,
        fuelRequired,
      });
      setRankedResults(results);
    }
  }, [allEquipment, equipmentType, farmAreaAcres, maxDistanceKm, maxBudgetPerHour, driverRequired, fuelRequired]);

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 bg-emerald-100/70 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Factor AI Matching Algorithm</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">Smart Machinery Matching System</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
          Ranks local equipment using 10 agricultural dimensions: proximity, engine HP vs plot size, health certification, verified operator availability, and price fit.
        </p>
      </div>

      {/* Criteria Control Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Required Equipment Type
            </label>
            <select
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Tractor">Tractor (45-55 HP)</option>
              <option value="Rotavator">Rotavator (6-7 Ft)</option>
              <option value="Combine Harvester">Combine Harvester</option>
              <option value="Seed Drill">Zero Till Seed Drill</option>
              <option value="Laser Land Leveller">Laser Land Leveller</option>
              <option value="Cultivator">Cultivator 9-Tyne</option>
              <option value="Sprayer">Tractor Boom Sprayer</option>
              <option value="Thresher">Multi-Crop Thresher</option>
              <option value="Tractor Trolley">Hydraulic Trolley</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Farm Area (Acres)
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={farmAreaAcres}
              onChange={(e) => setFarmAreaAcres(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Max Budget: ₹{maxBudgetPerHour}/hr
            </label>
            <input
              type="range"
              min="400"
              max="2500"
              step="50"
              value={maxBudgetPerHour}
              onChange={(e) => setMaxBudgetPerHour(Number(e.target.value))}
              className="w-full accent-emerald-600 mt-2"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Target Crop
            </label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="e.g. Wheat, Mustard"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none"
            />
          </div>
        </div>

        {/* Driver & Distance check */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={driverRequired}
                onChange={(e) => setDriverRequired(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <span>Driver / Operator Required</span>
            </label>

            <label className="flex items-center space-x-2 font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={fuelRequired}
                onChange={(e) => setFuelRequired(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <span>Fuel to be Provided by Owner</span>
            </label>
          </div>

          <div className="text-slate-500 font-medium">
            Search radius: <strong>{maxDistanceKm} km from Bagru</strong>
          </div>
        </div>
      </div>

      {/* Ranked Smart Match Results (Requirement 9 & Step 4, 5 of SIH Flow) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Ranked by Composite Suitability Score</span>
          <span className="font-bold text-emerald-800">{rankedResults.length} matches found</span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">Running matching algorithm...</div>
        ) : (
          <div className="space-y-4">
            {rankedResults.map(({ equipment: eq, score, reasons, breakdown }, index) => {
              const isTopPick = index === 0;

              return (
                <div
                  key={eq.id}
                  className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all ${
                    isTopPick
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    {/* Left: Image & Main Info */}
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden relative shrink-0 shadow-xs">
                        <img src={eq.images[0]} alt={eq.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {eq.category}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          {isTopPick && (
                            <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                              #1 Best Match
                            </span>
                          )}
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            {eq.village} ({eq.distanceKm ?? 4.2} km away)
                          </span>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 leading-tight">
                          {eq.name}
                        </h3>

                        <div className="flex items-center space-x-3 text-xs text-slate-600">
                          <span className="font-semibold text-slate-800">{eq.ownerName}</span>
                          <span className="flex items-center text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                            {eq.ownerRating.toFixed(1)}
                          </span>
                          <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold">
                            {eq.healthPercentage}% Health
                          </span>
                        </div>

                        <div className="text-xs text-slate-700 font-medium">
                          Rate: <strong className="text-emerald-700">₹{eq.pricePerHour}/hr</strong> | ₹{eq.pricePerAcre}/acre
                        </div>
                      </div>
                    </div>

                    {/* Middle: Why it matched (Requirement 9) */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex-1 max-w-md w-full space-y-1.5 text-xs">
                      <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px] flex items-center justify-between">
                        <span>Why this equipment matched:</span>
                        <span className="text-slate-400 font-normal">Deterministic Engine</span>
                      </div>
                      <div className="space-y-1 text-slate-700">
                        {reasons.map((r, i) => (
                          <div key={i} className="flex items-start space-x-1.5 text-emerald-800 font-medium">
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Match Score % and Book Button */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 shrink-0">
                      <div className="text-left lg:text-right">
                        <div className="text-3xl font-black text-emerald-600 tracking-tight">
                          {score}% <span className="text-xs font-bold uppercase text-slate-500 block">Match Score</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/equipment/${eq.id}`}
                          className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs"
                        >
                          Specs
                        </Link>
                        <Link
                          to={`/equipment/${eq.id}?action=book`}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-md shadow-emerald-600/30 flex items-center space-x-1"
                        >
                          <span>Select & Book</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
