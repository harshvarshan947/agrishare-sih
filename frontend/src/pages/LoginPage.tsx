import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tractor, ShieldCheck, ArrowRight, Sparkles, User, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

export const LoginPage: React.FC = () => {
  const { loginAsRole, loginWithCredentials } = useAuth();
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<Role>('FARMER');

  const handleDemoLogin = async (selectedRole: Role) => {
    await loginAsRole(selectedRole);
    if (selectedRole === 'FARMER') navigate('/farmer/dashboard');
    else if (selectedRole === 'OWNER') navigate('/owner/dashboard');
    else if (selectedRole === 'DRIVER') navigate('/driver/dashboard');
    else navigate('/admin/dashboard');
  };

  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithCredentials(emailOrPhone || 'demo@agrishare.in', role);
    if (role === 'FARMER') navigate('/farmer/dashboard');
    else if (role === 'OWNER') navigate('/owner/dashboard');
    else if (role === 'DRIVER') navigate('/driver/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-emerald-600/30">
            <Tractor className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Login to AgriShare</h2>
          <p className="text-xs text-slate-500">Access your rural equipment sharing & booking portal</p>
        </div>

        {/* SIH Presentation Demo Quick Access (Requirement 24) */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-left space-y-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
              1-Click Demo Login (SIH Judges)
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('FARMER')}
              className="p-2.5 bg-white hover:bg-emerald-100/60 border border-emerald-300 rounded-xl text-left transition-colors"
            >
              <div className="text-xs font-bold text-slate-900">👨‍🌾 Farmer</div>
              <div className="text-[10px] text-slate-500">Ramesh Kumar (Bagru)</div>
            </button>

            <button
              onClick={() => handleDemoLogin('OWNER')}
              className="p-2.5 bg-white hover:bg-emerald-100/60 border border-emerald-300 rounded-xl text-left transition-colors"
            >
              <div className="text-xs font-bold text-slate-900">🚜 Equipment Owner</div>
              <div className="text-[10px] text-slate-500">Vikram Singh (Fleet)</div>
            </button>

            <button
              onClick={() => handleDemoLogin('DRIVER')}
              className="p-2.5 bg-white hover:bg-emerald-100/60 border border-emerald-300 rounded-xl text-left transition-colors"
            >
              <div className="text-xs font-bold text-slate-900">🚚 Verified Driver</div>
              <div className="text-[10px] text-slate-500">Rajesh Gurjar (Driver)</div>
            </button>

            <button
              onClick={() => handleDemoLogin('ADMIN')}
              className="p-2.5 bg-white hover:bg-emerald-100/60 border border-emerald-300 rounded-xl text-left transition-colors"
            >
              <div className="text-xs font-bold text-slate-900">🛡️ Platform Admin</div>
              <div className="text-[10px] text-slate-500">Amit Sharma (Govt Nodal)</div>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleStandardSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Select Your Role
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              {(['FARMER', 'OWNER', 'DRIVER', 'ADMIN'] as Role[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-1.5 rounded-lg text-center transition-all ${
                    role === r ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  {r === 'FARMER' && 'Farmer'}
                  {r === 'OWNER' && 'Owner'}
                  {r === 'DRIVER' && 'Driver'}
                  {r === 'ADMIN' && 'Admin'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Mobile Number / Email
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="e.g. 9829012345 or ramesh.farmer@agrishare.in"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/30 text-sm transition-all flex items-center justify-center space-x-1"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-emerald-700 hover:underline">
            Register as Farmer / Owner / Driver
          </Link>
        </div>
      </div>
    </div>
  );
};
