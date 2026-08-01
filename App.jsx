import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'setup'
  
  // Inputs from previous features
  const [course, setCourse] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [totalDays, setTotalDays] = useState('30');
  const [plannedExams, setPlannedExams] = useState('2');
  const [unplannedMissed, setUnplannedMissed] = useState('1');

  // Alphabet drop animation state for letters
  const titleLine1 = "BAND OF AGENTS".split("");
  const titleLine2 = "LEARNING ENGINE".split("");

  return (
    <div style={{ backgroundColor: '#fcfbf7', color: '#111827', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '8px solid #111827', margin: '10px', borderRadius: '16px', overflow: 'hidden' }}>
      
      <style>{`
        @keyframes dropLetter {
          0% { opacity: 0; transform: translateY(-50px) scale(0.8); }
          60% { opacity: 1; transform: translateY(5px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.97) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {view === 'landing' ? (
        <>
          {/* TOP SECTION: BRANDS + HERO CONTENT */}
          <div style={{ padding: '40px 60px', display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
            
            {/* Partner / Brand Logos Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace', color: '#374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#111827', color: '#fff', padding: '6px 12px', borderRadius: '6px' }}>
                <span>⬡</span> <strong>BAND</strong>
              </div>
              <span>×</span>
              <span style={{ border: '1px solid #111827', padding: '4px 8px', borderRadius: '4px' }}>LV</span>
              <span>×</span>
              <span style={{ border: '1px solid #111827', padding: '4px 8px', borderRadius: '4px' }}>LABLAB</span>
              <span>×</span>
              <span>FEATHERLESS</span>
              <span>×</span>
              <span>AI/ML API</span>
            </div>

            {/* HERO CONTENT: TITLE DROPPING ALPHABET BY ALPHABET & ILLUSTRATION */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
              
              <div>
                <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: '900', lineHeight: '1.1', margin: '0 0 20px 0', letterSpacing: '-1.5px', textTransform: 'uppercase' }}>
                  
                  {/* Line 1 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {titleLine1.map((char, index) => (
                      <span key={index} style={{ display: 'inline-block', animation: 'dropLetter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both', animationDelay: `${index * 0.03}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </div>

                  {/* Line 2 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', color: '#059669' }}>
                    {titleLine2.map((char, index) => (
                      <span key={index} style={{ display: 'inline-block', animation: 'dropLetter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both', animationDelay: `${(titleLine1.length + index) * 0.03}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </div>

                </h1>

                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6', maxWidth: '480px', marginBottom: '30px', fontWeight: '500' }}>
                  BUILD AUTONOMOUS MULTI-AGENT LEARNING SYSTEMS, CUSTOM YOUTUBE ROADMAPS, AND LIVE GAP-RECALIBRATION ENGINES.
                </p>

                <button 
                  onClick={() => setView('setup')}
                  style={{ background: '#111827', color: '#fff', border: 'none', padding: '16px 36px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(17, 24, 39, 0.4)', transition: 'transform 0.2s' }}
                >
                  ENTER APP & BUILD ROADMAP 🚀
                </button>
              </div>

              {/* Right Side Retro Hacker Illustration Box (Matching reference style) */}
              <div style={{ background: '#064e3b', border: '3px solid #111827', borderRadius: '20px', padding: '30px', minHeight: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '8px 8px 0px #111827', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#34d399', background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: '6px' }}>AGENT_KERNEL_v2.6</span>
                  <span style={{ fontSize: '18px' }}>🤖⚡</span>
                </div>
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: '#fff', fontFamily: 'monospace' }}>FEED UR POTENTIAL</div>
                  <div style={{ fontSize: '12px', color: '#a7f3d0', marginTop: '6px' }}>Autonomous YouTube Matching & Day-Wise Visual Tracking</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6ee7b7', fontFamily: 'monospace' }}>
                  <span>STATUS: ONLINE</span>
                  <span>CLOSED-LOOP ACTIVE</span>
                </div>
              </div>

            </div>

          </div>

          {/* BOTTOM METRICS BAR (Matching reference layout) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '3px solid #111827', background: '#fff' }}>
            
            <div style={{ padding: '24px 30px', borderRight: '3px solid #111827' }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📅</span> DATES
              </div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#111827' }}>JUNE 12–19, 2026</div>
            </div>

            <div style={{ padding: '24px 30px', borderRight: '3px solid #111827' }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📍</span> LOCATION
              </div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#111827' }}>ONLINE (GLOBAL)</div>
            </div>

            <div style={{ padding: '24px 30px', background: '#111827', color: '#fff' }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🏆</span> PRIZE POOL / IMPACT
              </div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#34d399' }}>$10,000+ & AGENT BOOST</div>
            </div>

          </div>
        </>
      ) : (
        /* SETUP VIEW WHEN ENTERED */
        <div style={{ maxWidth: '520px', margin: '40px auto', background: '#fff', border: '3px solid #111827', borderRadius: '20px', padding: '40px', boxShadow: '10px 10px 0px #111827', animation: 'fadeInScale 0.5s ease-out', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>CONFIGURE ROADMAP</h2>
            <button onClick={() => setView('landing')} style={{ background: 'none', border: '2px solid #111827', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>← BACK</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>COURSE / TOPIC</label>
              <input type="text" value={course} onChange={e => setCourse(e.target.value)} placeholder="e.g. Full Stack Web Dev / AI Agent Systems" style={{ width: '100%', padding: '12px', border: '2px solid #111827', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>DAILY HOURS</label>
                <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #111827', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box', background: '#fff' }}>
                  <option value="1">1 Hour / Day</option>
                  <option value="2">2 Hours / Day</option>
                  <option value="3">3 Hours / Day</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>TOTAL DAYS</label>
                <input type="number" value={totalDays} onChange={e => setTotalDays(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #111827', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>PLANNED EXAMS</label>
                <input type="number" value={plannedExams} onChange={e => setPlannedExams(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #111827', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>UNPLANNED GAP</label>
                <input type="number" value={unplannedMissed} onChange={e => setUnplannedMissed(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #111827', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <button onClick={() => alert(`Roadmap initialized for ${course || 'General Agent Mastery'} with strict ${totalDays}-day timeline!`)} style={{ background: '#059669', color: '#fff', border: '2px solid #111827', padding: '16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '10px', boxShadow: '4px 4px 0px #111827' }}>
              GENERATE YOUTUBE ROADMAP & AGENT DASHBOARD 🚀
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
