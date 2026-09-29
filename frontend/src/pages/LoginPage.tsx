import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Tractor,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { validateLoginIdentifier } from '../utils/validators';

export const LoginPage: React.FC = () => {
  const { loginAsRole, loginWithCredentials } = useAuth();
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<Role>('FARMER');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoLogin = async (selectedRole: Role) => {
    await loginAsRole(selectedRole);
    if (selectedRole === 'FARMER') navigate('/farmer/dashboard');
    else if (selectedRole === 'OWNER') navigate('/owner/dashboard');
    else if (selectedRole === 'DRIVER') navigate('/driver/dashboard');
    else navigate('/admin/dashboard');
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrPhone(e.target.value);
    if (fieldError) setFieldError(null);
    if (authError) setAuthError(null);
  };

  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);
    setAuthError(null);

    // 1. Strict Format Validation
    const validation = validateLoginIdentifier(emailOrPhone);
    if (!validation.isValid) {
      setFieldError(validation.error || 'Please enter a valid email or 10-digit mobile number.');
      return;
    }

    // 2. Password Check
    if (!password || password.length < 6) {
      setFieldError('Password must be at least 6 characters long.');
      return;
    }

    // 3. Authenticate with credentials against registered database
    setIsSubmitting(true);
    const result = await loginWithCredentials(emailOrPhone, role);
    setIsSubmitting(false);

    if (!result.success) {
      setAuthError(result.error || 'Invalid credentials.');
      return;
    }

    // Success: navigate to role dashboard
    if (role === 'FARMER') navigate('/farmer/dashboard');
    else if (role === 'OWNER') navigate('/owner/dashboard');
    else if (role === 'DRIVER') navigate('/driver/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-emerald-600/30">
            <Tractor className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Login to AgriShare</h2>
          <p className="text-xs text-slate-500">Access your rural equipment sharing & booking portal</p>
        </div>

        {/* SIH Presentation Demo Quick Access */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-left space-y-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
              1-Click Demo Login (SIH Evaluators)
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('FARMER')}
              type="button"
              className="p-2.5 bg-white hover:bg-emerald-100/60 border border-emerald-300 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-slate-900">👨‍🌾 Farmer</div>
              <div className="text-[10px] text-slate-500">Ramesh Kumar (Bagru)</div>
            </button>

            <button
              onClick={() => handleDemoLogin('OWNER')}
              type="button"
              className="p-2.5 bg-white hover:bg-emerald-100/60 border border-emerald-300 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-slate-900">🚜 Equipment Owner</div>
              <div className="text-[10px] text-slate-500">Vikram Singh (Fleet)</div>
            </button>

            <button
              onClick={() => handleDemoLogin('DRIVER')}
              type="button"
              className="p-2.5 bg-white hover:bg-emerald-100/60 border border-emerald-300 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-slate-900">🚚 Verified Driver</div>
              <div className="text-[10px] text-slate-500">Rajesh Gurjar (Driver)</div>
            </button>

            <button
              onClick={() => handleDemoLogin('ADMIN')}
              type="button"
              className="p-2.5 bg-white hover:bg-emerald-100/60 border border-emerald-300 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-slate-900">🛡️ Platform Admin</div>
              <div className="text-[10px] text-slate-500">Amit Sharma (Govt Nodal)</div>
            </button>
          </div>
        </div>

        {/* Global Authentication Error Alert */}
        {authError && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-2.5 text-xs text-red-800 text-left animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Authentication Error</p>
              <p className="mt-0.5">{authError}</p>
            </div>
          </div>
        )}

        {/* Standard Login Form with Strict Format & Account Verification */}
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
                  onClick={() => {
                    setRole(r);
                    if (authError) setAuthError(null);
                  }}
                  className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                    role === r ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
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
              Mobile Number / Email Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={emailOrPhone}
                onChange={handleIdentifierChange}
                placeholder="e.g. 9829012345 or user@agrishare.in"
                className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                  fieldError
                    ? 'border-red-400 bg-red-50/20 text-red-900 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-emerald-500 text-slate-900'
                }`}
              />
              <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                {emailOrPhone.includes('@') ? (
                  <Mail className="w-4 h-4" />
                ) : (
                  <Phone className="w-4 h-4" />
                )}
              </div>
            </div>
            {fieldError && (
              <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldError}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
              <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md shadow-emerald-600/30 text-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </span>
            ) : (
              <>
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-emerald-700 hover:underline">
            Register as Farmer / Owner / Driver
          </Link>
        </div>
      </div>
    </div>
  );
};
