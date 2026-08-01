import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState('landing');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Feature 1 Inputs
  const [course, setCourse] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [totalWeeks, setTotalWeeks] = useState('4');

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) setView('plan-input');
  };

  const handleGeneratePlan = (e) => {
    e.preventDefault();
    if (course) setView('dashboard');
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* Top Bar with Sign In */}
      {view === 'landing' && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
          <button
            onClick={() => setView('signin')}
            style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '12px 28px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)' }}
          >
            SIGN IN ➔
          </button>
        </div>
      )}

      {/* Landing View */}
      {view === 'landing' && (
        <div style={{ textAlign: 'center', marginTop: '120px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#ffffff' }}>FEED UR POTENTIAL</h1>
          <h1 style={{ fontSize: '48px', fontWeight: '900', background: 'linear-gradient(to right, #818cf8, #38bdf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NOT YOUR FEED</h1>
          <p style={{ color: '#94a3b8', marginTop: '20px', fontSize: '14px' }}>Autonomous AI Course Curation, YouTube Playlist Matching & Day-Wise Roadmap Engine.</p>
        </div>
      )}

      {/* Sign In View */}
      {view === 'signin' && (
        <div style={{ maxWidth: '400px', margin: '80px auto', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>SIGN IN TO YOUR ACCOUNT</h2>
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '12px', background: '#020617', border: '1px solid #334155', borderRadius: '10px', color: '#fff' }} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '12px', background: '#020617', border: '1px solid #334155', borderRadius: '10px', color: '#fff' }} required />
            <button type="submit" style={{ padding: '14px', background: '#6366f1', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer' }}>CONTINUE TO COURSE SETUP ➔</button>
          </form>
        </div>
      )}

      {/* Feature 1: Course & Time Input View */}
      {view === 'plan-input' && (
        <div style={{ maxWidth: '480px', margin: '50px auto', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>BUILD YOUR CUSTOM ROADMAP</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>Specify your target course, daily time availability, and overall completion period.</p>

          <form onSubmit={handleGeneratePlan} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#38bdf8', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>WHICH COURSE DO YOU WANNA DO?</label>
              <input type="text" placeholder="e.g., Full Stack Web Dev / Machine Learning" value={course} onChange={e => setCourse(e.target.value)} style={{ width: '100%', padding: '12px', background: '#020617', border: '1px solid #334155', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#38bdf8', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>DAILY TIME SPAN</label>
                <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={{ width: '100%', padding: '12px', background: '#020617', border: '1px solid #334155', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }}>
                  <option value="1">1 Hour / Day</option>
                  <option value="2">2 Hours / Day</option>
                  <option value="4">4 Hours / Day</option>
                  <option value="6">6+ Hours / Day</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#38bdf8', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>TOTAL COMPLETION</label>
                <select value={totalWeeks} onChange={e => setTotalWeeks(e.target.value)} style={{ width: '100%', padding: '12px', background: '#020617', border: '1px solid #334155', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }}>
                  <option value="2">2 Weeks (Crash)</option>
                  <option value="4">1 Month</option>
                  <option value="12">3 Months</option>
                  <option value="24">6 Months</option>
                </select>
              </div>
            </div>

            <button type="submit" style={{ padding: '14px', background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', marginTop: '10px' }}>
              GENERATE YOUTUBE PLAYLIST & ROADMAP 🚀
            </button>
          </form>
        </div>
      )}

      {/* Dashboard with AI-Generated Playlist & Roadmap Mock */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '900px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#0f172a', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b' }}>
            <span style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace' }}>ACTIVE CURATED PATHWAY</span>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>{course.toUpperCase()}</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Pace: {dailyHours} hrs/day • Target Span: {totalWeeks} Weeks</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: '#0f172a', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b' }}>
              <h3 style={{ fontSize: '14px', color: '#38bdf8', marginBottom: '10px', fontFamily: 'monospace' }}>📺 TOP YOUTUBE PLAYLIST / 1-SHOT MATCHED</h3>
              <div style={{ background: '#020617', padding: '15px', borderRadius: '12px', border: '1px solid #334155', fontSize: '12px' }}>
                <div style={{ fontWeight: 'bold', color: '#fff' }}>Ultimate {course} Mastery Bootcamp (2026 Edition)</div>
                <div style={{ color: '#94a3b8', marginTop: '4px' }}>Curated from top creators • 100% Comprehensive 1-Shot / Playlist</div>
              </div>
            </div>

            <div style={{ background: '#0f172a', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b' }}>
              <h3 style={{ fontSize: '14px', color: '#34d399', marginBottom: '10px', fontFamily: 'monospace' }}>🗺️ VISUAL ROADMAP & DAY-WISE PLAN</h3>
              <div style={{ background: '#020617', padding: '15px', borderRadius: '12px', border: '1px solid #334155', fontSize: '12px', lineHeight: '1.6' }}>
                <div>• <span style={{ color: '#818cf8', fontWeight: 'bold' }}>Day 1-3:</span> Core Fundamentals & Setup</div>
                <div>• <span style={{ color: '#818cf8', fontWeight: 'bold' }}>Day 4-10:</span> Advanced Architecture & Modules</div>
                <div>• <span style={{ color: '#34d399', fontWeight: 'bold' }}>Quizzes & Tracking:</span> Active telemetry ready.</div>
              </div>
            </div>
          </div>

          <button onClick={() => setView('plan-input')} style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', width: '200px' }}>
            ← Modify Plan Parameters
          </button>
        </div>
      )}

    </div>
  );
}
