import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tractor, ShieldCheck, CheckCircle2, ArrowRight, UploadCloud, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

export const RegisterPage: React.FC = () => {
  const { loginAsRole } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>('FARMER');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('Bagru');
  const [district, setDistrict] = useState('Jaipur');
  const [aadhaarMock, setAadhaarMock] = useState('XXXX-XXXX-9921');
  const [panMock, setPanMock] = useState('ABCDE1234F');
  const [dlMock, setDlMock] = useState('RJ-14-2024-001234');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(async () => {
      await loginAsRole(role);
      if (role === 'FARMER') navigate('/farmer/dashboard');
      else if (role === 'OWNER') navigate('/owner/dashboard');
      else if (role === 'DRIVER') navigate('/driver/dashboard');
      else navigate('/admin/dashboard');
    }, 1200);
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

        {/* Prototype Security Notice (Requirement 16) */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-amber-900">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>SIH Hackathon Notice:</strong> For prototype safety, do not upload real personal identification. Simulated verification IDs are pre-filled for testing.
          </div>
        </div>

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
                  className={`p-3 rounded-2xl border text-left transition-all ${
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

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98290 12345"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Village / Gram Panchayat</label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">District</label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* KYC Mock Verification Section */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Identity & KYC Verification (Simulated)
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
              <span>Mock Document Upload: RC / Tractor Insurance / ID Card</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/30 text-sm transition-all flex items-center justify-center space-x-1"
          >
            {submitted ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 animate-spin" /> Creating Profile...
              </span>
            ) : (
              <>
                <span>Complete Registration & Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-emerald-700 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};
