import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [view, setView] = useState('signin'); // 'signin', 'domain-setup', 'dashboard'
  
  // Input Domain & Schedule State
  const [domain, setDomain] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [targetDurationMonths, setTargetDurationMonths] = useState('3');

  // Roadmap & Gap Simulation State
  const [unplannedMissed, setUnplannedMissed] = useState(0);
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [tempGapInput, setTempGapInput] = useState('2');

  // Revision Quiz Modal State (For Gap Recovery)
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Webcam & Distraction Telemetry State
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  
  // Real-time Distraction Telemetry & Refreshment Puzzle State
  const [distractionActive, setDistractionActive] = useState(false);
  const [refreshPuzzleSolved, setRefreshPuzzleSolved] = useState(false);
  const [refreshCountdown, setRefreshCountdown] = useState(20);

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Webcam activation and live distraction monitoring on dashboard view
  useEffect(() => {
    let interval;
    if (view === 'dashboard') {
      const startWebcam = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: false });
          mediaStreamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Webcam access error:", err);
        }
      };
      startWebcam();

      // Periodic telemetry check simulating real-time distraction detection
      interval = setInterval(() => {
        const isDistractedNow = Math.random() > 0.6;
        if (isDistractedNow) {
          setDistractionActive(true);
          setRefreshPuzzleSolved(false);
          setRefreshCountdown(20);
          speakMessage("You are distracted! Please solve this refreshment puzzle.");
        }
      }, 14000);
    }

    return () => {
      clearInterval(interval);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, [view]);

  // Countdown timer for distraction refreshment popup
  useEffect(() => {
    let timer;
    if (distractionActive && refreshCountdown > 0 && !refreshPuzzleSolved) {
      timer = setInterval(() => setRefreshCountdown(prev => prev - 1), 1000);
    } else if (refreshCountdown === 0 && distractionActive && !refreshPuzzleSolved) {
      // Auto-dismiss or force focus if time runs out
      setDistractionActive(false);
    }
    return () => clearInterval(timer);
  }, [distractionActive, refreshCountdown, refreshPuzzleSolved]);

  const handleGoogleSignIn = () => {
    setView('domain-setup');
  };

  const handleDomainSubmit = (e) => {
    e.preventDefault();
    if (domain && dailyHours && targetDurationMonths) {
      setView('dashboard');
    }
  };

  const handleApplyGapSimulation = (e) => {
    e.preventDefault();
    const gap = parseInt(tempGapInput) || 0;
    setUnplannedMissed(gap);
    setShowSimulateModal(false);
    setShowQuizModal(true); 
  };

  // Constant duration roadmap slots mapping
  const totalSlots = 12;
  const getDynamicRoadmap = () => {
    if (unplannedMissed <= 0) {
      return Array.from({ length: totalSlots }, (_, i) => ({ day: i + 1, type: 'normal', label: `Module Vector ${i + 1}` }));
    }
    const roadmap = [];
    for (let r = 1; r <= unplannedMissed; r++) {
      roadmap.push({ day: r, type: 'revision', label: `[REVISION QUIZ] Gap Recovery #${r}` });
    }
    let modNum = 1;
    for (let i = unplannedMissed + 1; i <= totalSlots; i++) {
      roadmap.push({ day: i, type: 'compressed', label: `[INTENSIVE] Module ${modNum}` });
      modNum++;
    }
    return roadmap;
  };

  const currentRoadmap = getDynamicRoadmap();

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', fontFamily: 'monospace', padding: '20px', boxSizing: 'border-box', position: 'relative' }}>
      
      {/* 1. SIGN IN VIEW */}
      {view === 'signin' && (
        <div style={{ maxWidth: '400px', margin: '120px auto', background: '#000000', border: '1px solid #ffffff', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>SYSTEM AUTHENTICATION</h2>
          <p style={{ fontSize: '11px', color: '#cccccc', marginBottom: '30px' }}>Autonomous Learning & Telemetry Engine</p>
          
          <button onClick={handleGoogleSignIn} style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '14px 20px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            🔵 Continue with Google
          </button>
        </div>
      )}

      {/* 2. DOMAIN & SCHEDULE SETUP VIEW */}
      {view === 'domain-setup' && (
        <div style={{ maxWidth: '440px', margin: '80px auto', background: '#000000', border: '1px solid #ffffff', padding: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #ffffff', paddingBottom: '10px' }}>COURSE PARAMETERS</h2>
          <p style={{ fontSize: '11px', color: '#cccccc', marginBottom: '20px' }}>Define your target domain and study timeline.</p>
          
          <form onSubmit={handleDomainSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '6px' }}>TARGET DOMAIN</label>
              <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. Embedded Systems, AI" style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '12px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '6px' }}>DAILY STUDY HOURS</label>
              <input type="number" value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '12px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} min="1" max="12" required />
            </div>
            <div>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '6px' }}>COMPLETION DURATION (MONTHS)</label>
              <input type="number" value={targetDurationMonths} onChange={e => setTargetDurationMonths(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '12px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} min="1" max="12" required />
            </div>
            <button type="submit" style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '14px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginTop: '10px' }}>
              INITIALIZE ROADMAP ➔
            </button>
          </form>
        </div>
      )}

      {/* 3. DASHBOARD VIEW */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          
          {/* WEBCAM ACTIVE PREVIEW */}
          <div style={{ position: 'fixed', top: '20px', right: '20px', width: '150px', height: '110px', background: '#000000', border: '2px solid #ffffff', zIndex: 150 }}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
            <div style={{ position: 'absolute', bottom: '2px', left: '2px', background: '#000000', border: '1px solid #ffffff', padding: '1px 4px', fontSize: '7px', color: '#ffffff' }}>CAM ACTIVE 🟢</div>
          </div>

          {/* REAL-TIME DISTRACTION & REFRESHMENT PUZZLE MODAL */}
          {distractionActive && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.96)', border: '5px solid #ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 300, textAlign: 'center', padding: '20px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🚨 WEBCAM ALERT: YOU ARE DISTRACTED!</h2>
              <p style={{ fontSize: '12px', color: '#cccccc', maxWidth: '420px', marginBottom: '20px' }}>Telemetry monitoring detected gaze drift. Clear this refreshment puzzle to resume dashboard:</p>
              
              <div style={{ border: '1px solid #ffffff', padding: '20px', maxWidth: '400px', marginBottom: '20px', background: '#111111', textAlign: 'left' }}>
                <p style={{ fontSize: '12px', marginBottom: '10px' }}><strong>Refreshment Puzzle:</strong> What architectural unit executes arithmetic and logic operations?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                  <button onClick={() => setRefreshPuzzleSolved(true)} style={{ background: '#000000', border: '1px solid #ffffff', color: '#ffffff', padding: '8px', fontSize: '11px', cursor: 'pointer', textAlign: 'left' }}>
                    A) ALU (Arithmetic Logic Unit)
                  </button>
                  <button onClick={() => setRefreshPuzzleSolved(true)} style={{ background: '#000000', border: '1px solid #ffffff', color: '#ffffff', padding: '8px', fontSize: '11px', cursor: 'pointer', textAlign: 'left' }}>
                    B) Power Supply Regulator
                  </button>
                </div>
              </div>

              {refreshPuzzleSolved && (
                <div style={{ fontSize: '12px', color: '#ffffff', border: '1px solid #ffffff', padding: '8px', marginBottom: '15px', background: '#000000' }}>
                  Puzzle Solved! Focus restored.
                </div>
              )}

              <div style={{ fontSize: '28px', fontWeight: '900', marginBottom: '15px' }}>Auto-dismiss in: {refreshCountdown}s</div>
              
              <button onClick={() => setDistractionActive(false)} style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '10px 24px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                Resume Learning ⚡
              </button>
            </div>
          )}

          {/* GAP REVISION QUIZ MODAL */}
          {showQuizModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 220, padding: '20px' }}>
              <div style={{ background: '#000000', border: '2px solid #ffffff', padding: '30px', width: '450px', maxWidth: '100%' }}>
                <h3 style={{ fontSize: '14px', marginBottom: '10px', borderBottom: '1px solid #ffffff', paddingBottom: '8px' }}>[REVISION QUIZ EVALUATION]</h3>
                <p style={{ fontSize: '12px', color: '#cccccc', marginBottom: '15px' }}>Unplanned gap registered. Clear this quiz for your missed topics:</p>
                
                <div style={{ fontSize: '12px', marginBottom: '15px', background: '#000000', padding: '15px', border: '1px solid #ffffff' }}>
                  <strong>Question:</strong> What is the primary execution behavior during high-priority interrupt handling in {domain}?
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <button onClick={() => setQuizSubmitted(true)} style={{ background: '#000000', border: '1px solid #ffffff', color: '#ffffff', padding: '10px', textAlign: 'left', fontSize: '11px', cursor: 'pointer' }}>
                    A) Save context and execute critical routine immediately
                  </button>
                  <button onClick={() => setQuizSubmitted(true)} style={{ background: '#000000', border: '1px solid #ffffff', color: '#ffffff', padding: '10px', textAlign: 'left', fontSize: '11px', cursor: 'pointer' }}>
                    B) Discard all current states
                  </button>
                </div>

                {quizSubmitted && (
                  <div style={{ fontSize: '11px', color: '#ffffff', border: '1px solid #ffffff', padding: '8px', marginBottom: '15px' }}>Quiz Cleared Successfully! Roadmap Re-indexed with same target duration.</div>
                )}

                <button onClick={() => { setShowQuizModal(false); setQuizSubmitted(false); }} style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '10px 20px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', width: '100%' }}>
                  Continue Dashboard ➔
                </button>
              </div>
            </div>
          )}

          {/* DASHBOARD HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000000', border: '1px solid #ffffff', padding: '20px', marginRight: '170px' }}>
            <div>
              <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>DOMAIN: {domain.toUpperCase()} | TARGET: {targetDurationMonths} MONTHS ({dailyHours} HRS/DAY)</span>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '4px 0 0 0' }}>Adaptive Visual Roadmap & Telemetry Hub</h2>
            </div>
            <div>
              <button onClick={() => setShowSimulateModal(true)} style={{ background: '#000000', border: '1px solid #ffffff', color: '#ffffff', padding: '10px 16px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                ⚠️ Simulate Unplanned Gap
              </button>
            </div>
          </div>

          {/* SIMULATION MODAL */}
          {showSimulateModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
              <div style={{ background: '#000000', border: '1px solid #ffffff', padding: '30px', width: '380px' }}>
                <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Simulate Unplanned Gap</h3>
                <p style={{ fontSize: '11px', color: '#cccccc', marginBottom: '15px' }}>Total course completion duration stays constant via automatic compression.</p>
                
                <form onSubmit={handleApplyGapSimulation} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input type="number" value={tempGapInput} onChange={e => setTempGapInput(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '10px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} min="1" max="5" required />
                  <button type="submit" style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '10px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>Apply Gap & Open Revision Quiz 🔄</button>
                </form>
              </div>
            </div>
          )}

          {/* VISUAL ROADMAP GRID */}
          <div style={{ background: '#000000', border: '1px solid #ffffff', padding: '25px' }}>
            <h3 style={{ fontSize: '12px', margin: '0 0 15px 0' }}>🗺️ VISUAL ROADMAP (Constant Duration Timeline)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              {currentRoadmap.map((item) => {
                const isRevision = item.type === 'revision';
                return (
                  <div key={item.day} style={{ border: '1px solid #ffffff', background: isRevision ? '#222222' : '#000000', padding: '15px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', color: '#ffffff' }}>SLOT {item.day}</div>
                    <div style={{ fontSize: '11px' }}>{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
