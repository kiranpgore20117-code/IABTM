import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'signin', 'plan-input', 'dashboard'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Feature 1 Inputs
  const [course, setCourse] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [totalDays, setTotalDays] = useState('30');
  
  // Feature 2 Inputs (Planned vs Unplanned Disruptions)
  const [unplannedMissed, setUnplannedMissed] = useState(0); 
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [tempMissedInput, setTempMissedInput] = useState('2');

  // App State & Tracking
  const [activeTab, setActiveTab] = useState('roadmap');
  const [completedDays, setCompletedDays] = useState([1]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [potentialHours, setPotentialHours] = useState(2);

  // Feature 5: Camera Engagement & Boredom Detector State
  const [camActive, setCamActive] = useState(false);
  const [boredomAlert, setBoredomAlert] = useState(false);
  const [engagementScore, setEngagementScore] = useState(94);

  // Floating background elements
  const [particles, setParticles] = useState([]);
  const [floatingCards, setFloatingCards] = useState([]);

  useEffect(() => {
    const pts = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 12 + 6,
      delay: Math.random() * 5
    }));
    setParticles(pts);

    const cards = [
      { id: 1, title: '⚡ AUTONOMOUS ADAPTATION', desc: 'Recalibrates roadmap instantly by condensing missed modules into double-topics.', x: '5%', y: '25%', duration: '8s', delay: '0s' },
      { id: 2, title: '🧠 CAMERA ENGAGEMENT', desc: 'Detects fatigue & boosts momentum without distraction.', x: '73%', y: '20%', duration: '10s', delay: '1s' },
      { id: 3, title: '🛠️ PROJECT & INTERVIEW', desc: 'Embedded projects, interview tricks & job networking.', x: '6%', y: '68%', duration: '9s', delay: '2s' },
      { id: 4, title: '🎙️ STREAK PODCASTS', desc: 'Unlocks expert audio breakdowns upon streak completion.', x: '72%', y: '65%', duration: '11s', delay: '1.5s' }
    ];
    setFloatingCards(cards);
  }, []);

  useEffect(() => {
    let interval;
    if (camActive && view === 'dashboard') {
      interval = setInterval(() => {
        const randomEvent = Math.random();
        if (randomEvent > 0.7) {
          setBoredomAlert(true);
          setEngagementScore(prev => Math.max(60, prev - 15));
        } else {
          setBoredomAlert(false);
          setEngagementScore(prev => Math.min(99, prev + 2));
        }
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [camActive, view]);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) setView('plan-input');
  };

  const handleGenerateRoadmap = (e) => {
    e.preventDefault();
    if (course) setView('dashboard');
  };

  const handleApplySimulation = (e) => {
    e.preventDefault();
    const missed = parseInt(tempMissedInput) || 0;
    setUnplannedMissed(missed);
    // Automatically boost hours or compress topics to compensate
    setPotentialHours(prev => prev + Math.min(2, missed));
    setShowSimulateModal(false);
  };

  const toggleDay = (dayNum) => {
    if (completedDays.includes(dayNum)) {
      setCompletedDays(completedDays.filter(d => d !== dayNum));
    } else {
      setCompletedDays([...completedDays, dayNum]);
    }
  };

  const line1 = "FEED UR POTENTIAL".split("");
  const line2 = "NOT YOUR FEED".split("");

  const totalDaysCount = parseInt(totalDays) || 30;
  const baseRoadmapDaysArray = Array.from({ length: Math.min(totalDaysCount, 15) }, (_, i) => i + 1);

  // DYNAMIC COMPRESSION ENGINE: If unplanned days are added, group topics into 2-in-1 accelerated slots!
  const getDynamicRoadmap = () => {
    if (unplannedMissed <= 0) return baseRoadmapDaysArray.map(d => ({ day: d, isCompressed: false, label: `Module Vector ${d}` }));
    
    // Compress roadmap items to account for missed days
    const compressed = [];
    let topicCounter = 1;
    for (let i = 1; i <= Math.max(5, baseRoadmapDaysArray.length - unplannedMissed); i++) {
      if (i <= unplannedMissed) {
        compressed.push({
          day: i,
          isCompressed: true,
          label: `⚡ COMPRESSED: Topics ${topicCounter} & ${topicCounter + 1} Combined (2 Topics in 1 Day!)`,
          topics: [topicCounter, topicCounter + 1]
        });
        topicCounter += 2;
      } else {
        compressed.push({
          day: i,
          isCompressed: false,
          label: `Module Vector ${topicCounter}`,
          topics: [topicCounter]
        });
        topicCounter += 1;
      }
    }
    return compressed;
  };

  const currentRoadmap = getDynamicRoadmap();

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box', position: 'relative', overflowX: 'hidden' }}>
      
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
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
          100% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
        }
      `}</style>

      {particles.map((p, i) => (
        <div key={i} style={{ position: 'absolute', top: `${p.y}%`, left: `${p.x}%`, width: `${p.size}px`, height: `${p.size}px`, background: i % 2 === 0 ? '#38bdf8' : '#818cf8', borderRadius: '50%', pointerEvents: 'none', animation: `floatParticle ${p.duration}s infinite ease-in-out`, animationDelay: `${p.delay}s`, boxShadow: '0 0 15px rgba(56, 189, 248, 0.8)' }} />
      ))}

      {view === 'landing' && (
        <div style={{ position: 'absolute', top: '25px', right: '35px', zIndex: 30 }}>
          <button onClick={() => setView('signin')} style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2))', border: '1px solid #38bdf8', color: '#38bdf8', padding: '12px 28px', borderRadius: '14px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)', backdropFilter: 'blur(10px)' }}>
            SIGN IN ➔
          </button>
        </div>
      )}

      {/* VIEW 1: LANDING */}
      {view === 'landing' && (
        <div style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          {floatingCards.map((card) => (
            <div key={card.id} style={{ position: 'absolute', top: card.y, left: card.x, width: '220px', background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '16px', padding: '16px', boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)', animation: `floatCard ${card.duration} infinite ease-in-out`, animationDelay: card.delay, pointerEvents: 'none' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '4px' }}>{card.title}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.4' }}>{card.desc}</div>
            </div>
          ))}

          <div style={{ textAlign: 'center', maxWidth: '750px', padding: '0 20px' }}>
            <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: '900', lineHeight: '1.2', margin: 0, letterSpacing: '-1px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {line1.map((char, index) => (
                  <span key={index} style={{ display: 'inline-block', color: '#ffffff', textShadow: '0 4px 20px rgba(255, 255, 255, 0.4)', animation: `dropLetter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both`, animationDelay: `${index * 0.04}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {line2.map((char, index) => (
                  <span key={index} style={{ display: 'inline-block', background: 'linear-gradient(to right, #818cf8, #38bdf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: `dropLetter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both`, animationDelay: `${(line1.length + index) * 0.04}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </h1>

            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '25px', marginBottom: '35px', lineHeight: '1.6', animation: 'fadeInScale 1s ease-out 0.8s both' }}>
              Autonomous Closed-Loop Learning Engine with Dynamic 2-in-1 Topic Compression, Camera Boredom Boosters & Embedded Projects.
            </p>

            <div style={{ animation: 'fadeInScale 1s ease-out 1s both' }}>
              <button onClick={() => setView('signin')} style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px 38px', borderRadius: '16px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.6)' }}>
                GET STARTED & BUILD ROADMAP 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SIGN IN */}
      {view === 'signin' && (
        <div style={{ maxWidth: '440px', margin: '70px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 20 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>AGENT AUTHENTICATION</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Enter credentials to initialize your closed-loop telemetry.</p>

          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>EMAIL ADDRESS</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@hbtm.ai" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>
            <button type="submit" style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px' }}>
              CONTINUE TO ROADMAP SETUP ➔
            </button>
          </form>
          <button onClick={() => setView('landing')} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px', marginTop: '20px', width: '100%', textAlign: 'center' }}>
            ← BACK TO HOME
          </button>
        </div>
      )}

      {/* VIEW 3: CLEAN INITIAL CONFIG (No Unplanned Days asked here) */}
      {view === 'plan-input' && (
        <div style={{ maxWidth: '480px', margin: '40px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 20 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>CUSTOM ROADMAP CONFIG</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Configure your baseline learning track parameters.</p>

          <form onSubmit={handleGenerateRoadmap} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>WHICH COURSE DO YOU WANNA DO?</label>
              <input type="text" value={course} onChange={e => setCourse(e.target.value)} placeholder="e.g., Full Stack Web Dev / AI Engineer" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>DAILY HOURS ALLOTED</label>
                <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}>
                  <option value="1">1 Hour / Day</option>
                  <option value="2">2 Hours / Day</option>
                  <option value="3">3 Hours / Day</option>
                  <option value="4">4+ Hours / Day</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>TOTAL COMPLETION DAYS</label>
                <input type="number" value={totalDays} onChange={e => setTotalDays(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <button type="submit" style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.5)' }}>
              INITIALIZE ADAPTIVE ROADMAP ENGINE 🚀
            </button>
          </form>
        </div>
      )}

      {/* VIEW 4: DASHBOARD */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 20, animation: 'fadeInScale 0.6s ease-out' }}>
          
          {/* Top Header & Unplanned Simulation Button in Top-Right Corner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>ACTIVE CLOSED-LOOP VECTOR</span>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0' }}>{course.toUpperCase()}</h2>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                Target: {totalDays} Days • Baseline: {dailyHours} hrs/day • <span style={{ color: '#34d399', fontWeight: 'bold' }}>Active Intensity: {potentialHours} hrs/day ⚡</span>
              </div>
            </div>

            {/* TOP-RIGHT UNPLANNED DAY SIMULATION TRIGGER BUTTON */}
            <div>
              <button 
                onClick={() => setShowSimulateModal(true)} 
                style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))', border: '1px solid #fcd34d', color: '#fcd34d', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)' }}
              >
                ⚠️ Simulate Unplanned Gap
              </button>
            </div>
          </div>

          {/* SIMULATION MODAL POPUP */}
          {showSimulateModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
              <div style={{ background: '#0f172a', border: '1px solid #fcd34d', borderRadius: '20px', padding: '30px', width: '380px', boxShadow: '0 25px 50px rgba(0,0,0,0.9)', animation: 'fadeInScale 0.3s ease-out' }}>
                <h3 style={{ fontSize: '16px', color: '#fcd34d', margin: '0 0 8px 0' }}>⚠️ Simulate Unplanned Disruption</h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>Enter missed days. The engine will instantly rewrite your roadmap to cover 2 topics in 1 day to catch up!</p>
                
                <form onSubmit={handleApplySimulation} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>MISSED DAYS TO SIMULATE</label>
                    <input type="number" value={tempMissedInput} onChange={e => setTempMissedInput(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#fcd34d', fontSize: '14px', boxSizing: 'border-box' }} min="1" max="5" required />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                    <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#020617', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                      Apply & Compress Roadmap ⚡
                    </button>
                    <button type="button" onClick={() => setShowSimulateModal(false)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Camera & Boredom Telemetry Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div style={{ background: camActive ? '#090d16' : '#0f172a', border: `1px solid ${boredomAlert ? '#ef4444' : '#1e293b'}`, borderRadius: '16px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: boredomAlert ? 'pulseGlow 2s infinite' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '10px', color: camActive ? '#34d399' : '#94a3b8', fontFamily: 'monospace' }}>CAM ENGAGEMENT AI</span>
                {camActive ? (
                  <div style={{ fontSize: '11px' }}>
                    {boredomAlert ? (
                      <span style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Fatigue Detected! Quick Challenge Unlocked!</span>
                    ) : (
                      <span style={{ color: '#34d399' }}>✨ Flow State Active • Attention Score: {engagementScore}%</span>
                    )}
                  </div>
                ) : (
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Enable camera for real-time boredom & focus adaptation.</span>
                )}
              </div>
              <button onClick={() => setCamActive(!camActive)} style={{ background: camActive ? '#065f46' : '#334155', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}>
                {camActive ? 'CAM ON 🟢' : 'TURN ON CAM 📷'}
              </button>
            </div>
          </div>

          {/* DYNAMIC RECALIBRATION NOTICE WHEN UNPLANNED DAYS > 0 */}
          {unplannedMissed > 0 && (
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '14px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeInScale 0.4s ease-out' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fcd34d' }}>⚠️ Autonomous Gap Adaptation Triggered ({unplannedMissed} Days Missed)</div>
                <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>Roadmap successfully rewritten! Modules have been intelligently combined so you now cover <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>2 topics in 1 day</span> to stay on schedule.</div>
              </div>
              <span style={{ background: '#f59e0b', color: '#020617', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>2-IN-1 MODE ACTIVE</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '10px', overflowX: 'auto' }}>
            <button onClick={() => setActiveTab('roadmap')} style={{ background: activeTab === 'roadmap' ? '#6366f1' : '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              🗺️ Visual Roadmap & YouTube
            </button>
            <button onClick={() => setActiveTab('projects')} style={{ background: activeTab === 'projects' ? '#6366f1' : '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              🛠️ Topic Projects & Interview Qs
            </button>
            <button onClick={() => setActiveTab('podcasts')} style={{ background: activeTab === 'podcasts' ? '#6366f1' : '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              🎙️ Streak Podcasts
            </button>
            <button onClick={() => setActiveTab('jobs')} style={{ background: activeTab === 'jobs' ? '#6366f1' : '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              💼 Internships, Jobs & Networking
            </button>
          </div>

          {/* TAB 1: DYNAMICALLY COMPRESSED ROADMAP */}
          {activeTab === 'roadmap' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🗺️ ADAPTIVE ROADMAP GRID (CLICK ANY DAY FOR YOUTUBE & QUIZ)</h3>
                  <span style={{ fontSize: '11px', color: '#34d399' }}>🔥 Streak: {completedDays.length} Days Completed</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '15px' }}>
                  {currentRoadmap.map((item) => {
                    const isDone = completedDays.includes(item.day);
                    return (
                      <div 
                        key={item.day} 
                        onClick={() => setSelectedDay(item.day)}
                        style={{ 
                          background: item.isCompressed ? 'rgba(245, 158, 11, 0.08)' : isDone ? 'rgba(52, 211, 153, 0.1)' : '#020617', 
                          border: `1px solid ${selectedDay === item.day ? '#38bdf8' : item.isCompressed ? '#f59e0b' : isDone ? '#34d399' : '#334155'}`, 
                          borderRadius: '12px', 
                          padding: '16px', 
                          cursor: 'pointer',
                          boxShadow: selectedDay === item.day ? '0 0 20px rgba(56, 189, 248, 0.3)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: item.isCompressed ? '#fcd34d' : isDone ? '#34d399' : '#38bdf8', fontFamily: 'monospace' }}>DAY {item.day}</span>
                          <span style={{ fontSize: '11px' }}>{isDone ? '✅ Studied' : '▶ Watch'}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#f8fafc', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.4' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '10px', color: item.isCompressed ? '#fcd34d' : '#94a3b8' }}>
                          {item.isCompressed ? '⚡ 2 Topics in 1 Day' : `${dailyHours} hr session`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedDay && (
                <div style={{ background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '16px', padding: '25px', animation: 'fadeInScale 0.4s ease-out' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '15px', color: '#38bdf8', margin: 0 }}>📺 DAY {selectedDay}: YOUTUBE VIDEO & ACCELERATED QUIZ</h3>
                    <button onClick={() => setSelectedDay(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>✕ Close</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: '#020617', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Curated YouTube Playlist / Lecture</div>
                      <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '15px' }}>Optimized lecture breakdown matching your compressed daily sprint.</p>
                      <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ background: '#ef4444', color: '#fff', padding: '10px 18px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold', display: 'inline-block' }}>
                        Watch Video on YouTube ▶
                      </a>
                    </div>

                    <div style={{ background: '#020617', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#34d399', marginBottom: '8px' }}>🧠 Day {selectedDay} Retention Quiz</div>
                      <p style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '12px' }}>Verify your mastery over today's double topics.</p>
                      <button onClick={() => toggleDay(selectedDay)} style={{ background: completedDays.includes(selectedDay) ? '#065f46' : '#6366f1', border: 'none', color: '#fff', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                        {completedDays.includes(selectedDay) ? '✓ Completed (Click to Undo)' : 'Complete Quiz & Mark Studied ✅'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROJECTS & INTERVIEW Qs */}
          {activeTab === 'projects' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🛠️ SUGGESTED HANDS-ON PROJECTS & TOPIC INTERVIEW QUESTIONS</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '6px' }}>Suggested Mini-Project for Current Milestone</div>
                  <div style={{ fontSize: '12px', color: '#fff', fontWeight: 'bold', marginBottom: '6px' }}>Build a Real-Time Autonomous Dashboard Engine</div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.5' }}>Apply the core concepts learned this week to construct a functional portfolio-ready project.</p>
                </div>

                <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#34d399', marginBottom: '6px' }}>Top Topic Interview Questions</div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.6' }}>
                    <div>• Q1: Explain core asynchronous execution flow.</div>
                    <div>• Q2: How do you handle unexpected system state anomalies?</div>
                    <div>• Q3: Optimize memory overhead in large data streams.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STREAK PODCASTS */}
          {activeTab === 'podcasts' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🎙️ EXCLUSIVE AUDIO PODCASTS UNLOCKED FOR STREAK</h3>
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc' }}>Masterclass Audio: Architectural Deep Dive & Industry Secrets</div>
                  <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Unlocked because your streak is active ({completedDays.length} Days) 🎧</div>
                </div>
                <button style={{ background: '#818cf8', color: '#020617', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Play Audio Podcast ▶
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: JOBS & NETWORKING */}
          {activeTab === 'jobs' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>💼 COURSE COMPLETION: INTERNSHIP/JOB TRICKS & NETWORKING</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#34d399', marginBottom: '6px' }}>Interview & Resume Mastery</div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.5' }}>Direct blueprint on how to showcase {course} projects on GitHub and LinkedIn to get recruiter callbacks instantly.</p>
                </div>
                <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '6px' }}>Job & Internship Networking</div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.5' }}>Cold outreach templates, referral strategies, and direct networking scripts for top-tier tech companies.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
