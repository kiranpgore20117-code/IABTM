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

    // Floating interactive flashcards on landing page
    const cards = [
      { id: 1, title: '⚡ AUTONOMOUS ENGINE', desc: 'Adapts to your real-life gaps instantly.', x: '8%', y: '28%', duration: '8s', delay: '0s' },
      { id: 2, title: '🧠 ZERO-GUILT LOOP', desc: 'No toxic notifications. Pure momentum.', x: '72%', y: '22%', duration: '10s', delay: '1s' },
      { id: 3, title: '🚀 FEED POTENTIAL', desc: 'Conquer complex roadmaps effortlessly.', x: '10%', y: '68%', duration: '9s', delay: '2s' },
      { id: 4, title: '✨ LIVE TELEMETRY', desc: 'Track your growth vector seamlessly.', x: '75%', y: '65%', duration: '11s', delay: '1.5s' }
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

  // Taglines split into uppercase characters for individual letter dropping animation
  const line1 = "FEED UR POTENTIAL".split("");
  const line2 = "NOT YOUR FEED".split("");

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
      
      {/* Custom Keyframe Animations for Alphabet Drop & Floating Elements */}
      <style>{`
        @keyframes dropLetter {
          0% { opacity: 0; transform: translateY(-80px) scale(0.5); }
          60% { opacity: 1; transform: translateY(10px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
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
            SIGN IN ➔
          </button>
        </div>
      )}

      {/* VIEW 1: LANDING WITH ALPHABET-BY-ALPHABET DROPPING TAGLINE & FLASH CARDS */}
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
                pointerEvents: 'none'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '4px' }}>{card.title}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.4' }}>{card.desc}</div>
            </div>
          ))}

          {/* Central Tagline with Alphabet Dropping Animation */}
          <div style={{ textAlign: 'center', maxWidth: '750px', padding: '0 20px' }}>
            <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: '900', lineHeight: '1.2', margin: 0, letterSpacing: '-1px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              
              {/* Line 1: FEED UR POTENTIAL */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {line1.map((char, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      color: '#ffffff',
                      textShadow: '0 4px 20px rgba(255, 255, 255, 0.4)',
                      animation: `dropLetter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both`,
                      animationDelay: `${index * 0.04}s`,
                      whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>

              {/* Line 2: NOT YOUR FEED */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {line2.map((char, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(to right, #818cf8, #38bdf8, #34d399)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: `dropLetter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both, textNeonGlow 4s infinite ease-in-out`,
                      animationDelay: `${(line1.length + index) * 0.04}s`,
                      whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>

            </h1>

            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '25px', marginBottom: '35px', lineHeight: '1.6', animation: 'fadeInScale 1s ease-out 0.8s both' }}>
              Escape endless scrolling. Enter an immersive autonomous learning engine engineered to adapt to your schedule and real-life gaps.
            </p>

            <div style={{ animation: 'fadeInScale 1s ease-out 1s both' }}>
              <button
                onClick={() => setView('signin')}
                style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px 38px', borderRadius: '16px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.6)', transition: 'transform 0.2s' }}
              >
                GET STARTED & ENTER AGENT 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SIGN IN (Asks for Email & Password first) */}
      {view === 'signin' && (
        <div style={{ maxWidth: '440px', margin: '70px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 20 }}>
          
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>AGENT AUTHENTICATION</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Enter your credentials to initialize your secure agent session.</p>

          <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>EMAIL ADDRESS</label>
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
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>PASSWORD</label>
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
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.5)' }}
            >
              CONTINUE TO PLAN SETUP ➔
            </button>
          </form>

          <button
            onClick={() => setView('landing')}
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px', marginTop: '20px', width: '100%', textAlign: 'center' }}
          >
            ← BACK TO HOME
          </button>
        </div>
      )}

      {/* VIEW 3: ASKS FOR PLAN AFTER SIGN IN */}
      {view === 'plan' && (
        <div style={{ maxWidth: '500px', margin: '50px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 20 }}>
          
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>BUILD YOUR LEARNING PLAN</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Authenticated successfully. Now configure your goal and availability parameters.</p>

          <form onSubmit={handlePlanSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>TARGET GOAL / INTEREST</label>
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
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>DAILY AVAILABILITY</label>
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
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>DISRUPTION MODE</label>
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
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.5)' }}
            >
              ENGAGE CLOSED-LOOP AGENT 🚀
            </button>
          </form>
        </div>
      )}

      {/* VIEW 4: INSIDE DASHBOARD */}
      {view === 'dashboard' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', position: 'relative', zIndex: 20, animation: 'fadeInScale 0.6s ease-out', marginTop: '10px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>ACTIVE AGENT GOAL VECTOR</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0 0 0' }}>{goal}</h3>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>Pace: {availability} hrs/day • Simulation: <span style={{ color: gapType === 'planned' ? '#818cf8' : '#fcd34d' }}>{gapType.toUpperCase()} GAP</span></div>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                🧠 EXPLAINABLE PLAN CHANGES & ZERO-GUILT ADAPTATION
              </div>
              
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', fontSize: '11px', fontFamily: 'monospace', color: '#cbd5e1', lineHeight: '1.7' }}>
                {gapType === 'planned' ? (
                  <>
                    <div style={{ color: '#818cf8', fontWeight: 'bold' }}>✓ PLANNED DISRUPTION ACTIVE</div>
                    <div>• Exam schedule integrated seamlessly.</div>
                    <div>• <span style={{ color: '#34d399' }}>Agent Action:</span> Pre-adjusted milestones across timeline.</div>
                    <div>• <span style={{ color: '#f87171' }}>Guilt Trigger:</span> Suppressed.</div>
                  </>
                ) : (
                  <>
                    <div style={{ color: '#fcd34d', fontWeight: 'bold' }}>! SILENT DROP DETECTED</div>
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
              ← LOG OUT & RETURN HOME
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
                FEED UR POTENTIAL, NOT YOUR FEED
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
