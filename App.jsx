import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'signin', 'plan', 'dashboard'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('');
  const [availability, setAvailability] = useState('2');
  const [gapType, setGapType] = useState('planned');

  // Floating background elements generator
  const [particles, setParticles] = useState([]);
  const [floatingCards, setFloatingCards] = useState([]);

  useEffect(() => {
    // Particle dust
    const pts = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 12 + 6,
      delay: Math.random() * 5
    }));
    setParticles(pts);

    // Out-of-the-box floating interactive flashcards on landing page
    const cards = [
      { id: 1, title: '⚡ Autonomous Engine', desc: 'Adapts to your real-life gaps instantly.', x: '10%', y: '25%', duration: '8s', delay: '0s' },
      { id: 2, title: '🧠 Zero-Guilt Loop', desc: 'No toxic notifications. Pure momentum.', x: '75%', y: '20%', duration: '10s', delay: '1s' },
      { id: 3, title: '🚀 Feed Potential', desc: 'Conquer complex roadmaps effortlessly.', x: '15%', y: '70%', duration: '9s', delay: '2s' },
      { id: 4, title: '✨ Live Telemetry', desc: 'Track your growth vector seamlessly.', x: '70%', y: '65%', duration: '11s', delay: '1.5s' }
    ];
    setFloatingCards(cards);
  }, []);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setView('plan'); // Move to ask plan after sign in
  };

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    if (!goal) return;
    setView('dashboard'); // Move inside dashboard
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
      
      {/* Custom Keyframe Animations for Out-of-the-Box Visuals */}
      <style>{`
        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-60px) translateX(30px) scale(1.2); opacity: 0.7; }
          100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.15; }
        }
        @keyframes floatCard {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95) translateY(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes textNeonGlow {
          0% { text-shadow: 0 0 20px rgba(56, 189, 248, 0.4), 0 0 40px rgba(129, 140, 248, 0.2); }
          50% { text-shadow: 0 0 40px rgba(56, 189, 248, 0.8), 0 0 80px rgba(52, 211, 153, 0.5); }
          100% { text-shadow: 0 0 20px rgba(56, 189, 248, 0.4), 0 0 40px rgba(129, 140, 248, 0.2); }
        }
      `}</style>

      {/* Floating Particles Background */}
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
            animation: `floatParticle ${p.duration}s infinite ease-in-out`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.8)'
          }}
        />
      ))}

      {/* Top Corner Sign In Button (Only on Landing) */}
      {view === 'landing' && (
        <div style={{ position: 'absolute', top: '25px', right: '35px', zIndex: 30 }}>
          <button
            onClick={() => setView('signin')}
            style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2))', border: '1px solid #38bdf8', color: '#38bdf8', padding: '12px 28px', borderRadius: '14px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)', backdropFilter: 'blur(10px)' }}
          >
            Sign In ➔
          </button>
        </div>
      )}

      {/* VIEW 1: LANDING WITH ANIMATING OUT-OF-THE-BOX FLASH CARDS & EXACT TAGLINE */}
      {view === 'landing' && (
        <div style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          
          {/* Floating Flashcards around the center */}
          {floatingCards.map((card) => (
            <div
              key={card.id}
              style={{
                position: 'absolute',
                top: card.y,
                left: card.x,
                width: '210px',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
                animation: `floatCard ${card.duration} infinite ease-in-out`,
                animationDelay: card.delay,
                pointerEvents: 'none',
                display: 'none', // responsive hidden on tiny screens via layout logic or kept immersive
                '@media (min-width: 768px)': { display: 'block' }
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '4px' }}>{card.title}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.4' }}>{card.desc}</div>
            </div>
          ))}

          {/* Central Content */}
          <div style={{ textAlign: 'center', maxWidth: '700px', padding: '0 20px', animation: 'fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <h1 style={{ fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: '900', lineHeight: '1.15', margin: 0, letterSpacing: '-1.5px' }}>
              <span style={{ color: '#ffffff', display: 'block', textShadow: '0 4px 25px rgba(255, 255, 255, 0.35)' }}>
                Feed ur potential
              </span>
              <span style={{ background: 'linear-gradient(to right, #818cf8, #38bdf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block', marginTop: '10px', animation: 'textNeonGlow 4s infinite ease-in-out' }}>
                not your feed
              </span>
            </h1>

            <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '20px', marginBottom: '40px', lineHeight: '1.6' }}>
              Step out of the algorithmic loop. Enter an immersive, autonomous learning environment engineered to adapt to your schedule and real-life gaps.
            </p>

            <button
              onClick={() => setView('signin')}
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '18px 40px', borderRadius: '16px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.6)', transition: 'transform 0.2s' }}
            >
              Get Started & Enter Agent 🚀
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: SIGN IN (Asks for Email & Password first) */}
      {view === 'signin' && (
        <div style={{ maxWidth: '440px', margin: '70px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 20 }}>
          
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>Sign In to HBTM</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Enter your credentials to initialize your secure agent session.</p>

          <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@hbtm.ai"
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <button
              type="submit"
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.5)' }}
            >
              Continue to Plan Setup ➔
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

      {/* VIEW 3: ASKS FOR PLAN AFTER SIGN IN */}
      {view === 'plan' && (
        <div style={{ maxWidth: '500px', margin: '50px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 20 }}>
          
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>Build Your Learning Plan</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Authenticated successfully. Now configure your goal and availability parameters.</p>

          <form onSubmit={handlePlanSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Target Goal / Interest</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Master Advanced System Design & Cloud"
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
                  <option value="5">5+ Hours / Day</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Disruption Mode</label>
                <select
                  value={gapType}
                  onChange={(e) => setGapType(e.target.value)}
                  style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="planned">Planned Gap (Exams)</option>
                  <option value="silent">Silent Gap (Drop)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.5)' }}
            >
              Engage Closed-Loop Agent 🚀
            </button>
          </form>
        </div>
      )}

      {/* VIEW 4: INSIDE DASHBOARD */}
      {view === 'dashboard' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', position: 'relative', zIndex: 20, animation: 'fadeInScale 0.6s ease-out', marginTop: '10px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>Active Agent Goal Vector</div>
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
              ← Log Out & Return Home
            </button>
          </div>

          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'monospace' }}>
              <span style={{ color: '#38bdf8' }}>CLOSED-LOOP TELEMETRY</span>
              <span style={{ color: '#34d399' }}>ONLINE</span>
            </div>

            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>🌟</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f1f5f9', marginBottom: '8px' }}>
                Feed ur potential, not your feed
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '300px', margin: '0 auto', lineHeight: '1.5' }}>
                You are securely inside your closed-loop agent control system.
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
