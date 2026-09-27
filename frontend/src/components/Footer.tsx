import React from 'react';
import { Link } from 'react-router-dom';
import { Tractor, ShieldCheck, Phone, Heart, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-28 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold">
                <Tractor className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Agri<span className="text-emerald-400">Share</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering Indian farmers through on-demand agricultural machinery rentals, group pooling, verified driver support, and smart AI matching.
            </p>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl w-fit">
              <Sparkles className="w-4 h-4" />
              <span>Smart India Hackathon (SIH) 2026 Initiative</span>
            </div>
            <div className="text-xs text-slate-500">
              Tagline: <em>"Share Equipment. Reduce Cost. Grow Together."</em>
            </div>
          </div>

          {/* Farmers & Owners */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Farmer Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/farmer/search" className="hover:text-emerald-400 transition-colors">
                  Find Equipment & Tractors
                </Link>
              </li>
              <li>
                <Link to="/farmer/group-rentals" className="hover:text-emerald-400 transition-colors">
                  Group Rental Pooling
                </Link>
              </li>
              <li>
                <Link to="/farmer/requests" className="hover:text-emerald-400 transition-colors">
                  Post Custom Demand
                </Link>
              </li>
              <li>
                <Link to="/farmer/bookings" className="hover:text-emerald-400 transition-colors">
                  Live OTP Tracking
                </Link>
              </li>
              <li>
                <Link to="/admin/schemes" className="hover:text-emerald-400 transition-colors">
                  SMAM Government Schemes
                </Link>
              </li>
            </ul>
          </div>

          {/* Owners & Drivers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Owners & Drivers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/owner/equipment" className="hover:text-emerald-400 transition-colors">
                  List Your Machinery
                </Link>
              </li>
              <li>
                <Link to="/owner/demand" className="hover:text-emerald-400 transition-colors">
                  High Demand Heatmaps
                </Link>
              </li>
              <li>
                <Link to="/owner/revenue" className="hover:text-emerald-400 transition-colors">
                  Fleet Revenue Analytics
                </Link>
              </li>
              <li>
                <Link to="/driver/jobs" className="hover:text-emerald-400 transition-colors">
                  Driver Operator Jobs
                </Link>
              </li>
              <li>
                <Link to="/owner/maintenance" className="hover:text-emerald-400 transition-colors">
                  Equipment Health Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Helplines */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Emergency & Helplines
            </h4>
            <div className="space-y-3 text-sm">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <div className="text-[11px] text-slate-400 font-medium">National Kisan Helpline</div>
                <a href="tel:18001801551" className="text-base font-bold text-emerald-400 hover:underline">
                  1800-180-1551
                </a>
                <div className="text-[10px] text-slate-500">Toll-free 24x7 (All Indian Languages)</div>
              </div>
              <div className="text-xs text-slate-400 space-y-1">
                <p>📍 Custom Hiring Hub: Bagru, Jaipur, Rajasthan</p>
                <p>📧 support@agrishare.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 AgriShare Platform. Built for Smart India Hackathon. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Aadhaar & PAN Mock Verified Prototype</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
