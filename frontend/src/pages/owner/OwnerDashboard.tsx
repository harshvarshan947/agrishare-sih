import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Tractor,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  Wrench,
  Truck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { api } from '../../services/api';
import { Booking, Equipment } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const OwnerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    api.getEquipmentList().then((list) => {
      // Filter for Vikram Singh (owner-1)
      const myFleet = list.filter((e) => e.ownerId === 'owner-1');
      setEquipment(myFleet);
    });
    if (currentUser) {
      api.getBookings('OWNER', 'owner-1').then(setBookings);
    }
  }, [currentUser]);

  const activeRentals = bookings.filter((b) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED');
  const pendingRequests = bookings.filter((b) => b.status === 'REQUESTED');
  const totalFleetRevenue = bookings
    .filter((b) => b.paymentStatus === 'PAID')
    .reduce((acc, b) => acc + (b.totalAmount - b.platformFee), 0);

  // Revenue Chart Data for Recharts
  const weeklyRevenueData = [
    { day: 'Mon', revenue: 4200, hours: 5 },
    { day: 'Tue', revenue: 7600, hours: 9 },
    { day: 'Wed', revenue: 6100, hours: 7 },
    { day: 'Thu', revenue: 8500, hours: 10 },
    { day: 'Fri', revenue: 5400, hours: 6 },
    { day: 'Sat', revenue: 9800, hours: 12 },
    { day: 'Sun', revenue: 11200, hours: 14 },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
              Fleet Owner & CHC Hub
            </span>
            <span className="text-xs text-slate-400">
              📍 {currentUser?.village || 'Bagru Rural'}, Jaipur
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {currentUser?.name || 'Vikram Singh Shekhawat'} 🚜
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Monitor machinery health, respond to farmer booking requests, assign certified drivers, and track daily earnings.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/owner/equipment"
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <Tractor className="w-4 h-4" />
            <span>Add New Equipment</span>
          </Link>
          <Link
            to="/owner/bookings"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 border border-white/20"
          >
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
            <span>View {pendingRequests.length} Pending Requests</span>
          </Link>
        </div>
      </div>

      {/* 6 Core Owner Metrics Cards (Requirement 6) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Fleet Total</span>
            <Tractor className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{equipment.length} Units</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Tractors & Rotavators</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Available</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {equipment.filter((e) => e.availabilityStatus === 'AVAILABLE').length}
          </div>
          <span className="text-[10px] text-slate-500">Ready for instant dispatch</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Rentals</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{activeRentals.length}</div>
          <span className="text-[10px] text-amber-600 font-semibold">On Field in Bagru</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Today's Jobs</span>
            <CalendarCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">2</div>
          <span className="text-[10px] text-slate-500">Pickup OTPs Issued</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Monthly Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalFleetRevenue}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">+22% vs last month</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Requests</span>
            <AlertTriangle className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-700">{pendingRequests.length}</div>
          <span className="text-[10px] text-purple-700 font-semibold">Requires acceptance</span>
        </div>
      </div>

      {/* High Demand Alert Banner (Requirement 6-6) */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-400/50 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shrink-0 shadow-md">
            <TrendingUp className="w-6 h-6 animate-bounce" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                Surge Radar
              </span>
              <span className="text-xs text-amber-800 font-semibold">High Demand Detected</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              High demand detected for Tractor + Rotavator within 15 km of Bagru
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              32 unfulfilled farmer requests logged for Rabi wheat sowing. Average rental rate: <strong>₹850/hr</strong>. Potential revenue opportunity: <strong>₹48,000+</strong> this week.
            </p>
          </div>
        </div>

        <Link
          to="/owner/demand"
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-colors shrink-0 shadow-md shadow-amber-600/30 flex items-center space-x-1"
        >
          <span>View Demand Heatmap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Revenue Chart & Maintenance Overview (Requirement 6-7, 6-8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Revenue Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Financial Performance</span>
              <h3 className="text-base font-bold text-slate-900">Weekly Fleet Rental Earnings</h3>
            </div>
            <Link to="/owner/revenue" className="text-xs font-bold text-emerald-700 hover:underline">
              Full Analytics
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(val: any) => [`₹${val}`, 'Daily Revenue']}
                  contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="revenue" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Equipment Health & Service Schedule */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Preventative Maintenance</span>
                <h3 className="text-base font-bold text-slate-900">Fleet Health Monitor</h3>
              </div>
              <Link to="/owner/maintenance" className="text-xs font-bold text-emerald-700 hover:underline">
                View Log
              </Link>
            </div>

            <div className="space-y-3">
              {equipment.map((eq) => (
                <div key={eq.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900 truncate max-w-[200px]">{eq.name}</h4>
                    <span className="text-xs font-black text-emerald-700">{eq.healthPercentage}% Health</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${eq.healthPercentage}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{eq.operatingHours} hrs logged</span>
                    <span>Next Due: {eq.nextServiceDue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/owner/maintenance"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs text-center transition-colors block"
          >
            Log Maintenance & Service
          </Link>
        </div>
      </div>
    </div>
  );
};
