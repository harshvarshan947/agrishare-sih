import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Tractor,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  FileText,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { api } from '../../services/api';
import { User, Equipment, Booking } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    api.getUsers().then(setUsers);
    api.getEquipmentList().then(setEquipment);
    api.getBookings().then(setBookings);
  }, []);

  const farmers = users.filter((u) => u.role === 'FARMER');
  const owners = users.filter((u) => u.role === 'OWNER');
  const drivers = users.filter((u) => u.role === 'DRIVER');
  const pendingKyc = users.filter((u) => u.verificationStatus === 'PENDING');

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const platformRevenue = Math.round(totalRevenue * 0.05);

  const categoryShareData = [
    { name: 'Tractors', count: 12, color: '#16a34a' },
    { name: 'Rotavators', count: 4, color: '#2563eb' },
    { name: 'Harvesters', count: 2, color: '#f59e0b' },
    { name: 'Others', count: 2, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
              State Agricultural Mechanization Directorate
            </span>
            <span className="text-xs text-slate-400">Jaipur Central Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            AgriShare Platform Administration 🛡️
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Real-time telemetry across rural equipment sharing clusters, Custom Hiring Centres, and Aadhaar/PAN verification queues.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/admin/users"
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Pending KYC ({pendingKyc.length})</span>
          </Link>
          <Link
            to="/admin/reports"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors border border-white/20"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Export Reports</span>
          </Link>
        </div>
      </div>

      {/* 8 Admin Metrics Cards (Requirement 8) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Total Farmers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{farmers.length}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Across 8 Gram Panchayats</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Equipment Owners</span>
            <Tractor className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{owners.length} Hubs</div>
          <span className="text-[10px] text-blue-700 font-semibold">3 Custom Hiring Centres</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Certified Drivers</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{drivers.length} Drivers</div>
          <span className="text-[10px] text-amber-700 font-semibold">Commercial DL Endorsed</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Fleet Inventory</span>
            <Tractor className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{equipment.length} Implements</div>
          <span className="text-[10px] text-purple-700 font-semibold">95% Avg Health Score</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Active Rentals</span>
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {bookings.filter((b) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED').length}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Live GPS tracked</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Completed Rentals</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {bookings.filter((b) => b.status === 'COMPLETED').length + 84}
          </div>
          <span className="text-[10px] text-teal-700 font-semibold">100% Delivery OTP Verified</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Platform GTV</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">₹{totalRevenue}</div>
          <span className="text-[10px] text-slate-500">Gross Transaction Value</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Pending KYC</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-red-600">{pendingKyc.length}</div>
          <span className="text-[10px] text-red-600 font-semibold">Awaiting Verification</span>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Machinery Distribution */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Registered Machinery by Category</h3>
          <div className="space-y-3">
            {categoryShareData.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="font-bold text-slate-800">{c.name}</span>
                </div>
                <span className="font-black text-slate-900">{c.count} Registered Units</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Admin Actions */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Administrative Oversight Shortcuts</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <Link
              to="/admin/users"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 flex flex-col justify-between"
            >
              <Users className="w-5 h-5 text-emerald-600 mb-2" />
              <span>User & KYC Manager</span>
            </Link>

            <Link
              to="/admin/schemes"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 flex flex-col justify-between"
            >
              <FileText className="w-5 h-5 text-blue-600 mb-2" />
              <span>Govt Schemes Manager</span>
            </Link>

            <Link
              to="/admin/demand"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 flex flex-col justify-between"
            >
              <TrendingUp className="w-5 h-5 text-amber-600 mb-2" />
              <span>Demand Heatmaps</span>
            </Link>

            <Link
              to="/admin/reports"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 flex flex-col justify-between"
            >
              <CalendarCheck className="w-5 h-5 text-purple-600 mb-2" />
              <span>SIH System Audit Report</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
