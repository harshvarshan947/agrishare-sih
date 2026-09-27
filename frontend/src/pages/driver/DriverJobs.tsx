import React, { useState, useEffect } from 'react';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Key,
  Camera,
  ArrowRight,
  Phone,
  AlertTriangle,
  Upload,
} from 'lucide-react';
import { api } from '../../services/api';
import { Booking, BookingStatus } from '../../types';
import { EmergencyModal } from '../../components/EmergencyModal';

export const DriverJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [selectedJob, setSelectedJob] = useState<Booking | null>(null);

  // OTP State
  const [pickupInputOtp, setPickupInputOtp] = useState('');
  const [deliveryInputOtp, setDeliveryInputOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  useEffect(() => {
    api.getBookings('DRIVER', 'driver-1').then((jList) => {
      setJobs(jList);
      if (jList.length > 0) {
        setSelectedJob(jList[0]);
      }
    });
  }, []);

  // Status Pipeline Progression
  const handleUpdateStatus = async (newStatus: BookingStatus) => {
    if (!selectedJob) return;
    const updated = await api.updateBookingStatus(selectedJob.id, newStatus);
    setSelectedJob(updated);
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
  };

  const handleVerifyPickupOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setOtpSuccess('');

    if (!selectedJob) return;
    const res = await api.verifyOtp(selectedJob.id, 'PICKUP', pickupInputOtp || '4821');
    if (res.success) {
      setOtpSuccess(res.message);
      // reload
      const refreshed = await api.getBookingById(selectedJob.id);
      if (refreshed) {
        setSelectedJob(refreshed);
        setJobs((prev) => prev.map((j) => (j.id === refreshed.id ? refreshed : j)));
      }
    } else {
      setOtpError(res.message);
    }
  };

  const handleVerifyDeliveryOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setOtpSuccess('');

    if (!selectedJob) return;
    const res = await api.verifyOtp(selectedJob.id, 'DELIVERY', deliveryInputOtp || '7394');
    if (res.success) {
      setOtpSuccess(res.message);
      const refreshed = await api.getBookingById(selectedJob.id);
      if (refreshed) {
        setSelectedJob(refreshed);
        setJobs((prev) => prev.map((j) => (j.id === refreshed.id ? refreshed : j)));
      }
    } else {
      setOtpError(res.message);
    }
  };

  const pipelineStages: { id: BookingStatus; label: string; step: number }[] = [
    { id: 'DRIVER_ASSIGNED', label: 'Assigned', step: 1 },
    { id: 'ACCEPTED', label: 'Accepted', step: 2 },
    { id: 'GOING_TO_PICKUP', label: 'Going to Pickup', step: 3 },
    { id: 'REACHED_PICKUP', label: 'Reached Pickup Hub', step: 4 },
    { id: 'EQUIPMENT_PICKED_UP', label: 'Equipment Picked Up', step: 5 },
    { id: 'ON_THE_WAY', label: 'On The Way to Farm', step: 6 },
    { id: 'REACHED_FARMER', label: 'Reached Farmer Field', step: 7 },
    { id: 'COMPLETED', label: 'Work Completed', step: 8 },
  ];

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            Driver Job Pipeline
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">Active Field Jobs & Handover OTPs</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Execute safe equipment pickups and deliveries. OTP verification is strictly required at both milestones.
          </p>
        </div>

        <button
          onClick={() => setEmergencyOpen(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-red-600/30"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Emergency Assistance</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Job Selector */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Assigned Jobs ({jobs.length})
          </span>

          {jobs.map((job) => {
            const isSelected = selectedJob?.id === job.id;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white rounded-3xl p-5 border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <img
                    src={job.equipmentImage}
                    alt={job.equipmentName}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">#{job.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        {job.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 truncate">{job.equipmentName}</h4>
                    <div className="text-xs text-slate-500">
                      Farmer: <strong>{job.farmerName}</strong> ({job.farmerVillage})
                    </div>
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="font-bold text-emerald-700">₹{job.driverAmount} Driver Pay</span>
                      <span className="text-slate-500 font-medium">{job.farmAreaAcres} Acres</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Execution Stage Pipeline & OTP Form */}
        {selectedJob && (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{selectedJob.equipmentName}</h3>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Payout: ₹{selectedJob.driverAmount}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-4">
                  <span>From: <strong>{selectedJob.pickupLocation.address}</strong></span>
                  <span>To: <strong>{selectedJob.farmerLocation.address}</strong></span>
                </div>
              </div>

              {/* Status Pipeline Visual Indicator (Requirement 7-4) */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Job Pipeline Progress
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {pipelineStages.map((stg) => {
                    const isDone =
                      stg.id === selectedJob.status ||
                      (selectedJob.status === 'COMPLETED' && true) ||
                      (selectedJob.status === 'EQUIPMENT_PICKED_UP' && stg.step <= 5) ||
                      (selectedJob.status === 'ON_THE_WAY' && stg.step <= 6) ||
                      (selectedJob.status === 'REACHED_FARMER' && stg.step <= 7);

                    return (
                      <div
                        key={stg.id}
                        className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                          selectedJob.status === stg.id
                            ? 'bg-amber-500 text-white border-amber-600 font-bold shadow-xs'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200 font-medium'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        <span className="text-[10px] opacity-75">Step {stg.step}</span>
                        <span className="text-[11px] leading-tight mt-0.5">{stg.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pipeline Progression Buttons */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                  Advance Trip Stage (Simulation)
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdateStatus('GOING_TO_PICKUP')}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 font-bold"
                  >
                    Going to Pickup Hub
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('REACHED_PICKUP')}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 font-bold"
                  >
                    Reached Pickup Hub
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('ON_THE_WAY')}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 font-bold"
                  >
                    En Route to Farm
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('REACHED_FARMER')}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 font-bold"
                  >
                    Reached Farmer Field
                  </button>
                </div>
              </div>

              {/* OTP Handover Verification Card (Requirement 7-5) */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Key className="w-4 h-4" />
                    <span>Two-Step OTP Verification (Driver)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">SIH Safe Delivery Protocol</span>
                </div>

                {otpSuccess && (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-xs text-emerald-200 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{otpSuccess}</span>
                  </div>
                )}

                {otpError && (
                  <div className="p-3 bg-red-500/20 border border-red-400/40 rounded-xl text-xs text-red-200 font-semibold">
                    {otpError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Step A: Pickup OTP Form */}
                  <div className={`p-4 rounded-2xl border ${
                    selectedJob.isPickupOtpVerified ? 'bg-emerald-950/60 border-emerald-500/40' : 'bg-white/5 border-white/10'
                  }`}>
                    <span className="text-[11px] text-slate-300 font-semibold block mb-1">
                      1. Pickup OTP (Provided by Owner)
                    </span>
                    {selectedJob.isPickupOtpVerified ? (
                      <div className="text-emerald-400 font-bold text-xs flex items-center gap-1 pt-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Pickup Verified (Code: {selectedJob.pickupOtp})</span>
                      </div>
                    ) : (
                      <form onSubmit={handleVerifyPickupOtp} className="space-y-2 mt-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={pickupInputOtp}
                            onChange={(e) => setPickupInputOtp(e.target.value)}
                            placeholder="Enter 4821"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shrink-0"
                          >
                            Verify
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          Tip: Enter <strong>4821</strong> for SIH demo verification
                        </span>
                      </form>
                    )}
                  </div>

                  {/* Step B: Delivery OTP Form */}
                  <div className={`p-4 rounded-2xl border ${
                    selectedJob.isDeliveryOtpVerified ? 'bg-emerald-950/60 border-emerald-500/40' : 'bg-white/5 border-white/10'
                  }`}>
                    <span className="text-[11px] text-slate-300 font-semibold block mb-1">
                      2. Delivery OTP (Provided by Farmer)
                    </span>
                    {selectedJob.isDeliveryOtpVerified ? (
                      <div className="text-emerald-400 font-bold text-xs flex items-center gap-1 pt-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Delivery Verified (Code: {selectedJob.deliveryOtp})</span>
                      </div>
                    ) : (
                      <form onSubmit={handleVerifyDeliveryOtp} className="space-y-2 mt-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            disabled={!selectedJob.isPickupOtpVerified}
                            value={deliveryInputOtp}
                            onChange={(e) => setDeliveryInputOtp(e.target.value)}
                            placeholder={selectedJob.isPickupOtpVerified ? 'Enter 7394' : 'Unlock after pickup'}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 disabled:opacity-40"
                          />
                          <button
                            type="submit"
                            disabled={!selectedJob.isPickupOtpVerified}
                            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-slate-950 font-black rounded-xl text-xs shrink-0"
                          >
                            Complete
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          Tip: Enter <strong>7394</strong> to finalize job
                        </span>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              {/* Upload Evidence Section (Requirement 7-6) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-slate-500" />
                  <span>Equipment Inspection & Field Handover Photo Evidence</span>
                </span>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="border border-dashed border-slate-300 p-3 rounded-xl bg-white text-slate-500 flex flex-col items-center justify-center space-y-1">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Pickup Machine Photo</span>
                  </div>
                  <div className="border border-dashed border-slate-300 p-3 rounded-xl bg-white text-slate-500 flex flex-col items-center justify-center space-y-1">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Delivery Field Photo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </div>
  );
};
