import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Tractor,
  MapPin,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  SlidersHorizontal,
  Map,
  LayoutGrid,
} from 'lucide-react';
import { api } from '../services/api';
import { Equipment } from '../types';
import { MapComponent, MapMarker } from '../components/MapComponent';

export const EquipmentListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filteredList, setFilteredList] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'ALL');
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [driverOnly, setDriverOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  useEffect(() => {
    api.getEquipmentList().then((data) => {
      setEquipment(data);
      setFilteredList(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = [...equipment];

    if (category !== 'ALL') {
      result = result.filter((e) => e.category.toLowerCase() === category.toLowerCase());
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.village.toLowerCase().includes(q) ||
          e.brand.toLowerCase().includes(q)
      );
    }

    result = result.filter((e) => (e.distanceKm ?? 5) <= maxDistance);
    result = result.filter((e) => e.pricePerHour <= maxPrice);

    if (driverOnly) {
      result = result.filter((e) => e.driverAvailable);
    }

    setFilteredList(result);
  }, [equipment, category, searchTerm, maxDistance, maxPrice, driverOnly]);

  const mapMarkers: MapMarker[] = filteredList.map((e) => ({
    id: e.id,
    type: 'EQUIPMENT',
    title: e.name,
    subtitle: `${e.village} • ${e.distanceKm ?? 4} km`,
    lat: e.latitude,
    lng: e.longitude,
    price: `₹${e.pricePerHour}/hr | ₹${e.pricePerAcre}/acre`,
    status: e.availabilityStatus,
    category: e.category,
  }));

  const categories = [
    'ALL',
    'Tractor',
    'Rotavator',
    'Combine Harvester',
    'Seed Drill',
    'Laser Land Leveller',
    'Cultivator',
    'Sprayer',
    'Thresher',
    'Tractor Trolley',
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
              Public Machinery Directory
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-2">Available Farm Equipment</h1>
            <p className="text-slate-600 text-sm">
              Discover and compare tractors, rotavators, and harvesters verified across nearby villages.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm mb-8 text-left space-y-4">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tractor model, brand, or village (e.g. Mahindra, Bagru)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Price Slider */}
            <div className="flex items-center space-x-3 w-full lg:w-64 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs">
              <span className="font-semibold text-slate-600 whitespace-nowrap">Max: ₹{maxPrice}/hr</span>
              <input
                type="range"
                min="300"
                max="2500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Distance Slider */}
            <div className="flex items-center space-x-3 w-full lg:w-56 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs">
              <span className="font-semibold text-slate-600 whitespace-nowrap">{maxDistance} km</span>
              <input
                type="range"
                min="2"
                max="30"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Driver Toggle */}
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer whitespace-nowrap select-none">
              <input
                type="checkbox"
                checked={driverOnly}
                onChange={(e) => setDriverOnly(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <span>Driver Available</span>
            </label>
          </div>

          {/* Category Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  category === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content View: Map View or Grid View */}
        {viewMode === 'map' ? (
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm mb-12">
            <div className="text-xs font-bold text-slate-500 mb-3 text-left">
              Showing {filteredList.length} machines on map around Bagru / Jaipur Rural
            </div>
            <MapComponent markers={mapMarkers} height="540px" />
          </div>
        ) : (
          <div>
            {loading ? (
              <div className="py-20 text-center text-slate-400">Loading equipment fleet...</div>
            ) : filteredList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
                <Tractor className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No machinery matched your filters</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting the maximum distance or selecting 'ALL' categories.
                </p>
                <button
                  onClick={() => {
                    setCategory('ALL');
                    setMaxDistance(25);
                    setMaxPrice(2500);
                    setSearchTerm('');
                    setDriverOnly(false);
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {filteredList.map((eq) => (
                  <div
                    key={eq.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={eq.images[0]}
                          alt={eq.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                            {eq.category}
                          </span>
                          {eq.matchScore && (
                            <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                              {eq.matchScore}% Match
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 font-black text-sm px-3 py-1 rounded-xl shadow-md border border-slate-200">
                          ₹{eq.pricePerHour} <span className="text-[10px] font-normal text-slate-500">/ hr</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div>
                          <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>
                              {eq.village}, {eq.district} ({eq.distanceKm ?? 4.2} km)
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                            {eq.name}
                          </h3>
                        </div>

                        {/* Owner & Health */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                          <div className="flex items-center space-x-1">
                            <span className="font-semibold text-slate-800">{eq.ownerName}</span>
                            {eq.ownerVerified && (
                              <span title="Verified Hub Owner">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 text-amber-600 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{eq.ownerRating.toFixed(1)}</span>
                          </div>
                        </div>

                        {/* Specs Pill */}
                        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                            ₹{eq.pricePerAcre}/acre
                          </span>
                          {eq.driverAvailable && (
                            <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                              <Truck className="w-3 h-3" /> Driver Avail.
                            </span>
                          )}
                          <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md font-semibold">
                            {eq.healthPercentage}% Health
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-5 pt-0">
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to={`/equipment/${eq.id}`}
                          className="w-full py-2.5 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/equipment/${eq.id}?action=book`}
                          className="w-full py-2.5 text-center text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
