import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Truck, Tractor, Phone, ShieldCheck, Compass } from 'lucide-react';
import { MapComponent } from '../../components/MapComponent';
import { api } from '../../services/api';
import { Booking } from '../../types';

export const DriverMap: React.FC = () => {
  const [activeJob, setActiveJob] = useState<Booking | null>(null);
  const [driverCoord, setDriverCoord] = useState<[number, number]>([26.8140, 75.5505]);

  useEffect(() => {
    api.getBookings('DRIVER', 'driver-1').then((jobs) => {
      if (jobs.length > 0) setActiveJob(jobs[0]);
    });
  }, []);

  // Simulate GPS location movement (Requirement 7-3)
  const handleSimulateGPSAdvance = () => {
    setDriverCoord((prev) => [prev[0] + 0.0015, prev[1] + 0.0015]);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            GIS Satellite Route
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">Driver Field Navigation</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Turn-by-turn routing from Equipment Hub to farmer field. GPS coordinates update dynamically.
          </p>
        </div>

        <button
          onClick={handleSimulateGPSAdvance}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-600/30"
        >
          <Navigation className="w-4 h-4" />
          <span>Simulate GPS Movement (+300m)</span>
        </button>
      </div>

      {activeJob && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Navigation Map */}
          <div className="lg:col-span-8 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>Live Route: Vikram Hub (Bagru) → Field No. 4 (Ramesh Kumar)</span>
              </span>
              <span className="text-emerald-700 font-semibold">Speed: 24 km/h (Tractor Transit)</span>
            </div>

            <MapComponent
              center={driverCoord}
              zoom={14}
              showRoute={true}
              routeCoordinates={[
                [activeJob.pickupLocation.lat, activeJob.pickupLocation.lng],
                driverCoord,
                [activeJob.farmerLocation.lat, activeJob.farmerLocation.lng],
              ]}
              markers={[
                {
                  id: 'hub',
                  type: 'EQUIPMENT',
                  title: 'Pickup Hub',
                  subtitle: activeJob.pickupLocation.address,
                  lat: activeJob.pickupLocation.lat,
                  lng: activeJob.pickupLocation.lng,
                },
                {
                  id: 'driver',
                  type: 'DRIVER',
                  title: 'Rajesh Gurjar (You)',
                  subtitle: 'Tractor Mahindra 575 DI in Transit',
                  lat: driverCoord[0],
                  lng: driverCoord[1],
                },
                {
                  id: 'field',
                  type: 'FARMER',
                  title: `${activeJob.farmerName}'s Field`,
                  subtitle: activeJob.farmerLocation.address,
                  lat: activeJob.farmerLocation.lat,
                  lng: activeJob.farmerLocation.lng,
                },
              ]}
              height="500px"
            />
          </div>

          {/* Navigation Route Steps */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">Route Turn-by-Turn Guide</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Vikram Machinery Hub, Main Road</strong>
                    <span className="text-slate-500">Inspect 42 rotavator blades & hydraulic pressure</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 block">South Canal Field Road (4.2 km)</strong>
                    <span className="text-slate-500">Take left past tube well 12 to avoid road repaving</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Ramesh Kumar Field No. 4</strong>
                    <span className="text-slate-500">Collect Delivery OTP 7394 from Ramesh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contacts */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Stakeholder Mobile Contacts
              </span>
              <a
                href={`tel:${activeJob.farmerPhone}`}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between font-bold text-slate-800 hover:text-emerald-700"
              >
                <span>Call Farmer ({activeJob.farmerName})</span>
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
              </a>
              <a
                href={`tel:${activeJob.ownerPhone}`}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between font-bold text-slate-800 hover:text-emerald-700"
              >
                <span>Call Owner ({activeJob.ownerName})</span>
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
