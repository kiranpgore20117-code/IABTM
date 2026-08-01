import React, { useState, useEffect } from 'react';

export default function App() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [availability, setAvailability] = useState('2');
  const [gapType, setGapType] = useState('planned');

  // Floating particles generator for animation effect
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const pts = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5
    }));
    setParticles(pts);
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    if (!goal) return;
    setStep(2);
  };

  return (
    <div style={{ backgroundColor: '#030712', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
      
      {/* Custom Keyframe Animations for Floating Background */}
      <style>{`
        @keyframes floatAnim {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 0.8; }
          100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulseGlow {
          0% { text-shadow: 0 0 10px rgba(129, 140, 248, 0.3); }
          50% { text-shadow: 0 0 25px rgba(56, 189, 248, 0.8); }
          100% { text-shadow: 0 0 10px rgba(129, 140, 248, 0.3); }
        }
      `}</style>

      {/* Floating Animated Background Shapes */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${p.y}%`,
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: i % 2 === 0 ? '#38bdf8' : '#818cf8',
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: `floatAnim ${p.duration}s infinite ease-in-out`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.6)'
          }}
        />
      ))}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '15px', marginBottom: '25px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#091e3a', border: '1px solid #0284c7', padding: '10px', borderRadius: '12px', color: '#38bdf8', fontWeight: 'bold', animation: 'pulseGlow 3s infinite' }}>⚡</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '900', background: 'linear-gradient(to right, #818cf8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              HBTM PERSONAL LEARNING AGENT
            </h1>
            <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1.5px' }}>AUTONOMOUS CLOSED-LOOP LEARNING ENGINE</div>
          </div>
        </div>
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', color: '#34d399', fontFamily: 'monospace' }}>
          ● ANIMATED SYNC: ACTIVE
        </div>
      </div>

      {step === 1 ? (
        /* STEP 1: ANIMATED LANDING WITH FLOATING VIBE & TAGLINE */
        <div style={{ maxWidth: '600px', margin: '30px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid #1e293b', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.8)', animation: 'fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px', fontFamily: 'monospace' }}>
            Autonomous Closed-Loop Core
          </div>
          
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#f8fafc', marginBottom: '15px', lineHeight: '1.2' }}>
            Feed ur potential <br />
            <span style={{ background: 'linear-gradient(to right, #818cf8, #38bdf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'pulseGlow 3s infinite' }}>
              not your feed
            </span>
          </h2>
          
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '30px', lineHeight: '1.6', maxWidth: '440px', margin: '0 auto 30px auto' }}>
            Step away from endless doom-scrolling. Let our intelligent agent architect your personal learning path with zero-guilt adaptation and real-time gap bridging.
          </p>

          <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>1. What do you want to conquer?</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Master AWS Solutions Architect"
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>2. Daily Availability</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="1">1 Hour / Day</option>
                  <option value="3">3 Hours / Day</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>3. Disruption Mode</label>
                <select
                  value={gapType}
                  onChange={(e) => setGapType(e.target.value)}
                  style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="planned">Planned Gap (Exams Ahead)</option>
                  <option value="silent">Silent Gap (Unexpected Drop)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)', transition: 'transform 0.2s' }}
            >
              Launch Interactive Agent Engine 🚀
            </button>
          </form>
        </div>
      ) : (
        /* STEP 2: DASHBOARD VIEW */
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', position: 'relative', zIndex: 10, animation: 'fadeInScale 0.6s ease-out' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>Active Goal Synchronized</div>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0 0 0' }}>{goal}</h2>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>Pace: {availability} hrs/day • Simulation: <span style={{ color: gapType === 'planned' ? '#818cf8' : '#fcd34d' }}>{gapType.toUpperCase()} GAP</span></div>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                🧠 Explainable Plan Changes & Zero-Guilt Adaptation
              </div>
              
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', fontSize: '11px', fontFamily: 'monospace', color: '#cbd5e1', lineHeight: '1.7' }}>
                {gapType === 'planned' ? (
                  <>
                    <div style={{ color: '#818cf8', fontWeight: 'bold' }}>✓ Planned Disruption Acknowledged</div>
                    <div>• Exam schedule integrated seamlessly.</div>
                    <div>• <span style={{ color: '#34d399' }}>Agent Action:</span> Pre-adjusted milestones across timeline.</div>
                    <div>• <span style={{ color: '#f87171' }}>Guilt Trigger:</span> Permanently Suppressed.</div>
                  </>
                ) : (
                  <>
                    <div style={{ color: '#fcd34d', fontWeight: 'bold' }}>! Silent Drop Detected</div>
                    <div>• Inactivity anomaly noted by engine.</div>
                    <div>• <span style={{ color: '#34d399' }}>Agent Action:</span> Dispatched micro-nudge.</div>
                    <div>• <span style={{ color: '#38bdf8' }}>Resume Protocol:</span> Instantly bridging from exact checkpoint.</div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' }}
            >
              ← Back to Landing & Feed Potential
            </button>
          </div>

          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'monospace' }}>
              <span style={{ color: '#38bdf8' }}>CLOSED-LOOP TELEMETRY</span>
              <span style={{ color: '#34d399' }}>OPTIMIZED</span>
            </div>

            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>🌟</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f1f5f9', marginBottom: '8px' }}>
                Feeding Potential, Not Feed
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '300px', margin: '0 auto', lineHeight: '1.5' }}>
                Your learning agent is actively guarding your growth trajectory and maintaining zero toxic pressure.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>POTENTIAL INDEX</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginTop: '4px' }}>99%</div>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>RESILIENCE</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#34d399', marginTop: '4px' }}>96/100</div>
              </div>
            </div>

            <div style={{ background: '#1e1b4b', border: '1px solid #4f46e5', padding: '12px', borderRadius: '12px', textAlign: 'center', fontSize: '11px', color: '#c7d2fe', fontFamily: 'monospace' }}>
              Autonomous Execution Loop Active
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
