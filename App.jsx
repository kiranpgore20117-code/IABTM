import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'signin', 'plan', 'dashboard'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Feature 1 Inputs
  const [course, setCourse] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [totalDays, setTotalDays] = useState('30');
  
  // Feature 2 Inputs (Planned vs Unplanned Disruptions)
  const [plannedExams, setPlannedExams] = useState('2'); // e.g. 2 days exam
  const [unplannedMissed, setUnplannedMissed] = useState(1); // 1 day missed simulation alert

  // App State & Tracking
  const [activeTab, setActiveTab] = useState('roadmap');
  const [completedDays, setCompletedDays] = useState([1]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [potentialHours, setPotentialHours] = useState(2); // Dynamic boost from 2 to 3 hrs engagement

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
      { id: 1, title: '⚡ AUTONOMOUS ADAPTATION', desc: 'Recalibrates roadmap instantly after unplanned drops.', x: '5%', y: '25%', duration: '8s', delay: '0s' },
      { id: 2, title: '🧠 CAMERA ENGAGEMENT', desc: 'Detects fatigue & boosts momentum without distraction.', x: '73%', y: '20%', duration: '10s', delay: '1s' },
      { id: 3, title: '🛠️ PROJECT & INTERVIEW', desc: 'Embedded projects, interview tricks & job networking.', x: '6%', y: '68%', duration: '9s', delay: '2s' },
      { id: 4, title: '🎙️ STREAK PODCASTS', desc: 'Unlocks expert audio breakdowns upon streak completion.', x: '72%', y: '65%', duration: '11s', delay: '1.5s' }
    ];
    setFloatingCards(cards);
  }, []);

  // Feature 5: Simulated Camera & Boredom Monitoring Loop
  useEffect(() => {
    let interval;
    if (camActive && view === 'dashboard') {
      interval = setInterval(() => {
        // Randomly simulate attention dip to demonstrate engagement booster
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

  const toggleDay = (dayNum) => {
    if (completedDays.includes(dayNum)) {
      setCompletedDays(completedDays.filter(d => d !== dayNum));
    } else {
      setCompletedDays([...completedDays, dayNum]);
      // Boost user intent capacity from 2hrs to 3hrs via engaging rewards
      if (potentialHours < 3) setPotentialHours(3);
    }
  };

  const line1 = "FEED UR POTENTIAL".split("");
  const line2 = "NOT YOUR FEED".split("");

  const totalDaysCount = parseInt(totalDays) || 30;
  const roadmapDaysArray = Array.from({ length: Math.min(totalDaysCount, 15) }, (_, i) => i + 1);

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

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <div key={i} style={{ position: 'absolute', top: `${p.y}%`, left: `${p.x}%`, width: `${p.size}px`, height: `${p.size}px`, background: i % 2 === 0 ? '#38bdf8' : '#818cf8', borderRadius: '50%', pointerEvents: 'none', animation: `floatParticle ${p.duration}s infinite ease-in-out`, animationDelay: `${p.delay}s`, boxShadow: '0 0 15px rgba(56, 189, 248, 0.8)' }} />
      ))}

      {/* Top Corner Sign In */}
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
              Autonomous Closed-Loop Learning Engine with Dynamic Gap Recalibration, Camera Boredom Boosters, Embedded Projects, Job Interviews & Streak Podcasts.
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
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Enter credentials to initialize your closed-loop student telemetry.</p>

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

      {/* VIEW 3: FEATURE 1 & FEATURE 2 INPUT (Course, Daily Hrs, Total Days, Planned/Unplanned Disruptions) */}
      {view === 'plan-input' && (
        <div style={{ maxWidth: '500px', margin: '40px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 20 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>CUSTOM ROADMAP & DISRUPTION CONFIG</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Configure your course parameters and account for planned exams or unexpected life gaps.</p>

          <form onSubmit={handleGenerateRoadmap} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>WHICH COURSE DO YOU WANNA DO?</label>
              <input type="text" value={course} onChange={e => setCourse(e.target.value)} placeholder="e.g., Full Stack Web Dev / AI Engineer" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#38bdf8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>PLANNED EXAM DAYS</label>
                <input type="number" value={plannedExams} onChange={e => setPlannedExams(e.target.value)} placeholder="e.g. 2" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#fcd34d', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>UNPLANNED GAP SIMULATION</label>
                <input type="number" value={unplannedMissed} onChange={e => setUnplannedMissed(e.target.value)} placeholder="e.g. 1 day dropped" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#fcd34d', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <button type="submit" style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.5)' }}>
              INITIALIZE ADAPTIVE ROADMAP ENGINE 🚀
            </button>
          </form>
        </div>
      )}

      {/* VIEW 4: DASHBOARD (Features 1 to 5 integrated seamlessly) */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 20, animation: 'fadeInScale 0.6s ease-out' }}>
          
          {/* Top Status & Camera Telemetry Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <span style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>ACTIVE CLOSED-LOOP VECTOR</span>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0' }}>{course.toUpperCase()}</h2>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                Target: {totalDays} Days • Initial Intent: {dailyHours} hrs/day • <span style={{ color: '#34d399', fontWeight: 'bold' }}>Boosted Potential: {potentialHours} hrs/day ⚡</span>
              </div>
            </div>

            {/* Feature 5: Camera & Boredom Detector Widget */}
            <div style={{ background: camActive ? '#090d16' : '#0f172a', border: `1px solid ${boredomAlert ? '#ef4444' : '#1e293b'}`, borderRadius: '16px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', animation: boredomAlert ? 'pulseGlow 2s infinite' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: camActive ? '#34d399' : '#94a3b8', fontFamily: 'monospace' }}>CAM ENGAGEMENT AI</span>
                <button onClick={() => setCamActive(!camActive)} style={{ background: camActive ? '#065f46' : '#334155', border: 'none', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>
                  {camActive ? 'CAM ON 🟢' : 'TURN ON CAM 📷'}
                </button>
              </div>

              {camActive ? (
                <div style={{ fontSize: '11px', marginTop: '8px' }}>
                  {boredomAlert ? (
                    <div style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Fatigue Detected! Quick Challenge Unlocked to Keep You Focused!</div>
                  ) : (
                    <div style={{ color: '#34d399' }}>✨ Flow State Active • Attention Score: {engagementScore}%</div>
                  )}
                </div>
              ) : (
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '6px' }}>Enable camera for real-time boredom & focus adaptation.</div>
              )}
            </div>
          </div>

          {/* Feature 2 Alert Banner: Unplanned Gap & Auto-Recalibration Notice */}
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '14px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fcd34d' }}>⚠️ Unplanned Gap Detected ({unplannedMissed} Day Missed) & Planned Exams ({plannedExams} Days) Integrated</div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>Autonomous Engine has auto-revised your roadmap: previous topics queued for quick revision, keeping total completion strict at exactly <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{totalDays} Days</span>!</div>
            </div>
            <span style={{ background: '#f59e0b', color: '#020617', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>AUTOPILOT RECALIBRATED</span>
          </div>

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

          {/* TAB 1: VISUAL ROADMAP, YOUTUBE LINK ON DAY CLICK & QUIZ */}
          {activeTab === 'roadmap' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🗺️ CLICK ANY DAY TO OPEN YOUTUBE VIDEO & TOPIC QUIZ</h3>
                  <span style={{ fontSize: '11px', color: '#34d399' }}>🔥 Streak: {completedDays.length} Days Completed</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '15px' }}>
                  {roadmapDaysArray.map((day) => {
                    const isDone = completedDays.includes(day);
                    return (
                      <div 
                        key={day} 
                        onClick={() => setSelectedDay(day)}
                        style={{ 
                          background: isDone ? 'rgba(52, 211, 153, 0.1)' : '#020617', 
                          border: `1px solid ${selectedDay === day ? '#38bdf8' : isDone ? '#34d399' : '#334155'}`, 
                          borderRadius: '12px', 
                          padding: '16px', 
                          cursor: 'pointer',
                          boxShadow: selectedDay === day ? '0 0 20px rgba(56, 189, 248, 0.3)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: isDone ? '#34d399' : '#38bdf8', fontFamily: 'monospace' }}>DAY {day}</span>
                          <span style={{ fontSize: '11px' }}>{isDone ? '✅ Studied' : '▶ Watch'}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#f8fafc', fontWeight: 'bold', marginBottom: '4px' }}>
                          {day === 1 ? 'Introduction & Core Syntax' : day === 2 ? 'Revision & Architecture' : day === 3 ? 'Advanced Concepts' : `Module Vector ${day}`}
                        </div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>{dailyHours} hr session</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Day Details Modal / Card when a Day is clicked */}
              {selectedDay && (
                <div style={{ background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '16px', padding: '25px', animation: 'fadeInScale 0.4s ease-out' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '15px', color: '#38bdf8', margin: 0 }}>📺 DAY {selectedDay}: YOUTUBE VIDEO & INTERACTIVE QUIZ</h3>
                    <button onClick={() => setSelectedDay(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>✕ Close</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: '#020617', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Recommended YouTube 1-Shot / Lecture for Day {selectedDay}</div>
                      <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '15px' }}>Top quality curated breakdown specifically matched to your learning speed.</p>
                      <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ background: '#ef4444', color: '#fff', padding: '10px 18px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold', display: 'inline-block' }}>
                        Watch Video on YouTube ▶
                      </a>
                    </div>

                    <div style={{ background: '#020617', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#34d399', marginBottom: '8px' }}>🧠 Day {selectedDay} Knowledge Quiz</div>
                      <p style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '12px' }}>Test your conceptual retention after studying this topic.</p>
                      <button onClick={() => toggleDay(selectedDay)} style={{ background: completedDays.includes(selectedDay) ? '#065f46' : '#6366f1', border: 'none', color: '#fff', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                        {completedDays.includes(selectedDay) ? '✓ Completed (Click to Undo)' : 'Complete Quiz & Mark Studied ✅'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FEATURE 3 (Suggested Projects after every topic + Interview Questions) */}
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

          {/* TAB 3: FEATURE 4 (Streak Podcasts) */}
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

          {/* TAB 4: FEATURE 3 (Internship / Job Interview Tricks & Networking) */}
          {activeTab === 'jobs' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>💼 COURSE COMPLETION: INTERNSHIP/JOB TRICKS & NETWORKING</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#34d399', marginBottom: '6px' }}>Interview & Resume Mastery</div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.5' }}>Direct blueprint on how to showcase {course} projects on GitHub and LinkedIn to get recruiter callbacks instantly.</p>
                </div>
                <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#818cf8', marginBottom: '6px' }}>Exclusive Networking Hub</div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.5' }}>Connect with alumni and hiring partners looking for specialists in {course}.</p>
                </div>
              </div>
            </div>
          )}

          <button onClick={() => setView('plan-input')} style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', width: '240px' }}>
            ← Modify Roadmap Parameters
          </button>

        </div>
      )}

    </div>
  );
}
