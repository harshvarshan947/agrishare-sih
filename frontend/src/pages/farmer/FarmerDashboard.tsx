import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Tractor,
  CalendarCheck,
  TrendingDown,
  DollarSign,
  FileQuestion,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../../services/api';
import { Booking, Equipment, EquipmentRequest, GroupRental, WeatherData } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { WeatherWidget } from '../../components/WeatherWidget';
import { MapComponent } from '../../components/MapComponent';

export const FarmerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [requests, setRequests] = useState<EquipmentRequest[]>([]);
  const [groupRentals, setGroupRentals] = useState<GroupRental[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (currentUser) {
      api.getBookings('FARMER', currentUser.id).then(setBookings);
    }
    api.getEquipmentList().then(setEquipmentList);
    api.getEquipmentRequests().then(setRequests);
    api.getGroupRentals().then(setGroupRentals);
    api.getWeather().then(setWeather);
  }, [currentUser]);

  const activeBookings = bookings.filter((b) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED');
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED');
  const totalSpent = bookings
    .filter((b) => b.paymentStatus === 'PAID')
    .reduce((acc, b) => acc + b.totalAmount, 0);

  const nearestEquipment = equipmentList.slice(0, 4);

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500/20 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                Farmer Command Centre
              </span>
              <span className="text-xs text-emerald-200">
                📍 {currentUser?.village || 'Bagru'}, {currentUser?.district || 'Jaipur'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Ram Ram, {currentUser?.name || 'Ramesh Kumar'} ji! 🌾
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl">
              Rabi sowing season is active. Discover tractors, join localized group rentals, and track live machinery arrivals.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/farmer/search"
              className="px-4 py-2.5 bg-white text-slate-900 font-bold rounded-xl text-xs hover:bg-emerald-50 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span>Find Nearby Equipment</span>
            </Link>
            <Link
              to="/farmer/requests"
              className="px-4 py-2.5 bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 border border-emerald-400/30"
            >
              <FileQuestion className="w-4 h-4" />
              <span>Post Custom Request</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 6 Dashboard Metrics Cards (Requirement 5) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Bookings</span>
            <Tractor className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{activeBookings.length}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">1 On The Way</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Upcoming</span>
            <CalendarCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">2</div>
          <span className="text-[10px] text-slate-500">Scheduled this week</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{completedBookings.length}</div>
          <span className="text-[10px] text-slate-500">Rated 4.9 ★ avg</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Spent</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalSpent}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Saved ~₹3,200 via CHC</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Group Rentals</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{groupRentals.length}</div>
          <span className="text-[10px] text-indigo-600 font-semibold">Save up to 35%</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">My Requests</span>
            <FileQuestion className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{requests.length}</div>
          <span className="text-[10px] text-purple-600 font-semibold">4 Matched Implements</span>
        </div>
      </div>

      {/* Active Booking Live Banner (If any active) */}
      {activeBookings.length > 0 && (
        <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-500/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="font-bold text-sm text-emerald-200 uppercase tracking-wide">
                Live Active Rental in Progress
              </h3>
            </div>
            <Link
              to="/farmer/bookings"
              className="text-xs text-emerald-400 hover:underline font-bold flex items-center gap-1"
            >
              <span>Track Live Route & OTPs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center space-x-3">
              <img
                src={activeBookings[0].equipmentImage}
                alt="equipment"
                className="w-16 h-16 rounded-2xl object-cover border border-emerald-400/40"
              />
              <div>
                <h4 className="font-bold text-white text-sm">{activeBookings[0].equipmentName}</h4>
                <div className="text-xs text-slate-300">
                  {activeBookings[0].cropType} • {activeBookings[0].farmAreaAcres} Acres
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase">
                  Status: {activeBookings[0].status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* OTP Handover box */}
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 flex items-center justify-around text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Pickup OTP</span>
                <div className="text-xl font-black text-amber-400">{activeBookings[0].pickupOtp}</div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Delivery OTP</span>
                <div className="text-xl font-black text-emerald-400">{activeBookings[0].deliveryOtp}</div>
              </div>
            </div>

            {/* Driver & Emergency contact */}
            <div className="flex items-center justify-between bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Assigned Driver</span>
                <div className="font-bold text-sm text-white">{activeBookings[0].driverName || 'Rajesh Gurjar'}</div>
                <div className="text-xs text-emerald-300">{activeBookings[0].driverPhone || '+91 97850 11111'}</div>
              </div>
              <a
                href={`tel:${activeBookings[0].driverPhone || '+919785011111'}`}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white shadow-xs"
                title="Call Driver"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Weather Forecast & Group Rentals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weather Advisory Card */}
        <div className="lg:col-span-6">
          {weather && <WeatherWidget data={weather} />}
        </div>

        {/* Group Rental Pooling Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                  Neighborhood Savings
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Village Group Rentals</h3>
              </div>
              <Link
                to="/farmer/group-rentals"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Combine your farm acres with nearby farmers in Bagru to save up to 35% on transit and hourly tractor fees.
            </p>

            <div className="space-y-3">
              {groupRentals.slice(0, 2).map((grp) => (
                <div key={grp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">{grp.title}</h4>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Save {grp.savingsPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {grp.currentFarmersCount} farmers joined ({grp.currentAreaAcres} / {grp.targetAreaAcres} Acres)
                    </span>
                    <span className="font-bold text-slate-800">₹{grp.discountedCostPerAcre}/acre</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, (grp.currentAreaAcres / grp.targetAreaAcres) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/farmer/group-rentals"
            className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs text-center transition-colors block"
          >
            Join a Group or Create Cluster
          </Link>
        </div>
      </div>

      {/* Recommended Nearby Implements (Requirement 5-B) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Hyperlocal Radius (&lt; 10 km)
            </span>
            <h3 className="text-xl font-bold text-slate-900">Nearby Machinery Ready for Fieldwork</h3>
          </div>
          <Link
            to="/farmer/search"
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearestEquipment.map((eq) => (
            <div
              key={eq.id}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="h-36 overflow-hidden relative">
                  <img src={eq.images[0]} alt={eq.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {eq.category}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                    ₹{eq.pricePerHour}/hr
                  </span>
                </div>
                <div className="p-3.5 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs truncate">{eq.name}</h4>
                  <div className="text-[11px] text-slate-500">
                    📍 {eq.village} ({eq.distanceKm ?? 4.2} km)
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-semibold">{eq.healthPercentage}% Health</span>
                    <span className="text-amber-600 font-bold">★ {eq.ownerRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 pt-0">
                <Link
                  to={`/equipment/${eq.id}`}
                  className="w-full py-2 bg-white hover:bg-emerald-600 hover:text-white border border-slate-300 hover:border-emerald-600 text-slate-700 font-bold text-xs rounded-xl text-center block transition-all"
                >
                  View Details & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
