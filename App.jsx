import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [camActive, setCamActive] = useState(false);
  const [boredomAlert, setBoredomAlert] = useState(false);
  const [engagementScore, setEngagementScore] = useState(94);

  // Reference for the video element
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Function to start the webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240 }, 
        audio: false 
      });
      
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCamActive(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      alert("Unable to access webcam. Please check permissions.");
      setCamActive(false);
    }
  };

  // Function to stop the webcam
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCamActive(false);
    setBoredomAlert(false);
  };

  // Toggle handler
  const toggleCamera = () => {
    if (camActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Simulated AI check loop when camera is active
  useEffect(() => {
    let interval;
    if (camActive) {
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
    return () => {
      clearInterval(interval);
      stopCamera(); // Cleanup on unmount
    };
  }, [camActive]);

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Camera Telemetry Bar */}
      <div style={{ background: '#0f172a', border: `1px solid ${boredomAlert ? '#ef4444' : '#1e293b'}`, borderRadius: '16px', padding: '15px 20px', display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '10px', color: camActive ? '#34d399' : '#94a3b8', fontFamily: 'monospace' }}>CAM ENGAGEMENT AI</span>
            {camActive ? (
              <div style={{ fontSize: '11px', marginTop: '4px' }}>
                {boredomAlert ? (
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Fatigue Detected! Quick Challenge Unlocked!</span>
                ) : (
                  <span style={{ color: '#34d399' }}>✨ Flow State Active • Attention Score: {engagementScore}%</span>
                )}
              </div>
            ) : (
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Enable camera for real-time focus adaptation.</div>
            )}
          </div>
          
          <button 
            onClick={toggleCamera} 
            style={{ background: camActive ? '#065f46' : '#334155', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {camActive ? 'CAM ON 🟢' : 'TURN ON CAM 📷'}
          </button>
        </div>

        {/* Live Video Feed Preview Box */}
        <div style={{ display: camActive ? 'block' : 'none', position: 'relative', width: '100%', height: '220px', background: '#000', borderRadius: '10px', overflow: 'hidden' }}>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
          />
        </div>

      </div>

    </div>
  );
}
