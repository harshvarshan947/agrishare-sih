import React, { useState, useEffect } from 'react';
import { FileText, Plus, CheckCircle2, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { GovernmentScheme } from '../../types';

export const AdminSchemes: React.FC = () => {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [ministry, setMinistry] = useState('Ministry of Agriculture & Farmers Welfare');
  const [subsidyPercentage, setSubsidyPercentage] = useState('50% Subsidy');
  const [targetBeneficiaries, setTargetBeneficiaries] = useState('Small & Marginal Farmers');
  const [description, setDescription] = useState('');
  const [applicationUrl, setApplicationUrl] = useState('https://agrimachinery.nic.in');
  const [lastDate, setLastDate] = useState('2026-12-31');

  useEffect(() => {
    api.getSchemes().then(setSchemes);
  }, []);

  const handleAddScheme = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSch = await api.addScheme({
      title,
      ministry,
      subsidyPercentage,
      targetBeneficiaries,
      description,
      eligibility: ['Registered farmer', 'Jamabandi land records', 'Aadhaar linked bank account'],
      benefits: ['Direct DBT subsidy on implements', 'Subsidized loan interest'],
      documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Passbook'],
      applicationUrl,
      lastDate,
    });

    setSchemes([newSch, ...schemes]);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Policy & Mechanization Subsidies
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">Government Schemes Management</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Publish and manage central & state agricultural machinery subsidies (SMAM, PM-KUSUM, RajKisan Sathi).
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Government Scheme</span>
        </button>
      </div>

      {/* Add Scheme Form (Requirement 8-6) */}
      {isAddOpen && (
        <form onSubmit={handleAddScheme} className="bg-white rounded-3xl p-6 border border-emerald-300 shadow-md space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
            Register Central/State Scheme
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Scheme Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Rajasthan Solar Thresher Subsidy"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Ministry / Department</label>
              <input
                type="text"
                value={ministry}
                onChange={(e) => setMinistry(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Subsidy Percentage / Amount</label>
              <input
                type="text"
                value={subsidyPercentage}
                onChange={(e) => setSubsidyPercentage(e.target.value)}
                placeholder="e.g. 50% DBT Subsidy"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Beneficiaries</label>
              <input
                type="text"
                value={targetBeneficiaries}
                onChange={(e) => setTargetBeneficiaries(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Portal URL</label>
              <input
                type="url"
                value={applicationUrl}
                onChange={(e) => setApplicationUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Last Date to Apply</label>
              <input
                type="date"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description & Scope</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how smallholders and Custom Hiring Centres benefit from this scheme..."
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
            >
              Publish Scheme
            </button>
          </div>
        </form>
      )}

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((sch) => (
          <div
            key={sch.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{sch.ministry}</span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                  {sch.subsidyPercentage}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">{sch.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{sch.description}</p>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-800 text-[10px] uppercase">Eligibility:</span>
                {sch.eligibility.slice(0, 2).map((el, i) => (
                  <div key={i} className="flex items-center space-x-1.5 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{el}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Deadline: {sch.lastDate}
                </span>
                <span className="text-slate-400">Target: {sch.targetBeneficiaries}</span>
              </div>
            </div>

            <a
              href={sch.applicationUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-slate-900 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Apply on Official NIC Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
