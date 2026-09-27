import React, { useState } from 'react';
import { useDemoFlow, DEMO_STEPS } from '../context/DemoFlowContext';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import {
  Play,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  UserCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const SihDemoBar: React.FC = () => {
  const { currentStep, isDemoActive, nextStep, prevStep, jumpToStep, resetDemo, runAllStepsAuto } = useDemoFlow();
  const { currentRole, loginAsRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const stepInfo = DEMO_STEPS.find((s) => s.step === currentStep) || DEMO_STEPS[0];

  const handleAutoPlay = async () => {
    setIsPlaying(true);
    await runAllStepsAuto();
    setIsPlaying(false);
  };

  if (!isDemoActive) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-auto">
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> SIH 2026 Presentation Mode
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Role Switcher Buttons */}
            <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 text-xs">
              {(['FARMER', 'OWNER', 'DRIVER', 'ADMIN'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => loginAsRole(r)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    currentRole === r
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  {r === 'FARMER' && '👨‍🌾 Farmer'}
                  {r === 'OWNER' && '🚜 Owner'}
                  {r === 'DRIVER' && '🚚 Driver'}
                  {r === 'ADMIN' && '🛡️ Admin'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
              title={collapsed ? 'Expand bar' : 'Minimize bar'}
            >
              {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {!collapsed && (
          <div className="p-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Step Info */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Step {stepInfo.step} / 22
                  </span>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Actor: <strong className="text-white">{stepInfo.actor}</strong>
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white truncate mt-0.5">
                  {stepInfo.title}: <span className="text-emerald-300 font-normal">{stepInfo.actionDesc}</span>
                </h4>
              </div>

              {/* Step Controls */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1 || isPlaying}
                  className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center text-xs"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextStep}
                  disabled={currentStep === DEMO_STEPS.length || isPlaying}
                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center space-x-1.5 shadow-md shadow-emerald-500/20"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleAutoPlay}
                  disabled={isPlaying}
                  className="px-2.5 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-medium text-xs rounded-lg transition-colors flex items-center space-x-1"
                  title="Auto-play all 22 steps in 2 minutes"
                >
                  <Play className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
                  <span className="hidden md:inline">{isPlaying ? 'Playing...' : 'Auto-Play'}</span>
                </button>

                <button
                  onClick={resetDemo}
                  disabled={isPlaying}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                  title="Reset Demo Scenario"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step Progress Bar with Clickable Pips */}
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center space-x-1 overflow-x-auto py-1">
              {DEMO_STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => jumpToStep(s.step)}
                  className={`h-2 rounded-full transition-all flex-1 min-w-[12px] ${
                    s.step === currentStep
                      ? 'bg-emerald-400 ring-2 ring-emerald-300/50 scale-110'
                      : s.step < currentStep
                      ? 'bg-emerald-600/70 hover:bg-emerald-500'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={`Step ${s.step}: ${s.title}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
