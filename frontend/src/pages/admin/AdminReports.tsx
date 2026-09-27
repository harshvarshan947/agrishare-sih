import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, Printer, Sparkles, ShieldCheck } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportCSV = (reportName: string) => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            State Audit & Analytics
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">SIH Evaluation Reports & Audit</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Export comprehensive system logs, farmer subsidy claims, driver certifications, and machine utilization audit trails.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>Print / PDF Summary</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Audit report generated and saved as CSV!</span>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Equipment Fleet & Health Audit',
            desc: 'Operating hours, service history, and health condition % of all 20 implements.',
            records: '20 Machines',
            type: 'FLEET_AUDIT',
          },
          {
            title: 'Farmer Rentals & OTP Logs',
            desc: 'Complete ledger of pickup and delivery OTP verifications with timestamps.',
            records: '88 Records',
            type: 'OTP_LOGS',
          },
          {
            title: 'District Revenue & DBT Transfers',
            desc: 'Gross volume, 5% platform fees, and direct bank settlement transfers.',
            records: '₹4,64,000 GTV',
            type: 'FINANCE_AUDIT',
          },
          {
            title: 'Unfulfilled Demand & Heatmaps',
            desc: 'Farmer equipment requests categorized by tehsil and crop cycle.',
            records: '139 Requests',
            type: 'DEMAND_AUDIT',
          },
          {
            title: 'Driver Safety & DL Records',
            desc: 'Commercial driver endorsements, completed jobs, and safety ratings.',
            records: '5 Operators',
            type: 'DRIVER_AUDIT',
          },
          {
            title: 'Government Scheme Applications',
            desc: 'SMAM & RajKisan subsidy claims initiated through the platform.',
            records: '4 Schemes',
            type: 'SCHEME_AUDIT',
          },
        ].map((rep, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400">REPORT-0{idx + 1}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  {rep.records}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{rep.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{rep.desc}</p>
            </div>

            <button
              onClick={() => handleExportCSV(rep.title)}
              className="w-full py-2.5 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Audit File</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
