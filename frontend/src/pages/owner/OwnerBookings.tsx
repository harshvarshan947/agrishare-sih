import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Truck,
  Tractor,
  MapPin,
  Clock,
  DollarSign,
  User,
  Sparkles,
  Phone,
} from 'lucide-react';
import { api } from '../../services/api';
import { Booking } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const OwnerBookings: React.FC = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState('driver-1');

  useEffect(() => {
    api.getBookings('OWNER', 'owner-1').then(setBookings);
    api.getUsers().then((uList) => {
      setDrivers(uList.filter((u) => u.role === 'DRIVER'));
    });
  }, []);

  const handleAcceptBooking = async (b: Booking) => {
    const driverObj = drivers.find((d) => d.id === selectedDriverId) || drivers[0];
    const updated = await api.updateBookingStatus(b.id, 'ACCEPTED', {
      driverId: driverObj?.id || 'driver-1',
      driverName: driverObj?.name || 'Rajesh Gurjar',
      driverPhone: driverObj?.phone || '+91 97850 11111',
    });
    setBookings((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleAssignDriver = async (b: Booking) => {
    const driverObj = drivers.find((d) => d.id === selectedDriverId) || drivers[0];
    const updated = await api.updateBookingStatus(b.id, 'DRIVER_ASSIGNED', {
      driverId: driverObj?.id || 'driver-1',
      driverName: driverObj?.name || 'Rajesh Gurjar',
      driverPhone: driverObj?.phone || '+91 97850 11111',
    });
    setBookings((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleRejectBooking = async (b: Booking) => {
    const updated = await api.updateBookingStatus(b.id, 'REJECTED');
    setBookings((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Reservations & Dispatch
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Incoming Booking Requests</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Review farmer field acreage, confirm equipment reservations, and assign certified machine drivers.
        </p>
      </div>

      {/* Driver Assignment Dropdown Bar for Owner */}
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-emerald-700" />
          <span className="font-bold text-emerald-950">Default Certified Driver to Assign:</span>
        </div>
        <select
          value={selectedDriverId}
          onChange={(e) => setSelectedDriverId(e.target.value)}
          className="p-2 bg-white border border-emerald-300 rounded-xl font-bold text-slate-800 focus:outline-none"
        >
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.village} • {d.rating} ★ DL Verified)
            </option>
          ))}
        </select>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((b) => {
          const isRequested = b.status === 'REQUESTED';
          const isAccepted = b.status === 'ACCEPTED';
          const isAssigned = b.status === 'DRIVER_ASSIGNED' || b.status === 'EQUIPMENT_PICKED_UP' || b.status === 'ON_THE_WAY';

          return (
            <div
              key={b.id}
              className={`bg-white rounded-3xl p-6 border shadow-xs transition-all space-y-4 ${
                isRequested
                  ? 'border-purple-400 ring-2 ring-purple-400/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={b.equipmentImage}
                    alt={b.equipmentName}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold text-slate-400">#{b.id}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        b.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : isRequested
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{b.equipmentName}</h3>

                    <div className="text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                      <span>👨‍🌾 Farmer: <strong>{b.farmerName}</strong></span>
                      <span>📍 Field: <strong>{b.farmerVillage}</strong></span>
                      <span>🌾 Area: <strong>{b.farmAreaAcres} Acres</strong> ({b.cropType})</span>
                      <span>📅 Date: <strong>{b.startDate}</strong> ({b.timeSlot})</span>
                    </div>

                    {b.driverRequired && (
                      <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Driver Requested: {b.driverName || 'Not yet assigned'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Earnings & Actions */}
                <div className="flex flex-col items-start lg:items-end space-y-3 w-full lg:w-auto shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Estimated Earnings</span>
                    <div className="text-2xl font-black text-emerald-700">
                      ₹{b.totalAmount - b.platformFee}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isRequested && (
                      <>
                        <button
                          onClick={() => handleAcceptBooking(b)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1 shadow-md shadow-emerald-600/20"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept Request</span>
                        </button>
                        <button
                          onClick={() => handleRejectBooking(b)}
                          className="px-3 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold rounded-xl text-xs"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {isAccepted && (
                      <button
                        onClick={() => handleAssignDriver(b)}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1 shadow-md shadow-sky-600/20"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Dispatch / Assign Driver</span>
                      </button>
                    )}

                    {isAssigned && (
                      <div className="text-xs bg-slate-50 p-2 rounded-xl border border-slate-200 font-medium text-slate-600">
                        Driver {b.driverName} dispatched. Pickup OTP: <strong>{b.pickupOtp}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
