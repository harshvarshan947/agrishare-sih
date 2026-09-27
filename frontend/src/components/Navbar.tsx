import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Tractor,
  Globe,
  Bell,
  AlertTriangle,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { EmergencyModal } from './EmergencyModal';
import { SupportedLanguage } from '../i18n/translations';

export const Navbar: React.FC = () => {
  const { currentUser, currentRole, logout, loginAsRole } = useAuth();
  const { language, setLanguage, t, languages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getDashboardRoute = () => {
    switch (currentRole) {
      case 'FARMER':
        return '/farmer/dashboard';
      case 'OWNER':
        return '/owner/dashboard';
      case 'DRIVER':
        return '/driver/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/farmer/dashboard';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Equipment', path: '/equipment' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Schemes', path: '/admin/schemes' },
    { name: 'Smart Match', path: '/farmer/search' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
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

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Emergency SOS, Language, Role Selector, User */}
            <div className="flex items-center space-x-2 sm:space-x-3">
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
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
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

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.name}
              </Link>
            ))}

            {currentUser && (
              <Link
                to={getDashboardRoute()}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 text-center mt-2"
              >
                Go to {currentRole} Dashboard
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
