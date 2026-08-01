import React, { useState } from 'react';
import { Sparkles, Brain, ShieldAlert, CheckCircle2, AlertCircle, RefreshCw, Calendar, TrendingUp, Sliders, Activity, Terminal, Shield, Cpu, Compass } from 'lucide-react';

export default function App() {
  const [goal, setGoal] = useState('Pass AWS Solutions Architect Exam');
  const [gapMode, setGapMode] = useState('planned'); // 'planned', 'silent', 'none'
  const [activeTab, setActiveTab] = useState('telemetry');

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col overflow-hidden">
      
      {/* Top Tactical Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur px-6 py-3 flex justify-between items-center z-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-950/80 border border-indigo-700/50 rounded-xl">
            <Brain className="text-indigo-400 w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="font-black text-sm tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              HBTM PERSONAL LEARNING AGENT[cite: 1]
            </div>
            <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
              Autonomous Closed-Loop Tutor & Tactical Control Override[cite: 1]
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3 bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-xl text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-slate-400">OPERATOR:</span>
          <span className="text-cyan-400 font-semibold">TEAM_VOLT_AGENT_CORE[cite: 1]</span>
        </div>
      </header>

      {/* Main Split-Screen Tactical Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Control Panel (Telemetry & Gap Simulation) */}
        <div className="lg:col-span-5 border-r border-slate-800/80 bg-slate-950/60 p-5 overflow-y-auto space-y-4 max-h-[calc(100vh-65px)]">
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono tracking-wider text-slate-400 uppercase flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Intent & Behavior Engine[cite: 1]</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded font-mono">LIVE SYNC</span>
          </div>

          {/* Goal Intake Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">Active Learner Goal[cite: 1]</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-indigo-300 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Gap Selector Telemetry */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Simulate Real-Life Disruption[cite: 1]</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGapMode('planned')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  gapMode === 'planned' 
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-200' 
                    : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>Planned Gap</span>
                  {gapMode === 'planned' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>}
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">Exams flagged ahead[cite: 1]</div>
              </button>

              <button
                onClick={() => setGapMode('silent')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  gapMode === 'silent' 
                    ? 'border-amber-500 bg-amber-950/50 text-amber-200' 
                    : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>Silent Gap</span>
                  {gapMode === 'silent' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>}
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">Unexpected drop / idle[cite: 1]</div>
              </button>
            </div>
          </div>

          {/* Core Telemetry Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Plan Completion[cite: 1]</div>
              <div className="text-xl font-black font-mono text-indigo-400 mt-1">80%[cite: 1]</div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 border border-slate-800">
                <div className="bg-indigo-500 h-full rounded-full w-[80%]"></div>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Networking Confidence[cite: 1]</div>
              <div className="text-xl font-black font-mono text-amber-400 mt-1">45%[cite: 1]</div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 border border-slate-800">
                <div className="bg-amber-500 h-full rounded-full w-[45%]"></div>
              </div>
            </div>
          </div>

          {/* Explainable Changes Log */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Explainable Plan Modifications[cite: 1]</span>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-[11px] font-mono text-slate-300 space-y-1">
              <div className="text-indigo-400 font-semibold">State Engine Status: ACTIVE</div>
              <div>• Quiz on Subnets: 40% (Remedial tasks inserted)[cite: 1]</div>
              <div>• Milestone delayed by 2 days smoothly[cite: 1]</div>
            </div>
          </div>

        </div>

        {/* Right Tactical Interactive Workspace / Visualizer */}
        <div className="lg:col-span-7 bg-[#02040a] p-6 relative flex flex-col justify-between overflow-hidden">
          
          {/* Background Grid Lines simulation */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          {/* Top Status HUD inside Visualizer */}
          <div className="relative z-10 flex justify-between items-center bg-slate-900/60 border border-slate-800/80 px-4 py-3 rounded-2xl backdrop-blur">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-mono text-slate-200">AUTONOMOUS REASONING MAP</span>
            </div>
            <div className="text-[10px] font-mono px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800 rounded-lg">
              SYSTEM: OPTIMIZED[cite: 1]
            </div>
          </div>

          {/* Center Dynamic Visual Simulation Box */}
          <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center text-center space-y-4">
            
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-24 h-24 bg-slate-900 border-2 border-indigo-500/50 rounded-3xl flex items-center justify-center shadow-2xl">
                <Compass className="w-10 h-10 text-indigo-400 animate-bounce" />
              </div>
            </div>

            <div className="space-y-1 max-w-md">
              <h2 className="text-lg font-bold tracking-tight text-slate-100">
                {gapMode === 'planned' ? 'Planned Gap Pre-Adjustment Active' : gapMode === 'silent' ? 'Contextual Nudge Dispatched' : 'Continuous Learning Loop Engaged'}
              </h2>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                {gapMode === 'planned' 
                  ? 'Exams flagged in advance. Agent has automatically structured recaps around the break with zero guilt-tripping[cite: 1].' 
                  : gapMode === 'silent' 
                  ? 'Inactivity detected. Triggered targeted intervention referencing the exact unfinished module (Subnets)[cite: 1].' 
                  : 'Real-time intelligence analyzing user intent, tracking honesty metrics, and adapting learning paths[cite: 1].'}
              </p>
            </div>

            {/* Live Interactive Simulation Trigger */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 bg-indigo-950/80 border border-indigo-700/50 px-4 py-2 rounded-xl text-xs font-mono text-indigo-300 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>Resilience Score: 92/100 (High Recovery Rate)[cite: 1]</span>
              </div>
            </div>

          </div>

          {/* Bottom Footer HUD */}
          <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-slate-900 pt-4">
            <div>NODE: IIIT_PUNE_VOLT_TEAM[cite: 1]</div>
            <div>STATUS: SECURE FEEDBACK LOOP[cite: 1]</div>
          </div>

        </div>

      </div>
    </div>
  );
}
