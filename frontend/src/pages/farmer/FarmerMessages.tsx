import React, { useState } from 'react';
import { Send, Tractor, Truck, User, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const FarmerMessages: React.FC = () => {
  const { currentUser } = useAuth();

  const [activeContact, setActiveContact] = useState<'owner' | 'driver'>('driver');
  const [driverMessages, setDriverMessages] = useState([
    { sender: 'driver', text: 'Ram Ram Ramesh ji! I have loaded the Mahindra 575 DI at Vikram Hub.', time: '07:15 AM' },
    { sender: 'farmer', text: 'Ram Ram Rajesh! Please take the south canal road as the main bypass has road repair.', time: '07:18 AM' },
    { sender: 'driver', text: 'Noted! I will arrive at Field No. 4 in roughly 12 minutes. Please keep pickup OTP ready.', time: '07:20 AM' },
  ]);
  const [ownerMessages, setOwnerMessages] = useState([
    { sender: 'owner', text: 'Namaste Ramesh ji. We received your booking for 8 acres wheat soil prep.', time: 'Yesterday' },
    { sender: 'farmer', text: 'Namaste Vikram ji. Is the rotavator blades newly sharpened?', time: 'Yesterday' },
    { sender: 'owner', text: 'Yes, full set of 42 boron blades inspected and greased this morning!', time: 'Yesterday' },
  ]);

  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (activeContact === 'driver') {
      setDriverMessages([...driverMessages, { sender: 'farmer', text: input, time: 'Just now' }]);
    } else {
      setOwnerMessages([...ownerMessages, { sender: 'farmer', text: input, time: 'Just now' }]);
    }
    setInput('');
  };

  const messages = activeContact === 'driver' ? driverMessages : ownerMessages;

  return (
    <div className="space-y-6 text-left">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          In-App Field Messenger
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Messages & Field Coordination</h1>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[560px]">
        {/* Contacts Sidebar */}
        <div className="md:col-span-4 border-r border-slate-200 p-4 space-y-2 bg-slate-50/50">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Active Stakeholders
          </span>

          <button
            onClick={() => setActiveContact('driver')}
            className={`w-full p-3 rounded-2xl flex items-center space-x-3 text-left transition-all ${
              activeContact === 'driver' ? 'bg-white shadow-sm border border-emerald-400/60 ring-2 ring-emerald-500/10' : 'hover:bg-slate-100'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs truncate">Rajesh Gurjar</h4>
                <span className="text-[10px] text-emerald-700 font-semibold">Active</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">Assigned Driver • Mahindra 575 DI</p>
            </div>
          </button>

          <button
            onClick={() => setActiveContact('owner')}
            className={`w-full p-3 rounded-2xl flex items-center space-x-3 text-left transition-all ${
              activeContact === 'owner' ? 'bg-white shadow-sm border border-emerald-400/60 ring-2 ring-emerald-500/10' : 'hover:bg-slate-100'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              <Tractor className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs truncate">Vikram Singh Shekhawat</h4>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">Equipment Hub Owner • Bagru</p>
            </div>
          </button>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-8 flex flex-col justify-between bg-white">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                {activeContact === 'driver' ? 'RG' : 'VS'}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {activeContact === 'driver' ? 'Rajesh Gurjar (Driver)' : 'Vikram Singh (Equipment Owner)'}
                </h3>
                <span className="text-[10px] text-emerald-600 font-semibold">Verified Contact</span>
              </div>
            </div>
            <a
              href={`tel:${activeContact === 'driver' ? '+919785011111' : '+919414011223'}`}
              className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Call Mobile</span>
            </a>
          </div>

          {/* Messages Feed */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50/40 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'farmer' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    m.sender === 'farmer'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-100 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message regarding field landmarks, soil status, arrival..."
              className="flex-1 px-3.5 py-2.5 bg-slate-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
