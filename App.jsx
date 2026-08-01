import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'plan-input', 'dashboard'
  const [goal, setGoal] = useState('');
  const [availability, setAvailability] = useState('2');
  const [gapType, setGapType] = useState('planned');

  // Floating background particles generator
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const pts = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5
    }));
    setParticles(pts);
  }, []);

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    if (!goal) return;
    setView('dashboard');
  };

  return (
    <div style={{ backgroundColor: '#030712', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
      
      {/* Custom Keyframe Animations */}
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
        @keyframes textGlow {
          0% { text-shadow: 0 0 20px rgba(56, 189, 248, 0.4), 0 0 40px rgba(129, 140, 248, 0.2); }
          50% { text-shadow: 0 0 35px rgba(56, 189, 248, 0.8), 0 0 60px rgba(52, 211, 153, 0.4); }
          100% { text-shadow: 0 0 20px rgba(56, 189, 248, 0.4), 0 0 40px rgba(129, 140, 248, 0.2); }
        }
      `}</style>

      {/* Floating Animated Background Particles */}
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

      {/* Top Corner Sign In Button (Only shown on landing) */}
      {view === 'landing' && (
        <div style={{ position: 'absolute', top: '25px', right: '30px', zIndex: 20 }}>
          <button
            onClick={() => setView('plan-input')}
            style={{ background: 'transparent', border: '1px solid #334155', color: '#38bdf8', padding: '10px 22px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 15px rgba(56, 189, 248, 0.15)', backdropFilter: 'blur(8px)' }}
          >
            Sign In / Get Started ➔
          </button>
        </div>
      )}

      {/* VIEW 1: CLEAN ANIMATED LANDING WITH EXACT BOLD TAGLINE */}
      {view === 'landing' && (
        <div style={{ height: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', zIndex: 10, animation: 'fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '900', lineHeight: '1.15', margin: 0, letterSpacing: '-1px' }}>
            <span style={{ color: '#ffffff', display: 'block', textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)' }}>
              Feed ur potential
            </span>
            <span style={{ background: 'linear-gradient(to right, #818cf8, #38bdf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block', marginTop: '8px', animation: 'textGlow 4s infinite ease-in-out' }}>
              not your feed
            </span>
          </h1>

          <div style={{ marginTop: '35px' }}>
            <button
              onClick={() => setView('plan-input')}
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px 36px', borderRadius: '14px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.5)', transition: 'transform 0.2s' }}
            >
              Initialize Agent Plan 🚀
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: ASKS FOR PLAN AFTER SIGN IN */}
      {view === 'plan-input' && (
        <div style={{ maxWidth: '500px', margin: '60px auto', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(16px)', border: '1px solid #1e293b', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 10 }}>
          
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>Setup Your Learning Plan</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Configure your intent and agent behavior parameters.</p>

          <form onSubmit={handlePlanSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Target Goal</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Master AWS Cloud Architecture"
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Daily Availability</label>
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
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Disruption Mode</label>
                <select
                  value={gapType}
                  onChange={(e) => setGapType(e.target.value)}
                  style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="planned">Planned Gap</option>
                  <option value="silent">Silent Gap</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)' }}
            >
              Engage Autonomous Agent 🚀
            </button>
          </form>

          <button
            onClick={() => setView('landing')}
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px', marginTop: '20px', width: '100%', textAlign: 'center' }}
          >
            ← Back to Home
          </button>
        </div>
      )}

      {/* VIEW 3: DASHBOARD */}
      {view === 'dashboard' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', position: 'relative', zIndex: 10, animation: 'fadeInScale 0.6s ease-out', marginTop: '10px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>Active Goal Vector</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0 0 0' }}>{goal}</h3>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>Pace: {availability} hrs/day • Simulation: <span style={{ color: gapType === 'planned' ? '#818cf8' : '#fcd34d' }}>{gapType.toUpperCase()} GAP</span></div>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                🧠 Explainable Plan Changes & Zero-Guilt Adaptation
              </div>
              
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', fontSize: '11px', fontFamily: 'monospace', color: '#cbd5e1', lineHeight: '1.7' }}>
                {gapType === 'planned' ? (
                  <>
                    <div style={{ color: '#818cf8', fontWeight: 'bold' }}>✓ Planned Disruption Active</div>
                    <div>• Exam schedule integrated seamlessly.</div>
                    <div>• <span style={{ color: '#34d399' }}>Agent Action:</span> Pre-adjusted milestones across timeline.</div>
                    <div>• <span style={{ color: '#f87171' }}>Guilt Trigger:</span> Suppressed.</div>
                  </>
                ) : (
                  <>
                    <div style={{ color: '#fcd34d', fontWeight: 'bold' }}>! Silent Drop Detected</div>
                    <div>• Inactivity anomaly noted by engine.</div>
                    <div>• <span style={{ color: '#34d399' }}>Agent Action:</span> Dispatched micro-nudge.</div>
                    <div>• <span style={{ color: '#38bdf8' }}>Resume Protocol:</span> Bridging from exact checkpoint.</div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => setView('landing')}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' }}
            >
              ← Return to Home
            </button>
          </div>

          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'monospace' }}>
              <span style={{ color: '#38bdf8' }}>CLOSED-LOOP TELEMETRY</span>
              <span style={{ color: '#34d399' }}>SYNCHRONIZED</span>
            </div>

            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>🌟</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f1f5f9', marginBottom: '8px' }}>
                Feed ur potential, not your feed
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '300px', margin: '0 auto', lineHeight: '1.5' }}>
                Your autonomous agent loop is active and guarding your growth trajectory.
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
