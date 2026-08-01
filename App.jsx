import React, { useState } from 'react';
import { Brain, Zap, AlertTriangle, CalendarClock, Target, BarChart3, XCircle, CheckCircle2 } from 'lucide-react';

function App() {
  const [goal, setGoal] = useState('AWS Solutions Architect Certification');
  const [gapType, setGapType] = useState('none'); // 'none', 'planned', 'silent'

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-600 selection:text-white relative overflow-hidden">
      
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-900/30 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <header className="border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/70 border border-cyan-800">
            <Brain className="w-7 h-7 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter">
            HBTM <span className="text-cyan-400">Learning Agent[cite: 1]</span>
          </h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">v0.1 Beta[cite: 1]</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-mono text-slate-400">
           <span>Status:</span>
           <div className="flex items-center gap-2 text-emerald-400 font-semibold">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </span>
             ONLINE
           </div>
           <span>|</span>
           <div className="text-cyan-400">Core: TILT_ENGINE_ACTIVE</div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-8 p-8 max-w-[1800px] mx-auto relative z-10">
        
        {/* LEFT COLUMN: Simulator & Adaptive Plan */}
        <div className="space-y-8">
          
          {/* 1. Goal Setting Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-950 rounded-2xl border border-indigo-800"><Target className="w-7 h-7 text-indigo-400"/></div>
              <div>
                <h2 className="text-xl font-bold">Define Your Learning Goal[cite: 1]</h2>
                <p className="text-slate-400 text-sm">Set the objective for the agent to start building a resilient plan.</p>
              </div>
            </div>
            <input 
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Learn React in 30 days[cite: 1]"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-lg placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 transition"
            />
          </div>

          {/* 2. Gap Simulator Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-950 rounded-2xl border border-amber-800"><AlertTriangle className="w-7 h-7 text-amber-400"/></div>
              <div>
                <h2 className="text-xl font-bold">Real-Life Gap Simulator[cite: 1]</h2>
                <p className="text-slate-400 text-sm">Simulate human behavior to see how the agent handles "Planned" vs "Silent" gaps[cite: 1].</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => setGapType('none')}
                className={`p-6 rounded-2xl border-2 text-center transition hover:border-cyan-600 group ${gapType === 'none' ? 'bg-cyan-950/50 border-cyan-600' : 'bg-slate-800/30 border-slate-700'}`}>
                <div className="font-bold text-lg text-white mb-1">No Gap</div>
                <div className="text-xs text-slate-400 group-hover:text-slate-200">Ideal execution[cite: 1]</div>
              </button>
              <button 
                onClick={() => setGapType('planned')}
                className={`p-6 rounded-2xl border-2 text-center transition hover:border-indigo-600 group ${gapType === 'planned' ? 'bg-indigo-950/50 border-indigo-600' : 'bg-slate-800/30 border-slate-700'}`}>
                <div className="font-bold text-lg text-white mb-1">Planned Gap</div>
                <div className="text-xs text-slate-400 group-hover:text-slate-200">Vacation, Exams flagged[cite: 1]</div>
              </button>
              <button 
                onClick={() => setGapType('silent')}
                className={`p-6 rounded-2xl border-2 text-center transition hover:border-amber-600 group ${gapType === 'silent' ? 'bg-amber-950/50 border-amber-600' : 'bg-slate-800/30 border-slate-700'}`}>
                <div className="font-bold text-lg text-white mb-1">Silent Gap</div>
                <div className="text-xs text-slate-400 group-hover:text-slate-200">Unexpected drop[cite: 1]</div>
              </button>
            </div>
          </div>

          {/* 3. Adaptive Plan Visualization Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/30 min-h-[300px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-950 rounded-2xl border border-cyan-800"><CalendarClock className="w-7 h-7 text-cyan-400"/></div>
              <div>
                <h2 className="text-xl font-bold">Live Adaptive Plan[cite: 1]</h2>
                <p className="text-slate-400 text-sm">Agent is reasoning and self-correcting based on intent and gaps[cite: 1].</p>
              </div>
            </div>
            
            {/* Dynamic Content based on Gap Type */}
            <div className="font-mono text-sm border border-dashed border-slate-700 rounded-2xl p-6 bg-slate-800/30 space-y-4">
              {gapType === 'none' && (
                <div className="text-slate-400">Awaiting Goal Initialization...</div>
              )}
              {gapType === 'planned' && (
                <div className="space-y-2 text-indigo-300">
                  <div><span className="text-emerald-400">✓</span> Intent Parsing: "Pass AWS..." detected[cite: 1].</div>
                  <div><span className="text-emerald-400">✓</span> Baseline Plan Generated: 12 Milestones[cite: 1].</div>
                  <div><span className="text-amber-400">!</span> New Input: "Vacation" flagged for Days 5-7[cite: 1].</div>
                  <div><span className="w-2 h-2 bg-indigo-500 rounded-full inline-block animate-pulse mr-2"></span><span className="text-indigo-100 font-semibold">AGENT ACTION:</span> Re-optimizing plan. Workload redistributed. New ETA: Day 32[cite: 1]. No guilt triggered[cite: 1].</div>
                </div>
              )}
              {gapType === 'silent' && (
                <div className="space-y-2 text-amber-300">
                  <div><span className="text-emerald-400">✓</span> Learning Confidence: High (Quiz 90%)[cite: 1].</div>
                  <div><span className="text-amber-400">!</span> Anomaly Detected: 3-day silent inactivity interval[cite: 1].</div>
                  <div><span className="w-2 h-2 bg-amber-500 rounded-full inline-block animate-pulse mr-2"></span><span className="text-amber-100 font-semibold">AGENT ACTION:</span> Dispatched Contextual Nudge[cite: 1]. Offering resume from exact incomplete topic (IAM Policies)[cite: 1].</div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Dashboard Metrics */}
        <div className="space-y-8">
          
          {/* Scorecards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-inner flex flex-col items-center justify-center text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Honesty Score[cite: 1]</div>
              <div className="text-5xl font-black text-cyan-400">98<span className="text-3xl text-cyan-600">%</span></div>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-3"><div className="bg-cyan-500 h-2 rounded-full w-[98%]"></div></div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-inner flex flex-col items-center justify-center text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Resilience[cite: 1]</div>
              <div className="text-5xl font-black text-indigo-400">92</div>
              <div className="text-sm text-indigo-200">High Recovery[cite: 1]</div>
            </div>
          </div>

          {/* Explainable Plan Changes Log */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-950 rounded-2xl border border-emerald-800"><BarChart3 className="w-7 h-7 text-emerald-400"/></div>
              <div>
                <h2 className="text-xl font-bold">Explainable Changes[cite: 1]</h2>
                <p className="text-slate-400 text-sm">Why the plan changed, and how the agent reasoned through it[cite: 1].</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm font-mono">
              <li className="flex items-start gap-3 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-500"/>
                <span>Goal Initialized: AWS Sol. Architect[cite: 1].</span>
              </li>
              <li className="flex items-start gap-3 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-500"/>
                <span>Milestone 4 (VPC) re-sequenced after vacation flag[cite: 1].</span>
              </li>
              <li className="flex items-start gap-3 text-amber-300">
                <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-500"/>
                <span>Nudge sent (Idle Day 3). Reason: Inactivity Threshold Exceeded[cite: 1].</span>
              </li>
              <li className="flex items-start gap-3 text-rose-300">
                <XCircle className="w-5 h-5 mt-0.5 shrink-0 text-rose-500"/>
                <span>*No guilt trigger activated* (System Lock)[cite: 1].</span>
              </li>
            </ul>
          </div>
          
          {/* Agent Personality Blurb */}
           <div className="border border-dashed border-slate-700 rounded-3xl p-6 text-center text-slate-600 text-xs hover:border-cyan-800 hover:text-cyan-900 transition cursor-help">
             An autonomous reasoning partner that observes, understands intent, plans, tracks honesty metrics, nudges contextually, and adapts proactively around human life constraints[cite: 1].
           </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-700 mt-12 border-t border-slate-800/50">
        Team Volt - IIIT Pune - Learning Agent System © 2024[cite: 1]
      </footer>
    </div>
  );
}

export default App;
