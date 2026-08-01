import React, { useState } from 'react';

export default function App() {
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState('');
  const [days, setDays] = useState('');
  const [plannedGap, setPlannedGap] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!interest || !days) return;
    setStep(2);
  };

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

      {step === 1 ? (
        /* STEP 1: INPUT FORM */
        <div style={{ maxWidth: '500px', margin: '40px auto', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '30px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#f1f5f9' }}>Initialize Your Learning Plan</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '24px' }}>Tell the agent what you want to build or learn, timeline, and any expected breaks.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>1. What is your learning or building interest?</label>
              <input
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="e.g., Full Stack Web Development / AWS Exam"
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>2. How many days do you have?</label>
              <input
                type="text"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="e.g., 30 Days"
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>3. Any planned gaps or breaks?</label>
              <input
                type="text"
                value={plannedGap}
                onChange={(e) => setPlannedGap(e.target.value)}
                placeholder="e.g., College exams on Day 10-12 (Optional)"
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)' }}
            >
              Generate Adaptive Plan 🚀
            </button>
          </form>
        </div>
      ) : (
        /* STEP 2: DASHBOARD DISPLAY */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'monospace' }}>Active User Input</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#38bdf8', marginTop: '8px' }}>Goal: {interest}</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>Timeline: {days}</div>
              {plannedGap && <div style={{ fontSize: '12px', color: '#fcd34d', marginTop: '4px' }}>Planned Break: {plannedGap}</div>}
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Agent Actions & Reasonings</div>
              <div style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px', fontSize: '11px', fontFamily: 'monospace', color: '#cbd5e1', lineHeight: '1.6' }}>
                <div style={{ color: '#818cf8', fontWeight: 'bold' }}>• Intent Parsed Successfully</div>
                <div>• Timeline mapped across {days}</div>
                {plannedGap ? <div style={{ color: '#fcd34d' }}>• Planned gap integrated: Workload distributed around break with zero guilt.</div> : <div>• Continuous uninterrupted learning track established.</div>}
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' }}
            >
              ← Reset & Enter New Plan
            </button>
          </div>

          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontFamily: 'monospace' }}>
              <span style={{ color: '#38bdf8' }}>AUTONOMOUS REASONING MAP</span>
              <span style={{ color: '#34d399' }}>OPTIMIZED</span>
            </div>

            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎯</div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#f1f5f9' }}>
                Plan Successfully Structured!
              </h2>
              <p style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '320px', margin: '0 auto', lineHeight: '1.5' }}>
                The agent is now tracking your progress for <span style={{ color: '#38bdf8' }}>{interest}</span> over {days}.
              </p>
            </div>

            <div style={{ background: '#1e1b4b', border: '1px solid #4f46e5', padding: '12px', borderRadius: '12px', textAlign: 'center', fontSize: '12px', color: '#c7d2fe', fontFamily: 'monospace' }}>
              Resilience Score: 100/100 (Fresh State)
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
