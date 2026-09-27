import React, { useState, useEffect } from 'react';
import {
  Tractor,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  AlertTriangle,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { api } from '../../services/api';
import { Booking } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { MapComponent } from '../../components/MapComponent';
import { EmergencyModal } from '../../components/EmergencyModal';

export const FarmerBookings: React.FC = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (currentUser) {
      api.getBookings('FARMER', currentUser.id).then((bList) => {
        setBookings(bList);
        if (bList.length > 0) {
          setSelectedBooking(bList[0]);
        }
      });
    }
  }, [currentUser]);

  const handleRate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBooking) {
      const updated = await api.rateBooking(selectedBooking.id, ratingVal, reviewText);
      setSelectedBooking(updated);
      setReviewSubmitted(true);
      // update in list
      setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Completed</span>;
      case 'EQUIPMENT_PICKED_UP':
      case 'ON_THE_WAY':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 animate-pulse">En Route to Farm</span>;
      case 'DRIVER_ASSIGNED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">Driver Assigned</span>;
      case 'REQUESTED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Request Sent</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Handover & Trip Tracking
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Farmer Rentals & Live Tracking</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Track equipment location, view OTP credentials for secure driver handovers, and rate completed rentals.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Tractor className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No bookings logged yet</h3>
          <p className="text-xs text-slate-500 mt-1">Start by searching nearby equipment and booking a tractor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bookings List */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Your Booking History ({bookings.length})
            </span>

            {bookings.map((b) => {
              const isSelected = selectedBooking?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  className={`bg-white rounded-3xl p-4 sm:p-5 border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start space-x-3.5">
                    <img
                      src={b.equipmentImage}
                      alt={b.equipmentName}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">#{b.id}</span>
                        {getStatusBadge(b.status)}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{b.equipmentName}</h4>
                      <div className="text-xs text-slate-500">
                        {b.cropType} • {b.farmAreaAcres} Acres
                      </div>
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="font-black text-slate-900">₹{b.totalAmount}</span>
                        <span className="text-[11px] text-emerald-700 font-semibold">{b.startDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Tracking & OTP Handover Inspector */}
          {selectedBooking && (
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-slate-900">{selectedBooking.equipmentName}</h3>
                      {getStatusBadge(selectedBooking.status)}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Booked for {selectedBooking.farmAreaAcres} acres on {selectedBooking.startDate} ({selectedBooking.timeSlot})
                    </p>
                  </div>

                  <button
                    onClick={() => setEmergencyOpen(true)}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold border border-red-200 flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Emergency SOS</span>
                  </button>
                </div>

                {/* Handover OTP Credentials Card (Crucial for SIH demo Step 9, 16, 19) */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-inner space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Handover OTP Credentials
                    </span>
                    <span className="text-[10px] text-slate-400">Two-Factor Safe Transit Protocol</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-slate-300 uppercase font-semibold">
                        Pickup OTP
                      </span>
                      <div className="text-2xl font-black text-amber-400 tracking-widest my-0.5">
                        {selectedBooking.pickupOtp}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {selectedBooking.isPickupOtpVerified ? '✓ Verified at Hub' : 'Give to Driver at Pickup'}
                      </span>
                    </div>

                    <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-slate-300 uppercase font-semibold">
                        Delivery OTP
                      </span>
                      <div className="text-2xl font-black text-emerald-400 tracking-widest my-0.5">
                        {selectedBooking.deliveryOtp}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {selectedBooking.isDeliveryOtpVerified ? '✓ Verified on Farm' : 'Give to Driver when Done'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Route Navigation Map (Leaflet) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Live Driver & Equipment GPS Tracking</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Live Signal Received
                    </span>
                  </div>
                  <MapComponent
                    center={[selectedBooking.farmerLocation.lat, selectedBooking.farmerLocation.lng]}
                    zoom={14}
                    showRoute={true}
                    routeCoordinates={[
                      [selectedBooking.pickupLocation.lat, selectedBooking.pickupLocation.lng],
                      [selectedBooking.currentLocation?.lat ?? 26.8140, selectedBooking.currentLocation?.lng ?? 75.5505],
                      [selectedBooking.farmerLocation.lat, selectedBooking.farmerLocation.lng],
                    ]}
                    markers={[
                      {
                        id: 'm-pickup',
                        type: 'EQUIPMENT',
                        title: 'Equipment Hub (Pickup)',
                        subtitle: selectedBooking.pickupLocation.address,
                        lat: selectedBooking.pickupLocation.lat,
                        lng: selectedBooking.pickupLocation.lng,
                      },
                      {
                        id: 'm-driver',
                        type: 'DRIVER',
                        title: `Driver: ${selectedBooking.driverName || 'Rajesh Gurjar'}`,
                        subtitle: 'En Route with Mahindra 575 DI',
                        lat: selectedBooking.currentLocation?.lat ?? 26.8140,
                        lng: selectedBooking.currentLocation?.lng ?? 75.5505,
                      },
                      {
                        id: 'm-farmer',
                        type: 'FARMER',
                        title: 'Your Farm Plot',
                        subtitle: selectedBooking.farmerLocation.address,
                        lat: selectedBooking.farmerLocation.lat,
                        lng: selectedBooking.farmerLocation.lng,
                      },
                    ]}
                    height="300px"
                  />
                </div>

                {/* Stakeholder Info & Driver Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Equipment Owner</span>
                    <div className="font-bold text-slate-900 text-sm">{selectedBooking.ownerName}</div>
                    <div className="text-slate-500">{selectedBooking.ownerPhone}</div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Assigned Driver</span>
                    <div className="font-bold text-slate-900 text-sm">
                      {selectedBooking.driverName || 'Rajesh Gurjar (Verified)'}
                    </div>
                    <div className="text-slate-500">{selectedBooking.driverPhone || '+91 97850 11111'}</div>
                  </div>
                </div>

                {/* Rate & Review Box (If Completed) */}
                {selectedBooking.status === 'COMPLETED' && (
                  <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <h4 className="font-bold text-slate-900 text-sm">Rate Your Rental Experience</h4>
                    </div>

                    {selectedBooking.rating || reviewSubmitted ? (
                      <div className="text-xs text-emerald-900 bg-white p-3 rounded-xl border border-emerald-200">
                        <div className="flex items-center gap-1 font-bold text-amber-600">
                          {'★'.repeat(selectedBooking.rating || ratingVal)}
                          <span className="ml-1 text-slate-700">({selectedBooking.rating || ratingVal} Stars Given)</span>
                        </div>
                        <p className="mt-1 text-slate-600">
                          "{selectedBooking.reviewComment || reviewText || 'Superb tractor condition!'}"
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleRate} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-600 font-semibold">Stars:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setRatingVal(star)}
                              className="text-lg text-amber-500 hover:scale-110 transition-transform"
                            >
                              {star <= ratingVal ? '★' : '☆'}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="How was the equipment condition and driver operator?"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                        >
                          Submit Rating & Review
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        bookingContext={{
          bookingId: selectedBooking?.id,
          ownerPhone: selectedBooking?.ownerPhone,
          driverPhone: selectedBooking?.driverPhone,
          farmerPhone: selectedBooking?.farmerPhone,
        }}
      />
    </div>
  );
};
