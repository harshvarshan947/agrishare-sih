import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  FileQuestion,
  Users,
  MessageSquare,
  UserCheck,
  Tractor,
  TrendingUp,
  DollarSign,
  Truck,
  Wrench,
  Shield,
  Layers,
  FileText,
  Home,
  MapPin,
  ClipboardList,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { currentRole, currentUser } = useAuth();

  const getLinks = () => {
    switch (currentRole) {
      case 'FARMER':
        return [
          { name: 'Dashboard', path: '/farmer/dashboard', icon: LayoutDashboard },
          { name: 'Find Equipment', path: '/farmer/search', icon: Search },
          { name: 'My Bookings', path: '/farmer/bookings', icon: CalendarCheck },
          { name: 'Smart Requests', path: '/farmer/requests', icon: FileQuestion },
          { name: 'Group Rentals', path: '/farmer/group-rentals', icon: Users },
          { name: 'Messages', path: '/farmer/messages', icon: MessageSquare },
          { name: 'Profile & KYC', path: '/farmer/profile', icon: UserCheck },
        ];
      case 'OWNER':
        return [
          { name: 'Dashboard', path: '/owner/dashboard', icon: LayoutDashboard },
          { name: 'My Equipment', path: '/owner/equipment', icon: Tractor },
          { name: 'Booking Requests', path: '/owner/bookings', icon: CalendarCheck },
          { name: 'Demand Radar', path: '/owner/demand', icon: TrendingUp },
          { name: 'Fleet Revenue', path: '/owner/revenue', icon: DollarSign },
          { name: 'Drivers', path: '/owner/drivers', icon: Truck },
          { name: 'Maintenance', path: '/owner/maintenance', icon: Wrench },
        ];
      case 'DRIVER':
        return [
          { name: 'Dashboard', path: '/driver/dashboard', icon: LayoutDashboard },
          { name: "Today's Jobs", path: '/driver/jobs', icon: ClipboardList },
          { name: 'Route Map', path: '/driver/map', icon: MapPin },
          { name: 'Earnings', path: '/driver/earnings', icon: DollarSign },
          { name: 'Profile & DL', path: '/driver/profile', icon: UserCheck },
        ];
      case 'ADMIN':
        return [
          { name: 'Admin Overview', path: '/admin/dashboard', icon: LayoutDashboard },
          { name: 'Users & KYC', path: '/admin/users', icon: Shield },
          { name: 'Equipment Fleet', path: '/admin/equipment', icon: Tractor },
          { name: 'Rental Analytics', path: '/admin/rentals', icon: Layers },
          { name: 'Demand Heatmaps', path: '/admin/demand', icon: TrendingUp },
          { name: 'Revenue Reports', path: '/admin/revenue', icon: DollarSign },
          { name: 'Govt Schemes', path: '/admin/schemes', icon: FileText },
          { name: 'System Reports', path: '/admin/reports', icon: ClipboardList },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <>
      {/* Desktop Sidebar (Left side, modern rounded card or full sidebar) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/80 p-5 shrink-0 min-h-[calc(100vh-80px)]">
        {/* User Card */}
        {currentUser && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  currentUser.name[0]
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</h4>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md uppercase">
                    {currentUser.role}
                  </span>
                  {currentUser.verificationStatus === 'VERIFIED' && (
                    <span className="text-[10px] text-emerald-600 font-bold" title="Verified User">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-xs text-slate-500 truncate">
              📍 {currentUser.village}, {currentUser.district}
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="space-y-1.5 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            {currentRole} Portal
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 translate-x-1'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation Bar (Permanent at bottom for quick touch) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-2xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'text-emerald-600' : 'text-slate-500'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/farmer/search"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'text-emerald-600' : 'text-slate-500'
            }`
          }
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Search</span>
        </NavLink>

        <NavLink
          to="/farmer/bookings"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'text-emerald-600' : 'text-slate-500'
            }`
          }
        >
          <CalendarCheck className="w-5 h-5 mb-0.5" />
          <span>Bookings</span>
        </NavLink>

        <NavLink
          to="/farmer/messages"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'text-emerald-600' : 'text-slate-500'
            }`
          }
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span>Messages</span>
        </NavLink>

        <NavLink
          to="/farmer/profile"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'text-emerald-600' : 'text-slate-500'
            }`
          }
        >
          <UserCheck className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
};
