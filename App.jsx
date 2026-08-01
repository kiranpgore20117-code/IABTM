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
  const [plannedExams, setPlannedExams] = useState('2'); 
  const [unplannedMissed, setUnplannedMissed] = useState(1); 

  // App State & Tracking
  const [activeTab, setActiveTab] = useState('roadmap');
  const [completedDays, setCompletedDays] = useState([1]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [potentialHours, setPotentialHours] = useState(2); 

  // Feature 5: Camera Engagement & Boredom Detector State
  const [camActive, setCamActive] = useState(false);
  const [boredomAlert, setBoredomAlert] = useState(false);
  const [engagementScore, setEngagementScore] = useState(94);

  // Floating background elements for the immersive dark mode style
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const pts = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 6,
      delay: Math.random() * 5
    }));
    setParticles(pts);
  }, []);

  // Simulated Camera & Boredom Monitoring Loop
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

  const toggleDay = (dayNum) => {
    if (completedDays.includes(dayNum)) {
      setCompletedDays(completedDays.filter(d => d !== dayNum));
    } else {
      setCompletedDays([...completedDays, dayNum]);
      if (potentialHours < 3) setPotentialHours(3);
    }
  };

  const line1 = "BAND OF AGENTS".split("");
  const line2 = "LEARNING ENGINE".split("");

  const totalDaysCount = parseInt(totalDays) || 30;
  const roadmapDaysArray = Array.from({ length: Math.min(totalDaysCount, 15) }, (_, i) => i + 1);

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '16px', boxSizing: 'border-box', position: 'relative', overflowX: 'hidden' }}>
      
      <style>{`
        @keyframes dropLetter {
          0% { opacity: 0; transform: translateY(-50px) scale(0.5); }
          60% { opacity: 1; transform: translateY(8px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 0.6; }
          100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.96) translateY(10px); }
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
        <div key={i} style={{ position: 'absolute', top: `${p.y}%`, left: `${p.x}%`, width: `${p.size}px`, height: `${p.size}px`, background: i % 2 === 0 ? '#38bdf8' : '#34d399', borderRadius: '50%', pointerEvents: 'none', animation: `floatParticle ${p.duration}s infinite ease-in-out`, animationDelay: `${p.delay}s` }} />
      ))}

      {/* Top Corner Auth */}
      {view === 'landing' && (
        <div style={{ position: 'absolute', top: '25px', right: '35px', zIndex: 30 }}>
          <button onClick={() => setView('signin')} style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '10px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
            SIGN IN ➔
          </button>
        </div>
      )}

      {/* VIEW 1: LANDING PAGE MATCHING YOUR HACKATHON REFERENCE LAYOUT */}
      {view === 'landing' && (
        <div style={{ maxWidth: '1150px', margin: '30px auto', background: '#0b0f19', border: '1px solid #1e293b', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', position: 'relative', zIndex: 10 }}>
          
          {/* Top Brand Banner Row */}
          <div style={{ padding: '30px 40px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#38bdf8', color: '#020617', padding: '6px 12px', borderRadius: '8px' }}>
                <span>⬡</span> <strong>BAND</strong>
              </div>
              <span>×</span>
              <span style={{ border: '1px solid #334155', padding: '5px 10px', borderRadius: '6px', color: '#f8fafc' }}>LV</span>
              <span>×</span>
              <span style={{ border: '1px solid #334155', padding: '5px 10px', borderRadius: '6px', color: '#f8fafc' }}>LABLAB</span>
              <span>×</span>
              <span style={{ color: '#cbd5e1' }}>Featherless</span>
              <span>×</span>
              <span style={{ color: '#cbd5e1' }}>AI/ML API</span>
            </div>
          </div>

          {/* Hero Content Section */}
          <div style={{ padding: '50px 40px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
            
            <div>
              <h1 style={{ fontSize: 'clamp(32px, 4.2vw, 52px)', fontWeight: '900', lineHeight: '1.1', margin: '0 0 20px 0', letterSpacing: '-1px', textTransform: 'uppercase' }}>
                
                {/* Line 1 */}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {line1.map((char, index) => (
                    <span key={index} style={{ display: 'inline-block', color: '#f8fafc', animation: 'dropLetter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both', animationDelay: `${index * 0.03}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>

                {/* Line 2 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', background: 'linear-gradient(to right, #34d399, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {line2.map((char, index) => (
                    <span key={index} style={{ display: 'inline-block', animation: 'dropLetter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both', animationDelay: `${(line1.length + index) * 0.03}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>

              </h1>

              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', maxWidth: '480px', marginBottom: '30px' }}>
                BUILD ENTERPRISE MULTI-AGENT SYSTEMS WITH BAND AND CODEBAND. AUTONOMOUS GAP RECALIBRATION, CAMERA FATIGUE BOOSTERS, AND STREAK PODCASTS.
              </p>

              <button 
                onClick={() => setView('signin')}
                style={{ background: 'linear-gradient(to right, #38bdf8, #34d399)', color: '#020617', border: 'none', padding: '16px 36px', borderRadius: '14px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 15px 30px -5px rgba(56, 189, 248, 0.4)' }}
              >
                ENTER HACKATHON APP 🚀
              </button>
            </div>

            {/* Right Side Visual Graphic Box (Matching the retro tech illustration style) */}
            <div style={{ background: 'linear-gradient(135deg, #064e3b, #022c22)', border: '2px solid #34d399', borderRadius: '20px', padding: '30px', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 40px -10px rgba(52, 211, 153, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#34d399', background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '6px' }}>AGENT_KERNEL_v2.6</span>
                <span style={{ fontSize: '20px' }}>🤖⚡</span>
              </div>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', fontFamily: 'monospace' }}>FEED UR POTENTIAL</div>
                <div style={{ fontSize: '12px', color: '#a7f3d0', marginTop: '6px' }}>Autonomous YouTube Matching & Day-Wise Tracking</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6ee7b7', fontFamily: 'monospace' }}>
                <span>STATUS: LIVE</span>
                <span>CLOSED-LOOP ACTIVE</span>
              </div>
            </div>

          </div>

          {/* Bottom Metatags Bar matching the reference image footer layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid #1e293b', background: '#020617' }}>
            <div style={{ padding: '24px 35px', borderRight: '1px solid #1e293b' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>📅 DATES</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc' }}>JUNE 12–19, 2026</div>
            </div>
            <div style={{ padding: '24px 35px', borderRight: '1px solid #1e293b' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>📍 LOCATION</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc' }}>ONLINE</div>
            </div>
            <div style={{ padding: '24px 35px', background: 'rgba(56, 189, 248, 0.05)' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '4px' }}>🏆 PRIZE POOL</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8' }}>$10,000+</div>
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: SIGN IN */}
      {view === 'signin' && (
        <div style={{ maxWidth: '420px', margin: '60px auto', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', animation: 'fadeInScale 0.4s ease-out' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>AGENT AUTHENTICATION</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '24px' }}>Sign in to initialize closed-loop telemetry.</p>
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@agent.ai" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>
            <button type="submit" style={{ background: 'linear-gradient(to right, #38bdf8, #34d399)', border: 'none', color: '#020617', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px' }}>
              CONTINUE TO ROADMAP SETUP ➔
            </button>
          </form>
          <button onClick={() => setView('landing')} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px', marginTop: '20px', width: '100%', textAlign: 'center' }}>
            ← BACK TO HOME
          </button>
        </div>
      )}

      {/* VIEW 3: SETUP ROADMAP & DISRUPTIONS */}
      {view === 'plan-input' && (
        <div style={{ maxWidth: '480px', margin: '40px auto', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', animation: 'fadeInScale 0.4s ease-out' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>ROADMAP & DISRUPTION CONFIG</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '24px' }}>Configure your course and autonomous gap handling.</p>
          <form onSubmit={handleGenerateRoadmap} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>COURSE / TOPIC</label>
              <input type="text" value={course} onChange={e => setCourse(e.target.value)} placeholder="e.g. Full Stack Web Dev / AI Engineer" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>DAILY HOURS</label>
                <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}>
                  <option value="1">1 Hour</option>
                  <option value="2">2 Hours</option>
                  <option value="3">3 Hours</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>TOTAL DAYS</label>
                <input type="number" value={totalDays} onChange={e => setTotalDays(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#38bdf8', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>PLANNED EXAMS</label>
                <input type="number" value={plannedExams} onChange={e => setPlannedExams(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#fcd34d', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>UNPLANNED GAP</label>
                <input type="number" value={unplannedMissed} onChange={e => setUnplannedMissed(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#fcd34d', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>
            <button type="submit" style={{ background: 'linear-gradient(to right, #38bdf8, #34d399)', border: 'none', color: '#020617', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px' }}>
              INITIALIZE AGENT ROADMAP 🚀
            </button>
          </form>
        </div>
      )}

      {/* VIEW 4: DASHBOARD & FEATURES */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeInScale 0.4s ease-out' }}>
          
          {/* Top Status & Camera Telemetry */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <span style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace' }}>ACTIVE AGENT VECTOR</span>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '4px 0' }}>{course.toUpperCase()}</h2>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                Target: {totalDays} Days • Initial Intent: {dailyHours} hrs/day • <span style={{ color: '#34d399', fontWeight: 'bold' }}>Boosted Potential: {potentialHours} hrs/day ⚡</span>
              </div>
            </div>

            {/* Feature 5: Camera Boredom Detector Widget */}
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
                    <div style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Fatigue Detected! Quick Challenge Unlocked!</div>
                  ) : (
                    <div style={{ color: '#34d399' }}>✨ Flow State Active • Attention Score: {engagementScore}%</div>
                  )}
                </div>
              ) : (
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '6px' }}>Enable camera for real-time boredom adaptation.</div>
              )}
            </div>
          </div>

          {/* Feature 2 Alert Banner */}
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '14px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fcd34d' }}>⚠️ Unplanned Gap Detected ({unplannedMissed} Day Missed) & Planned Exams ({plannedExams} Days) Integrated</div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>Autonomous Engine has auto-revised your roadmap to maintain strict completion in <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{totalDays} Days</span>!</div>
            </div>
            <span style={{ background: '#f59e0b', color: '#020617', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>RECALIBRATED</span>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '10px', overflowX: 'auto' }}>
            <button onClick={() => setActiveTab('roadmap')} style={{ background: activeTab === 'roadmap' ? '#38bdf8' : '#0f172a', border: '1px solid #334155', color: activeTab === 'roadmap' ? '#020617' : '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              🗺️ Visual Roadmap & YouTube
            </button>
            <button onClick={() => setActiveTab('projects')} style={{ background: activeTab === 'projects' ? '#38bdf8' : '#0f172a', border: '1px solid #334155', color: activeTab === 'projects' ? '#020617' : '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              🛠️ Projects & Interview Qs
            </button>
            <button onClick={() => setActiveTab('podcasts')} style={{ background: activeTab === 'podcasts' ? '#38bdf8' : '#0f172a', border: '1px solid #334155', color: activeTab === 'podcasts' ? '#020617' : '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              🎙️ Streak Podcasts
            </button>
            <button onClick={() => setActiveTab('jobs')} style={{ background: activeTab === 'jobs' ? '#38bdf8' : '#0f172a', border: '1px solid #334155', color: activeTab === 'jobs' ? '#020617' : '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              💼 Jobs & Networking
            </button>
          </div>

          {/* TAB 1: ROADMAP */}
          {activeTab === 'roadmap' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🗺️ CLICK ANY DAY FOR YOUTUBE & QUIZ</h3>
                  <span style={{ fontSize: '11px', color: '#34d399' }}>🔥 Streak: {completedDays.length} Days Completed</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '15px' }}>
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
                          cursor: 'pointer' 
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: isDone ? '#34d399' : '#38bdf8', fontFamily: 'monospace' }}>DAY {day}</span>
                          <span style={{ fontSize: '11px' }}>{isDone ? '✅' : '▶'}</span>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Vector Module {day}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>{dailyHours} hr session</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedDay && (
                <div style={{ background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '16px', padding: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '14px', color: '#38bdf8', margin: 0 }}>📺 DAY {selectedDay}: YOUTUBE VIDEO & QUIZ</h3>
                    <button onClick={() => setSelectedDay(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>✕ Close</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: '#020617', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Recommended YouTube Lecture</div>
                      <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ background: '#ef4444', color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold', display: 'inline-block' }}>
                        Watch on YouTube ▶
                      </a>
                    </div>
                    <div style={{ background: '#020617', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#34d399', marginBottom: '8px' }}>Day {selectedDay} Knowledge Quiz</div>
                      <button onClick={() => toggleDay(selectedDay)} style={{ background: completedDays.includes(selectedDay) ? '#065f46' : '#38bdf8', border: 'none', color: completedDays.includes(selectedDay) ? '#fff' : '#020617', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                        {completedDays.includes(selectedDay) ? '✓ Completed (Click to Undo)' : 'Mark Studied ✅'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🛠️ SUGGESTED PROJECTS & INTERVIEW Qs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '6px' }}>Milestone Mini-Project</div>
                  <p style={{ fontSize: '11px', color: '#94a3b8' }}>Build a Real-Time Autonomous Dashboard Engine using {course}.</p>
                </div>
                <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#34d399', marginBottom: '6px' }}>Top Interview Questions</div>
                  <p style={{ fontSize: '11px', color: '#cbd5e1' }}>• Explain asynchronous state orchestration.<br/>• Handle real-time telemetry drops.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PODCASTS */}
          {activeTab === 'podcasts' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🎙️ STREAK AUDIO PODCASTS</h3>
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Masterclass: Architectural Deep Dive</div>
                  <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Unlocked via streak ({completedDays.length} Days) 🎧</div>
                </div>
                <button style={{ background: '#38bdf8', color: '#020617', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Play ▶</button>
              </div>
            </div>
          )}

          {/* TAB 4: JOBS */}
          {activeTab === 'jobs' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>💼 JOBS & NETWORKING</h3>
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#34d399', marginBottom: '6px' }}>Recruiter Callback Blueprint</div>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>Direct tips on packaging your {course} portfolio for top-tier tech roles.</p>
              </div>
            </div>
          )}

          <button onClick={() => setView('plan-input')} style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '11px', width: '220px' }}>
            ← Modify Roadmap Parameters
          </button>

        </div>
      )}

    </div>
  );
}
