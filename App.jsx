import React, { useState } from 'react';
import { Sparkles, Brain, ShieldAlert, CheckCircle2, AlertCircle, RefreshCw, Calendar, TrendingUp, Sliders } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [gapType, setGapType] = useState('none'); // 'none', 'planned', 'silent'
  const [quizScore, setQuizScore] = useState(85);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dynamic state updates based on PPT logic
  const handleInitialize = (e) => {
    e.preventDefault();
    if (!goal) return;
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="text-indigo-400 w-6 h-6 animate-pulse" />
          <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            HBTM Personal Learning Agent[cite: 1]
          </span>
        </div>
        <span className="text-xs px-3 py-1 bg-indigo-950 border border-indigo-800/50 text-indigo-300 rounded-full font-mono">
          Team Volt | Closed-Loop Tutor[cite: 1]
        </span>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {step === 1 ? (
          /* STEP 1: GOAL INTAKE & INTENT PARSING */
          <div className="max-w-xl mx-auto mt-12 bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-extrabold mb-2">
                Initialize <span className="text-indigo-400">Personal Learning Agent</span>[cite: 1]
              </h1>
              <p className="text-slate-400 text-sm">
                A closed-loop tutor that plans, tracks, nudges, and adapts based on real behavior[cite: 1].
              </p>
            </div>

            <form onSubmit={handleInitialize} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  What is your learning goal?[cite: 1]
                </label>
                <input
                  type="text"
                  placeholder="e.g., Pass AWS Solutions Architect Exam[cite: 1]"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Simulate Real-Life Behavior Gap[cite: 1]:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setGapType('planned')}
                    className={`p-3 rounded-xl border text-left transition ${
                      gapType === 'planned' ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold text-xs">Planned Gap</div>
                    <div className="text-[10px] text-slate-500 mt-1">Exams/Busy days flagged in advance[cite: 1]</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGapType('silent')}
                    className={`p-3 rounded-xl border text-left transition ${
                      gapType === 'silent' ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold text-xs">Silent Gap</div>
                    <div className="text-[10px] text-slate-500 mt-1">Unexpected inactivity / drop[cite: 1]</div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2"
              >
                <span>Build Dynamic Plan</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* STEP 2: DASHBOARD & EXPLAINABLE PLAN CHANGES */
          <div className="space-y-6">
            
            {/* Dynamic Status / Nudge Banner based on PPT Differentiators */}
            {gapType === 'planned' && (
              <div className="bg-indigo-950/60 border border-indigo-800/60 rounded-2xl p-4 flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-indigo-200">Planned Gap Active:</span> College exams flagged. Agent has smoothly pre-adjusted milestones with zero guilt-tripping[cite: 1].
                </div>
              </div>
            )}

            {gapType === 'silent' && (
              <div className="bg-amber-950/40 border border-amber-800/60 rounded-2xl p-4 flex items-center space-x-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-amber-200">Contextual Nudge Triggered:</span> 3 days of unexpected inactivity detected. Referencing exact topic left behind (Subnets)[cite: 1].
                </div>
              </div>
            )}

            {/* Metrics Grid (Confidence Score vs Checkboxes from PPT) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <div className="text-xs text-slate-400">Overall Plan Completion[cite: 1]</div>
                <div className="text-2xl font-bold font-mono text-indigo-400 mt-1">80%[cite: 1]</div>
                <div className="w-full bg-slate-950 rounded-full h-2 mt-3 border border-slate-800">
                  <div className="bg-indigo-500 h-1.5 rounded-full w-[80%]"></div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <div className="text-xs text-slate-400">Networking Confidence (Quiz Signal)[cite: 1]</div>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-1">45%[cite: 1]</div>
                <div className="w-full bg-slate-950 rounded-full h-2 mt-3 border border-slate-800">
                  <div className="bg-amber-500 h-1.5 rounded-full w-[45%]"></div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <div className="text-xs text-slate-400">Resilience Score[cite: 1]</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">92/100</div>
                <div className="text-[10px] text-slate-500 mt-1">Measures recovery speed after a gap[cite: 1]</div>
              </div>
            </div>

            {/* Explainable Plan Changes (Core Differentiator from PPT) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-sm text-slate-200">Explainable Plan Changes (Active Feedback Loop)[cite: 1]</h3>
              </div>
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-2 text-xs font-mono text-slate-300">
                <div className="text-indigo-400 font-bold">Plan adjusted because:[cite: 1]</div>
                <div>• Quiz score on Subnets: 40% (Remedial tasks added)[cite: 1]</div>
                <div>• Next milestone delayed by 2 days dynamically[cite: 1]</div>
                <div>• Active State Store updated successfully[cite: 1]</div>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset & Change Goal</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
