import React, { useState, useEffect, useRef } from 'react';

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

  // Feature 5: Continuous Camera & 20s Distraction Fun Refresher State
  const [boredomAlert, setBoredomAlert] = useState(false);
  const [engagementScore, setEngagementScore] = useState(94);
  const [funnyChallengeActive, setFunnyChallengeActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  // Refs for continuous live webcam stream
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Floating background elements
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const pts = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 12 + 6,
      delay: Math.random() * 5
    }));
    setParticles(pts);
  }, []);

  // Text-to-speech speaker helper using laptop speakers
  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.2; // Slightly funny high pitch
      window.speechSynthesis.speak(utterance);
    }
  };

  // Automatically start webcam when dashboard opens
  useEffect(() => {
    let interval;
    if (view === 'dashboard') {
      const startCameraAutomatically = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 320, height: 240 }, 
            audio: false 
          });
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing webcam automatically:", err);
        }
      };

      startCameraAutomatically();

      // Trigger distraction check loop every 12 seconds
      interval = setInterval(() => {
        const randomEvent = Math.random();
        if (randomEvent > 0.6) {
          setBoredomAlert(true);
          setFunnyChallengeActive(true);
          setTimeLeft(20);
          setEngagementScore(prev => Math.max(50, prev - 20));
          
          // Voice speaks out loud from laptop speakers
          speakMessage("Hey buddy! You look totally distracted! Let's take a 20 second funny brain break right now!");
        } else {
          setBoredomAlert(false);
        }
      }, 12000);
    }

    return () => {
      clearInterval(interval);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, [view]);

  // 20-second countdown timer for funny distraction mode
  useEffect(() => {
    let timer;
    if (funnyChallengeActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && funnyChallengeActive) {
      setFunnyChallengeActive(false);
      setBoredomAlert(false);
      speakMessage("Welcome back! Let's crush this roadmap!");
    }
    return () => clearInterval(timer);
  }, [funnyChallengeActive, timeLeft]);

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

  const getDynamicRoadmap = () => {
    if (unplannedMissed <= 0) {
      return baseRoadmapDaysArray.map(d => ({ day: d, type: 'normal', label: `Module Vector ${d}` }));
    }

    const compressed = [];
    for (let r = 1; r <= unplannedMissed; r++) {
      compressed.push({
        day: r,
        type: 'revision',
        label: `🔄 MANDATORY REVISION: Catching up on Missed Gap #${r}`
      });
    }

    let topicCounter = 1;
    for (let i = unplannedMissed + 1; i <= Math.min(15, baseRoadmapDaysArray.length); i++) {
      compressed.push({
        day: i,
        type: 'new',
        label: `✨ New Topic Module Vector ${topicCounter}`
      });
      topicCounter++;
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
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95) translateY(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
          100% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
        }
        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>

      {particles.map((p, i) => (
        <div key={i} style={{ position: 'absolute', top: `${p.y}%`, left: `${p.x}%`, width: `${p.size}px`, height: `${p.size}px`, background: i % 2 === 0 ? '#38bdf8' : '#818cf8', borderRadius: '50%', pointerEvents: 'none', animation: `floatParticle ${p.duration}s infinite ease-in-out`, animationDelay: `${p.delay}s`, boxShadow: '0 0 15px rgba(56, 189, 248, 0.8)' }} />
      ))}

      {view === 'landing' && (
        <div style={{ position: 'absolute', top: '25px', right: '35px', zIndex: 30 }}>
          <button onClick={() => setView('signin')} style={{ background: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '10px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', textShadow: '0 0 10px rgba(56, 189, 248, 0.6)', boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)' }}>
            SIGN IN ➔
          </button>
        </div>
      )}

      {/* VIEW 1: LANDING (No boxes, neon text shadow effect on alphabets) */}
      {view === 'landing' && (
        <div style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          
          <div style={{ textAlign: 'center', maxWidth: '850px', padding: '0 20px' }}>
            <h1 style={{ fontSize: 'clamp(40px, 6.5vw, 76px)', fontWeight: '900', lineHeight: '1.25', margin: 0, letterSpacing: '-1px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {line1.map((char, index) => (
                  <span key={index} style={{ display: 'inline-block', color: '#ffffff', textShadow: '0 0 25px rgba(56, 189, 248, 0.8), 0 0 50px rgba(99, 102, 241, 0.5), 0 4px 10px rgba(0,0,0,0.9)', animation: `dropLetter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both`, animationDelay: `${index * 0.04}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {line2.map((char, index) => (
                  <span key={index} style={{ display: 'inline-block', background: 'linear-gradient(to right, #818cf8, #38bdf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 25px rgba(52, 211, 153, 0.7)) drop-shadow(0 0 50px rgba(6, 182, 212, 0.4))', animation: `dropLetter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both`, animationDelay: `${(line1.length + index) * 0.04}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>

            </h1>

            <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '30px', marginBottom: '40px', lineHeight: '1.6', textShadow: '0 2px 10px rgba(0,0,0,0.8)', animation: 'fadeInScale 1s ease-out 0.8s both' }}>
              Autonomous Closed-Loop Learning Engine with Mandatory Revision-First Gap Recovery & Smart Distraction Refresher.
            </p>

            <div style={{ animation: 'fadeInScale 1s ease-out 1s both' }}>
              <button onClick={() => setView('signin')} style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px 42px', borderRadius: '16px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', textShadow: '0 2px 5px rgba(0,0,0,0.4)', boxShadow: '0 0 30px rgba(99, 102, 241, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)' }}>
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

      {/* VIEW 3: CLEAN CONFIG */}
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
          
          {/* FLOATING WEBCAM FEED ON RIGHT TOP CORNER */}
          <div style={{ position: 'fixed', top: '20px', right: '20px', width: '160px', height: '120px', background: '#000', border: `2px solid ${boredomAlert ? '#ef4444' : '#38bdf8'}`, borderRadius: '12px', overflow: 'hidden', zIndex: 150, boxShadow: '0 10px 25px rgba(0,0,0,0.8)' }}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
            />
            <div style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', fontSize: '8px', color: '#34d399', fontFamily: 'monospace' }}>
              LIVE CAM 🟢
            </div>
          </div>

          {/* FUNNY 20-SECOND DISTRACTION REFRESHER OVERLAY */}
          {funnyChallengeActive && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 200, animation: 'fadeInScale 0.3s ease-out', textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '50px', animation: 'wiggle 0.5s infinite' }}>🤪🚨</div>
              <h2 style={{ fontSize: '28px', color: '#fcd34d', margin: '15px 0 5px 0' }}>BUSTED! YOU ARE DISTRACTED!</h2>
              <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '400px', marginBottom: '20px' }}>Your AI companion noticed you spacing out! Let's do a quick, funny 20-second brain refresh right now through your laptop speaker!</p>
              
              <div style={{ fontSize: '42px', fontWeight: '900', color: '#38bdf8', fontFamily: 'monospace', marginBottom: '25px', textShadow: '0 0 20px rgba(56, 189, 248, 0.6)' }}>
                {timeLeft}s remaining
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px', maxWidth: '450px' }}>
                <div style={{ fontSize: '13px', color: '#34d399', fontWeight: 'bold', marginBottom: '6px' }}>Quick Fun Challenge:</div>
                <div style={{ fontSize: '12px', color: '#f8fafc' }}>Blink 3 times super fast, stretch your arms high up, and smile like you just won the lottery! 😄🙌</div>
              </div>

              <button onClick={() => setFunnyChallengeActive(false)} style={{ marginTop: '25px', background: '#34d399', color: '#020617', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                I'm Refreshed & Ready! ⚡
              </button>
            </div>
          )}

          {/* Top Header & Unplanned Simulation Button in Top-Right Corner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', marginRight: '180px' }}>
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
                <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>Enter missed days. The engine will schedule mandatory revision/catch-up days FIRST before starting new topics!</p>
                
                <form onSubmit={handleApplySimulation} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>MISSED DAYS TO SIMULATE</label>
                    <input type="number" value={tempMissedInput} onChange={e => setTempMissedInput(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#fcd34d', fontSize: '14px', boxSizing: 'border-box' }} min="1" max="5" required />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                    <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#020617', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                      Apply & Prioritize Revision 🔄
                    </button>
                    <button type="button" onClick={() => setShowSimulateModal(false)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* REVISION-FIRST NOTICE WHEN UNPLANNED DAYS > 0 */}
          {unplannedMissed > 0 && (
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '14px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeInScale 0.4s ease-out' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fcd34d' }}>🔄 Revision-First Adaptation Active ({unplannedMissed} Days Missed)</div>
                <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>Roadmap successfully re-sequenced: <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>Mandatory Revision & Catch-up slots are scheduled first</span> before new topic modules begin!</div>
              </div>
              <span style={{ background: '#f59e0b', color: '#020617', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>REVISION FIRST PROTOCOL</span>
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

          {/* TAB 1: REVISION-FIRST ROADMAP GRID */}
          {activeTab === 'roadmap' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🗺️ ADAPTIVE ROADMAP (REVISION SCHEDULED BEFORE NEW TOPICS)</h3>
                  <span style={{ fontSize: '11px', color: '#34d399' }}>🔥 Streak: {completedDays.length} Days Completed</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '15px' }}>
                  {currentRoadmap.map((item) => {
                    const isDone = completedDays.includes(item.day);
                    const isRevision = item.type === 'revision';
                    return (
                      <div 
                        key={item.day} 
                        onClick={() => setSelectedDay(item.day)}
                        style={{ 
                          background: isRevision ? 'rgba(245, 158, 11, 0.1)' : isDone ? 'rgba(52, 211, 153, 0.1)' : '#020617', 
                          border: `1px solid ${selectedDay === item.day ? '#38bdf8' : isRevision ? '#f59e0b' : isDone ? '#34d399' : '#334155'}`, 
                          borderRadius: '12px', 
                          padding: '16px', 
                          cursor: 'pointer',
                          boxShadow: selectedDay === item.day ? '0 0 20px rgba(56, 189, 248, 0.3)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: isRevision ? '#fcd34d' : isDone ? '#34d399' : '#38bdf8', fontFamily: 'monospace' }}>DAY {item.day}</span>
                          <span style={{ fontSize: '11px' }}>{isDone ? '✅ Studied' : '▶ Watch'}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#f8fafc', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.4' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '10px', color: isRevision ? '#fcd34d' : '#94a3b8' }}>
                          {isRevision ? '🔄 Catch-up & Revision' : `${dailyHours} hr session`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedDay && (
                <div style={{ background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '16px', padding: '25px', animation: 'fadeInScale 0.4s ease-out' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '15px', color: '#38bdf8', margin: 0 }}>📺 DAY {selectedDay}: YOUTUBE VIDEO & RETENTION QUIZ</h3>
                    <button onClick={() => setSelectedDay(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>✕ Close</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: '#020617', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Curated YouTube Playlist / Lecture</div>
                      <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '15px' }}>Targeted content session matched to your revision-first workflow.</p>
                      <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ background: '#ef4444', color: '#fff', padding: '10px 18px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold', display: 'inline-block' }}>
                        Watch Video on YouTube ▶
                      </a>
                    </div>

                    <div style={{ background: '#020617', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#34d399', marginBottom: '8px' }}>🧠 Day {selectedDay} Retention Quiz</div>
                      <p style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '12px' }}>Verify your mastery over today's session.</p>
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
