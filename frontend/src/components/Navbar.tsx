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
      { name: 'Find Equip', path: '/farmer/search' },
      { name: 'Bookings', path: '/farmer/bookings' },
      { name: 'Groups', path: '/farmer/group-rentals' },
      { name: 'Requests', path: '/farmer/requests' },
      { name: 'Schemes', path: '/admin/schemes' },
    ],
  },
  OWNER: {
    label: 'Equipment Owner',
    shortLabel: 'Owner',
    emoji: '🚜',
    dashboardRoute: '/owner/dashboard',
    links: [
      { name: 'Dashboard', path: '/owner/dashboard' },
      { name: 'Fleet', path: '/owner/equipment' },
      { name: 'Bookings', path: '/owner/bookings' },
      { name: 'Demand', path: '/owner/demand' },
      { name: 'Revenue', path: '/owner/revenue' },
      { name: 'Drivers', path: '/owner/drivers' },
    ],
  },
  DRIVER: {
    label: 'Driver / Operator',
    shortLabel: 'Driver',
    emoji: '🚚',
    dashboardRoute: '/driver/dashboard',
    links: [
      { name: 'Dashboard', path: '/driver/dashboard' },
      { name: 'Jobs', path: '/driver/jobs' },
      { name: 'Route Map', path: '/driver/map' },
      { name: 'Earnings', path: '/driver/earnings' },
      { name: 'Profile', path: '/driver/profile' },
    ],
  },
  ADMIN: {
    label: 'Platform Admin',
    shortLabel: 'Admin',
    emoji: '🛡️',
    dashboardRoute: '/admin/dashboard',
    links: [
      { name: 'Overview', path: '/admin/dashboard' },
      { name: 'Users', path: '/admin/users' },
      { name: 'Fleet', path: '/admin/equipment' },
      { name: 'Rentals', path: '/admin/rentals' },
      { name: 'Demand', path: '/admin/demand' },
      { name: 'Schemes', path: '/admin/schemes' },
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs w-full">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            {/* Brand Logo */}
            <div className="flex items-center space-x-2 shrink-0">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform shrink-0">
                  <Tractor className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-0.5 leading-tight">
                    Agri<span className="text-emerald-600">Share</span>
                  </span>
                  <span className="hidden sm:inline text-[9px] text-slate-500 font-semibold tracking-wider uppercase -mt-0.5">
                    Mechanization Hub
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Dynamic Navigation Links based on active role (xl and up) */}
            <nav className="hidden xl:flex items-center space-x-1 min-w-0 overflow-x-hidden">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-2.5 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
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

            {/* Right Controls: Guaranteed shrink-0, ml-auto, always fully visible on screen */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0 ml-auto">
              {/* Role Switcher Dropdown */}
              <div className="relative dropdown-trigger shrink-0">
                <button
                  onClick={() => {
                    setRoleDropdownOpen(!roleDropdownOpen);
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 text-xs font-bold text-slate-800 bg-amber-50 hover:bg-amber-100/90 border border-amber-300/80 rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer"
                  title="Switch Actor Role Mode"
                >
                  <span className="text-sm">{activeRoleConfig.emoji}</span>
                  <span className="font-bold text-amber-950">{activeRoleConfig.shortLabel}</span>
                  <ChevronDown className="w-3 h-3 text-amber-700" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fade-in">
                    <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                      <span>Switch Actor Mode</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                        SIH Demo
                      </span>
                    </div>
                    {(['FARMER', 'OWNER', 'DRIVER', 'ADMIN'] as Role[]).map((r) => {
                      const cfg = ROLE_CONFIG[r];
                      const isSelected = currentRole === r && !!currentUser;
                      return (
                        <button
                          key={r}
                          onClick={() => handleRoleSelect(r)}
                          className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'text-emerald-800 bg-emerald-50/80 font-bold'
                              : 'text-slate-700 hover:bg-slate-50 font-medium'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
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
                className="px-2 sm:px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shadow-md shadow-red-600/30 animate-pulse hover:animate-none shrink-0 cursor-pointer"
                title="Immediate Mechanical & Agricultural Emergency Assistance"
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">SOS</span>
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative dropdown-trigger shrink-0">
                <button
                  onClick={() => {
                    setLangDropdownOpen(!langDropdownOpen);
                    setRoleDropdownOpen(false);
                  }}
                  className="flex items-center space-x-1 px-2 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0 cursor-pointer"
                  title="Select Language"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold uppercase">{language}</span>
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
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
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
                <div className="flex items-center space-x-1.5 shrink-0">
                  <Link
                    to={getDashboardRoute()}
                    className="flex items-center space-x-1.5 p-1 sm:px-2 sm:py-1 bg-emerald-50/90 border border-emerald-200 hover:border-emerald-300 rounded-xl text-slate-800 transition-all shrink-0"
                    title={`${currentUser.name} (${currentRole})`}
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {currentUser.avatar ? (
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                      ) : (
                        currentUser.name[0]
                      )}
                    </div>
                    <span className="hidden xl:inline text-xs font-bold text-slate-900 truncate max-w-[85px]">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </Link>

                  {/* PROMINENT LOGOUT BUTTON - Guaranteed visible and reachable */}
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer"
                    title="Logout of AgriShare"
                  >
                    <LogOut className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 shrink-0">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile / Tablet Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 shrink-0 cursor-pointer"
                title="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 animate-slide-down shadow-xl">
            {/* Mobile Mode Switcher Grid */}
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Active Mode ({activeRoleConfig.shortLabel})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(['FARMER', 'OWNER', 'DRIVER', 'ADMIN'] as Role[]).map((r) => {
                  const cfg = ROLE_CONFIG[r];
                  const isSelected = currentRole === r && !!currentUser;
                  return (
                    <button
                      key={r}
                      onClick={() => handleRoleSelect(r)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center space-x-2 cursor-pointer ${
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
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <Link
                  to={getDashboardRoute()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 text-center shadow-md shadow-emerald-600/20"
                >
                  Go to {activeRoleConfig.shortLabel} Dashboard →
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout of Account</span>
                </button>
              </div>
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
