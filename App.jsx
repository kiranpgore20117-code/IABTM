import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'signin', 'dashboard'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  // Default Video Pipeline Database (Neutral)
  const defaultVideos = [
    { id: 'v-1', title: "Core System Architecture & Low-Level Register Programming", topicTag: "architecture", difficultyScore: 3, contentQualityScore: 9.8, channel: "System Hub", url: "https://youtube.com" },
    { id: 'v-2', title: "Task Scheduling & Real-Time Operating Systems from Scratch", topicTag: "rtos", difficultyScore: 2, contentQualityScore: 9.5, channel: "Code Mastery", url: "https://youtube.com" },
    { id: 'v-3', title: "Bare-Metal Programming Fundamentals", topicTag: "baremetal", difficultyScore: 1, contentQualityScore: 9.2, channel: "Hardware Labs", url: "https://youtube.com" },
    { id: 'v-4', title: "Communication Protocols Deep Dive: I2C, SPI, UART", topicTag: "protocols", difficultyScore: 2, contentQualityScore: 9.6, channel: "Engineering Academy", url: "https://youtube.com" }
  ];

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ==========================================
  // BACKEND LOGIC: AI VIDEO RECOMMENDATION PIPELINE
  // ==========================================
  const getAIRecommendedVideos = () => {
    const scored = defaultVideos.map(video => {
      let score = video.contentQualityScore * 10;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (video.title.toLowerCase().includes(query) || video.topicTag.includes(query)) {
          score += 50;
        }
      }

      if (boredomAlert && video.difficultyScore === 1) {
        score += 30; 
      }

      return { ...video, calculatedScore: score };
    });

    scored.sort((a, b) => b.calculatedScore - a.calculatedScore);
    return scored;
  };

  // Webcam telemetry simulation
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
        if (randomEvent > 0.7) {
          setBoredomAlert(true);
          setFunnyChallengeActive(true);
          setTimeLeft(20);
          setEngagementScore(prev => Math.max(50, prev - 20));
          speakMessage("Focus check! Attention dip detected.");
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
      speakMessage("Welcome back! Resuming pipeline.");
    }
    return () => clearInterval(timer);
  }, [funnyChallengeActive, timeLeft]);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) setView('dashboard');
  };

  const handleApplySimulation = (e) => {
    e.preventDefault();
    const missed = parseInt(tempMissedInput) || 0;
    setUnplannedMissed(missed);
    setShowSimulateModal(false);
  };

  const baseRoadmapDaysArray = Array.from({ length: 15 }, (_, i) => i + 1);

  const getDynamicRoadmap = () => {
    if (unplannedMissed <= 0) {
      return baseRoadmapDaysArray.map(d => ({ day: d, type: 'normal', label: `Module Vector ${d}` }));
    }
    const compressed = [];
    for (let r = 1; r <= unplannedMissed; r++) {
      compressed.push({ day: r, type: 'revision', label: `🔄 REVISION: Gap Recovery #${r}` });
    }
    let topicCounter = 1;
    for (let i = unplannedMissed + 1; i <= 15; i++) {
      compressed.push({ day: i, type: 'new', label: `✨ New Module Vector ${topicCounter}` });
      topicCounter++;
    }
    return compressed;
  };

  const currentRoadmap = getDynamicRoadmap();
  const recommendedVideosList = getAIRecommendedVideos();

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', fontFamily: 'monospace', padding: '20px', boxSizing: 'border-box', position: 'relative' }}>
      
      {/* TOP RIGHT SIGN IN BUTTON ON LANDING */}
      {view === 'landing' && (
        <div style={{ position: 'absolute', top: '25px', right: '35px', zIndex: 30 }}>
          <button onClick={() => setView('signin')} style={{ background: 'transparent', border: '1px solid #ffffff', color: '#ffffff', padding: '10px 24px', borderRadius: '0px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
            SIGN IN ➔
          </button>
        </div>
      )}

      {/* VIEW 1: LANDING */}
      {view === 'landing' && (
        <div style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: '900', borderBottom: '2px solid #ffffff', paddingBottom: '20px', marginBottom: '20px' }}>
            AI VIDEO RECOMMENDATION PIPELINE & UI
          </h1>
          <p style={{ fontSize: '13px', color: '#cccccc', maxWidth: '600px', marginBottom: '40px' }}>
            Pure black and white interface layout with automated telemetry tracking and content-scored video mapping[cite: 1].
          </p>
          <button onClick={() => setView('signin')} style={{ background: '#ffffff', border: '1px solid #ffffff', color: '#000000', padding: '16px 40px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
            LAUNCH SYSTEM 🚀
          </button>
        </div>
      )}

      {/* VIEW 2: SIGN IN */}
      {view === 'signin' && (
        <div style={{ maxWidth: '400px', margin: '80px auto', background: '#000000', border: '1px solid #ffffff', padding: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid #ffffff', paddingBottom: '10px' }}>AUTHENTICATION</h2>
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '6px' }}>EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="user@system.ai" style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '12px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '6px' }}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '12px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} required />
            </div>
            <button type="submit" style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '14px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginTop: '10px' }}>
              ACCESS DASHBOARD ➔
            </button>
          </form>
        </div>
      )}

      {/* VIEW 3: FULL DASHBOARD */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          
          {/* WEBCAM PREVIEW BOX */}
          <div style={{ position: 'fixed', top: '20px', right: '20px', width: '150px', height: '110px', background: '#000000', border: '2px solid #ffffff', zIndex: 150 }}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
            <div style={{ position: 'absolute', bottom: '2px', left: '2px', background: '#000000', border: '1px solid #ffffff', padding: '1px 4px', fontSize: '7px', color: '#ffffff' }}>CAM ACTIVE</div>
          </div>

          {/* DISTRACTION RECOVERY OVERLAY */}
          {funnyChallengeActive && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', border: '5px solid #ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 200, textAlign: 'center', padding: '20px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️ ATTENTION DROP DETECTED</h2>
              <p style={{ fontSize: '12px', color: '#cccccc', maxWidth: '400px', marginBottom: '20px' }}>Pipeline boosted foundational review videos into your queue.</p>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '20px' }}>{timeLeft}s</div>
              <button onClick={() => setFunnyChallengeActive(false)} style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '10px 20px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                Resume Learning ⚡
              </button>
            </div>
          )}

          {/* DASHBOARD HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ffffff', padding: '20px', marginRight: '170px' }}>
            <div>
              <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>SYSTEM PIPELINE • SECURE SESSION</span>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '4px 0 0 0' }}>Core Execution Engine</h2>
            </div>
            <div>
              <button onClick={() => setShowSimulateModal(true)} style={{ background: 'transparent', border: '1px solid #ffffff', color: '#ffffff', padding: '10px 16px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                ⚠️ Simulate Gap
              </button>
            </div>
          </div>

          {/* SIMULATION MODAL */}
          {showSimulateModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
              <div style={{ background: '#000000', border: '1px solid #ffffff', padding: '30px', width: '350px' }}>
                <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Simulate Disruption</h3>
                <form onSubmit={handleApplySimulation} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                  <input type="number" value={tempMissedInput} onChange={e => setTempMissedInput(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #ffffff', padding: '10px', color: '#ffffff', fontSize: '12px', boxSizing: 'border-box' }} min="1" max="5" required />
                  <button type="submit" style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '10px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>Apply Revision Pipeline 🔄</button>
                </form>
              </div>
            </div>
          )}

          {/* TABS */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #ffffff', paddingBottom: '10px' }}>
            <button onClick={() => setActiveTab('roadmap')} style={{ background: activeTab === 'roadmap' ? '#ffffff' : '#000000', border: '1px solid #ffffff', color: activeTab === 'roadmap' ? '#000000' : '#ffffff', padding: '8px 14px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              🗺️ Roadmap & Video Pipeline[cite: 1]
            </button>
            <button onClick={() => setActiveTab('projects')} style={{ background: activeTab === 'projects' ? '#ffffff' : '#000000', border: '1px solid #ffffff', color: activeTab === 'projects' ? '#000000' : '#ffffff', padding: '8px 14px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              🛠️ System Projects
            </button>
          </div>

          {/* TAB CONTENT: ROADMAP & RECOMMENDATION ENGINE */}
          {activeTab === 'roadmap' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* VIDEO RECOMMENDATION PIPELINE SECTION */}
              <div style={{ border: '1px solid #ffffff', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '12px', margin: 0 }}>🎥 CONTENT-SCORED RECOMMENDATION PIPELINE[cite: 1]</h3>
                  <input 
                    type="text" 
                    placeholder="Filter by keyword..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ background: '#000000', border: '1px solid #ffffff', padding: '6px 10px', color: '#ffffff', fontSize: '11px', width: '220px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '15px' }}>
                  {recommendedVideosList.map(video => (
                    <div key={video.id} style={{ border: '1px solid #ffffff', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '9px' }}>
                          <span>SCORE: {video.calculatedScore}</span>
                          <span>QUAL: {video.contentQualityScore}</span>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>{video.title}</div>
                        <div style={{ fontSize: '10px', color: '#cccccc', marginBottom: '12px' }}>Channel: {video.channel}</div>
                      </div>
                      <a href={video.url} target="_blank" rel="noreferrer" style={{ background: '#ffffff', color: '#000000', padding: '6px 10px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold', textAlign: 'center', display: 'block' }}>
                        Watch Video ▶
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROADMAP GRID */}
              <div style={{ border: '1px solid #ffffff', padding: '20px' }}>
                <h3 style={{ fontSize: '12px', margin: '0 0 15px 0' }}>🗺️ MILESTONE SEQUENCE</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                  {currentRoadmap.map((item) => {
                    const isRevision = item.type === 'revision';
                    return (
                      <div key={item.day} onClick={() => setSelectedDay(item.day)} style={{ border: `1px solid ${isRevision ? '#ffffff' : '#555555'}`, background: isRevision ? '#222222' : '#000000', padding: '12px', cursor: 'pointer' }}>
                        <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}>DAY {item.day}</div>
                        <div style={{ fontSize: '11px' }}>{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'projects' && (
            <div style={{ border: '1px solid #ffffff', padding: '20px' }}>
              <h3 style={{ fontSize: '12px', margin: '0 0 15px 0' }}>🛠️ SYSTEM PROJECTS</h3>
              <div style={{ border: '1px solid #555555', padding: '15px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Project Verification Matrix</div>
                <p style={{ fontSize: '11px', color: '#cccccc' }}>System modules and practical challenges configuration ready.</p>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
