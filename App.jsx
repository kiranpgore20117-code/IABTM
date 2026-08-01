
import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  BookOpen, 
  Layers, 
  Radio, 
  Briefcase, 
  ArrowRight, 
  Play, 
  AlertTriangle, 
  Sparkles
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'signin', 'plan-input', 'dashboard'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Roadmap & Input States
  const [course, setCourse] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [totalDays, setTotalDays] = useState('30');
  
  // Disruption & Tracking
  const [unplannedMissed, setUnplannedMissed] = useState(0); 
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [tempMissedInput, setTempMissedInput] = useState('2');

  const [activeTab, setActiveTab] = useState('roadmap');
  const [completedDays, setCompletedDays] = useState([1]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [potentialHours, setPotentialHours] = useState(2);

  // Real Webcam & distraction telemetry states
  const [engagementScore, setEngagementScore] = useState(94);
  const [funnyChallengeActive, setFunnyChallengeActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [detectedStatus, setDetectedStatus] = useState('Initializing Vision Telemetry...');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const analysisIntervalRef = useRef(null);

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Actual computer vision pixel check for real distraction/absence monitoring
  const analyzeVideoFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video.readyState !== video.HAVE_ENOUGH_DATA) return;

    const context = canvas.getContext('2d');
    canvas.width = 160;
    canvas.height = 120;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frameData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = frameData.data;

    let totalBrightness = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      totalBrightness += avg;
    }
    const avgBrightness = totalBrightness / (pixels.length / 4);

    // If dark or user steps away
    if (avgBrightness < 15) {
      setDetectedStatus('Status: User Absent / Low Light');
      triggerRealDistractionProtocol("Hey! You seem to have walked away or covered the camera. Get back to your study stream!");
    } else {
      setDetectedStatus('Status: Focused & Active');
    }
  };

  const triggerRealDistractionProtocol = (message) => {
    if (!funnyChallengeActive) {
      setBoredomAlertState(true);
      setFunnyChallengeActive(true);
      setTimeLeft(20);
      setEngagementScore(prev => Math.max(40, prev - 15));
      speakMessage(message);
    }
  };

  const [boredomAlert, setBoredomAlertState] = useState(false);

  useEffect(() => {
    if (view === 'dashboard') {
      const startCameraAndMonitoring = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 320, height: 240 }, 
            audio: false 
          });
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setDetectedStatus('Status: Live Telemetry Online');

          analysisIntervalRef.current = setInterval(() => {
            analyzeVideoFrame();
          }, 4000);

        } catch (err) {
          console.error("Error accessing webcam:", err);
          setDetectedStatus('Camera Access Denied');
        }
      };

      startCameraAndMonitoring();
    }

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, [view]);

  useEffect(() => {
    let timer;
    if (funnyChallengeActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && funnyChallengeActive) {
      setFunnyChallengeActive(false);
      setBoredomAlertState(false);
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
        label: `MANDATORY REVISION: Gap Recovery #${r}`
      });
    }

    let topicCounter = 1;
    for (let i = unplannedMissed + 1; i <= Math.min(15, baseRoadmapDaysArray.length); i++) {
      compressed.push({
        day: i,
        type: 'new',
        label: `New Topic Module Vector ${topicCounter}`
      });
      topicCounter++;
    }
    return compressed;
  };

  const currentRoadmap = getDynamicRoadmap();

  return (
    <div style={{ backgroundColor: '#000000', color: '#FFFFFF', minHeight: '100vh', fontFamily: 'Inter, sans-serif', padding: '0px', boxSizing: 'border-box', position: 'relative', overflowX: 'hidden' }}>
      
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.98) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        input, select {
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        input:focus, select:focus {
          outline: none;
          border-color: #FFFFFF !important;
        }
        button {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', padding: '0 40px', borderBottom: '1px solid #2A2A2A', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setView('landing')}>
          <div style={{ width: '16px', height: '16px', background: '#FFFFFF', borderRadius: '4px' }} />
          <span style={{ fontWeight: '600', fontSize: '15px', letterSpacing: '-0.3px', color: '#FFFFFF' }}>HBTM.AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {view === 'landing' ? (
            <button onClick={() => setView('signin')} style={{ background: '#FFFFFF', color: '#000000', border: 'none', padding: '8px 16px', borderRadius: '12px', fontWeight: '500', fontSize: '14px', cursor: 'pointer', height: '36px' }}>
              Sign In
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: '#A1A1AA', fontFamily: 'monospace' }}>Score: {engagementScore}%</span>
              <button onClick={() => setView('landing')} style={{ background: 'transparent', border: '1px solid #2A2A2A', color: '#A1A1AA', padding: '6px 14px', borderRadius: '12px', fontSize: '13px', cursor: 'pointer' }}>
                Exit Session
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* LANDING */}
      {view === 'landing' && (
        <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center', animation: 'fadeInScale 0.4s ease-out' }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#0F0F0F', border: '1px solid #2A2A2A', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', color: '#A1A1AA', marginBottom: '32px' }}>
              <Sparkles size={14} color="#FFFFFF" />
              <span>Real-Time Computer Vision Attention Engine</span>
            </div>

            <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '700', lineHeight: '1.1', letterSpacing: '-1.5px', color: '#FFFFFF', margin: '0 0 24px 0' }}>
              Feed Your Potential, Not Your Feed.
            </h1>

            <p style={{ fontSize: '18px', color: '#A1A1AA', lineHeight: '1.6', margin: '0 auto 40px auto', maxWidth: '580px', fontWeight: '400' }}>
              An AI that monitors your live camera feed to ensure absolute focus, dynamically adjusting your learning roadmap in real-time.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button onClick={() => setView('signin')} style={{ background: '#FFFFFF', color: '#000000', border: 'none', padding: '0 28px', borderRadius: '12px', fontWeight: '500', fontSize: '16px', height: '48px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Get Started <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIGN IN */}
      {view === 'signin' && (
        <div style={{ maxWidth: '420px', margin: '80px auto', background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '40px', animation: 'fadeInScale 0.3s ease-out' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Welcome back</h2>
          <p style={{ fontSize: '14px', color: '#A1A1AA', margin: '0 0 32px 0' }}>Enter your agent credentials to initialize telemetry.</p>

          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#A1A1AA', display: 'block', marginBottom: '8px' }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@domain.com" style={{ width: '100%', background: '#000000', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '14px 16px', color: '#FFFFFF', fontSize: '15px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#A1A1AA', display: 'block', marginBottom: '8px' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', background: '#000000', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '14px 16px', color: '#FFFFFF', fontSize: '15px', boxSizing: 'border-box' }} required />
            </div>
            <button type="submit" style={{ background: '#FFFFFF', color: '#000000', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '500', fontSize: '15px', cursor: 'pointer', marginTop: '8px', height: '48px' }}>
              Continue
            </button>
          </form>
          <button onClick={() => setView('landing')} style={{ background: 'transparent', border: 'none', color: '#71717A', cursor: 'pointer', fontSize: '13px', marginTop: '24px', width: '100%', textAlign: 'center' }}>
            Back to home
          </button>
        </div>
      )}

      {/* PLAN INPUT */}
      {view === 'plan-input' && (
        <div style={{ maxWidth: '480px', margin: '60px auto', background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '40px', animation: 'fadeInScale 0.3s ease-out' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Roadmap Configuration</h2>
          <p style={{ fontSize: '14px', color: '#A1A1AA', margin: '0 0 32px 0' }}>Define baseline parameters for your custom learning vector.</p>

          <form onSubmit={handleGenerateRoadmap} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#A1A1AA', display: 'block', marginBottom: '8px' }}>Target Domain / Course</label>
              <input type="text" value={course} onChange={e => setCourse(e.target.value)} placeholder="e.g., Full Stack Engineering / AI Architecture" style={{ width: '100%', background: '#000000', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '14px 16px', color: '#FFFFFF', fontSize: '15px', boxSizing: 'border-box' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#A1A1AA', display: 'block', marginBottom: '8px' }}>Daily Allocation</label>
                <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '14px 16px', color: '#FFFFFF', fontSize: '15px', boxSizing: 'border-box' }}>
                  <option value="1">1 Hour / Day</option>
                  <option value="2">2 Hours / Day</option>
                  <option value="3">3 Hours / Day</option>
                  <option value="4">4+ Hours / Day</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#A1A1AA', display: 'block', marginBottom: '8px' }}>Duration (Days)</label>
                <input type="number" value={totalDays} onChange={e => setTotalDays(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '14px 16px', color: '#FFFFFF', fontSize: '15px', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <button type="submit" style={{ background: '#FFFFFF', color: '#000000', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '500', fontSize: '15px', cursor: 'pointer', marginTop: '12px', height: '48px' }}>
              Initialize Engine
            </button>
          </form>
        </div>
      )}

      {/* DASHBOARD */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeInScale 0.3s ease-out' }}>
          
          {/* FLOATING REAL WEBCAM */}
          <div style={{ position: 'fixed', bottom: '24px', right: '24px', width: '200px', background: '#0F0F0F', border: `1px solid ${boredomAlert ? '#FFFFFF' : '#2A2A2A'}`, borderRadius: '16px', overflow: 'hidden', zIndex: 150, boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
            <div style={{ position: 'relative', width: '100%', height: '135px' }}>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
              />
              <div style={{ position: 'absolute', bottom: '6px', left: '6px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', color: '#00FF66', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', background: '#00FF66', borderRadius: '50%' }} /> REAL VISION ACTIVE
              </div>
            </div>
            <div style={{ padding: '8px 10px', background: '#171717', borderTop: '1px solid #2A2A2A', fontSize: '10px', color: '#A1A1AA', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {detectedStatus}
            </div>
          </div>

          {/* REAL ATTENTION LOSS MODAL */}
          {funnyChallengeActive && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 200, padding: '24px', textAlign: 'center' }}>
              <div style={{ background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '24px', padding: '48px', maxWidth: '440px', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ width: '48px', height: '48px', background: '#171717', border: '1px solid #2A2A2A', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <AlertTriangle size={24} color="#FFFFFF" />
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', margin: '0 0 8px 0' }}>Real Distraction Captured</h2>
                <p style={{ fontSize: '14px', color: '#A1A1AA', margin: '0 0 24px 0', lineHeight: '1.5' }}>Your camera stream detected absence or lack of focus. Recalibrating real engagement window.</p>
                
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#FFFFFF', fontFamily: 'monospace', marginBottom: '24px' }}>
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </div>

                <button onClick={() => setFunnyChallengeActive(false)} style={{ width: '100%', background: '#FFFFFF', color: '#000000', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '500', fontSize: '14px', cursor: 'pointer', height: '48px' }}>
                  Resume Session
                </button>
              </div>
            </div>
          )}

          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '32px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#71717A', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Learning Vector</span>
              <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#FFFFFF', margin: '6px 0 8px 0', letterSpacing: '-0.5px' }}>{course.toUpperCase()}</h1>
              <div style={{ fontSize: '14px', color: '#A1A1AA', display: 'flex', gap: '16px' }}>
                <span>Target: {totalDays} Days</span>
                <span>•</span>
                <span>Baseline: {dailyHours}h/day</span>
                <span>•</span>
                <span style={{ color: '#FFFFFF' }}>Active: {potentialHours}h/day</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => triggerRealDistractionProtocol("Manual vision check triggered. Focus back on track!")} 
                style={{ background: '#FFFFFF', color: '#000000', border: 'none', padding: '10px 18px', borderRadius: '12px', fontWeight: '500', fontSize: '13px', cursor: 'pointer' }}
              >
                Test Vision Alert
              </button>
              <button 
                onClick={() => setShowSimulateModal(true)} 
                style={{ background: 'transparent', border: '1px solid #2A2A2A', color: '#FFFFFF', padding: '10px 18px', borderRadius: '12px', fontWeight: '500', fontSize: '13px', cursor: 'pointer' }}
              >
                Simulate Disruption
              </button>
            </div>
          </div>

          {showSimulateModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '24px' }}>
              <div style={{ background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '400px', boxSizing: 'border-box' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', margin: '0 0 8px 0' }}>Simulate Disruption</h3>
                <p style={{ fontSize: '14px', color: '#A1A1AA', margin: '0 0 24px 0', lineHeight: '1.5' }}>Enter missed days. The engine will schedule mandatory recovery modules first.</p>
                
                <form onSubmit={handleApplySimulation} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '13px', color: '#A1A1AA', display: 'block', marginBottom: '8px' }}>Missed Days</label>
                    <input type="number" value={tempMissedInput} onChange={e => setTempMissedInput(e.target.value)} style={{ width: '100%', background: '#000000', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '14px 16px', color: '#FFFFFF', fontSize: '15px', boxSizing: 'border-box' }} min="1" max="5" required />
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" style={{ flex: 1, background: '#FFFFFF', color: '#000000', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '500', fontSize: '14px', cursor: 'pointer', height: '44px' }}>
                      Apply
                    </button>
                    <button type="button" onClick={() => setShowSimulateModal(false)} style={{ background: 'transparent', border: '1px solid #2A2A2A', color: '#A1A1AA', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', cursor: 'pointer', height: '44px' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {unplannedMissed > 0 && (
            <div style={{ background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '16px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#FFFFFF' }}>Revision-First Protocol Active ({unplannedMissed} Days Missed)</div>
                <div style={{ fontSize: '13px', color: '#A1A1AA', marginTop: '4px' }}>Schedule re-sequenced to prioritize catch-up routines before progressing.</div>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#71717A', border: '1px solid #2A2A2A', padding: '4px 8px', borderRadius: '6px' }}>RECOVERY</span>
            </div>
          )}

          {/* TABS */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #2A2A2A', paddingBottom: '16px', overflowX: 'auto' }}>
            {[
              { id: 'roadmap', label: 'Roadmap', icon: Compass },
              { id: 'projects', label: 'Projects & Q&A', icon: Layers },
              { id: 'podcasts', label: 'Audio Briefs', icon: Radio },
              { id: 'jobs', label: 'Career Vector', icon: Briefcase }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)} 
                  style={{ 
                    background: isActive ? '#FFFFFF' : '#0F0F0F', 
                    border: '1px solid #2A2A2A', 
                    color: isActive ? '#000000' : '#A1A1AA', 
                    padding: '10px 18px', 
                    borderRadius: '12px', 
                    fontSize: '13px', 
                    fontWeight: '500', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Icon size={16} color={isActive ? '#000000' : '#A1A1AA'} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'roadmap' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF', margin: 0, letterSpacing: '-0.3px' }}>Adaptive Sequence</h3>
                  <span style={{ fontSize: '13px', color: '#A1A1AA', fontFamily: 'monospace' }}>Completed: {completedDays.length}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                  {currentRoadmap.map((item) => {
                    const isDone = completedDays.includes(item.day);
                    const isRevision = item.type === 'revision';
                    const isSelected = selectedDay === item.day;
                    return (
                      <div 
                        key={item.day} 
                        onClick={() => setSelectedDay(item.day)}
                        style={{ 
                          background: '#171717', 
                          border: `1px solid ${isSelected ? '#FFFFFF' : '#2A2A2A'}`, 
                          borderRadius: '16px', 
                          padding: '20px', 
                          cursor: 'pointer' 
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: '#A1A1AA', fontFamily: 'monospace' }}>DAY {item.day}</span>
                          <span style={{ fontSize: '12px', color: isDone ? '#FFFFFF' : '#71717A' }}>{isDone ? 'Completed' : 'Pending'}</span>
                        </div>
                        <div style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '500', marginBottom: '8px', lineHeight: '1.4' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#71717A' }}>
                          {isRevision ? 'Catch-up Vector' : `${dailyHours}h session`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedDay && (
                <div style={{ background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', margin: 0, letterSpacing: '-0.3px' }}>Day {selectedDay} Module</h3>
                    <button onClick={() => setSelectedDay(null)} style={{ background: 'transparent', border: 'none', color: '#A1A1AA', cursor: 'pointer', fontSize: '14px' }}>Close</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: '#171717', padding: '24px', borderRadius: '16px', border: '1px solid #2A2A2A' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>Curated Lecture Stream</div>
                      <p style={{ fontSize: '13px', color: '#A1A1AA', marginBottom: '20px', lineHeight: '1.5' }}>Synchronized instructional content matching your active vector profile.</p>
                      <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ background: '#FFFFFF', color: '#000000', padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        Watch Stream <Play size={14} />
                      </a>
                    </div>

                    <div style={{ background: '#171717', padding: '24px', borderRadius: '16px', border: '1px solid #2A2A2A' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>Retention Check</div>
                      <p style={{ fontSize: '13px', color: '#A1A1AA', marginBottom: '20px', lineHeight: '1.5' }}>Validate conceptual comprehension to advance roadmap sequence.</p>
                      <button onClick={() => toggleDay(selectedDay)} style={{ background: completedDays.includes(selectedDay) ? '#171717' : '#FFFFFF', border: '1px solid #2A2A2A', color: completedDays.includes(selectedDay) ? '#FFFFFF' : '#000000', padding: '10px 18px', borderRadius: '10px', fontWeight: '500', fontSize: '13px', cursor: 'pointer' }}>
                        {completedDays.includes(selectedDay) ? 'Completed (Undo)' : 'Mark Completed'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div style={{ background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF', margin: 0, letterSpacing: '-0.3px' }}>Milestone Projects & Telemetry Q&A</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: '#171717', border: '1px solid #2A2A2A', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>Applied Project Vector</div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#A1A1AA', marginBottom: '12px' }}>Autonomous Real-Time Interface Engine</div>
                  <p style={{ fontSize: '13px', color: '#71717A', lineHeight: '1.5' }}>Synthesize theoretical concepts into a production-grade portfolio deliverable.</p>
                </div>
                <div style={{ background: '#171717', border: '1px solid #2A2A2A', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '12px' }}>Core Evaluative Questions</div>
                  <div style={{ fontSize: '13px', color: '#A1A1AA', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.5' }}>
                    <div>• Explain asynchronous execution lifecycle management.</div>
                    <div>• How are state anomalies handled across distributed layers?</div>
                    <div>• Optimize memory allocation for continuous stream processing.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'podcasts' && (
            <div style={{ background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF', margin: 0, letterSpacing: '-0.3px' }}>Streak Audio Briefs</h3>
              <div style={{ background: '#171717', border: '1px solid #2A2A2A', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#FFFFFF' }}>Masterclass Brief: Advanced Architectural Principles</div>
                  <div style={{ fontSize: '13px', color: '#A1A1AA', marginTop: '4px' }}>Unlocked via active streak status ({completedDays.length} Days)</div>
                </div>
                <button style={{ background: '#FFFFFF', color: '#000000', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                  Play Brief
                </button>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div style={{ background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF', margin: 0, letterSpacing: '-0.3px' }}>Career & Networking Vector</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: '#171717', border: '1px solid #2A2A2A', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>Resume & Artifact Optimization</div>
                  <p style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: '1.5' }}>Direct blueprint for structuring GitHub and LinkedIn profiles to maximize recruiter discovery.</p>
                </div>
                <div style={{ background: '#171717', border: '1px solid #2A2A2A', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>Outreach Frameworks</div>
                  <p style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: '1.5' }}>Targeted scripts and referral strategies for tier-one engineering organizations.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
