import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Tractor,
  Search,
  Calendar,
  MapPin,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Truck,
  Globe,
  Lock,
  ArrowRight,
  Phone,
  Sparkles,
  Users,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DEMO_SEASONAL_DEMAND, INITIAL_GOVERNMENT_SCHEMES } from '../services/mockData';
import { EquipmentCategory } from '../types';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Quick Search form state
  const [selectedCategory, setSelectedCategory] = useState<string>('Tractor');
  const [location, setLocation] = useState('Bagru, Jaipur');
  const [date, setDate] = useState('2026-09-28');
  const [area, setArea] = useState('8');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/farmer/search?category=${selectedCategory}&area=${area}&village=${encodeURIComponent(location)}`);
  };

  const popularEquipment: {
    category: EquipmentCategory;
    name: string;
    image: string;
    rate: string;
    hp: string;
    idealFor: string;
  }[] = [
    {
      category: 'Tractor',
      name: 'Mahindra & John Deere 45-55 HP',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80',
      rate: '₹800/hr',
      hp: '47-55 HP',
      idealFor: 'Ploughing, Rotavator & Trolley',
    },
    {
      category: 'Rotavator',
      name: 'Shaktiman & Garud Rotary Tiller',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80',
      rate: '₹600/hr',
      hp: '6-7 Feet',
      idealFor: 'Fine Wheat & Mustard Seedbed',
    },
    {
      category: 'Combine Harvester',
      name: 'Dasmesh & Preet Multi-Crop',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
      rate: '₹2,100/hr',
      hp: '101 HP 4x4',
      idealFor: 'Bajra, Paddy & Wheat Harvesting',
    },
    {
      category: 'Seed Drill',
      name: 'National Zero-Till Seed Drill',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80',
      rate: '₹550/hr',
      hp: '9-11 Rows',
      idealFor: 'Direct Sowing with Fertilizer Box',
    },
    {
      category: 'Cultivator',
      name: 'Fieldking 9-Tyne Spring Loaded',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
      rate: '₹450/hr',
      hp: '9 Tynes',
      idealFor: 'Primary Aeration & Weed Inversion',
    },
    {
      category: 'Thresher',
      name: 'Bharat High-Speed Tokri Model',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
      rate: '₹850/hr',
      hp: '20 Qtl/hr',
      idealFor: 'Clean Grain & Straw Separation',
    },
    {
      category: 'Sprayer',
      name: 'ASPEE 400L Tractor Boom Sprayer',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80',
      rate: '₹500/hr',
      hp: '12m Boom',
      idealFor: 'Uniform Micron Crop Spraying',
    },
    {
      category: 'Tractor Trolley',
      name: '5-Ton Hydraulic Tipping Trolley',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80',
      rate: '₹350/hr',
      hp: 'Dual Axle',
      idealFor: 'Mandi Transport & Manure Haulage',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-emerald-950 text-white py-16 sm:py-24">
        {/* Soft radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300 backdrop-blur-md">
                <Sparkles className="w-4 h-4" />
                <span>Smart India Hackathon (SIH) 2026 Innovation</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {t('heroHeadline')}
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                {t('heroSubheading')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/farmer/search"
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all flex items-center space-x-2 text-base hover:scale-102"
                >
                  <Search className="w-5 h-5" />
                  <span>{t('findEquipment')}</span>
                </Link>

                <Link
                  to="/owner/equipment"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center space-x-2 text-base"
                >
                  <Tractor className="w-5 h-5 text-emerald-400" />
                  <span>{t('listEquipment')}</span>
                </Link>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                  <div className="text-xs text-slate-400">Verified Equipment</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">35%</div>
                  <div className="text-xs text-slate-400">Group Rental Savings</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-sky-400">&lt; 15 min</div>
                  <div className="text-xs text-slate-400">Nearby Driver Match</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Farm Machinery Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl relative group">
                  <img
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80"
                    alt="AgriShare Modern Tractor"
                    className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Floating Overlay Badge: Smart Match */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 p-3 rounded-2xl shadow-lg flex items-center space-x-3 text-left">
                    <div className="p-2 bg-emerald-500 text-slate-950 rounded-xl font-bold">94%</div>
                    <div>
                      <div className="text-xs font-bold text-white">Smart Match Engine</div>
                      <div className="text-[10px] text-emerald-400">Mahindra 575 DI (4.2 km away)</div>
                    </div>
                  </div>

                  {/* Bottom Stats Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl text-slate-900 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-slate-500">Live Village Booking</div>
                        <div className="text-sm font-bold text-slate-900">Bagru Cluster • 8 Acres Wheat</div>
                      </div>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                        ₹800 / hour
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK SEARCH SECTION */}
      <section className="-mt-8 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                {t('selectEquipment')}
              </label>
              <div className="relative">
                <Tractor className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Tractor">Tractor (45-55 HP)</option>
                  <option value="Rotavator">Rotavator (6-7 Ft)</option>
                  <option value="Combine Harvester">Combine Harvester</option>
                  <option value="Seed Drill">Zero Till Seed Drill</option>
                  <option value="Laser Land Leveller">Laser Land Leveller</option>
                  <option value="Cultivator">Cultivator 9-Tyne</option>
                  <option value="Sprayer">Tractor Boom Sprayer</option>
                  <option value="Thresher">Tokri Thresher</option>
                  <option value="Tractor Trolley">Hydraulic Trolley</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                {t('location')}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Village / Tehsil"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                {t('date')}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                {t('farmArea')}
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. 8"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Transparent Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">{t('howItWorks')}</h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            From discovering nearby implements to secure OTP-verified delivery at your field.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
          {[
            {
              step: '1. Search',
              desc: 'Enter your village & crop acres to discover tractors within 15 km.',
              icon: Search,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50 border-emerald-200',
            },
            {
              step: '2. Compare',
              desc: 'Check hourly vs per-acre rates, health % rating, and driver inclusion.',
              icon: Tractor,
              color: 'text-blue-600',
              bg: 'bg-blue-50 border-blue-200',
            },
            {
              step: '3. Book & OTP',
              desc: 'Confirm reservation with instant pricing and secure pickup OTP.',
              icon: Lock,
              color: 'text-amber-600',
              bg: 'bg-amber-50 border-amber-200',
            },
            {
              step: '4. Live Track',
              desc: 'Watch the equipment and driver navigate directly to your farm via GPS.',
              icon: Truck,
              color: 'text-teal-600',
              bg: 'bg-teal-50 border-teal-200',
            },
            {
              step: '5. Work & Save',
              desc: 'Verify delivery OTP, complete field work, and rate your experience.',
              icon: CheckCircle2,
              color: 'text-emerald-700',
              bg: 'bg-emerald-100/80 border-emerald-300',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.bg} border flex items-center justify-center ${item.color} mb-4 font-bold group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1.5">{item.step}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. POPULAR EQUIPMENT SECTION */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Local Fleet
              </span>
              <h2 className="text-3xl font-black text-slate-900">{t('popularEquipment')}</h2>
            </div>
            <Link
              to="/equipment"
              className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
            >
              <span>View All 20+ Implements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularEquipment.map((eq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={eq.image}
                    alt={eq.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {eq.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    {eq.rate}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{eq.name}</h3>
                    <p className="text-xs text-slate-500 mb-2">{eq.idealFor}</p>
                    <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg w-fit">
                      Spec: {eq.hp}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/farmer/search"
                      className="text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <span>Check Availability</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY AGRISHARE SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Key Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">{t('whyAgriShare')}</h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Engineered specifically for rural smallholders, custom hiring centers, and village machinery sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {[
            {
              title: t('nearbyEquip'),
              desc: t('nearbyEquipDesc'),
              icon: MapPin,
            },
            {
              title: t('transpPricing'),
              desc: t('transpPricingDesc'),
              icon: TrendingUp,
            },
            {
              title: t('verifiedUsers'),
              desc: t('verifiedUsersDesc'),
              icon: ShieldCheck,
            },
            {
              title: t('driverSupport'),
              desc: t('driverSupportDesc'),
              icon: Truck,
            },
            {
              title: t('liveTracking'),
              desc: t('liveTrackingDesc'),
              icon: Zap,
            },
            {
              title: t('multilingual'),
              desc: t('multilingualDesc'),
              icon: Globe,
            },
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. SEASONAL DEMAND SECTION */}
      <section className="py-16 bg-gradient-to-br from-emerald-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Seasonal Machinery Radar
              </span>
              <h2 className="text-3xl font-black text-white">{t('seasonalDemand')}</h2>
              <p className="text-slate-300 text-sm mt-1">{DEMO_SEASONAL_DEMAND.currentSeason}</p>
            </div>
            <Link
              to="/owner/demand"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 w-fit"
            >
              <span>View Full Demand Heatmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Kharif Harvest Demand */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h4 className="text-base font-bold text-amber-300 mb-4 flex items-center justify-between">
                <span>Active Kharif Harvest Needs</span>
                <span className="text-xs font-normal text-slate-400">Jaipur & Dausa Cluster</span>
              </h4>
              <div className="space-y-3">
                {DEMO_SEASONAL_DEMAND.kharifDemand.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
                    <div>
                      <div className="font-bold text-white text-sm">{d.equipment}</div>
                      <div className="text-slate-400">{d.requests} farmer bookings requested</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400">{d.avgPrice}</div>
                      <span className="text-[10px] text-amber-300 font-bold">{d.growth} surge</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rabi Pre-Sowing Demand */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h4 className="text-base font-bold text-emerald-300 mb-4 flex items-center justify-between">
                <span>Upcoming Rabi Sowing Demand</span>
                <span className="text-xs font-normal text-slate-400">Peak Next 15 Days</span>
              </h4>
              <div className="space-y-3">
                {DEMO_SEASONAL_DEMAND.rabiDemand.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
                    <div>
                      <div className="font-bold text-white text-sm">{d.equipment}</div>
                      <div className="text-slate-400">{d.requests} farmer requests logged</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400">{d.avgPrice}</div>
                      <span className="text-[10px] text-emerald-300 font-bold">{d.growth} surge</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GOVERNMENT SCHEMES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
              State & Central Support
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">{t('govtSchemes')}</h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Access up to 80% DBT subsidies on agricultural machinery and Custom Hiring Centre installations.
            </p>
          </div>
          <Link
            to="/admin/schemes"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>Explore All Schemes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_GOVERNMENT_SCHEMES.slice(0, 2).map((sch) => (
            <div
              key={sch.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {sch.ministry}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {sch.subsidyPercentage}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{sch.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{sch.description}</p>

                <div className="space-y-1.5 text-xs text-slate-700 mb-4 bg-slate-50 p-3 rounded-2xl">
                  <span className="font-bold text-slate-900 text-[11px] uppercase">Key Eligibility:</span>
                  {sch.eligibility.slice(0, 2).map((el, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{el}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={sch.applicationUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-slate-900 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors text-center flex items-center justify-center space-x-1"
              >
                <span>Official Portal & Application</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 9. EMERGENCY SUPPORT SECTION */}
      <section className="py-16 bg-red-50/60 border-t border-red-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-3xl bg-red-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-red-600/30">
            <Phone className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-black text-slate-900">{t('emergencyHelpline')}</h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">
            {t('emergencyDesc')} Direct connection with the nearest tractor mechanic workshop and agricultural rapid response team.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:18001801551"
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/30 text-base flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Kisan Helpline: 1800-180-1551</span>
            </a>

            <button
              onClick={() => navigate('/farmer/bookings')}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-300 text-base"
            >
              View Active Booking SOS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
