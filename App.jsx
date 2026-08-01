import React, { useState } from 'react';

export default function App() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [availability, setAvailability] = useState('2');
  const [gapType, setGapType] = useState('planned'); // 'planned' or 'silent'
  
  const handleGenerate = (e) => {
    e.preventDefault();
    if (!goal) return;
    setStep(2);
  };

  return (
    <div style={{ backgroundColor: '#030712', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '15px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#091e3a', border: '1px solid #0284c7', padding: '10px', borderRadius: '12px', color: '#38bdf8', fontWeight: 'bold' }}>⚡</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '900', background: 'linear-gradient(to right, #818cf8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              HBTM CLOSED-LOOP LEARNING AGENT
            </h1>
            <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px' }}>BRIDGING INTENT, HUMAN GAPS & ADAPTIVE RE-PLANNING</div>
          </div>
        </div>
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', color: '#34d399', fontFamily: 'monospace' }}>
          ● SYSTEM: CLOSED-LOOP ACTIVE
        </div>
      </div>

      {step === 1 ? (
        /* STEP 1: INTENT & BEHAVIOR SETUP */
        <div style={{ maxWidth: '550px', margin: '40px auto', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '30px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.7)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#f1f5f9' }}>Initialize Agent Core</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '24px' }}>Define your target goal and how the agent should handle real-life interruptions and gaps.</p>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>1. Target Learning Goal</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Master AWS Cloud Architecture"
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>2. Daily Availability Constraint</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
              >
                <option value="1">1 Hour / Day (Constrained Life Schedule)</option>
                <option value="3">3 Hours / Day (Standard Track)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>3. Simulate Disruption Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setGapType('planned')}
                  style={{ background: gapType === 'planned' ? '#1e1b4b' : '#020617', border: gapType === 'planned' ? '1px solid #6366f1' : '1px solid #334155', color: gapType === 'planned' ? '#818cf8' : '#94a3b8', padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left' }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Planned Gap</div>
                  <div style={{ fontSize: '9px', marginTop: '3px' }}>Exams flagged ahead</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGapType('silent')}
                  style={{ background: gapType === 'silent' ? '#451a03' : '#020617', border: gapType === 'silent' ? '1px solid #f59e0b' : '1px solid #334155', color: gapType === 'silent' ? '#fcd34d' : '#94a3b8', padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left' }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Silent Gap</div>
                  <div style={{ fontSize: '9px', marginTop: '3px' }}>Unexpected idle drop</div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}
            >
              Engage Closed-Loop Agent Engine 🚀
            </button>
          </form>
        </div>
      ) : (
        /* STEP 2: CLOSED-LOOP AGENT & GAP BRIDGING DASHBOARD */
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
          
          {/* LEFT: Explainable Plan Changes & Gap Resolution Engine */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '18px' }}>
              <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>Active Goal Tracking</div>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0 0 0' }}>{goal}</h2>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>Availability: {availability} hrs/day • Simulation Mode: <span style={{ color: gapType === 'planned' ? '#818cf8' : '#fcd34d' }}>{gapType.toUpperCase()} GAP</span></div>
            </div>

            {/* Core Innovation Box: Bridging the Gap */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                🧠 Explainable Plan Changes & Zero-Guilt Adaptation
              </div>
              
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', fontSize: '11px', fontFamily: 'monospace', color: '#cbd5e1', lineHeight: '1.7' }}>
                {gapType === 'planned' ? (
                  <>
                    <div style={{ color: '#818cf8', fontWeight: 'bold' }}>✓ Planned Disruption Recognized</div>
                    <div>• College exam block detected in advance.</div>
                    <div>• <span style={{ color: '#34d399' }}>Agent Action:</span> Pre-adjusted milestone sequence across timeline.</div>
                    <div>• <span style={{ color: '#f87171' }}>Guilt Trigger:</span> Blocked & Suppressed (Zero toxic notifications).</div>
                  </>
                ) : (
                  <>
                    <div style={{ color: '#fcd34d', fontWeight: 'bold' }}>! Silent Inactivity Anomaly Detected</div>
                    <div>• 3-day drop in active engagement logged.</div>
                    <div>• <span style={{ color: '#34d399' }}>Agent Action:</span> Dispatched Contextual Micro-Nudge.</div>
                    <div>• <span style={{ color: '#38bdf8' }}>Resume Protocol:</span> Instantly bridging back from exact incomplete checkpoint (Subnets).</div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' }}
            >
              ← Re-configure Simulation Parameters
            </button>
          </div>

          {/* RIGHT: Live Closed-Loop Telemetry & Honesty Metrics */}
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
            
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'monospace' }}>
              <span style={{ color: '#38bdf8' }}>CLOSED-LOOP AGENT STATE</span>
              <span style={{ color: '#34d399' }}>SYNCHRONIZED</span>
            </div>

            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔄</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f1f5f9', marginBottom: '8px' }}>
                Continuous Adaptation Engine
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '300px', margin: '0 auto', lineHeight: '1.5' }}>
                Unlike rigid platforms, HBTM bridges the gap between human life volatility and learning execution through real-time plan mutation.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>HONESTY SCORE</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginTop: '4px' }}>96%</div>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>RESILIENCE</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#34d399', marginTop: '4px' }}>94/100</div>
              </div>
            </div>

            <div style={{ background: '#1e1b4b', border: '1px solid #4f46e5', padding: '12px', borderRadius: '12px', textAlign: 'center', fontSize: '11px', color: '#c7d2fe', fontFamily: 'monospace' }}>
              Autonomous Reasoning Loop Fully Operational
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
