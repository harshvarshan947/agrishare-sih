import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, CheckCircle2, XCircle, Search, Filter, Ban, Info } from 'lucide-react';
import { api } from '../../services/api';
import { User, Role, VerificationStatus } from '../../types';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getUsers().then(setUsers);
  }, []);

  const handleUpdateStatus = async (id: string, status: VerificationStatus) => {
    const updated = await api.updateUserVerification(id, status);
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
  };

  const filtered = users.filter((u) => {
    if (filterRole !== 'ALL' && u.role !== filterRole) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.village.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          KYC & Identity Registry
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">User & Stakeholder Management</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Verify simulated Aadhaar/PAN credentials for Farmers, Owners, and Commercial Drivers.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone or village..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold w-full sm:w-auto overflow-x-auto">
          {['ALL', 'FARMER', 'OWNER', 'DRIVER', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterRole === r ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Location</th>
                <th className="p-4">Identity (Mock)</th>
                <th className="p-4">Verification</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60">
                  <td className="p-4 flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                      {u.avatar ? (
                        <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center font-bold text-xs">
                          {u.name[0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                      <div className="text-[11px] text-slate-500">{u.phone}</div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-md text-[10px]">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600">
                    {u.village}, {u.district}
                  </td>

                  <td className="p-4 font-mono text-[11px] text-slate-700">
                    {u.aadhaarMasked || 'XXXX-XXXX-9900'}
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      u.verificationStatus === 'VERIFIED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : u.verificationStatus === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {u.verificationStatus}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-1.5">
                    {u.verificationStatus !== 'VERIFIED' && (
                      <button
                        onClick={() => handleUpdateStatus(u.id, 'VERIFIED')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px]"
                      >
                        Verify
                      </button>
                    )}
                    {u.verificationStatus !== 'REJECTED' && (
                      <button
                        onClick={() => handleUpdateStatus(u.id, 'REJECTED')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-lg font-bold text-[10px]"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
