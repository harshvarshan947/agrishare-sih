import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Phone,
} from 'lucide-react';
import { api } from '../../services/api';
import { Booking } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { EmergencyModal } from '../../components/EmergencyModal';

export const DriverDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  useEffect(() => {
    api.getBookings('DRIVER', 'driver-1').then(setJobs);
  }, []);

  const activeJobs = jobs.filter((j) => j.status !== 'COMPLETED' && j.status !== 'CANCELLED');
  const completedJobs = jobs.filter((j) => j.status === 'COMPLETED');
  const todayEarnings = 1800; // 2 jobs * ₹900

  return (
    <div className="space-y-8 text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
              Certified Machinery Operator
            </span>
            <span className="text-xs text-amber-100">
              📍 {currentUser?.village || 'Bagru'}, Jaipur
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Namaste, {currentUser?.name || 'Rajesh Gurjar'}! 🚚
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm max-w-xl">
            You have active equipment transit and field operation assignments today. Verify handover OTPs to record completed acres.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/driver/jobs"
            className="px-4 py-2.5 bg-white text-slate-900 font-bold rounded-xl text-xs hover:bg-amber-50 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Truck className="w-4 h-4 text-amber-600" />
            <span>View Today's Jobs</span>
          </Link>
          <button
            onClick={() => setEmergencyOpen(true)}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-red-600/30"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Driver SOS</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Today's Jobs</span>
            <Truck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">2 Jobs</div>
          <span className="text-xs text-amber-700 font-semibold">1 In Transit</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Today's Pay</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">₹{todayEarnings}</div>
          <span className="text-xs text-slate-500">₹150/hr base operator fee</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{completedJobs.length + 56}</div>
          <span className="text-xs text-slate-500">Lifetime Verified Jobs</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Operator Rating</span>
            <CheckCircle2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">4.95 ★</div>
          <span className="text-xs text-emerald-700 font-semibold">Top Operator Award</span>
        </div>
      </div>

      {/* Active Job Alert Card */}
      {activeJobs.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-400 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <h3 className="font-bold text-sm text-slate-900">Active Job in Progress</h3>
            </div>
            <Link
              to="/driver/jobs"
              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
            >
              <span>Manage Job Pipeline & Enter OTP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <h4 className="font-bold text-slate-900 text-base">{activeJobs[0].equipmentName}</h4>
              <p className="text-xs text-slate-500">
                Farmer: {activeJobs[0].farmerName} ({activeJobs[0].farmerVillage})
              </p>
              <div className="text-xs font-semibold text-emerald-700 mt-1">
                Field Area: {activeJobs[0].farmAreaAcres} Acres ({activeJobs[0].cropType})
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs space-y-1">
              <div className="font-bold text-amber-900 uppercase text-[10px]">Current Status</div>
              <div className="text-base font-black text-slate-900">
                {activeJobs[0].status.replace(/_/g, ' ')}
              </div>
              <div className="text-[11px] text-slate-500">Next: Farmer OTP Handover</div>
            </div>

            <div className="flex gap-2">
              <Link
                to="/driver/map"
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Open GPS Route</span>
              </Link>
              <Link
                to="/driver/jobs"
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-1.5"
              >
                <span>Verify OTPs</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          to="/driver/jobs"
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Today's Job Pipeline</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Step through pickup, equipment inspection, and farmer delivery handovers.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 mt-4 flex items-center gap-1">
            Open Pipeline <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/driver/map"
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Route & GPS Navigation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Live turn-by-turn simulation: Hub pickup to farmer agricultural plot.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 mt-4 flex items-center gap-1">
            View Route Map <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/driver/earnings"
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Driver Payouts & Tips</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Daily earnings ledger, per-job breakdown, and same-day UPI transfer.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 mt-4 flex items-center gap-1">
            Check Earnings <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </div>
  );
};
