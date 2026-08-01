import React, { useState } from 'react';
import { Sparkles, Brain, ShieldAlert, CheckCircle2, AlertCircle, RefreshCw, Calendar, TrendingUp, Sliders, Zap, Activity } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [gapType, setGapType] = useState('none');
  const [isHovered, setIsHovered] = useState(false);

  const handleInitialize = (e) => {
    e.preventDefault();
    if (!goal) return;
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Glow Ambiance */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg blur opacity-70 animate-tilt"></div>
            <div className="relative bg-slate-900 p-2 rounded-lg border border-slate-700/50">
              <Brain className="text-indigo-400 w-5 h-5 animate-bounce" />
            </div>
          </div>
          <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-indigo-400 via-cyan-300 to-white bg-clip-text text-transparent">
            HBTM Personal Learning Agent[cite: 1]
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-950/50 border border-indigo-800/40 px-3 py-1.5 rounded-full shadow-inner">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="text-[11px] font-mono text-indigo-300 tracking-wide">Closed-Loop AI Engine[cite: 1]</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {step === 1 ? (
          /* STEP 1: ANIMATED ONBOARDING CARD */
          <div className="max-w-xl mx-auto mt-6 bg-slate-950/80 border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-500">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-950/60 border border-indigo-800/50 rounded-2xl mb-4 text-indigo-400 shadow-lg">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <h1 className="text-3xl font-black tracking-tight mb-2">
                Initialize <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Agent Core</span>[cite: 1]
              </h1>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                A reasoning partner that plans, tracks, nudges, and adapts around real human life[cite: 1].
              </p>
            </div>

            <form onSubmit={handleInitialize} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Target Learning Goal[cite: 1]
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., Pass AWS Solutions Architect Exam[cite: 1]"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Simulate Real-Life Behavior Gap[cite: 1]
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGapType('planned')}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 transform active:scale-95 ${
                      gapType === 'planned' 
                        ? 'border-indigo-500 bg-indigo-950/60 text-indigo-200 shadow-lg shadow-indigo-600/10' 
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs flex items-center justify-between">
                      <span>Planned Gap</span>
                      {gapType === 'planned' && <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Exams/Busy blocks flagged ahead[cite: 1]</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGapType('silent')}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 transform active:scale-95 ${
                      gapType === 'silent' 
                        ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow-lg shadow-amber-600/10' 
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs flex items-center justify-between">
                      <span>Silent Gap</span>
                      {gapType === 'silent' && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Unexpected idle drop detected[cite: 1]</div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center space-x-2 transform active:scale-[0.98]"
              >
                <span className="text-sm tracking-wide">Generate Adaptive Plan</span>
                <Sparkles className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-12 scale-125' : ''}`} />
              </button>
            </form>
          </div>
        ) : (
          /* STEP 2: INTERACTIVE DASHBOARD & DYNAMIC AGENT FEEDBACK */
          <div className="space-y-6 animate-fadeIn">
            
            {/* Dynamic Status / Nudge Banner */}
            {gapType === 'planned' && (
              <div className="bg-indigo-950/80 border border-indigo-700/60 rounded-2xl p-4 flex items-center space-x-4 shadow-xl backdrop-blur-md animate-slideDown">
                <div className="p-2 bg-indigo-900/50 rounded-xl text-indigo-300 border border-indigo-700/50">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-xs leading-relaxed">
                  <span className="font-bold text-indigo-200 block text-sm mb-0.5">Planned Gap Active</span>
                  College exams acknowledged. Agent has pre-adjusted milestones with zero guilt-tripping[cite: 1].
                </div>
              </div>
            )}

            {gapType === 'silent' && (
              <div className="bg-amber-950/60 border border-amber-700/60 rounded-2xl p-4 flex items-center space-x-4 shadow-xl backdrop-blur-md animate-slideDown">
                <div className="p-2 bg-amber-900/50 rounded-xl text-amber-300 border border-amber-700/50">
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-xs leading-relaxed">
                  <span className="font-bold text-amber-200 block text-sm mb-0.5">Contextual Nudge Triggered</span>
                  3 days idle interval noticed. Resuming automatically from your exact incomplete topic (Subnets)[cite: 1].
                </div>
              </div>
            )}

            {/* Metrics Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition">
                <div className="text-xs font-semibold text-slate-400">Overall Plan Completion[cite: 1]</div>
                <div className="text-3xl font-black font-mono text-indigo-400 mt-2">80%[cite: 1]</div>
                <div className="w-full bg-slate-950 rounded-full h-2 mt-4 border border-slate-800 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full w-[80%] transition-all duration-1000"></div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition">
                <div className="text-xs font-semibold text-slate-400">Networking Confidence (Quiz Signal)[cite: 1]</div>
                <div className="text-3xl font-black font-mono text-amber-400 mt-2">45%[cite: 1]</div>
                <div className="w-full bg-slate-950 rounded-full h-2 mt-4 border border-slate-800 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full w-[45%] transition-all duration-1000"></div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition">
                <div className="text-xs font-semibold text-slate-400">Resilience Score[cite: 1]</div>
                <div className="text-3xl font-black font-mono text-emerald-400 mt-2">92/100</div>
                <div className="text-[10px] text-slate-500 mt-2">Measures return velocity after gaps[cite: 1]</div>
              </div>
            </div>

            {/* Explainable Plan Changes Log */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="p-1.5 bg-indigo-950 border border-indigo-800/50 rounded-lg text-indigo-400">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-200">Explainable Plan Changes (Active Feedback Loop)[cite: 1]</h3>
              </div>
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-2 text-xs font-mono text-slate-300 leading-relaxed shadow-inner">
                <div className="text-indigo-400 font-bold flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                  <span>Plan adjusted live because:[cite: 1]</span>
                </div>
                <div className="pl-3.5 border-l border-indigo-500/20 space-y-1">
                  <div>• Subnets quiz result logged at 40% threshold (Remedial tasks assigned)[cite: 1]</div>
                  <div>• Upcoming execution milestone pushed back by 2 days smoothly[cite: 1]</div>
                  <div>• State Store state successfully synchronized[cite: 1]</div>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-medium text-slate-400 hover:text-indigo-400 flex items-center space-x-1.5 transition bg-slate-900/60 border border-slate-800 px-4 py-2.5 rounded-xl"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Agent State</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
