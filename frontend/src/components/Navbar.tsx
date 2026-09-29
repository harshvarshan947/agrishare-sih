import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Tractor,
  Globe,
  AlertTriangle,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { EmergencyModal } from './EmergencyModal';
import { Role } from '../types';

interface RoleNavConfig {
  label: string;
  shortLabel: string;
  emoji: string;
  dashboardRoute: string;
  links: { name: string; path: string }[];
}

const ROLE_CONFIG: Record<Role, RoleNavConfig> = {
  FARMER: {
    label: 'Farmer',
    shortLabel: 'Farmer',
    emoji: '👨‍🌾',
    dashboardRoute: '/farmer/dashboard',
    links: [
      { name: 'Dashboard', path: '/farmer/dashboard' },
      { name: 'Find Equipment', path: '/farmer/search' },
      { name: 'My Bookings', path: '/farmer/bookings' },
      { name: 'Group Rentals', path: '/farmer/group-rentals' },
      { name: 'Smart Requests', path: '/farmer/requests' },
      { name: 'Govt Schemes', path: '/admin/schemes' },
    ],
  },
  OWNER: {
    label: 'Equipment Owner',
    shortLabel: 'Owner',
    emoji: '🚜',
    dashboardRoute: '/owner/dashboard',
    links: [
      { name: 'Dashboard', path: '/owner/dashboard' },
      { name: 'Fleet Inventory', path: '/owner/equipment' },
      { name: 'Booking Requests', path: '/owner/bookings' },
      { name: 'Demand Radar', path: '/owner/demand' },
      { name: 'Fleet Revenue', path: '/owner/revenue' },
      { name: 'Drivers', path: '/owner/drivers' },
      { name: 'Maintenance', path: '/owner/maintenance' },
    ],
  },
  DRIVER: {
    label: 'Driver / Operator',
    shortLabel: 'Driver',
    emoji: '🚚',
    dashboardRoute: '/driver/dashboard',
    links: [
      { name: 'Dashboard', path: '/driver/dashboard' },
      { name: "Today's Jobs", path: '/driver/jobs' },
      { name: 'Route Map', path: '/driver/map' },
      { name: 'Earnings', path: '/driver/earnings' },
      { name: 'Profile & DL', path: '/driver/profile' },
    ],
  },
  ADMIN: {
    label: 'Platform Admin',
    shortLabel: 'Admin',
    emoji: '🛡️',
    dashboardRoute: '/admin/dashboard',
    links: [
      { name: 'Overview', path: '/admin/dashboard' },
      { name: 'Users & KYC', path: '/admin/users' },
      { name: 'Equipment Fleet', path: '/admin/equipment' },
      { name: 'Rentals Audit', path: '/admin/rentals' },
      { name: 'Demand Radar', path: '/admin/demand' },
      { name: 'Govt Schemes', path: '/admin/schemes' },
    ],
  },
};

const PUBLIC_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Equipment', path: '/equipment' },
  { name: 'How It Works', path: '/#how-it-works' },
  { name: 'Schemes', path: '/admin/schemes' },
  { name: 'Smart Match', path: '/farmer/search' },
];

export const Navbar: React.FC = () => {
  const { currentUser, currentRole, logout, loginAsRole } = useAuth();
  const { language, setLanguage, languages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns on outside click
  useEffect(() => {
    if (!roleDropdownOpen && !langDropdownOpen) return;
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-trigger')) {
        setRoleDropdownOpen(false);
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, [roleDropdownOpen, langDropdownOpen]);

  const activeRoleConfig = ROLE_CONFIG[currentRole] || ROLE_CONFIG.FARMER;
  const navLinks = currentUser ? activeRoleConfig.links : PUBLIC_LINKS;

  const getDashboardRoute = () => {
    return activeRoleConfig.dashboardRoute;
  };

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  const handleRoleSelect = async (role: Role) => {
    await loginAsRole(role);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(ROLE_CONFIG[role].dashboardRoute);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Active Role Badge */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                  <Tractor className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                    Agri<span className="text-emerald-600">Share</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase -mt-0.5">
                    Farm Mechanization Hub
                  </span>
                </div>
              </Link>

              {currentUser && (
                <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50/90 border border-emerald-200/80 rounded-full text-xs font-bold text-emerald-800">
                  <span>{activeRoleConfig.emoji}</span>
                  <span>{activeRoleConfig.shortLabel} View</span>
                </div>
              )}
            </div>

            {/* Desktop Dynamic Navigation Links based on active role */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50 shadow-2xs font-bold border border-emerald-200/70'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Role Switcher, Emergency SOS, Language, User Badge */}
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              {/* Role Switcher Dropdown */}
              <div className="relative dropdown-trigger">
                <button
                  onClick={() => {
                    setRoleDropdownOpen(!roleDropdownOpen);
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-800 bg-amber-50 hover:bg-amber-100/90 border border-amber-300/80 rounded-xl transition-all shadow-2xs"
                  title="Switch Actor Role Mode"
                >
                  <span className="text-sm">{activeRoleConfig.emoji}</span>
                  <span className="hidden sm:inline font-bold text-amber-950">
                    {activeRoleConfig.shortLabel}
                  </span>
                  <span className="hidden xl:inline text-[10px] text-amber-700 font-semibold bg-amber-200/60 px-1.5 py-0.5 rounded-md">
                    Mode
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-amber-700" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fade-in">
                    <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                      <span>Switch Mode</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                        Dynamic Nav
                      </span>
                    </div>
                    {(['FARMER', 'OWNER', 'DRIVER', 'ADMIN'] as Role[]).map((r) => {
                      const cfg = ROLE_CONFIG[r];
                      const isSelected = currentRole === r && !!currentUser;
                      return (
                        <button
                          key={r}
                          onClick={() => handleRoleSelect(r)}
                          className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'text-emerald-800 bg-emerald-50/80 font-bold'
                              : 'text-slate-700 hover:bg-slate-50 font-medium'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="text-base">{cfg.emoji}</span>
                            <div>
                              <div className="font-bold text-slate-900 leading-tight">{cfg.shortLabel}</div>
                              <div className="text-[10px] text-slate-500">{cfg.label}</div>
                            </div>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                              Active
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Emergency SOS Button */}
              <button
                onClick={() => setEmergencyModalOpen(true)}
                className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md shadow-red-600/30 animate-pulse hover:animate-none"
                title="Immediate Mechanical & Agricultural Emergency Assistance"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SOS Help</span>
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative dropdown-trigger">
                <button
                  onClick={() => {
                    setLangDropdownOpen(!langDropdownOpen);
                    setRoleDropdownOpen(false);
                  }}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">
                    {languages.find((l) => l.code === language)?.nativeName || 'English'}
                  </span>
                  <span className="sm:hidden">{language.toUpperCase()}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fade-in">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 ${
                          language === l.code ? 'text-emerald-700 bg-emerald-50/50 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span>{l.nativeName}</span>
                        <span className="text-[10px] text-slate-400">{l.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Account / Role Badge */}
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to={getDashboardRoute()}
                    className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 bg-emerald-50 border border-emerald-200 hover:border-emerald-300 rounded-xl text-slate-800 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {currentUser.avatar ? (
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                      ) : (
                        currentUser.name[0]
                      )}
                    </div>
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-900 leading-none truncate max-w-[100px]">
                        {currentUser.name}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 leading-none mt-0.5">
                        {currentRole}
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-slate-100 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile / Tablet Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 animate-slide-down">
            {/* Mobile Mode Switcher Grid */}
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Active Actor Mode ({activeRoleConfig.shortLabel})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(['FARMER', 'OWNER', 'DRIVER', 'ADMIN'] as Role[]).map((r) => {
                  const cfg = ROLE_CONFIG[r];
                  const isSelected = currentRole === r && !!currentUser;
                  return (
                    <button
                      key={r}
                      onClick={() => handleRoleSelect(r)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center space-x-2 ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-sm">{cfg.emoji}</span>
                      <span>{cfg.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Nav Links for the active role */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
                {currentUser ? `${activeRoleConfig.shortLabel} Navigation` : 'Explore AgriShare'}
              </span>
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/80'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {currentUser && (
              <Link
                to={getDashboardRoute()}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 text-center mt-3 shadow-md shadow-emerald-600/20"
              >
                Go to {activeRoleConfig.shortLabel} Dashboard →
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Emergency Assistance Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />
    </>
  );
};
