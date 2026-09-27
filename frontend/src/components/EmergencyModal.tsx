import React, { useState } from 'react';
import { AlertTriangle, Phone, ShieldAlert, CheckCircle2, X, Wrench, Fuel, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingContext?: {
    bookingId?: string;
    ownerPhone?: string;
    driverPhone?: string;
    farmerPhone?: string;
  };
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, bookingContext }) => {
  const { currentUser } = useAuth();
  const [issueType, setIssueType] = useState('MECHANICAL_BREAKDOWN');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<{
    message: string;
    helpline: string;
    assignedOfficer: string;
    officerPhone: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleTransmitSOS = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await api.triggerEmergencyAlert({
      userId: currentUser?.id || 'unknown',
      userName: currentUser?.name || 'Farmer',
      userPhone: currentUser?.phone || '+91 98290 12345',
      role: currentUser?.role || 'FARMER',
      issueType,
      description: description || 'Immediate assistance requested on active field',
      lat: 26.8124,
      lng: 75.5488,
      locationName: `${currentUser?.village || 'Bagru'}, ${currentUser?.district || 'Jaipur'}`,
    });

    setIsSubmitting(false);
    setSuccessResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-red-200 max-w-lg w-full overflow-hidden text-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <ShieldAlert className="w-7 h-7 text-white animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-bold">AgriShare Emergency Support</h3>
              <p className="text-red-100 text-xs font-medium">24x7 Rural Machinery & Field SOS Assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          {successResult ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-pulse" />
              <h4 className="text-lg font-bold text-emerald-900">{successResult.message}</h4>
              <div className="text-sm text-slate-700 bg-white p-4 rounded-xl shadow-sm border border-emerald-100 space-y-1.5 text-left">
                <p>
                  <strong>Assigned Response Officer:</strong> {successResult.assignedOfficer}
                </p>
                <p>
                  <strong>Direct Mobile:</strong>{' '}
                  <a href={`tel:${successResult.officerPhone}`} className="text-emerald-700 font-bold underline">
                    {successResult.officerPhone}
                  </a>
                </p>
                <p>
                  <strong>National Kisan Helpline:</strong>{' '}
                  <span className="font-bold text-red-600">{successResult.helpline}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <>
              {/* Quick Helplines Grid */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:18001801551"
                  className="flex items-center space-x-3 p-3.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-2xl text-left transition-colors group"
                >
                  <div className="p-2 bg-red-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-red-600 font-semibold uppercase">Toll-Free 24x7</div>
                    <div className="text-sm font-bold text-slate-900">1800-180-1551</div>
                  </div>
                </a>

                <a
                  href="tel:112"
                  className="flex items-center space-x-3 p-3.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-2xl text-left transition-colors group"
                >
                  <div className="p-2 bg-amber-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-700 font-semibold uppercase">State Emergency</div>
                    <div className="text-sm font-bold text-slate-900">112 (National SOS)</div>
                  </div>
                </a>
              </div>

              {/* Direct Booking Stakeholder Contacts */}
              {bookingContext && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2 text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-500">Booking Contacts</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {bookingContext.ownerPhone && (
                      <a
                        href={`tel:${bookingContext.ownerPhone}`}
                        className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium text-slate-700 hover:text-emerald-700 flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" /> Call Owner ({bookingContext.ownerPhone})
                      </a>
                    )}
                    {bookingContext.driverPhone && (
                      <a
                        href={`tel:${bookingContext.driverPhone}`}
                        className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium text-slate-700 hover:text-emerald-700 flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" /> Call Driver ({bookingContext.driverPhone})
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Instant Incident Reporting Form */}
              <form onSubmit={handleTransmitSOS} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Select Breakdown / Emergency Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'MECHANICAL_BREAKDOWN', label: 'Tractor Breakdown', icon: Wrench },
                      { id: 'FUEL_LEAKAGE', label: 'Fuel / Hydraulic Leak', icon: Fuel },
                      { id: 'ACCIDENT_ROAD', label: 'Transport Jam / Road', icon: Truck },
                      { id: 'OPERATOR_INJURY', label: 'Medical / Injury', icon: ShieldAlert },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const active = issueType === opt.id;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setIssueType(opt.id)}
                          className={`flex items-center space-x-2 p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                            active
                              ? 'bg-red-500 text-white border-red-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Describe Incident / Exact Landmark
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Hydraulic pump pressure loss near canal road, Bagru plot..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>GPS Coordinates will be shared with the nearest mobile technician unit</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                  <span>{isSubmitting ? 'Transmitting SOS Signal...' : 'Transmit Emergency SOS Alert'}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
