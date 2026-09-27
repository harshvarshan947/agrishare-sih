import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Tractor,
  MapPin,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Calendar,
  Clock,
  Fuel,
  Wrench,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { api } from '../services/api';
import { Equipment } from '../types';
import { useAuth } from '../context/AuthContext';

export const EquipmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, currentRole } = useAuth();

  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking Modal / Form State
  const [isBookingOpen, setIsBookingOpen] = useState(searchParams.get('action') === 'book');
  const [bookingType, setBookingType] = useState<'ACRE_BASED' | 'HOURLY'>('ACRE_BASED');
  const [farmArea, setFarmArea] = useState<number>(8);
  const [hours, setHours] = useState<number>(6);
  const [startDate, setStartDate] = useState<string>('2026-09-28');
  const [timeSlot, setTimeSlot] = useState<string>('07:00 AM - 01:00 PM');
  const [cropType, setCropType] = useState<string>('Wheat (Rabi)');
  const [driverRequired, setDriverRequired] = useState<boolean>(true);
  const [fuelRequired, setFuelRequired] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'CASH'>('UPI');
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);

  useEffect(() => {
    if (id) {
      api.getEquipmentById(id).then((eq) => {
        if (eq) {
          setEquipment(eq);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center text-slate-500">Loading equipment specifications...</div>;
  }

  if (!equipment) {
    return (
      <div className="py-20 text-center text-slate-700">
        <h2 className="text-xl font-bold">Equipment not found</h2>
        <button
          onClick={() => navigate('/equipment')}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  // Price Calculation Engine
  const baseRate = bookingType === 'ACRE_BASED' ? equipment.pricePerAcre * farmArea : equipment.pricePerHour * hours;
  const driverCharge = driverRequired ? (equipment.driverRatePerHour || 150) * (bookingType === 'ACRE_BASED' ? Math.max(4, farmArea * 0.75) : hours) : 0;
  const fuelCharge = fuelRequired ? 120 * (bookingType === 'ACRE_BASED' ? Math.max(4, farmArea * 0.75) : hours) : 0;
  const platformFee = 150;
  const totalAmount = Math.round(baseRate + driverCharge + fuelCharge + platformFee);

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      navigate('/login');
      return;
    }

    const newBooking = await api.createBooking({
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      farmerVillage: currentUser.village,
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      equipmentImage: equipment.images[0],
      equipmentCategory: equipment.category,
      ownerId: equipment.ownerId,
      ownerName: equipment.ownerName,
      ownerPhone: equipment.ownerPhone,
      startDate,
      endDate: startDate,
      timeSlot,
      cropType,
      farmAreaAcres: farmArea,
      bookingType,
      hoursBooked: hours,
      driverRequired,
      fuelRequired,
      baseAmount: baseRate,
      driverAmount: driverCharge,
      fuelAmount: fuelCharge,
      platformFee,
      discountAmount: 0,
      totalAmount,
      paymentMethod,
    });

    setBookingSuccess(newBooking);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Equipment List</span>
        </button>

        {/* Hero Product Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Images & Health */}
          <div className="lg:col-span-7 space-y-4">
            <div className="h-80 sm:h-96 rounded-2xl overflow-hidden relative shadow-md">
              <img
                src={equipment.images[0]}
                alt={equipment.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-slate-900/85 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                {equipment.category}
              </span>
              <span className="absolute bottom-4 right-4 bg-emerald-600 text-white text-sm font-black px-3 py-1.5 rounded-xl shadow-lg">
                ₹{equipment.pricePerHour}/hr • ₹{equipment.pricePerAcre}/acre
              </span>
            </div>

            {/* Thumbnails if multiple */}
            {equipment.images.length > 1 && (
              <div className="flex gap-3">
                {equipment.images.map((img, i) => (
                  <div key={i} className="w-20 h-16 rounded-xl overflow-hidden border-2 border-emerald-500">
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Health & Certification Stats */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Operating Hours</span>
                <div className="text-lg font-black text-slate-900">{equipment.operatingHours} hrs</div>
              </div>
              <div className="border-x border-emerald-200/80">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Health Score</span>
                <div className="text-lg font-black text-emerald-700">{equipment.healthPercentage}% Certified</div>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Last Service</span>
                <div className="text-lg font-black text-slate-900">{equipment.lastServiceDate}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>
                  {equipment.village}, {equipment.district} ({equipment.distanceKm ?? 4.2} km away)
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                {equipment.name}
              </h1>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{equipment.description}</p>
            </div>

            {/* Owner Profile Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Equipment Owner / Hub</span>
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mt-0.5">
                  <span>{equipment.ownerName}</span>
                  {equipment.ownerVerified && (
                    <span title="Verified Hub Owner">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500">{equipment.ownerPhone}</div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-amber-500 font-bold text-sm justify-end">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="ml-1 text-slate-900">{equipment.ownerRating.toFixed(1)}</span>
                </div>
                <span className="text-[10px] text-slate-400">42 Successful rentals</span>
              </div>
            </div>

            {/* Match Reasons Pill (If matched) */}
            {equipment.matchReasons && equipment.matchReasons.length > 0 && (
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-1.5">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Why this matches your farm:
                </span>
                {equipment.matchReasons.map((r, idx) => (
                  <div key={idx} className="text-xs text-emerald-800">
                    {r}
                  </div>
                ))}
              </div>
            )}

            {/* Key Policy Highlights */}
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Driver / Operator:</span>
                <span className="font-bold text-emerald-700">
                  {equipment.driverAvailable ? `Available (₹${equipment.driverRatePerHour}/hr)` : 'Self-driven Only'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Fuel Policy:</span>
                <span className="font-bold text-slate-800">{equipment.fuelPolicy}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Min. Booking Time:</span>
                <span className="font-bold text-slate-800">{equipment.minBookingHours} Hours</span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all text-base flex items-center justify-center space-x-2"
            >
              <Tractor className="w-5 h-5" />
              <span>Proceed to Booking & OTP Reservation</span>
            </button>
          </div>
        </div>

        {/* Technical Specs & Reviews Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Implement Specifications */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Technical Specifications</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {Object.entries(equipment.specs).map(([key, val]) => (
                <div key={key} className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">{key}</span>
                  <span className="font-bold text-slate-800">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification & KYC Badge */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Safety & KYC Verification</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center space-x-2 text-emerald-700 bg-emerald-50 p-3 rounded-2xl font-bold">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>RC & Insurance Verified under RajKisan CHC Registry</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700 bg-emerald-50 p-3 rounded-2xl font-bold">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>Owner Aadhaar & Commercial Driver License Mock Verified</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Equipment handovers are secured using end-to-end two-factor OTP verification at both pickup and farm delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL (Flow Steps 7, 8, 9) */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-200 max-w-xl w-full overflow-hidden text-slate-800 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-emerald-700 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Configure Equipment Rental</h3>
                <p className="text-emerald-100 text-xs">{equipment.name}</p>
              </div>
              <button
                onClick={() => {
                  setIsBookingOpen(false);
                  setBookingSuccess(null);
                }}
                className="text-white hover:text-emerald-200 font-bold text-xl px-2"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {bookingSuccess ? (
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="text-xl font-black text-emerald-900">Rental Confirmed Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your reservation has been sent to owner {equipment.ownerName}. A verified driver will be assigned shortly.
                  </p>

                  {/* OTP Reveal Box for Hackathon Presentation */}
                  <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-inner space-y-3 text-left">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Secure Handover Credentials (SIH Demo)
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase">Pickup OTP</span>
                        <div className="text-2xl font-black text-amber-400 tracking-widest">
                          {bookingSuccess.pickupOtp}
                        </div>
                        <span className="text-[10px] text-slate-400">Share with Driver at Hub</span>
                      </div>
                      <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase">Delivery OTP</span>
                        <div className="text-2xl font-black text-emerald-400 tracking-widest">
                          {bookingSuccess.deliveryOtp}
                        </div>
                        <span className="text-[10px] text-slate-400">Share when Job Finishes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => navigate('/farmer/bookings')}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs"
                    >
                      Track in Farmer Bookings
                    </button>
                    <button
                      onClick={() => navigate('/owner/bookings')}
                      className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs"
                    >
                      Switch to Owner Portal
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  {/* Rental Model Toggle: Per Acre vs Hourly */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setBookingType('ACRE_BASED')}
                      className={`py-2 rounded-lg transition-all ${
                        bookingType === 'ACRE_BASED' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      Per Acre Pricing (₹{equipment.pricePerAcre}/acre)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingType('HOURLY')}
                      className={`py-2 rounded-lg transition-all ${
                        bookingType === 'HOURLY' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      Hourly Pricing (₹{equipment.pricePerHour}/hr)
                    </button>
                  </div>

                  {/* Acre or Hours Input */}
                  {bookingType === 'ACRE_BASED' ? (
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Farm Area to Cultivate (Acres)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={farmArea}
                        onChange={(e) => setFarmArea(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Booking Duration (Hours)
                      </label>
                      <input
                        type="number"
                        min={equipment.minBookingHours}
                        max="24"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Crop Type & Date */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Crop Type</label>
                      <input
                        type="text"
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Date Required</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Add-ons: Driver & Fuel */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="font-bold text-slate-800">Include Certified Driver / Operator</div>
                          <div className="text-slate-500">Trained on {equipment.category} operations</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={driverRequired}
                        onChange={(e) => setDriverRequired(e.target.checked)}
                        className="w-4 h-4 accent-emerald-600"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs">
                      <div className="flex items-center space-x-2">
                        <Fuel className="w-4 h-4 text-amber-600" />
                        <div>
                          <div className="font-bold text-slate-800">Fuel Included by Owner</div>
                          <div className="text-slate-500">+₹120/hr estimated consumption</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={fuelRequired}
                        onChange={(e) => setFuelRequired(e.target.checked)}
                        className="w-4 h-4 accent-emerald-600"
                      />
                    </label>
                  </div>

                  {/* Transparent Price Breakdown (Requirement 15) */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Transparent Price Breakdown
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Base Rental ({bookingType === 'ACRE_BASED' ? `${farmArea} acres` : `${hours} hrs`}):</span>
                      <span>₹{baseRate}</span>
                    </div>
                    {driverRequired && (
                      <div className="flex justify-between text-slate-600">
                        <span>Operator / Driver Charge:</span>
                        <span>₹{driverCharge}</span>
                      </div>
                    )}
                    {fuelRequired && (
                      <div className="flex justify-between text-slate-600">
                        <span>Fuel Charge:</span>
                        <span>₹{fuelCharge}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>Platform Assurance & Insurance:</span>
                      <span>₹{platformFee}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                      <span>Total Estimated Cost:</span>
                      <span className="text-emerald-700 font-extrabold text-base">₹{totalAmount}</span>
                    </div>
                  </div>

                  {/* Payment Mode Selector (Requirement 19) */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Payment Mode (Prototype Mock Payment)
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {['UPI', 'CARD', 'CASH'].map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => setPaymentMethod(m as any)}
                          className={`py-2 rounded-xl font-bold border transition-all ${
                            paymentMethod === m
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {m === 'UPI' && 'UPI (GPay / PhonePe)'}
                          {m === 'CARD' && 'Debit / Kisan Card'}
                          {m === 'CASH' && 'Cash on Delivery'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-md shadow-emerald-600/30 text-sm transition-all"
                  >
                    Confirm Booking & Generate OTPs
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
