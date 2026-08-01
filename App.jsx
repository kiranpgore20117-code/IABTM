import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'signin', 'plan', 'dashboard'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Feature Inputs
  const [course, setCourse] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [totalWeeks, setTotalWeeks] = useState('4');

  // Interactive tracking state inside dashboard
  const [completedDays, setCompletedDays] = useState([1, 2]); // Sample completed
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap', 'playlist', 'quiz'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

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
      { id: 1, title: '⚡ AUTONOMOUS ENGINE', desc: 'Adapts to your real-life gaps instantly.', x: '6%', y: '26%', duration: '8s', delay: '0s' },
      { id: 2, title: '🧠 ZERO-GUILT LOOP', desc: 'No toxic notifications. Pure momentum.', x: '74%', y: '20%', duration: '10s', delay: '1s' },
      { id: 3, title: '🚀 YOUTUBE CURATOR', desc: 'Best 1-shots and playlists auto-matched.', x: '8%', y: '68%', duration: '9s', delay: '2s' },
      { id: 4, title: '✨ VISUAL ROADMAP', desc: 'Day-by-day progression and live tracking.', x: '73%', y: '65%', duration: '11s', delay: '1.5s' }
    ];
    setFloatingCards(cards);
  }, []);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (email && password) setView('plan');
  };

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    if (course) setView('dashboard');
  };

  const toggleDayCompletion = (day) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter(d => d !== day));
    } else {
      setCompletedDays([...completedDays, day]);
    }
  };

  const line1 = "FEED UR POTENTIAL".split("");
  const line2 = "NOT YOUR FEED".split("");

  // Generate dynamic days based on total weeks
  const totalDaysCount = parseInt(totalWeeks) * 7;
  const roadmapDays = Array.from({ length: Math.min(totalDaysCount, 14) }, (_, i) => i + 1); // Sample first 14 days for visual roadmap preview

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
        @keyframes textNeonGlow {
          0% { text-shadow: 0 0 20px rgba(56, 189, 248, 0.4), 0 0 40px rgba(129, 140, 248, 0.2); }
          50% { text-shadow: 0 0 40px rgba(56, 189, 248, 0.8), 0 0 80px rgba(52, 211, 153, 0.5); }
          100% { text-shadow: 0 0 20px rgba(56, 189, 248, 0.4), 0 0 40px rgba(129, 140, 248, 0.2); }
        }
      `}</style>

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <div key={i} style={{ position: 'absolute', top: `${p.y}%`, left: `${p.x}%`, width: `${p.size}px`, height: `${p.size}px`, background: i % 2 === 0 ? '#38bdf8' : '#818cf8', borderRadius: '50%', pointerEvents: 'none', animation: `floatParticle ${p.duration}s infinite ease-in-out`, animationDelay: `${p.delay}s`, boxShadow: '0 0 15px rgba(56, 189, 248, 0.8)' }} />
      ))}

      {/* Top Corner Sign In Button */}
      {view === 'landing' && (
        <div style={{ position: 'absolute', top: '25px', right: '35px', zIndex: 30 }}>
          <button onClick={() => setView('signin')} style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2))', border: '1px solid #38bdf8', color: '#38bdf8', padding: '12px 28px', borderRadius: '14px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)', backdropFilter: 'blur(10px)' }}>
            SIGN IN ➔
          </button>
        </div>
      )}

      {/* LANDING VIEW */}
      {view === 'landing' && (
        <div style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          {floatingCards.map((card) => (
            <div key={card.id} style={{ position: 'absolute', top: card.y, left: card.x, width: '210px', background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '16px', padding: '16px', boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)', animation: `floatCard ${card.duration} infinite ease-in-out`, animationDelay: card.delay, pointerEvents: 'none' }}>
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
                  <span key={index} style={{ display: 'inline-block', background: 'linear-gradient(to right, #818cf8, #38bdf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: `dropLetter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both, textNeonGlow 4s infinite ease-in-out`, animationDelay: `${(line1.length + index) * 0.04}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </h1>

            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '25px', marginBottom: '35px', lineHeight: '1.6', animation: 'fadeInScale 1s ease-out 0.8s both' }}>
              AI-powered course curation, YouTube playlist/1-shot matching, visual day-wise roadmaps, quizzes, and real-time study tracking.
            </p>

            <div style={{ animation: 'fadeInScale 1s ease-out 1s both' }}>
              <button onClick={() => setView('signin')} style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px 38px', borderRadius: '16px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.6)' }}>
                GET STARTED & BUILD ROADMAP 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIGN IN VIEW */}
      {view === 'signin' && (
        <div style={{ maxWidth: '440px', margin: '70px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 20 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>AGENT AUTHENTICATION</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Enter your credentials to initialize your secure learning session.</p>

          <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>EMAIL ADDRESS</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@hbtm.ai" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>
            <button type="submit" style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.5)' }}>
              CONTINUE TO COURSE CONFIGURATION ➔
            </button>
          </form>
          <button onClick={() => setView('landing')} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px', marginTop: '20px', width: '100%', textAlign: 'center' }}>
            ← BACK TO HOME
          </button>
        </div>
      )}

      {/* FEATURE 1: COURSE & TIME INPUT VIEW */}
      {view === 'plan' && (
        <div style={{ maxWidth: '500px', margin: '50px auto', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', animation: 'fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 20 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '8px' }}>CUSTOM ROADMAP BUILDER</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>Specify your target course, daily hours, and overall timeline to generate YouTube matches and day-wise visuals.</p>

          <form onSubmit={handlePlanSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>WHICH COURSE DO YOU WANNA DO?</label>
              <input type="text" value={course} onChange={e => setCourse(e.target.value)} placeholder="e.g., Full Stack Web Dev / Machine Learning" style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>DAILY TIME SPAN</label>
                <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}>
                  <option value="1">1 Hour / Day</option>
                  <option value="2">2 Hours / Day</option>
                  <option value="4">4 Hours / Day</option>
                  <option value="6">6+ Hours / Day</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>OVERALL COMPLETION</label>
                <select value={totalWeeks} onChange={e => setTotalWeeks(e.target.value)} style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}>
                  <option value="1">1 Week (Crash)</option>
                  <option value="2">2 Weeks</option>
                  <option value="4">1 Month</option>
                  <option value="12">3 Months</option>
                </select>
              </div>
            </div>

            <button type="submit" style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.5)' }}>
              GENERATE YOUTUBE PLAYLIST & VISUAL ROADMAP 🚀
            </button>
          </form>
        </div>
      )}

      {/* DASHBOARD: FULL VISUAL ROADMAP, YOUTUBE MATCHES, QUIZZES & LIVE TRACKING */}
      {view === 'dashboard' && (
        <div style={{ maxWidth: '1000px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 20, animation: 'fadeInScale 0.6s ease-out' }}>
          
          {/* Top Header & Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
              <span style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>ACTIVE CURATED COURSE VECTOR</span>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f8fafc', margin: '4px 0' }}>{course.toUpperCase()}</h2>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>Pace: {dailyHours} hrs/day • Target Span: {totalWeeks} Weeks • Progress: {Math.round((completedDays.length / totalDaysCount) * 100)}% Completed</div>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>STUDY STREAK & TRACKING</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#34d399', marginTop: '4px' }}>🔥 {completedDays.length} Days Logged</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
            <button onClick={() => setActiveTab('roadmap')} style={{ background: activeTab === 'roadmap' ? '#6366f1' : '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              🗺️ Visual Day-Wise Roadmap
            </button>
            <button onClick={() => setActiveTab('playlist')} style={{ background: activeTab === 'playlist' ? '#6366f1' : '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              📺 YouTube Playlist / 1-Shot Matches
            </button>
            <button onClick={() => setActiveTab('quiz')} style={{ background: activeTab === 'quiz' ? '#6366f1' : '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              🧠 Interactive Quizzes
            </button>
          </div>

          {/* TAB 1: VISUAL DAY-WISE ROADMAP & TRACKER */}
          {activeTab === 'roadmap' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🗺️ INTERACTIVE VISUAL ROADMAP & DAILY TRACKER</h3>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Click any day to mark as studied</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
                {roadmapDays.map((day) => {
                  const isDone = completedDays.includes(day);
                  return (
                    <div 
                      key={day} 
                      onClick={() => toggleDayCompletion(day)}
                      style={{ 
                        background: isDone ? 'rgba(52, 211, 153, 0.1)' : '#020617', 
                        border: `1px solid ${isDone ? '#34d399' : '#334155'}`, 
                        borderRadius: '12px', 
                        padding: '16px', 
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: isDone ? '0 0 15px rgba(52, 211, 153, 0.2)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: isDone ? '#34d399' : '#38bdf8', fontFamily: 'monospace' }}>DAY {day}</span>
                        <span style={{ fontSize: '12px' }}>{isDone ? '✅' : '⏳'}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#f8fafc', fontWeight: 'bold', marginBottom: '4px' }}>
                        {day === 1 ? 'Fundamentals & Setup' : day === 2 ? 'Core Architecture' : day === 3 ? 'Hands-on Practice' : `Module Vector ${day}`}
                      </div>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>{dailyHours} hrs scheduled</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: YOUTUBE PLAYLIST & 1-SHOT MATCHES */}
          {activeTab === 'playlist' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ fontSize: '14px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>📺 BEST QUALITY YOUTUBE PLAYLISTS & 1-SHOTS MATCHED</h3>
              
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc' }}>Ultimate {course} Full Course 1-Shot Mastery (2026 Edition)</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Curated Top Educator • 100% Comprehensive Coverage • Zero Fluff</div>
                </div>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ background: '#ef4444', color: '#fff', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' }}>
                  Watch on YouTube ▶
                </a>
              </div>

              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc' }}>{course} Complete Playlist (30 Episodes)</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Deep dive modular learning with practical projects</div>
                </div>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ background: '#ef4444', color: '#fff', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' }}>
                  Open Playlist ▶
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE QUIZZES */}
          {activeTab === 'quiz' && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ fontSize: '14px', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>🧠 KNOWLEDGE CHECK & QUIZZES</h3>
              
              <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: '14px', padding: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '10px' }}>Q1: What is the primary focus of your initial milestone in {course}?</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  <label style={{ cursor: 'pointer' }}><input type="radio" name="q1" onChange={() => setQuizAnswers({...quizAnswers, q1: 'correct'})} /> Core Fundamentals & Environment Setup</label>
                  <label style={{ cursor: 'pointer' }}><input type="radio" name="q1" onChange={() => setQuizAnswers({...quizAnswers, q1: 'wrong'})} /> Advanced deployment without basics</label>
                </div>
              </div>

              <button onClick={() => setQuizSubmitted(true)} style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                Submit & Check Score 🎯
              </button>

              {quizSubmitted && (
                <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid #34d399', padding: '15px', borderRadius: '10px', fontSize: '12px', color: '#34d399' }}>
                  🎉 Quiz Evaluated! Score: 100% — Your conceptual retention is optimal.
                </div>
              )}
            </div>
          )}

          <button onClick={() => setView('plan')} style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', width: '220px' }}>
            ← Modify Course / Plan Parameters
          </button>

        </div>
      )}

    </div>
  );
}
