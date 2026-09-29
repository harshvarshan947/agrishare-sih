import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Tractor,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  Info,
  AlertCircle,
  Mail,
  Phone,
  Lock,
  User,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { isValidEmail, isValidIndianPhone } from '../utils/validators';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>('FARMER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [village, setVillage] = useState('Bagru');
  const [district, setDistrict] = useState('Jaipur');
  const [aadhaarMock, setAadhaarMock] = useState('XXXX-XXXX-9921');
  const [panMock, setPanMock] = useState('ABCDE1234F');
  const [dlMock, setDlMock] = useState('RJ-14-2024-001234');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (generalError) setGeneralError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    const newErrors: Record<string, string> = {};

    // 1. Full Name Validation
    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(cleanName)) {
      newErrors.name = 'Name should only contain letters and spaces.';
    }

    // 2. Email Validation
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address with domain (e.g. name@domain.com).';
    }

    // 3. Mobile Number Validation
    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      newErrors.phone = 'Mobile number is required.';
    } else if (!isValidIndianPhone(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9829012345).';
    }

    // 4. Password Validation
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    // 5. Village & District Validation
    if (!village.trim()) {
      newErrors.village = 'Village / Gram Panchayat is required.';
    }
    if (!district.trim()) {
      newErrors.district = 'District is required.';
    }

    // If validation fails, halt submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const result = await register({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      role,
      village: village.trim(),
      district: district.trim(),
      aadhaarMasked: aadhaarMock,
      panMasked: panMock,
      dlNumber: role === 'DRIVER' || role === 'OWNER' ? dlMock : undefined,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setGeneralError(result.error || 'Registration failed. Please check inputs.');
      return;
    }

    setRegisteredSuccess(true);

    setTimeout(() => {
      if (role === 'FARMER') navigate('/farmer/dashboard');
      else if (role === 'OWNER') navigate('/owner/dashboard');
      else if (role === 'DRIVER') navigate('/driver/dashboard');
      else navigate('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200 text-left space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-emerald-600/30">
            <Tractor className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create AgriShare Account</h2>
          <p className="text-xs text-slate-500">Join India's trusted agricultural machinery rental network</p>
        </div>

        {/* Prototype Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start space-x-3 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>SIH Hackathon Notice:</strong> Strict input validation is enforced for name, email, and phone. Simulated Aadhaar/PAN fields are pre-filled for rapid evaluation.
          </div>
        </div>

        {/* General Error Banner */}
        {generalError && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-2.5 text-xs text-red-800 text-left animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Registration Failed</p>
              <p className="mt-0.5">{generalError}</p>
            </div>
          </div>
        )}

        {/* Success Banner */}
        {registeredSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center space-x-2.5 text-xs text-emerald-900 font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Registration successful! Redirecting to your {role} dashboard...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
              I am registering as:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'FARMER', label: '👨‍🌾 Farmer', desc: 'Need equipment' },
                { id: 'OWNER', label: '🚜 Equipment Owner', desc: 'Rent my fleet' },
                { id: 'DRIVER', label: '🚚 Driver/Operator', desc: 'Operate machines' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setRole(item.id as Role)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    role === item.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-500">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearFieldError('name');
                }}
                placeholder="e.g. Ramesh Kumar"
                className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-400 bg-red-50/20 text-red-900 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-emerald-500 text-slate-900'
                }`}
              />
              <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email & Mobile Number Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError('email');
                  }}
                  placeholder="name@domain.com"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-400 bg-red-50/20 text-red-900 focus:ring-red-400'
                      : 'border-slate-300 focus:ring-emerald-500 text-slate-900'
                  }`}
                />
                <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Mobile Number (10 digits)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearFieldError('phone');
                  }}
                  placeholder="e.g. 9829012345"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? 'border-red-400 bg-red-50/20 text-red-900 focus:ring-red-400'
                      : 'border-slate-300 focus:ring-emerald-500 text-slate-900'
                  }`}
                />
                <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Create Password (min. 6 characters)
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError('password');
                }}
                placeholder="••••••••"
                className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-400 bg-red-50/20 text-red-900 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-emerald-500 text-slate-900'
                }`}
              />
              <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Village / Gram Panchayat
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={village}
                  onChange={(e) => {
                    setVillage(e.target.value);
                    clearFieldError('village');
                  }}
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.village
                      ? 'border-red-400 bg-red-50/20 text-red-900 focus:ring-red-400'
                      : 'border-slate-300 focus:ring-emerald-500 text-slate-900'
                  }`}
                />
                <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              {errors.village && (
                <p className="mt-1 text-xs text-red-600">{errors.village}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">District</label>
              <div className="relative">
                <input
                  type="text"
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    clearFieldError('district');
                  }}
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.district
                      ? 'border-red-400 bg-red-50/20 text-red-900 focus:ring-red-400'
                      : 'border-slate-300 focus:ring-emerald-500 text-slate-900'
                  }`}
                />
              </div>
              {errors.district && (
                <p className="mt-1 text-xs text-red-600">{errors.district}</p>
              )}
            </div>
          </div>

          {/* KYC Mock Verification Section */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Identity & KYC Verification (Simulated for Evaluation)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Mock Aadhaar Number</label>
                <input
                  type="text"
                  value={aadhaarMock}
                  onChange={(e) => setAadhaarMock(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Mock PAN Number</label>
                <input
                  type="text"
                  value={panMock}
                  onChange={(e) => setPanMock(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            {(role === 'DRIVER' || role === 'OWNER') && (
              <div className="text-xs">
                <label className="text-slate-600 font-semibold block mb-1">Driving Licence / Commercial DL</label>
                <input
                  type="text"
                  value={dlMock}
                  onChange={(e) => setDlMock(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            )}

            <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center bg-white text-xs text-slate-500 flex items-center justify-center space-x-2">
              <UploadCloud className="w-4 h-4 text-emerald-600" />
              <span>Simulated Document Upload: RC / ID Verification</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || registeredSuccess}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md shadow-emerald-600/30 text-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 animate-spin" /> Verifying & Registering...
              </span>
            ) : registeredSuccess ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Account Created!
              </span>
            ) : (
              <>
                <span>Complete Registration & Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-emerald-700 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};
