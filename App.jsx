import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'signin', 'domain-select', 'dashboard'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Multi-Domain State
  const [selectedDomain, setSelectedDomain] = useState('embedded');

  // Feature Inputs
  const [dailyHours, setDailyHours] = useState('2');
  const [totalDays, setTotalDays] = useState('30');
  
  // Revision & Gap Simulation State
  const [unplannedMissed, setUnplannedMissed] = useState(0); 
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [tempMissedInput, setTempMissedInput] = useState('2');

  // App Dashboard State
  const [activeTab, setActiveTab] = useState('roadmap');
  const [completedDays, setCompletedDays] = useState([1]);
  const [selectedDay, setSelectedDay] = useState(null);

  // AI Recommendation Engine Pipeline State
  const [searchQuery, setSearchQuery] = useState('');

  // Camera & Distraction Telemetry State
  const [boredomAlert, setBoredomAlert] = useState(false);
  const [engagementScore, setEngagementScore] = useState(94);
  const [funnyChallengeActive, setFunnyChallengeActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Multi-Domain Content Database with Embedded Systems as Focus
  const domainDatabase = {
    embedded: {
      name: "Embedded Systems & Firmware",
      description: "ARM Cortex, RTOS, Bare-Metal C, and Hardware Communication Protocols.",
      videos: [
        { id: 'emb-1', title: "ARM Cortex-M Microcontroller Architecture & Low-Level Register Programming", topicTag: "arm", difficultyScore: 3, contentQualityScore: 9.8, channel: "Embedded Design Hub", url: "https://youtube.com" },
        { id: 'emb-2', title: "FreeRTOS Task Scheduling & Real-Time Operating Systems from Scratch", topicTag: "rtos", difficultyScore: 2, contentQualityScore: 9.5, channel: "Microcontroller Mastery", url: "https://youtube.com" },
        { id: 'emb-3', title: "Bare-Metal C Programming for Microcontrollers", topicTag: "c", difficultyScore: 1, contentQualityScore: 9.2, channel: "Hardware Code Labs", url: "https://youtube.com" },
        { id: 'emb-4', title: "I2C, SPI, and UART Communication Protocols Deep Dive", topicTag: "protocols", difficultyScore: 2, contentQualityScore: 9.6, channel: "Silicon Engineering", url: "https://youtube.com" }
      ]
    },
    ai: {
      name: "Artificial Intelligence & ML",
      description: "Neural networks, LLM pipelines, and autonomous agents.",
      videos: [
        { id: 'ai-1', title: "LLM Architecture & Transformers Deep Dive", topicTag: "transformers", difficultyScore: 3, contentQualityScore: 9.8, channel: "AI Engineering Hub", url: "https://youtube.com" },
        { id: 'ai-2', title: "PyTorch from Scratch for Custom Agents", topicTag: "pytorch", difficultyScore: 2, contentQualityScore: 9.2, channel: "Code Synthesis", url: "https://youtube.com" }
      ]
    },
    web: {
      name: "Full Stack Web Engineering",
      description: "React, Node.js, distributed backend systems.",
      videos: [
        { id: 'web-1', title: "Advanced Asynchronous State Synchronization", topicTag: "async", difficultyScore: 3, contentQualityScore: 9.6, channel: "System Architectures", url: "https://youtube.com" }
      ]
    }
  };

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

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ==========================================
  // BACKEND LOGIC: AI VIDEO RECOMMENDATION PIPELINE
  // ==========================================
  const getAIRecommendedVideos = () => {
    const domainData = domainDatabase[selectedDomain] || domainDatabase.embedded;
    const baseVideos = domainData.videos;

    // Content-smart scoring pipeline algorithm
    const scored = baseVideos.map(video => {
      let score = video.contentQualityScore * 10;

      // Query matching score boost
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (video.title.toLowerCase().includes(query) || video.topicTag.includes(query)) {
          score += 50;
        }
      }

      // Telemetry adaptation boost (if distracted, prioritize basic/foundational videos)
      if (boredomAlert && video.difficultyScore === 1) {
        score += 30; 
      }

      return { ...video, calculatedScore: score };
    });

    scored.sort((a, b) => b.calculatedScore - a.calculatedScore);
    return scored;
  };

  // Automatically handle webcam telemetry simulation
  useEffect(() => {
    let interval;
    if (view === 'dashboard') {
      const startCameraAutomatically = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: false });
          mediaStreamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Webcam access error:", err);
        }
      };

      startCameraAutomatically();

      interval = setInterval(() => {
        const randomEvent = Math.random();
        if (randomEvent > 0.65) {
          setBoredomAlert(true);
          setFunnyChallengeActive(true);
          setTimeLeft(20);
          setEngagementScore(prev => Math.max(50, prev - 20));
          speakMessage("Hey! Loss of attention detected. Let's do a quick focus reset!");
        } else {
          setBoredomAlert(false);
        }
      }, 7000);
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
    if (funnyChallengeActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && funnyChallengeActive) {
      setFunnyChallengeActive(false);
      setBoredomAlert(false);
      speakMessage("Welcome back! Resuming core pipeline execution.");
    }
    return () => clearInterval(timer);
  }, [funnyChallengeActive, timeLeft]);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) setView('domain-select');
  };

  const handleSelectDomainKey = (key) => {
    setSelectedDomain(key);
    setView('dashboard');
  };

  const handleApplySimulation = (e) => {
    e.preventDefault();
    const missed = parseInt(tempMissedInput) || 0;
    setUnplannedMissed(missed);
    setShowSimulateModal(false);
  };

  const totalDaysCount = parseInt(totalDays) || 30;
  const baseRoadmapDaysArray = Array.from({ length: Math.min(totalDaysCount, 15) }, (_, i) => i + 1);

  const getDynamicRoadmap = () => {
    if (unplannedMissed <= 0) {
      return baseRoadmapDaysArray.map(d => ({ day: d, type: 'normal', label: `Module Vector ${d}` }));
    }
    const compressed = [];
    for (let r = 1; r <= unplannedMissed; r++) {
      compressed.push({ day: r, type: 'revision', label: `🔄 REVISION: Catching up on Gap #${r}` });
    }
    let topicCounter = 1;
    for (let i = unplannedMissed + 1; i <= Math.min(15, baseRoadmapDaysArray.length); i++) {
      compressed.push({ day: i, type: 'new', label: `✨ New Topic Module ${topicCounter}` });
      topicCounter++;
    }
    return compressed;
  };

  const currentRoadmap = getDynamicRoadmap();
  const currentDomainObj = domainDatabase[selectedDomain] || domainDatabase.embedded;
  const recommendedVideosList = getAIRecommendedVideos();

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box', position: 'relative', overflowX: 'hidden' }}>
      
      <style>{`
        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-60px) translateX(30px) scale(1.2); opacity: 0.7; }
          100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.15; }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95) translateY(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
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
          <button onClick={() => setView('signin')} style={{ background: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '10px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
            SIGN IN ➔
          </button>
        </div>
      )}

      {/* VIEW 1: LANDING */}
      {view === 'landing' && (
        <div style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: '950px', padding: '0 20px' }}>
            <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 68px)', fontWeight: '900', lineHeight: '1.25', margin: 0 }}>
              <div style={{ width: '100%', whiteSpace: 'nowrap', color: '#ffffff', textShadow: '0 0 25px rgba(56, 189, 248, 0.8)' }}>
                EMBEDDED & MULTI-DOMAIN PLATFORM
              </div>
              <div style={{ width: '100%', whiteSpace: 'nowrap', background: 'linear-gradient(to right, #818cf8, #38bdf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AI VIDEO RECOMMENDATION BACKEND & UI
              </div>
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '30px', marginBottom: '40px', lineHeight: '1.6' }}>
              Full integrated system featuring automated telemetry tracking and content-scored video mapping[cite: 1].
            </p>
            <button onClick={() => setView('signin')} style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px 42px', borderRadius: '16px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' }}>
              LAUNCH APP 🚀
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: SIGN IN */}
      {view === 'signin' && (
        <div style={{ maxWidth: '440px', margin: '70px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', position: 'relative', zIndex: 20 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>AUTHENTICATION</h2>
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '20px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="user@domain.ai" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>
            <button type="submit" style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px' }}>
              PROCEED TO DOMAINS ➔
            </button>
          </form>
        </div>
      )}

      {/* VIEW 3: DOMAIN SELECTOR */}
      {view === 'domain-select' && (
        <div style={{ maxWidth: '650px', margin: '40px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', position: 'relative', zIndex: 20 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>CHOOSE DOMAIN</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Select an area to load targeted backend content vectors.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginBottom: '25px' }}>
            {Object.keys(domainDatabase).map((key) => {
              const dom = domainDatabase[key];
              return (
                <div 
                  key={key}
                  onClick={() => handleSelectDomainKey(key)}
                  style={{ background: key === 'embedded' ? 'rgba(56, 189, 248, 0.1)' : '#020617', border: `1px solid ${key === 'embedded' ? '#38bdf8' : '#334155'}`, borderRadius: '14px', padding: '20px', cursor: 'pointer' }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '4px' }}>{dom.name} {key === 'embedded' && '⭐ (Featured Core)'}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{dom.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: FULL DASHBOARD WITH UI & BACKEND PIPELINE */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 20, animation: 'fadeInScale 0.6s ease-out' }}>
          
          {/* WEBCAM PREVIEW BOX */}
          <div style={{ position: 'fixed', top: '20px', right: '20px', width: '160px', height: '120px', background: '#000', border: `2px solid ${boredomAlert ? '#ef4444' : '#38bdf8'}`, borderRadius: '12px', overflow: 'hidden', zIndex: 150, boxShadow: '0 10px 25px rgba(0,0,0,0.8)' }}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
            <div style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', fontSize: '8px', color: '#34d399', fontFamily: 'monospace' }}>TELEMETRY 🟢</div>
          </div>

          {/* DISTRACTION RECOVERY OVERLAY */}
          {funnyChallengeActive && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 200, textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '50px', animation: 'wiggle 0.5s infinite' }}>🤪🚨</div>
              <h2 style={{ fontSize: '28px', color: '#fcd34d', margin: '15px 0 5px 0' }}>FOCUS CHECK!</h2>
              <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '400px', marginBottom: '20px' }}>Low telemetry score registered. Injecting fundamental boost into recommendation queue.</p>
              <div style={{ fontSize: '42px', fontWeight: '900', color: '#38bdf8', fontFamily: 'monospace', marginBottom: '25px' }}>{timeLeft}s</div>
              <button onClick={() => setFunnyChallengeActive(false)} style={{ background: '#34d399', color: '#020617', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                Resume ⚡
              </button>
            </div>
          )}

          {/* DASHBOARD HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', marginRight: '180px' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>DOMAIN PIPELINE: {currentDomainObj.name.toUpperCase()}</span>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0' }}>{currentDomainObj.description}</h2>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                <button onClick={() => setView('domain-select')} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontSize: '11px' }}>Switch Domain 🔀</button>
              </div>
            </div>
            <div>
              <button onClick={() => setShowSimulateModal(true)} style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))', border: '1px solid #fcd34d', color: '#fcd34d', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                ⚠️ Simulate Gap
              </button>
            </div>
          </div>

          {/* SIMULATION MODAL */}
          {showSimulateModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
              <div style={{ background: '#0f172a', border: '1px solid #fcd34d', borderRadius: '20px', padding: '30px', width: '380px' }}>
                <h3 style={{ fontSize: '16px', color: '#fcd34d', margin: '0 0 8px 0' }}>⚠️ Simulate Disruption</h3>
                <form onSubmit={handleApplySimulation} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                  <input type="number" value={tempMissedInput} onChange={e => setTempMissedInput(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#fcd34d', fontSize: '14px', boxSizing: 'border-box' }} min="1" max="5" required />
                  <button type="submit" style={{ background: '#f59e0b', color: '#020617', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Apply Revision Pipeline 🔄</button>
                </form>
              </div>
            </div>
          )}

          {/* TAB NAVIGATION */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
            <button onClick={() => setActiveTab('roadmap')} style={{ background: activeTab === 'roadmap' ? '#6366f1' : '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              🗺️ Roadmap & Video Pipeline[cite: 1]
            </button>
            <button onClick={() => setActiveTab('projects')} style={{ background: activeTab === 'projects' ? '#6366f1' : '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              🛠️ Domain Projects
            </button>
          </div>

          {/* TAB CONTENT: ROADMAP & RECOMMENDATION ENGINE */}
          {activeTab === 'roadmap' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* VIDEO RECOMMENDATION PIPELINE SECTION */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🎥 CONTENT-SCORED RECOMMENDATION PIPELINE[cite: 1]</h3>
                  <input 
                    type="text" 
                    placeholder="Filter by keyword (e.g. rtos, arm)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ background: '#020617', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '11px', width: '240px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                  {recommendedVideosList.map(video => (
                    <div key={video.id} style={{ background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '9px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>Score: {video.calculatedScore}pts</span>
                          <span style={{ fontSize: '9px', color: '#34d399', fontFamily: 'monospace' }}>Quality: {video.contentQualityScore}</span>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '4px' }}>{video.title}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '15px' }}>Channel: {video.channel}</div>
                      </div>
                      <a href={video.url} target="_blank" rel="noreferrer" style={{ background: '#ef4444', color: '#fff', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold', textAlign: 'center', display: 'block' }}>
                        Watch Curated Video ▶
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROADMAP GRID */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px' }}>
                <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 15px 0' }}>🗺️ ADAPTIVE MILESTONE SEQUENCE</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '15px' }}>
                  {currentRoadmap.map((item) => {
                    const isRevision = item.type === 'revision';
                    return (
                      <div key={item.day} onClick={() => setSelectedDay(item.day)} style={{ background: isRevision ? 'rgba(245, 158, 11, 0.1)' : '#020617', border: `1px solid ${isRevision ? '#f59e0b' : '#334155'}`, borderRadius: '12px', padding: '16px', cursor: 'pointer' }}>
                        <div style={{ fontSize: '11px', fontWeight: 'bold', color: isRevision ? '#fcd34d' : '#38bdf8', fontFamily: 'monospace', marginBottom: '4px' }}>DAY {item.day}</div>
                        <div style={{ fontSize: '11px', color: '#f8fafc', fontWeight: 'bold' }}>{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'projects' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px' }}>
              <h3 style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 15px 0' }}>🛠️ DOMAIN PROJECTS</h3>
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '6px' }}>{currentDomainObj.name} Projects Suite</div>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>Dynamic project briefs adjust seamlessly to your chosen multi-domain option.</p>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
