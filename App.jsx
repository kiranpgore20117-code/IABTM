import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [view, setView] = useState('signin'); // 'signin', 'setup', 'dashboard'
  
  // Setup State
  const [domain, setDomain] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [targetMonths, setTargetMonths] = useState('3');

  // Roadmap & Gap Simulation State
  const [unplannedMissed, setUnplannedMissed] = useState(0);
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [tempGapInput, setTempGapInput] = useState('2');

  // Revision Puzzle / Quiz Modal State
  const [showPuzzleModal, setShowPuzzleModal] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  // Distraction Telemetry State
  const [distracted, setDistracted] = useState(false);
  const [funnyPuzzleActive, setFunnyPuzzleActive] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Webcam & Distraction Monitor on Dashboard
  useEffect(() => {
    let interval;
    if (view === 'dashboard') {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: false });
          mediaStreamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Camera access error:", err);
        }
      };

      startCamera();

      // Simulate random distraction detection
      interval = setInterval(() => {
        const isDistractedNow = Math.random() > 0.65;
        if (isDistractedNow) {
          setDistracted(true);
          setFunnyPuzzleActive(true);
          setCountdown(15);
          speakMessage("You are distracted. Attention check triggered.");
        } else {
          setDistracted(false);
        }
      }, 10000);
    }

    return () => {
      clearInterval(interval);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, [view]);

  useEffect(() => {
    let timer;
    if (funnyPuzzleActive && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0 && funnyPuzzleActive) {
      setFunnyPuzzleActive(false);
      speakMessage("Resuming dashboard execution.");
    }
    return () => clearInterval(timer);
  }, [funnyPuzzleActive, countdown]);

  const handleGoogleSignIn = () => {
    setView('setup');
  };

  const handleSetupSubmit = (e) => {
    e.preventDefault();
    if (domain && dailyHours && targetMonths) {
      setView('dashboard');
    }
  };

  const handleApplyGapSimulation = (e) => {
    e.preventDefault();
    const gapDays = parseInt(tempGapInput) || 0;
    setUnplannedMissed(gapDays);
    setShowSimulateModal(false);
    setShowPuzzleModal(true);
  };

  const totalSlots = 12;
  const getDynamicRoadmap = () => {
    if (unplannedMissed <= 0) {
      return Array.from({ length: totalSlots }, (_, i) => ({ day: i + 1, type: 'normal', label: `Core Module Vector ${i + 1}` }));
    }
    const roadmap = [];
    for (let r = 1; r <= unplannedMissed; r++) {
      roadmap.push({ day: r, type: 'revision', label: `[REVISION PUZZLE] Gap Recovery #${r}` });
    }
    let modNum = 1;
    for (let i = unplannedMissed + 1; i <= totalSlots; i++) {
      roadmap.push({ day: i, type: 'accelerated', label: `[ACCELERATED] Module ${modNum}` });
      modNum++;
    }
    return roadmap;
  };

  const currentRoadmap = getDynamicRoadmap();

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', fontFamily: 'monospace', padding: '20px', boxSizing: 'border-box', position: 'relative' }}>
      
      {/* VIEW 1: SIGN IN WITH GOOGLE */}
      {view === 'signin' && (
        <div style={{ maxWidth: '400px', margin: '100px auto', background: '#000000', border: '1px solid #ffffff', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>PLATFORM SIGN IN</h2>
          <p style={{ fontSize: '11px', color: '#cccccc', marginBottom: '30px' }}>Autonomous AI Learning & Telemetry Engine</p>
          
          <button onClick={handleGoogleSignIn} style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '14px 20px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            [G] Continue with Google
          </button>
        </div>
      )}

      {/* VIEW 2: DOMAIN & TIME INVESTMENT SETUP */}
      {view === 'setup' && (
        <div style={{ maxWidth: '440px', margin: '60px auto', background: '#000000', border: '1px solid #ffffff', padding: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #ffffff', paddingBottom: '10px' }}>COURSE CONFIGURATION</h2>
          <p style={{ fontSize: '11px', color: '#cccccc', marginBottom: '20px' }}>Configure target domain, daily investment, and timeline.</p>
          
          <form onSubmit={handleSetupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '6px' }}>TARGET DOMAIN</label>
              <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. Embedded Systems" style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '12px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '6px' }}>DAILY TIME INVESTMENT (HOURS)</label>
              <input type="number" value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '12px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} min="1" max="12" required />
            </div>
            <div>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '6px' }}>COURSE COMPLETION TARGET (MONTHS)</label>
              <input type="number" value={targetMonths} onChange={e => setTargetMonths(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '12px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} min="1" max="12" required />
            </div>
            <button type="submit" style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '14px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginTop: '10px' }}>
              GENERATE ROADMAP & START ➔
            </button>
          </form>
        </div>
      )}

      {/* VIEW 3: MAIN DASHBOARD */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          
          {/* LIVE WEBCAM FEED PREVIEW */}
          <div style={{ position: 'fixed', top: '20px', right: '20px', width: '150px', height: '110px', background: '#000000', border: '2px solid #ffffff', zIndex: 150 }}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
            <div style={{ position: 'absolute', bottom: '2px', left: '2px', background: '#000000', border: '1px solid #ffffff', padding: '1px 4px', fontSize: '7px', color: '#ffffff' }}>CAM ACTIVE</div>
          </div>

          {/* DISTRACTION POPUP & FUNNY PUZZLE OVERLAY */}
          {funnyPuzzleActive && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', border: '5px solid #ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 250, textAlign: 'center', padding: '20px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>[ALERT] YOU ARE DISTRACTED</h2>
              <p style={{ fontSize: '12px', color: '#cccccc', maxWidth: '450px', marginBottom: '20px' }}>Webcam telemetry detected lack of focus. Solve this quick puzzle to unlock dashboard:</p>
              
              <div style={{ border: '1px solid #ffffff', padding: '20px', maxWidth: '400px', marginBottom: '20px', background: '#000000' }}>
                <p style={{ fontSize: '12px', marginBottom: '10px' }}><strong>Puzzle Challenge:</strong> What has keys, spaces, but no doors or rooms?</p>
                <div style={{ fontSize: '11px', color: '#aaaaaa' }}>Hint: Essential for programming.</div>
              </div>

              <div style={{ fontSize: '30px', fontWeight: '900', marginBottom: '20px' }}>{countdown}s</div>
              <button onClick={() => setFunnyPuzzleActive(false)} style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '10px 24px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                Resume Learning ⚡
              </button>
            </div>
          )}

          {/* REVISION PUZZLE MODAL (Triggered on gap simulation) */}
          {showPuzzleModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 220, padding: '20px' }}>
              <div style={{ background: '#000000', border: '2px solid #ffffff', padding: '30px', width: '450px', maxWidth: '100%' }}>
                <h3 style={{ fontSize: '14px', marginBottom: '10px', borderBottom: '1px solid #ffffff', paddingBottom: '8px' }}>[REVISION PUZZLE MODULE]</h3>
                <p style={{ fontSize: '12px', color: '#cccccc', marginBottom: '15px' }}>Gap registered! Clear this evaluation puzzle for missed topics.</p>
                
                <div style={{ fontSize: '12px', marginBottom: '15px', background: '#000000', padding: '15px', border: '1px solid #ffffff' }}>
                  <strong>Question:</strong> What is the core function of priority context switching?
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <button onClick={() => setPuzzleSolved(true)} style={{ background: '#000000', border: '1px solid #ffffff', color: '#ffffff', padding: '10px', textAlign: 'left', fontSize: '11px', cursor: 'pointer' }}>
                    A) Guarantee execution deadlines for high-priority tasks
                  </button>
                  <button onClick={() => setPuzzleSolved(true)} style={{ background: '#000000', border: '1px solid #ffffff', color: '#ffffff', padding: '10px', textAlign: 'left', fontSize: '11px', cursor: 'pointer' }}>
                    B) Clear all system registers permanently
                  </button>
                </div>

                {puzzleSolved && (
                  <div style={{ fontSize: '12px', color: '#ffffff', marginBottom: '15px', border: '1px solid #ffffff', padding: '8px' }}>Puzzle Solved Successfully! Roadmap Re-indexed.</div>
                )}

                <button onClick={() => { setShowPuzzleModal(false); setPuzzleSolved(false); }} style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '10px 20px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', width: '100%' }}>
                  Continue Pipeline ➔
                </button>
              </div>
            </div>
          )}

          {/* DASHBOARD HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000000', border: '1px solid #ffffff', padding: '20px', marginRight: '170px' }}>
            <div>
              <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>DOMAIN: {domain.toUpperCase()} | TARGET: {targetMonths} MONTHS ({dailyHours} HRS/DAY)</span>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '4px 0 0 0' }}>Adaptive Visual Roadmap & Telemetry Hub</h2>
            </div>
            <div>
              <button onClick={() => setShowSimulateModal(true)} style={{ background: '#000000', border: '1px solid #ffffff', color: '#ffffff', padding: '10px 16px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                ⚠️ Simulate Gap
              </button>
            </div>
          </div>

          {/* SIMULATION MODAL */}
          {showSimulateModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
              <div style={{ background: '#000000', border: '1px solid #ffffff', padding: '30px', width: '380px' }}>
                <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Simulate Unplanned Gap</h3>
                <p style={{ fontSize: '11px', color: '#cccccc', marginBottom: '15px' }}>Total course duration stays constant via automatic compression.</p>
                
                <form onSubmit={handleApplyGapSimulation} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input type="number" value={tempGapInput} onChange={e => setTempGapInput(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '10px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} min="1" max="5" required />
                  <button type="submit" style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '10px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>Apply & Open Revision Puzzles 🔄</button>
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
                    <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', color: '#ffffff' }}>PHASE SLOT {item.day}</div>
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
