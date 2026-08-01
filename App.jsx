import React, { useState } from 'react';

export default function App() {
  const [goal, setGoal] = useState('AWS Solutions Architect Certification');
  const [gapMode, setGapMode] = useState('planned');

  return (
    <div style={{ backgroundColor: '#030712', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '15px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#091e3a', border: '1px solid #0284c7', padding: '10px', borderRadius: '12px', color: '#38bdf8', fontWeight: 'bold' }}>🧠</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '900', background: 'linear-gradient(to right, #818cf8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              HBTM PERSONAL LEARNING AGENT
            </h1>
            <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px' }}>AUTONOMOUS CLOSED-LOOP TUTOR & TACTICAL CONTROL</div>
          </div>
        </div>
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', color: '#34d399', fontFamily: 'monospace' }}>
          ● SYSTEM: ONLINE
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Left Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Active Learner Goal</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Simulate Real-Life Disruption</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => setGapMode('planned')}
                style={{ background: gapMode === 'planned' ? '#1e1b4b' : '#020617', border: gapMode === 'planned' ? '1px solid #6366f1' : '1px solid #1e293b', color: gapMode === 'planned' ? '#818cf8' : '#64748b', padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Planned Gap</div>
                <div style={{ fontSize: '9px', marginTop: '4px' }}>Exams/Vacation flagged</div>
              </button>

              <button
                onClick={() => setGapMode('silent')}
                style={{ background: gapMode === 'silent' ? '#451a03' : '#020617', border: gapMode === 'silent' ? '1px solid #f59e0b' : '1px solid #1e293b', color: gapMode === 'silent' ? '#fcd34d' : '#64748b', padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Silent Gap</div>
                <div style={{ fontSize: '9px', marginTop: '4px' }}>Unexpected drop/idle</div>
              </button>
            </div>
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Explainable Plan Modifications</div>
            <div style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px', fontSize: '11px', fontFamily: 'monospace', color: '#cbd5e1', lineHeight: '1.6' }}>
              <div style={{ color: '#818cf8', fontWeight: 'bold' }}>• State Engine Status: ACTIVE</div>
              <div>• Quiz on Subnets: 40% (Remedial tasks inserted)</div>
              <div>• Milestone automatically delayed by 2 days smoothly</div>
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontFamily: 'monospace' }}>
            <span style={{ color: '#38bdf8' }}>AUTONOMOUS REASONING MAP</span>
            <span style={{ color: '#34d399' }}>OPTIMIZED</span>
          </div>

          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚀</div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#f1f5f9' }}>
              {gapMode === 'planned' ? 'Planned Gap Pre-Adjustment Active' : 'Contextual Nudge Dispatched'}
            </h2>
            <p style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '300px', margin: '0 auto', lineHeight: '1.5' }}>
              {gapMode === 'planned' 
                ? 'Exams acknowledged. Agent has pre-adjusted milestones with zero guilt-tripping.' 
                : 'Inactivity detected. Triggered targeted intervention referencing exact unfinished topics.'}
            </p>
          </div>

          <div style={{ background: '#1e1b4b', border: '1px solid #4f46e5', padding: '12px', borderRadius: '12px', textAlign: 'center', fontSize: '12px', color: '#c7d2fe', fontFamily: 'monospace' }}>
            Resilience Score: 92/100 (High Recovery Rate)
          </div>

        </div>

      </div>
    </div>
  );
}
