import React from 'react';
import { CloudRain, Wind, Droplets, Sun, AlertCircle, CheckCircle2 } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherWidgetProps {
  data: WeatherData;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-emerald-500/20 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/60 pb-4 mb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            Micro-Climate & Agri Forecast
          </span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{data.village}</span>
          </h3>
        </div>
        <div className="bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-time Field Station</span>
        </div>
      </div>

      {/* Current Conditions Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
          <span className="text-xs text-slate-300">Temperature</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-0.5">{data.temperature}°C</div>
          <span className="text-[11px] text-slate-400">{data.condition}</span>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-1.5 text-xs text-slate-300">
            <CloudRain className="w-3.5 h-3.5 text-sky-400" />
            <span>Rain Risk</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-300 mt-0.5">{data.rainProbability}%</div>
          <span className="text-[11px] text-slate-400">Next 24 Hours</span>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-1.5 text-xs text-slate-300">
            <Droplets className="w-3.5 h-3.5 text-teal-400" />
            <span>Humidity</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-300 mt-0.5">{data.humidity}%</div>
          <span className="text-[11px] text-slate-400">Soil Evaporation Low</span>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-1.5 text-xs text-slate-300">
            <Wind className="w-3.5 h-3.5 text-slate-300" />
            <span>Wind Speed</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">{data.windSpeed} <span className="text-xs font-normal">km/h</span></div>
          <span className="text-[11px] text-slate-400">Safe for Spraying</span>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className={`p-4 rounded-2xl border flex items-start space-x-3 mb-5 ${
        data.farmingAdvisory.type === 'ALERT'
          ? 'bg-red-500/20 border-red-500/40 text-red-100'
          : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-100'
      }`}>
        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-white mb-0.5">{data.farmingAdvisory.title}</h4>
          <p className="text-xs leading-relaxed text-slate-200">{data.farmingAdvisory.message}</p>
        </div>
      </div>

      {/* 5-Day Outlook */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
          5-Day Machine Operation Outlook
        </span>
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {data.forecast.map((f, i) => (
            <div key={i} className="bg-white/5 p-2 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="font-semibold text-slate-300">{f.day}</span>
              <span className="text-[10px] text-slate-400">{f.date}</span>
              <div className="my-1.5 font-bold text-sm text-white">{f.temp}°</div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                f.rainProb > 40 ? 'bg-sky-500/30 text-sky-200' : 'bg-emerald-500/30 text-emerald-200'
              }`}>
                {f.rainProb}% rain
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
